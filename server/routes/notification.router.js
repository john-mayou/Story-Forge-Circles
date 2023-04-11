const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
    // get all notifications
    // WHERE recipient_id = req.user.id
    // Need to send back
    // circle_id
    // circle_name
    // type
    // actor_id
    // actor_name
    // ACTION_NEEDED?
    // nominated_by_id
    // nominated_by_name
    // nominated_id
    // nominated_name
    // const notificationsQuery = `
    //     SELECT FROM ""
    // `;
    // TODODODODODODODDO
});

router.post("/new", async (req, res) => {
    const connection = await pool.connect();
    const { circle_id, nomination, recipient_id, type } = req.body;
    // req.body = {
    //    circle: (circle object),
    //    recipient_id: 2,
    //    type: "request to join.....",
    //    nomination: null | id,
    // }

    try {
        await connection.query("BEGIN");
        // First: if nomination ? insert into nominations table returning id
        const nominationInsertion = `
            INSERT INTO "nominations" ("nominated_by_id", "nominated_id")
            VALUES ($1, $2) RETURNING id;
        `;

        let nominationResult;
        if (nomination) {
            nominationResult = await pool.query(nominationInsertion, [
                req.user.id,
                nomination,
            ]);
        }

        // Second: insert notification into table
        const notificationInsertion = `
            INSERT INTO "notifications" ("circle_id", "recipient_id", "actor_id", "nomination_id", "type")
            VALUES ($1, $2, $3, $4, $5);
        `;

        await pool.query(notificationInsertion, [
            circle_id,
            recipient_id,
            req.user.id, // actor_id
            nominationResult?.rows[0].id || null, // null OR id
            type,
        ]);

        await connection.query("COMMIT");
        res.sendStatus(201);
    } catch (error) {
        await connection.query("ROLLBACK");
        console.log("Transaction Error - Rolling back new account", error);
        res.sendStatus(500);
    } finally {
        connection.release();
    }
});

router.put("/complete/:id", (req, res) => {
    const completionUpdate = `
        UPDATE "notifications" SET "completed" = true WHERE "id" = $1;
    `;

    pool.query(completionUpdate, [req.params.id])
        .then(() => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making query ${completionUpdate}`, error);
            res.sendStatus(500);
        });
});

module.exports = router;
