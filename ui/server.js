const express = require("express");
const path = require("path");

const app = express();

//In this handler any path will go back to the root and send back the home_page.html

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("frontend", "/html/home_page.html"));
});

app.listen(process.env.PORT || 5060, () => console.log("Server running..."));