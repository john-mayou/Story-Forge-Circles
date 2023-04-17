const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const forbidden = new Error("User is not authenticated");
forbidden.code = 403;

/**
 * GET children comments by parent id
 */
router.get("/:id", rejectUnauthenticated, (req, res) => {
  console.log("Getting children comments");
  const getChildrenQuery = `SELECT m.*, u.username
  FROM "messages" m 
  JOIN "user" u on u.id = m.user_id
  WHERE path <@ $1 ORDER BY created_at ASC;`
  pool
    .query(getChildrenQuery, [req.params.id])
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error("GET children comments failed", err);
    });
});

/**
 * GET threads (base/parent messages) on circles, limit 10
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  console.log("Getting all messages");
  const getThreadsQuery = `SELECT m.*, u.username 
  FROM "messages" m 
  JOIN "user" u on u.id = m.user_id 
  WHERE path='' LIMIT 10;`
  pool
    .query(getThreadsQuery)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      res.sendStatus(500);
      console.error("GET all threads failed", err);
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
    // if parent id exists, update path
    if (parent_id) {
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
      // Making new query to set path (ltree type) for reply
      const updateQuery = `UPDATE messages SET path = $1 WHERE id = $2;`;
      const updateResponse = await connection.query(updateQuery, [path, result.rows[0].id]);
    }
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
