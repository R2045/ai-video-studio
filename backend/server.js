const express = require("express");
const multer = require("multer");
const cors = require("cors");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

// Folder to store uploaded videos temporarily
const upload = multer({ dest: "uploads/" });


app.post("/trim", upload.single("video"), (req, res) => {
  try {
    const inputPath = path.resolve(req.file.path);           // absolute path
    const outputPath = path.resolve("uploads/trimmed.mp4");  // absolute path

    ffmpeg(inputPath)
      .videoCodec("libx264")   // explicitly set video codec
      .audioCodec("aac")       // explicitly set audio codec
      .format("mp4")           // ensure proper MP4 format
      .setStartTime(0)
      .setDuration(5)
      .output(outputPath)
      .on("end", () => {
        console.log("Trim done!");
        res.download(outputPath, "trimmed.mp4", (err) => {
          fs.unlinkSync(inputPath);
          fs.unlinkSync(outputPath);
        });
      })
      .on("error", (err) => {
        console.error("FFmpeg Error:", err);
        res.status(500).send("Error processing video");
      })
      .run();
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).send("Server error");
  }
});

app.listen(5000, () => {
  console.log("Backend server running on port 5000");
});
