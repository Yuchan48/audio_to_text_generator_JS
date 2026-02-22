require("dotenv").config();

const express = require("express");
const path = require("path");
const multer = require("multer");
const { createClient } = require("@deepgram/sdk");
const fs = require("fs");
// Multer intercepts incoming HTTP requests from the frontend that contain files (usually from a form with enctype="multipart/form-data") before they reach the route handler, parses the file data, and saves the files according to the storage configuration.

const PORT = process.env.PORT || 8888;
const app = express();

const storage = multer.diskStorage({
  // multer.diskStorage({ ... }) tells Multer how to store uploaded files on disk. Defining destination and filename.
  destination: (req, file, cb) => {
    cb(null, "public/audio");
    //cb(error, path)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}.mp3`); // path.extname() extracts the file extension (including the dot)
  },
});

// Multer instance to handle file uploads, storing files according to the 'storage' rules defined above.
const upload = multer({
  storage,
});

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

app.use(express.static(path.join(__dirname, "public")));

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/upload", upload.single("audio"), async (req, res) => {
  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    fs.readFileSync("./public/audio/" + req.file.filename),
    { model: "nova-2" },
  );

  if (error) {
    console.error("Error transcribing audio:", error);
    return res
      .status(500)
      .send({ success: false, error: "Error transcribing audio" });
  }

  res.send({
    link: `http://localhost:${PORT}/audio/${req.file.filename}`,
    result: result.results.channels[0].alternatives[0].transcript,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
