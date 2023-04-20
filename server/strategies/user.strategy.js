const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool
    .query(
      `SELECT 
      u.id,
      u.username,
      u.password,
      u.avatar_image,
      (SELECT 
        COALESCE ( JSON_AGG(JSON_BUILD_OBJECT(
          'id', c.id,
          'name', c.name,
          'description', c.description,
          'owner_id', c.owner_id
        )), '[]'::json) AS owned_circles
      FROM "user" AS u
      LEFT JOIN "circles" AS c ON c.owner_id = u.id
      WHERE u.id = $1),
      (SELECT 
        COALESCE ( JSON_AGG(JSON_BUILD_OBJECT(
          'id', c.id,
          'name', c.name,
          'description', c.description,
          'owner_id', c.owner_id
        )), '[]'::json) AS joined_circles
      FROM "user" AS u
      LEFT JOIN "circle_user" AS cu ON cu.user_id = u.id
      LEFT JOIN "circles" AS c ON c.id = cu.circle_id
      WHERE cu.user_id = $1 AND c.owner_id != $1)
      FROM "user" AS u
      WHERE id = $1;`,
      [id]
    )
    .then((result) => {
      // Handle Errors
      const user = result && result.rows && result.rows[0];

      if (user) {
        // user found
        delete user.password; // remove password so it doesn't get sent
        // done takes an error (null in this case) and a user
        done(null, user);
      } else {
        // user not found
        // done takes an error (null in this case) and a user (also null in this case)
        // this will result in the server returning a 401 status code
        done(null, null);
      }
    })
    .catch((error) => {
      console.log("Error with query during deserializing user ", error);
      // done takes an error (we have one) and a user (null in this case)
      // this will result in the server returning a 500 status code
      done(error, null);
    });
});

// Does actual work of logging in
passport.use(
  "local",
  new LocalStrategy((username, password, done) => {
    pool
      .query('SELECT * FROM "user" WHERE username = $1', [username])
      .then((result) => {
        const user = result && result.rows && result.rows[0];
        if (user && encryptLib.comparePassword(password, user.password)) {
          // All good! Passwords match!
          // done takes an error (null in this case) and a user
          done(null, user);
        } else {
          // Not good! Username and password do not match.
          // done takes an error (null in this case) and a user (also null in this case)
          // this will result in the server returning a 401 status code
          done(null, null);
        }
      })
      .catch((error) => {
        console.log("Error with query for user ", error);
        // done takes an error (we have one) and a user (null in this case)
        // this will result in the server returning a 500 status code
        done(error, null);
      });
  })
);

module.exports = passport;
