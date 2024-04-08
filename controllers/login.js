const pool = require("../model/db");
const bcrypt = require("bcrypt");
const session = require("../middlewares/session");
const uuid = require("uuid");
const cookieParser = require('cookie-parser');

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const query = "SELECT * FROM Users WHERE username = $1";
    const { rows } = await pool.query(query, [username]);

    if (rows.length === 0) {
      return res.redirect("/login");
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.redirect("/login");
    }

    // generates session ID
    const sessionId = uuid.v4();

    // sets expiration date
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);
    const Admin = user.role === "admin";

    const saveSessionQuery = `
      INSERT INTO Cookie (sessionid, expiredate, admin)
      VALUES ($1, $2, $3)
    `; // change the header to session
    await pool.query(saveSessionQuery, [sessionId, expirationDate, Admin]);

    // respond a cookie
    res.cookie("sessionID", sessionId, { expires: expirationDate, httpOnly: true });

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

module.exports = { login, session };

//TODO: the middleware has to check if the session is valid, there shouldn't be two usernames in login row