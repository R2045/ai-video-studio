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

// Simple trim API
app.post("/trim", upload.single("video"), (req, res) => {
  const inputPath = req.file.path;
  const outputPath = path.join("uploads", "trimmed.mp4");

  ffmpeg(inputPath)
    .setStartTime(0)      // start at 0 seconds
    .setDuration(5)       // trim to 5 seconds
    .output(outputPath)
    .on("end", () => {
      res.download(outputPath, "trimmed.mp4", (err) => {
        // Cleanup files
        fs.unlinkSync(inputPath);
        fs.unlinkSync(outputPath);
      });
    })
    .on("error", (err) => {
      console.error(err);
      res.status(500).send("Error processing video");
    })
    .run();
});

app.listen(5000, () => {
  console.log("Backend server running on port 5000");
});
