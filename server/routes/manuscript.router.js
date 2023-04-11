const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

/**
 * GET PUBLIC Manuscripts route
 */
router.get("/", (req, res) => {

    const query = `SELECT "manuscripts".id, "manuscripts".title, "manuscripts".body, "user".username FROM "manuscripts"
    JOIN "manuscript_shelf" ON "manuscript_shelf".manuscript_id = "manuscripts".id
    JOIN "shelves" ON "shelves".id = "manuscript_shelf".shelf_id
    JOIN "user" ON "user".id = "shelves".user_id
    GROUP BY "manuscripts".id, "manuscripts".title, "manuscripts".body, "user".username;`

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
    GROUP BY "manuscripts".id, "manuscripts".title, "manuscripts".body, "user".username;`

    pool.query(query, [userID])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })
});




module.exports = router;
