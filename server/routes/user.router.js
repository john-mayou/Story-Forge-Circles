const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", async (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  // Generating random avatar
  const avatarPaths = [
    "/avatars/cat.svg",
    "/avatars/kitty.svg",
    "/avatars/raven.svg",
    "/avatars/narwhal.svg",
    "/avatars/panda.svg",
    "/avatars/sloth.svg",
  ];
  const randomIntFromInterval = (
    min,
    max // min and max included
  ) => Math.floor(Math.random() * (max - min + 1) + min);
  const avatar = avatarPaths[randomIntFromInterval(0, 2)];

  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");

    // First Query Creates the user in the database
    const userQueryText = `INSERT INTO "user" (username, password, avatar_image)
    VALUES ($1, $2, $3) RETURNING id`;

    //Returns UserId to create shelf tied to user.
    const userResult = await connection.query(userQueryText, [
      username,
      password,
      avatar,
    ]);
    const userID = userResult.rows[0].id;

    //creates shelf name by concatinating username with shelf
    const shelfName = username + "_shelf";

    //Second query creates a shelf with a shelf name and a foreign key pointing to previously created user ID
    const newShelfQueryText = `
      INSERT INTO "shelves" ("user_id", "name")
      VALUES ($1, $2);
      `;

    //Database call to create shelf
    await connection.query(newShelfQueryText, [userID, shelfName]);

    await connection.query("COMMIT");
    res.sendStatus(201);
  } catch (error) {
    await connection.query("ROLLBACK");
    console.log(`Transaction Error - Rolling back transfer`, error);
    res.sendStatus(500);
  } finally {
    // Always runs - both after successful try & after catch
    // Put the client connection back in the pool
    // This is super important!
    connection.release();
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
