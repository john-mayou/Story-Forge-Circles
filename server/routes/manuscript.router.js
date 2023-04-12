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

/**
 * POST Manuscript route
 */
router.post("/", rejectUnauthenticated, async (req, res) => {
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
 * PUT Manuscript route
 */
router.put("/:id", rejectUnauthenticated, async (req, res) => {
  // const userId = req.user.id;
  const manuscriptId = req.params.id;
  const title = req.body.payload.title;
  const body = req.body.payload.body;

  console.log('manuscriptId', req.params.id);
  console.log('title', title);
  console.log('body', body);

  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");

    //NOT SECURE FROM POSTMAN NEED TO UPDATE TO INCLUDE USER ID
    const manuscriptUpdateQueryText = `UPDATE "manuscripts"
    SET title = $1, body = $2
    WHERE "manuscripts".id = $3;
    `;

    await connection.query(manuscriptUpdateQueryText, [
      title,
      body,
      manuscriptId,
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
 * DELETE Manuscript route
 */
router.delete("/:id", rejectUnauthenticated, async (req, res) => {
  const userId = req.user.id;
  const manuscriptId = req.params.id;

  console.log("userID", req.user.id);
  console.log("manuscriptId", req.params.id);

  console.log("in delete");

  const connection = await pool.connect();

  try {
    await connection.query("BEGIN");

    const deleteManuscriptShelvesQueryText = `
    DELETE FROM "manuscript_shelf" 
    USING "user" 
    WHERE "manuscript_shelf".manuscript_id = $1 AND "user".id = $2;`;

    await connection.query(deleteManuscriptShelvesQueryText, [
      manuscriptId,
      userId,
    ]);

    const deleteManuscriptQueryText = `
    DELETE FROM "manuscripts" 
    USING "user" 
    WHERE "manuscripts".id = $1 AND "user".id = $2;
    `;

    await connection.query(deleteManuscriptQueryText, [manuscriptId, userId]);

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

module.exports = router;
