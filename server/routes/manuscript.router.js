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
    WHERE "manuscripts".public = true
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
 * GET Single  Manuscripts route
 */
router.get("/:id", (req, res) => {
  const id = req.params.id;

  const query = `SELECT "manuscripts".id, "manuscripts".title, "manuscripts".body, "manuscripts".public, "user".username FROM "manuscripts"
    JOIN "manuscript_shelf" ON "manuscript_shelf".manuscript_id = "manuscripts".id
    JOIN "shelves" ON "shelves".id = "manuscript_shelf".shelf_id
    JOIN "user" ON "user".id = "shelves".user_id
    WHERE "manuscripts".id = $1
    GROUP BY "manuscripts".id, "manuscripts".title, "manuscripts".body, "manuscripts".public, "user".username;`;

  pool
    .query(query, [id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get Manuscript by id failed", err);
      res.sendStatus(500);
    });
});

/**
 * POST Manuscript route
 */
router.post("/", rejectUnauthenticated, async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const public = req.body.public;

  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");

    const manuscriptInsertQueryText = `
    INSERT INTO "manuscripts" ("title", "body", "public")
    VALUES ($1, $2, $3) 
    RETURNING "id";
    `;

    const manuscriptResult = await connection.query(manuscriptInsertQueryText, [
      title,
      body,
      public,
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

  const manuscriptId = req.params.id;
  const title = req.body.payload.title;
  const body = req.body.payload.body;
  const public = req.body.payload.public;

  const userParamId = req.user.id;

  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");

    //Check to make sure content to be updated exists and belongs to the currently authenticated user.
    const isManuscriptOwnerQueryText = `
    SELECT EXISTS (
      SELECT * FROM "user" AS u
      JOIN "shelves" AS s ON u.id = s.user_id
      JOIN "manuscript_shelf" AS ms ON ms.shelf_id = s.id
      JOIN "manuscripts" AS m ON m.id = ms.manuscript_id
      WHERE u.id = $1 AND m.id = $2
    ) AS is_manuscript_owner;
    `;

    const isOwnerResult = await connection.query(isManuscriptOwnerQueryText, [
      userParamId,
      manuscriptId,
    ]);
    const isOwner = isOwnerResult.rows[0].is_manuscript_owner;

    //If the content does not exist or does not belong to the user, we send 403 status forbidden and break.
    if (!isOwner) {
      res.sendStatus(403);
      return;
    }
    //NOT SECURE FROM POSTMAN NEED TO UPDATE TO INCLUDE USER ID
    const manuscriptUpdateQueryText = `UPDATE "manuscripts"
    SET title = $1, body = $2, public = $3
    WHERE "manuscripts".id = $4;
    `;

    await connection.query(manuscriptUpdateQueryText, [
      title,
      body,
      public,
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
  const connection = await pool.connect();

  try {
    await connection.query("BEGIN");

    //Check to make sure content to be deleted exists and belongs to the currently authenticated user.
    const isManuscriptOwnerQueryText = `
    SELECT EXISTS (
      SELECT * FROM "user" AS u
      JOIN "shelves" AS s ON u.id = s.user_id
      JOIN "manuscript_shelf" AS ms ON ms.shelf_id = s.id
      JOIN "manuscripts" AS m ON m.id = ms.manuscript_id
      WHERE u.id = $1 AND m.id = $2
    ) AS is_manuscript_owner;
    `;

    const isOwnerResult = await connection.query(isManuscriptOwnerQueryText, [
      userId,
      manuscriptId,
    ]);
    const isOwner = isOwnerResult.rows[0].is_manuscript_owner;

    //If the content does not exist or does not belong to the user, we send status 403 forbidden and break.
    if (!isOwner) {
      res.sendStatus(403);
      return;
    }

    const deleteManuscriptShelvesQueryText = `
    DELETE FROM "manuscript_shelf" 
    WHERE "manuscript_shelf".manuscript_id = $1`;

    await connection.query(deleteManuscriptShelvesQueryText, [manuscriptId]);

    const deleteManuscriptQueryText = `
    DELETE FROM "manuscripts" 
    WHERE "manuscripts".id = $1;
    `;

    await connection.query(deleteManuscriptQueryText, [manuscriptId]);

    await connection.query("COMMIT");
    res.sendStatus(204);
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
 * GET shared Manuscripts route
 */
router.get("/circle/:id", rejectUnauthenticated, (req, res) => {
  const circleID = req.params.id;

  const query = `SELECT "manuscripts".id, "manuscripts".title, "manuscripts".body, "user".username FROM "manuscripts"
    JOIN "circle_manuscript" ON "circle_manuscript".manuscript_id = "manuscripts".id
    JOIN "circles" ON "circles".id = "circle_manuscript".circle_id
    JOIN "user" ON "user".id = "circles".owner_id
    WHERE "circles".id = $1
    GROUP BY "manuscripts".id, "manuscripts".title, "manuscripts".body, "user".username;`;

  pool
    .query(query, [circleID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get shared manuscripts", err);
      res.sendStatus(500);
    });
});

module.exports = router;
