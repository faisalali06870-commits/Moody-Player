import { useState, useEffect } from "react";
import axios from "axios";
import FaceDetection from "./components/FaceDetection";
import MusicPlayer from "./components/MusicPlayer";
import SpotifyPlayer from "./components/SpotifyPlayer";
import { DEFAULT_SONGS } from "./data/songsData";
import "./App.css";

function App() {
  const [currentMood, setCurrentMood] = useState("neutral");
  // Default to 15 neutral Bollywood hits
  const [songs, setSongs] = useState(() =>
    DEFAULT_SONGS.filter((s) => s.mood === "neutral")
  );
  const [activePlayer, setActivePlayer] = useState("master"); // 'master' or 'spotify'

  const handleMoodDetected = (detectedMood) => {
    const cleanMood = (detectedMood || "neutral").toLowerCase();
    setCurrentMood(cleanMood);

    // 1. Immediate local match so UI never hangs
    const localMatch = DEFAULT_SONGS.filter((s) => s.mood === cleanMood);
    setSongs(localMatch.length > 0 ? localMatch : DEFAULT_SONGS.slice(0, 15));

    // 2. Fetch fresh from backend MongoDB
    axios
      .get(`http://localhost:3000/songs?mood=${cleanMood}`)
      .then((response) => {
        if (response.data && response.data.songs && response.data.songs.length > 0) {
          setSongs(response.data.songs);
        }
      })
      .catch(() => {
        // Fallback already active
      });
  };

  useEffect(() => {
    handleMoodDetected("neutral");
  }, []);

  return (
    <div className="app-root">
      {/* Luxury Dark Glass Header */}
      <header className="app-header">
        <div className="brand-badge">
          <i className="ri-sparkling-fill"></i> AI Powered Emotion Audio
        </div>
        <h1 className="app-title">Moody Player</h1>
        <p className="app-subtitle">
          Camera scans your mood and automatically curates 15 authentic Bollywood hit songs.
        </p>
      </header>

      {/* Responsive Studio Workspace */}
      <main className="studio-container">
        {/* Left Column: AI Camera Scanner + Compact Mood Selector Underneath */}
        <section className="studio-left-panel">
          <FaceDetection
            setSongs={setSongs}
            setCurrentMood={handleMoodDetected}
            currentMood={currentMood}
            onSelectMood={handleMoodDetected}
          />
        </section>

        {/* Right Column: Player Deck & Playlist Queue */}
        <section className="studio-right-panel">
          {/* Player Switcher: Master Bollywood Player vs Spotify */}
          <div className="studio-switcher">
            <button
              className={`switch-btn master ${activePlayer === "master" ? "active" : ""}`}
              onClick={() => setActivePlayer("master")}
            >
              <i className="ri-disc-fill"></i> Master Player (15 Songs)
            </button>
            <button
              className={`switch-btn spotify ${activePlayer === "spotify" ? "active" : ""}`}
              onClick={() => setActivePlayer("spotify")}
            >
              <i className="ri-spotify-fill"></i> Spotify Playlists
            </button>
          </div>

          {/* Active Player Deck */}
          {activePlayer === "master" ? (
            <MusicPlayer songs={songs} currentMood={currentMood} />
          ) : (
            <SpotifyPlayer mood={currentMood} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
