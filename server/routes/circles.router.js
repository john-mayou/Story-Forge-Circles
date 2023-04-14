const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

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

  try {
    const newCircle = await pool.query(
      `
      INSERT INTO circles (name, description, owner_id)
      VALUES ($1, $2, $3)
      RETURNING *
`,
      [name, description, ownerId]
    );

    res.status(201).json(newCircle.rows[0]);
  } catch (error) {
    console.error("Error creating new circle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

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
    const { id } = req.query;
    const userManuscripts = await pool.query(
      `
      SELECT *
      FROM "manuscripts"
      WHERE id NOT IN (
        SELECT manuscript_id
        FROM "circle_manuscript"
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
      [id]
    );
    res.json(userManuscripts.rows);
  } catch (error) {
    console.error("Error fetching all public circles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
