const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET PUBLIC Manuscripts route
 */
router.get("/", (req, res) => {
    const query = `SELECT "manuscripts".id, "manuscripts".title, "manuscripts".body FROM "manuscripts"
    JOIN "manuscript_shelf" ON "manuscript_shelf".manuscript_id = "manuscripts".id
    JOIN "shelves" ON "shelves".id = "manuscript_shelf".shelf_id
    JOIN "user" ON "user".id = "shelves".user_id
    GROUP BY "manuscripts".id, "manuscripts".title, "manuscripts".body;`

    pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
    // POST route code here
});

module.exports = router;
