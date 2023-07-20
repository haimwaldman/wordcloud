const express = require("express");
const path = require("path");

app = express();

app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.get("/articlesCloud", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "articlesCloud.json"));
});

module.exports = app;
