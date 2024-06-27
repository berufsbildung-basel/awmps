const express = require("express");
const { dirname } = require("path");
const path = require("path");

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "spa", "static")))

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "spa", "global.html"));
})

app.listen(process.env.PORT || 5500, () => console.log("Server running..."))