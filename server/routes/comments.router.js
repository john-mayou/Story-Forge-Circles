const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const forbidden = new Error('User is not authenticated');
forbidden.code = 403;

/**
 * GET comments on manuscripts
 */
router.get("/", (req, res) => {
    // GET route code here
});

/**
 * POST post comments on manuscripts
 */
router.post("/", rejectUnauthenticated, async (req, res) => {
    console.log('req.body:', req.body);
    // const { created_at, manuscript_id, circle_id, user_id, parent_id, comment } = req.body;
    const { comment } = req.body;
    // const newComment = `INSERT INTO comments (created_at, manuscript_id, circle_id, user_id, parent_id, comment)
    // VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`
    // [Number(manuscript_id), created_at, manuscript_id, circle_id, user_id, parent_id, comment]

    const newComment = `INSERT INTO comments (comment, user_id)
    VALUES ($1, $2) RETURNING comment;`

    const connection = await pool.connect();

    try {
        await connection.query('BEGIN');
        const result = await connection.query(newComment, [comment, req.user.id]);
        await connection.query('COMMIT');
        res.send(result.rows[0]);
    } catch (err) {
            if (err.code == 403) {
                res.sendStatus(403)
            } else {
                await connection.query('ROLLBACK');
                console.log(`Transaction Error - Rolling back transfer`, err);
                res.sendStatus(500)
                    .json({ message: "Error occurring with comments." });
            }
        } finally {
            connection.release();
            res.end();
    }
});


module.exports = router;