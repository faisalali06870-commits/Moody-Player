const express = require("express");
const multer = require("multer");
const uploadFile = require("../service/storage.service");
const router = express.Router();
const songModel = require("../models/song.model");
const { getCuratedYouTubeSongs } = require("../data/youtubeCurated");

const upload = multer({ storage: multer.memoryStorage() });

// Helper to extract YouTube video ID from any YouTube URL or string
function extractYouTubeId(urlOrId) {
  if (!urlOrId) return null;
  const str = String(urlOrId).trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return str;
  }
  const match = str.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  return match ? match[1] : null;
}

// 1. Create / Add New Song (File, Audio Link, or YouTube)
router.post("/songs", upload.single("audio"), async (req, res) => {
  try {
    let audioUrl = req.body.audio || "";
    let source = req.body.source || "audio";
    let youtubeId = req.body.youtubeId || "";
    let coverUrl = req.body.cover || "";

    // If an MP3 file was uploaded
    if (req.file) {
      const fileData = await uploadFile(req.file);
      audioUrl = fileData.url;
      source = "audio";
    }

    // Check if input audio URL is a YouTube link
    const ytIdFromUrl = extractYouTubeId(audioUrl);
    if (ytIdFromUrl) {
      youtubeId = ytIdFromUrl;
      source = "youtube";
      if (!coverUrl) {
        coverUrl = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
      }
    } else if (youtubeId) {
      source = "youtube";
      if (!coverUrl) {
        coverUrl = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
      }
    }

    // Validation: must have either audio file/URL OR YouTube ID
    if (!audioUrl && !youtubeId) {
      return res.status(400).json({
        message: "Please provide an MP3 file, audio URL, or YouTube video link.",
      });
    }

    const song = await songModel.create({
      title: req.body.title || "Untitled Track",
      artist: req.body.artist || "Unknown Artist",
      audio: audioUrl,
      mood: (req.body.mood || "neutral").toLowerCase().trim(),
      cover: coverUrl,
      source: source,
      youtubeId: youtubeId,
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

// 2. Fetch songs by mood (or all songs)
router.get("/songs", async (req, res) => {
  try {
    const { mood } = req.query;
    let query = {};

    if (mood && mood.trim()) {
      const cleanMood = mood.trim().toLowerCase();
      query.mood = { $regex: new RegExp(`^${cleanMood}$`, "i") };
    }

    const songs = await songModel.find(query).sort({ createdAt: -1 });

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

// 3. Delete song by ID
router.delete("/songs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await songModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting song", error: err.message });
  }
});

// 4. YouTube API Search / Curated Mood Search
router.get("/api/youtube/search", async (req, res) => {
  try {
    const { q, mood } = req.query;
    const cleanMood = (mood || "neutral").toLowerCase().trim();
    const query = q && q.trim() ? q.trim() : `${cleanMood} bollywood songs`;
    const apiKey = process.env.YOUTUBE_API_KEY;

    // If API key is present, attempt live YouTube Data API v3 search
    if (apiKey && apiKey.trim() && !apiKey.startsWith("your_")) {
      try {
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${encodeURIComponent(
          query
        )}&type=video&videoCategoryId=10&key=${apiKey.trim()}`;
        
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          const items = (data.items || []).map((item) => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            artist: item.snippet.channelTitle,
            thumbnail:
              item.snippet.thumbnails?.high?.url ||
              item.snippet.thumbnails?.medium?.url ||
              item.snippet.thumbnails?.default?.url,
            mood: cleanMood,
            source: "youtube",
          }));

          return res.json({
            success: true,
            source: "youtube_api",
            count: items.length,
            songs: items,
          });
        }
      } catch (ytErr) {
        console.warn("YouTube API search failed, falling back to curated:", ytErr.message);
      }
    }

    // Graceful fallback: Curated Bollywood YouTube Tracks for that mood
    const curated = getCuratedYouTubeSongs(cleanMood);
    return res.json({
      success: true,
      source: "curated",
      message: apiKey
        ? "YouTube API call was unavailable, showing curated tracks"
        : "YOUTUBE_API_KEY not configured, showing top curated YouTube tracks",
      count: curated.length,
      songs: curated,
    });
  } catch (err) {
    console.error("YouTube route error:", err);
    res.status(500).json({ message: "Error searching YouTube", error: err.message });
  }
});

module.exports = router;
