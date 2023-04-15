const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const forbidden = new Error('User is not authenticated');
forbidden.code = 403;

/**
 * GET messages on circles
 */
router.get("/", rejectUnauthenticated, (req, res) => {
    console.log('Getting all messages')
    const getAllMessagesQuery = `SELECT * FROM "messages"
    WHERE "user_id" = $1
    ORDER BY "created_at" DESC
    ;`;
    pool
      .query(getAllMessagesQuery, [req.user.id])
      .then((dbRes) => {
        res.send(dbRes.rows);
      })
      .catch((err) => {
        res.sendStatus(500);
        console.error("GET all messages failed", err);
      });
  });


/**
 * POST comments on circle message board
 */
router.post("/", rejectUnauthenticated, async (req, res) => {
  // extracting values from req.body
    const { manuscript_id, circle_id, parent_id, message } = req.body;
    console.log("in req.body", req.body);
    try {
        const result =  await pool.query(
            `INSERT INTO messages (created_at, manuscript_id, circle_id, user_id, parent_id, message)
            VALUES ( NOW(), $1, $2, $3, $4, $5 ) RETURNING *;`,
            [manuscript_id, circle_id, req.user.id, parent_id, message]
        )
        res.send(result.rows[0]);
    } catch (error) {
    console.log("error", error)
        res.sendStatus(500).json({ message: "Error occurring with messages." });
    }
});

module.exports = router;