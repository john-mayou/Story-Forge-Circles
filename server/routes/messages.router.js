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
  const getAllMessagesQuery = `WITH RECURSIVE messages_cte (
      id,
      path,
      message,
      user_id,
      username,
      circle_id,
      manuscript_id,
      created_at
    ) AS (
      SELECT
        m.id,
        '',
        m.message,
        m.user_id,
        u.username,
        m.circle_id,
        m.manuscript_id,
        m.created_at
      FROM
        "messages" m
        JOIN "user" u ON user_id = u.id
      WHERE
        parent_id IS NULL
      UNION ALL
      SELECT
        r.id,
        concat(messages_cte.path, '/', r.parent_id),
        r.message,
        r.user_id,
        u.username,
        r.circle_id,
        r.manuscript_id,
        r.created_at
      FROM
        "messages" r
        JOIN messages_cte ON messages_cte.id = r.parent_id
        JOIN "user" u ON r.user_id = u.id
    )
    SELECT
      *
    FROM
      messages_cte
    ;`;
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
