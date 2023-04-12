const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
    // get all notifications
    // WHERE recipient_id = req.user.id

    // FROM DATABASE
    // circle_id
    // circle_name
    // type
    // actor_id
    // actor_name
    // nomination_id
    // nominated_by_id
    // nominated_by_name
    // nominated_id
    // nominated_name

    // THINGS TO SEND BACK
    // message:string
    // action_required:boolean
    // action_button_names:JSON
    // type
    //

    // need recipient id
    // need notification id
    const notificationsQuery = `
    SELECT 
        n.id AS "notification_id",
        c.id AS "circle_id",
        c.name AS "circle_name",
        n.type,
        n.actor_id,
        u.username AS "actor_name",
        n.recipient_id,
        u4.username,
        n.nomination_id,
        nom.nominated_by_id,
        u2.username AS "nominated_by_name",
        nom.nominated_id,
        u3.username AS "nominated_name"
    FROM "notifications" AS n
        LEFT JOIN "nominations" AS nom ON nom.id = n.nomination_id
        JOIN "circles" AS c ON c.id = n.circle_id
        JOIN "user" AS u ON u.id = n.actor_id
        LEFT JOIN "user" AS u2 ON u2.id = nom.nominated_by_id
        LEFT JOIN "user" AS u3 ON u3.id = nom.nominated_id
        JOIN "user" AS u4 ON u4.id = n.recipient_id
    WHERE n.recipient_id = $1 AND n.completed = false;
    `;

    pool.query(notificationsQuery, [req.user.id])
        .then((result) => {
            res.send(result.rows).status(200);
        })
        .catch((error) => {
            console.log(`Error making query ${notificationsQuery}`, error);
        });
});

router.post("/new", async (req, res) => {
    const connection = await pool.connect();
    const { circle_id, recipient_id, type } = req.body;
    // req.body = {
    //    circle: (circle object),
    //    recipient_id: 2,
    //    type: "request to join.....",
    //    new_nomination: null | id,
    //    existing_nomination: null | id
    // }

    try {
        await connection.query("BEGIN");
        // First: if nomination ? insert into nominations table returning id
        const nominationInsertion = `
            INSERT INTO "nominations" ("nominated_by_id", "nominated_id")
            VALUES ($1, $2) RETURNING id;
        `;

        let nomination_id;
        if (req.body.new_nomination) {
            nominationResult = await pool.query(nominationInsertion, [
                req.user.id,
                req.body.nomination,
            ]);
            nomination_id = nominationResult?.rows[0].id;
        } else if (req.body.existing_nomination) {
            nomination_id = req.body.existing_nomination;
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
            nomination_id || null, // null OR id
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

router.post("/add-member", (req, res) => {
    const { user_id, circle_id } = req.body;

    const newMemberInsertion = `
        INSERT INTO "circle_user" ("user_id", "circle_id")
        VALUES ($1, $2);
    `;

    pool.query(newMemberInsertion, [user_id, circle_id])
        .then(() => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making query ${newMemberInsertion}`, error);
            res.sendStatus(500);
        });
});

router.put("/new-leader", (req, res) => {
    const { new_leader, circle_id } = req.body;

    const newLeaderUpdateQuery = `
        UPDATE "circles" SET "owner_id" = $1 WHERE "id" = $2;
    `;

    pool.query(newLeaderUpdateQuery, [new_leader, circle_id])
        .then(() => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error making query ${newMemberInsertion}`, error);
            res.sendStatus(500);
        });
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
