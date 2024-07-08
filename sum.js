const bcrypt = require ("bcrypt");
const pool = require("./model/db");
const express = require("express")
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.post("/users/do", async (req, res) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const query = {
      text: "INSERT INTO users(username, password) VALUES ($1, $2)",
      values: [req.body.name, hashedPassword]
    };

    await pool.query(query);
    res.status(201).send("Users created");
  } catch {
    res.status(500).send()
  }
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});