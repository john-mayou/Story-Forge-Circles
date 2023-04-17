const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
  rejectUnauthenticated,
  isCircleOwner,
} = require("../modules/authentication-middleware");

/**
 * POST - create circle manuscript
 */
router.post("/createCircleManuscript", async (req, res) => {
  const { selectedManuscriptsId, circle_id } = req.body;

  try {
    // check if circle exists
    const circle = await pool.query("SELECT * FROM circles WHERE id = $1", [
      circle_id,
    ]);
    if (circle.rows.length === 0) {
      return res.status(404).json({ message: "Circle not found" });
    }

    // check if user has permission to add manuscripts to circle
    const user_id = req.user.id;
    const isOwner = circle.rows[0].owner_id === user_id;
    if (!isOwner) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // create circle manuscripts
    for (let i = 0; i < selectedManuscriptsId.length; i++) {
      const manuscript_id = selectedManuscriptsId[i];
      await pool.query(
        "INSERT INTO circle_manuscript (manuscript_id, circle_id) VALUES ($1, $2)",
        [manuscript_id, circle_id]
      );
    }

    res.status(200).json({ message: "Manuscripts added to circle" });
  } catch (error) {
    console.error("Error adding manuscripts to circle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/details/:id", async (req, res) => {
  const { id: circle_id } = req.params;

  try {
    const circleDetailsResult = await pool.query(
      `SELECT * FROM "circles" WHERE id = $1;`,
      [circle_id]
    );

    res.send(circleDetailsResult.rows).status(200);
  } catch (error) {
    console.log(`Error making query`, error);
    res.sendStatus(500);
  }
});

/**
 * GET all joined circles
 */
router.get("/joined", async (req, res) => {
  const { id } = req.query;
  try {
    const circles = await pool.query(
      `
        SELECT circles.*
        FROM circles
        INNER JOIN circle_user
        ON circles.id = circle_user.circle_id
        WHERE circle_user.user_id = $1
      `,
      [id]
    );
    res.json(circles.rows);
  } catch (error) {
    console.error("Error fetching circles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * GET all created circles
 */
router.get("/created", async (req, res) => {
  const { id } = req.query;
  try {
    const circles = await pool.query(
      `
      SELECT *
      FROM circles
      WHERE owner_id = $1
    `,
      [id]
    );
    res.json(circles.rows);
  } catch (error) {
    console.error("Error fetching circles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * GET all public circles
 */
router.get("/public", async (req, res) => {
  try {
    const circles = await pool.query(`SELECT * FROM "circles"`);
    res.json(circles.rows);
  } catch (error) {
    console.error("Error fetching all public circles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * POST - create a new circle
 */
router.post("/", async (req, res) => {
  const { name, description, ownerId } = req.body;
  const connection = await pool.connect();

  try {
    await connection.query("BEGIN");

    // First: insert circle into circles table
    const newCircle = await pool.query(
      `INSERT INTO circles (name, description, owner_id) VALUES ($1, $2, $3) RETURNING id`,
      [name, description, ownerId]
    );

    // Second: insert user into circle_user
    await pool.query(
      `INSERT INTO "circle_user" ("user_id", "circle_id") VALUES ($1, $2)`,
      [req.user.id, newCircle.rows[0].id]
    );

    await connection.query("COMMIT");
    res.status(201).json(newCircle.rows[0]);
  } catch (error) {
    await connection.query("ROLLBACK");
    console.error("Error creating new circle:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    connection.release();
  }
});

router.get("/:id/members", (req, res) => {
  const circleMembersQuery = `
    SELECT 
      u.id,
      u.username,
      u.avatar_image
    FROM "circles" AS c
    LEFT JOIN "circle_user" AS cu ON cu.circle_id = c.id
    JOIN "user" AS u ON u.id = cu.user_id
    WHERE c.id = $1;
  `;

  pool
    .query(circleMembersQuery, [req.params.id])
    .then((result) => {
      res.send(result.rows).status(200);
    })
    .catch(() => {
      console.log(`Error making query: ${circleMembersQuery}`, error);
      res.sendStatus(500);
    });
});

router.post("/:id/members", (req, res) => {});

router.delete(
  "/:id/members",
  rejectUnauthenticated,
  isCircleOwner,
  async (req, res) => {
    const circle_id = req.params.id;
    const member_to_delete_id = req.body.user;

    try {
      const memberDeletionQuery = `
        DELETE FROM "circle_user" AS cu
        WHERE cu.circle_id = $1 AND cu.user_id = $2;
      `;

      await pool.query(memberDeletionQuery, [circle_id, member_to_delete_id]);

      res.sendStatus(204);
    } catch (error) {
      console.log(`Error deleting member from a circle`, error);
      res.sendStatus(500);
    }
  }
);
/**
 * GET circle Manuscripts list route
 */
router.get("/manuscript", async (req, res) => {
  try {
    const { id } = req.query;

    const circleManuscriptsList = await pool.query(
      `SELECT circle_manuscript.*, manuscriptTables.title, manuscriptTables.body, manuscriptTables.username AS author
      FROM circle_manuscript
      JOIN (
        SELECT manuscripts.title, manuscripts.body, manuscriptShelvesTable.* FROM manuscripts 
        INNER JOIN (
          SELECT shelvesTable.username, manuscript_shelf.manuscript_id FROM manuscript_shelf 
          INNER JOIN (
            SELECT userTables.username, shelves.id FROM shelves 
            INNER JOIN (
              SELECT * FROM "user"
            ) AS userTables 
            On shelves.user_id = userTables.id
          ) shelvesTable 
          ON manuscript_shelf.shelf_id = shelvesTable.id
        ) manuscriptShelvesTable 
        ON manuscripts.id = manuscriptShelvesTable.manuscript_id
      ) manuscriptTables 
      ON manuscriptTables.manuscript_id = circle_manuscript.manuscript_id
      WHERE circle_manuscript.circle_id = $1
      `,
      [id]
    );
    res.json(circleManuscriptsList.rows);
  } catch (error) {
    console.error("Error fetching all manuscripts in circle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * GET all user's manuscript list
 */
router.get("/userManuscriptNotInCircle", async (req, res) => {
  try {
    const { userId, circle_id } = req.query;
    const userManuscripts = await pool.query(
      `
      SELECT *
      FROM "manuscripts"
      WHERE id NOT IN (
        SELECT manuscript_id
        FROM "circle_manuscript"
        WHERE "circle_manuscript".circle_id = $2
      )
      AND id IN (
        SELECT manuscript_id
        FROM "manuscript_shelf"
        WHERE shelf_id IN (
          SELECT id
          FROM "shelves"
          WHERE user_id = $1
        )
      )
      `,
      [userId, circle_id]
    );
    res.json(userManuscripts.rows);
  } catch (error) {
    console.error("Error fetching user manuscripts not in circle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/manuscript/:id
router.delete('/manuscript/:id', async (req, res) => {
  const manuscriptId = req.params.id;
  const circleId = req.body.circle_id;
  try {
    // Delete the manuscript from the circle_manuscript table
    await pool.query('DELETE FROM circle_manuscript WHERE manuscript_id = $1 AND circle_id = $2', [manuscriptId, circleId]);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting shared circle manuscript', error);
    res.sendStatus(500);
  }
});

module.exports = router;
