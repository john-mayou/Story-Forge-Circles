const express = require("express");
const pool = require("../modules/pool");
const { restart } = require("nodemon");
const router = express.Router();

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
    const circles = await pool.query(
      `SELECT * FROM "circles"`
    );
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
      `SELECT manuscripts.*
       FROM manuscripts
       JOIN circle_manuscript
         ON manuscripts.id = circle_manuscript.manuscript_id
       WHERE circle_manuscript.circle_id = $1`,
      [id]
    );
    res.json(circleManuscriptsList.rows);
  } catch (error) {
    console.error("Error fetching all public circles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * GET all user's manuscript list 
 */
router.get("/userManuscriptNotInCircle", async (req, res) => {
  try {
    const { id } = req.query;
    const userManuscripts = await pool.query(`
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
    `, [id]);
    res.json(userManuscripts.rows)
  } catch (error) {
    console.error("Error fetching all public circles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
