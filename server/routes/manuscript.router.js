const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET PUBLIC Manuscripts route
 */
router.get("/", (req, res) => {
  const query = `SELECT "manuscripts".id, "manuscripts".title, "manuscripts".body, "user".username FROM "manuscripts"
    JOIN "manuscript_shelf" ON "manuscript_shelf".manuscript_id = "manuscripts".id
    JOIN "shelves" ON "shelves".id = "manuscript_shelf".shelf_id
    JOIN "user" ON "user".id = "shelves".user_id
    GROUP BY "manuscripts".id, "manuscripts".title, "manuscripts".body, "user".username;`;

  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, async (req, res) => {
  console.log("req.body", req.body);
  console.log("req.user.id", req.user.id);

  title = req.body.title;
  body = req.body.body;

  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");

    const manuscriptInsertQueryText = `
    INSERT INTO "manuscripts" ("title", "body")
    VALUES ($1, $2) 
    RETURNING "id";
    `;

    const manuscriptResult = await connection.query(manuscriptInsertQueryText, [
      title,
      body,
    ]);
    const newManuscriptId = manuscriptResult.rows[0].id;

    const selectShelvesIDQueryText = `
    SELECT "shelves".id FROM "shelves"
    JOIN "user" ON "user".id = "shelves".user_id
    WHERE "user".id = $1;
    `;

    const ShelvesResult = await connection.query(selectShelvesIDQueryText, [
      req.user.id,
    ]);
    const ShelvesID = ShelvesResult.rows[0].id;

    const manuscriptShelfQueryText = `
    INSERT INTO "manuscript_shelf" ("shelf_id", "manuscript_id")
    VALUES ($1, $2);
    `;

    await connection.query(manuscriptShelfQueryText, [
      ShelvesID,
      newManuscriptId,
    ]);

    await connection.query("COMMIT");
    res.sendStatus(201);
  } catch (error) {
    await connection.query("ROLLBACK");
    console.log(`Transaction Error - Rolling back transfer`, error);
    res.sendStatus(500);
  } finally {
    // Always runs - both after successful try & after catch
    // Put the client connection back in the pool
    // This is super important!
    connection.release();
  }
});

/**
 * GET WRITERS DESK Manuscripts route
 */
router.get("/writersdesk", rejectUnauthenticated, (req, res) => {
  const userID = req.user.id;

  const query = `SELECT "manuscripts".id, "manuscripts".title, "manuscripts".body, "user".username FROM "manuscripts"
    JOIN "manuscript_shelf" ON "manuscript_shelf".manuscript_id = "manuscripts".id
    JOIN "shelves" ON "shelves".id = "manuscript_shelf".shelf_id
    JOIN "user" ON "user".id = "shelves".user_id
    WHERE "user".id = $1
    GROUP BY "manuscripts".id, "manuscripts".title, "manuscripts".body, "user".username;`;

  pool
    .query(query, [userID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});

module.exports = router;
