const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, default: "Unknown Artist" },
    audio: { type: String, default: "" },
    mood: { type: String, required: true },
    cover: { type: String, default: "" },
    source: { type: String, default: "audio" }, // 'audio' or 'youtube'
    youtubeId: { type: String, default: "" },
}, { timestamps: true });

const song = mongoose.model('song', songSchema);

module.exports = song;
