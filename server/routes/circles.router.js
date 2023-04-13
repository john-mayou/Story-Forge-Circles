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

router.delete("/:id/members", (req, res) => {});

module.exports = router;
