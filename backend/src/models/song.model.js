const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, default: "Unknown Artist" },
    audio: { type: String, required: true },
    mood: { type: String, required: true },
    cover: { type: String, default: "" },
});

const song = mongoose.model('song', songSchema);

module.exports = song;
