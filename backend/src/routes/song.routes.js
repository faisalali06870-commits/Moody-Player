const express = require("express");
const multer = require("multer");
const uploadFile = require("../service/storage.service");
const router = express.Router();
const songModel = require('../models/song.model');

const upload = multer({ storage: multer.memoryStorage() });

// Upload single song
router.post("/songs", upload.single("audio"), async (req, res) => {
  try {
    let audioUrl = req.body.audio;

    if (req.file) {
      const fileData = await uploadFile(req.file);
      audioUrl = fileData.url;
    }

    if (!audioUrl) {
      return res.status(400).json({ message: "Audio file or URL is required" });
    }

    const song = await songModel.create({
      title: req.body.title || "Untitled Track",
      artist: req.body.artist || "Unknown Artist",
      audio: audioUrl,
      mood: (req.body.mood || "neutral").toLowerCase().trim(),
      cover: req.body.cover || "",
    });

    res.status(201).json({
      message: "Song created successfully",
      song: song,
    });
  } catch (err) {
    console.error("Error creating song:", err);
    res.status(500).json({ message: "Error creating song", error: err.message });
  }
});

// Fetch songs by mood (or all songs if mood is omitted)
router.get("/songs", async (req, res) => {
  try {
    const { mood } = req.query;
    let query = {};

    if (mood && mood.trim()) {
      const cleanMood = mood.trim().toLowerCase();
      query.mood = { $regex: new RegExp(`^${cleanMood}$`, "i") };
    }

    const songs = await songModel.find(query);

    res.status(200).json({
      message: "Songs fetched successfully",
      count: songs.length,
      songs: songs,
    });
  } catch (err) {
    console.error("Error fetching songs:", err);
    res.status(500).json({ message: "Error fetching songs", error: err.message });
  }
});

module.exports = router;
