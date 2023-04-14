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
router.get("/", (req, res) => {
    // GET route code here
});


/**
 * POST comments on circle message board
 */
router.post("/", rejectUnauthenticated, async (req, res) => {
    // const { created_at, manuscript_id, circle_id, user_id, parent_id, message, id } = req.body;
    const { message, circle_id } = req.body;
    try {
        const result =  await pool.query(
            // `INSERT INTO messages (created_at, manuscript_id, circle_id, user_id, parent_id, message)
            // VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
            // [Number(manuscript_id), created_at, user_id, parent_id, message]
            `INSERT INTO messages (circle_id, user_id, message, created_at)
            VALUES ($1, $2, $3, NOW()) RETURNING *;`,
            [circle_id, req.user.id, message]
        )
        res.send(result.rows[0]);
    } catch (error) {
    console.log("error", error)
        res.sendStatus(500).json({ message: "Error occurring with messages." });
    }
});

module.exports = router;