const db = require("./db");

async function sessionMiddleware(req, res, next) {
  const sessionId = req.cookies.sessionId;

  try {
    const queryText = "SELECT sessionid, expiredate FROM cookie WHERE sessionid = $1";
    const { rows } = await db.query(queryText, [sessionId]);

    if (rows.length > 0) {
      const session = rows[0];
      const currentTime = new Date().getTime();
      const expireDate = new Date(session.expiredate).getTime();

      if (session.sessionid === sessionId && currentTime < expireDate) {
        next();
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.error("Error checking session:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = sessionMiddleware;