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

module.exports = router;
