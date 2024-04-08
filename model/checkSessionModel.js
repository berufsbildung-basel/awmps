const db = require("./db");

async function checkSessionInDatabase(sessionId) {
  try {
    const queryText = "SELECT sessionid FROM cookie WHERE sessionid = $1";
    const { rows } = await db.query(queryText, [sessionId]);
    return rows.length > 0;
  } catch (error) {
    return false;
  }
}

module.exports = { checkSessionInDatabase };
