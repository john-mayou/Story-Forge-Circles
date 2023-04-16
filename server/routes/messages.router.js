const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const forbidden = new Error("User is not authenticated");
forbidden.code = 403;

/**
 * GET messages on circles
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  console.log("Getting all messages");
  const getAllMessagesQuery = `SELECT * FROM "messages" LIMIT 10;`
  pool
    .query(getAllMessagesQuery)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error("GET all messages failed", err);
    });
});

/**
 * POST messages on circle message board
 */
router.post("/", rejectUnauthenticated, async (req, res) => {
  // extracting values from req.body
  const { manuscript_id, circle_id, parent_id, message } = req.body;
  console.log("in req.body", req.body);

  const connection = await pool.connect();

  try {
    await connection.query('BEGIN');
    const result = await connection.query(
      `INSERT INTO messages (created_at, manuscript_id, circle_id, user_id, parent_id, message)
            VALUES ( NOW(), $1, $2, $3, $4, $5 ) RETURNING *;`,
      [manuscript_id, circle_id, req.user.id, parent_id, message]
    );
    let pathQuery = `WITH RECURSIVE messages_cte (
        id,
          path
        ) AS (
          SELECT
          m.id,
            ''
          FROM
            "messages" m
          WHERE
            parent_id IS NULL
          UNION ALL
          SELECT
          r.id,
            concat(messages_cte.path, '.', r.parent_id)
          FROM "messages" r
            JOIN messages_cte ON messages_cte.id = r.parent_id
        )
        SELECT
          path
        FROM
          messages_cte
        WHERE id = $1;`;
    const pathResponse = await connection.query(pathQuery, [result.rows[0].id]);
    const path = pathResponse.rows[0].path.substr(1);
    console.log('path:', path);

    const updateQuery = `UPDATE messages SET path = $1 WHERE id = $2;`;
    const updateResponse = await connection.query(updateQuery, [path, result.rows[0].id]);

    await connection.query("COMMIT");
    res.send(result.rows[0]);
  } catch (err) {
    await connection.query('ROLLBACK');
    console.log(`Transaction Error - Rolling back transfer`, err);
    res.sendStatus(500).json({ message: "Error occurring with messages." });
  } finally {
    connection.release();
    res.end();
  }
});

module.exports = router;
