require("dotenv").config();

const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8888;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
