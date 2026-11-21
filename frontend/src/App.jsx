import { useState, useEffect } from "react";
import axios from "axios";
import FaceDetection from "./components/FaceDetection";
import MusicPlayer from "./components/MusicPlayer";
import SpotifyPlayer from "./components/SpotifyPlayer";
import YouTubePlayer from "./components/YouTubePlayer";
import PlaylistView from "./components/PlaylistView";
import PlaylistModal from "./components/PlaylistModal";
import AddSongModal from "./components/AddSongModal";
import { DEFAULT_SONGS } from "./data/songsData";
import { getAllLibrarySongs } from "./utils/libraryUtils";
import "./App.css";

function App() {
  const [currentMood, setCurrentMood] = useState("neutral");
  // Default to 15 neutral Bollywood hits + any user added custom songs
  const [songs, setSongs] = useState(() => {
    try {
      const custom = JSON.parse(localStorage.getItem("moody_custom_songs") || "[]").filter(
        (s) => s.mood === "neutral"
      );
      const defaults = DEFAULT_SONGS.filter((s) => s.mood === "neutral");
      return [...custom, ...defaults];
    } catch {
      return DEFAULT_SONGS.filter((s) => s.mood === "neutral");
    }
  });

  const [activePlayer, setActivePlayer] = useState("master"); // 'master', 'playlists', 'youtube', 'spotify'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addSongInitialData, setAddSongInitialData] = useState(null);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [songForPlaylist, setSongForPlaylist] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4500);
  };

  const handleOpenAddSong = (initialData = null) => {
    setAddSongInitialData(initialData);
    setIsAddModalOpen(true);
  };

  const handleOpenPlaylistModal = (song) => {
    setSongForPlaylist(song);
    setIsPlaylistModalOpen(true);
  };

  const handleSongAdded = (newSong) => {
    // If song added belongs to active mood, add to playlist immediately
    if (newSong.mood === currentMood) {
      setSongs((prev) => [newSong, ...prev.filter((s) => s._id !== newSong._id)]);
    } else {
      // If added to different mood, switch to that mood
      handleMoodDetected(newSong.mood);
    }
    showToast(`✨ "${newSong.title}" added to ${newSong.mood.toUpperCase()} playlist!`);
  };

  const handlePlayCustomSongList = (songList) => {
    if (!songList || songList.length === 0) return;
    setSongs(songList);
    setActivePlayer("master");
    showToast(`▶ Playing playlist (${songList.length} tracks)!`);
  };

  const handlePlaySingleSong = (song) => {
    if (!song) return;
    setSongs((prev) => [song, ...prev.filter((s) => s._id !== song._id && s.title !== song.title)]);
    showToast(`▶ Now Playing: ${song.title}`);
  };

  const handleMoodDetected = (detectedMood) => {
    const cleanMood = (detectedMood || "neutral").toLowerCase();
    setCurrentMood(cleanMood);

    // 1. Immediate local match with custom added songs so UI never hangs
    let customSongs = [];
    try {
      customSongs = JSON.parse(localStorage.getItem("moody_custom_songs") || "[]").filter(
        (s) => s.mood === cleanMood
      );
    } catch (e) {
      console.warn("Storage read error:", e);
    }

    const localMatch = DEFAULT_SONGS.filter((s) => s.mood === cleanMood);
    const combined = [...customSongs, ...(localMatch.length > 0 ? localMatch : DEFAULT_SONGS.slice(0, 15))];
    setSongs(combined);

    // 2. Fetch fresh from backend MongoDB only when running locally on localhost
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      axios
        .get(`http://localhost:3000/songs?mood=${cleanMood}`)
        .then((response) => {
          if (response.data && response.data.songs && response.data.songs.length > 0) {
            const dbSongs = response.data.songs;
            const dbTitles = new Set(dbSongs.map((s) => (s.title || "").toLowerCase()));
            const extraDefaults = combined.filter(
              (s) => !dbTitles.has((s.title || "").toLowerCase())
            );
            setSongs([...dbSongs, ...extraDefaults]);
          }
        })
        .catch(() => {
          // Fallback already active
        });
    }
  };

  useEffect(() => {
    handleMoodDetected("neutral");
  }, []);

  return (
    <div className="app-root">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <i className="ri-checkbox-circle-fill"></i> {toastMessage}
        </div>
      )}

      {/* Luxury Dark Glass Header */}
      <header className="app-header">
        <div className="header-top-row">
          <div className="brand-badge">
            <i className="ri-sparkling-fill"></i> AI Powered Emotion Audio
          </div>

          {/* Quick Add Song Button in Header */}
          <button
            className="header-add-btn"
            onClick={() => handleOpenAddSong({ mood: currentMood })}
            title="Add your favorite song to Moody Player"
          >
            <i className="ri-add-circle-fill"></i> Add Song
          </button>
        </div>

        <h1 className="app-title">Moody Player</h1>
        <p className="app-subtitle">
          Audio music player with AI mood detection, custom playlists & 150+ Pakistani & Hindustani classic hits.
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
          {/* Player Switcher: Master Player vs Playlists vs YouTube vs Spotify */}
          <div className="studio-switcher">
            <button
              className={`switch-btn master ${activePlayer === "master" ? "active" : ""}`}
              onClick={() => setActivePlayer("master")}
            >
              <i className="ri-disc-fill"></i> Music Player
            </button>
            <button
              className={`switch-btn playlists ${activePlayer === "playlists" ? "active" : ""}`}
              onClick={() => setActivePlayer("playlists")}
            >
              <i className="ri-heart-fill" style={{ color: "#ef4444" }}></i> Playlists & Liked
            </button>
            <button
              className={`switch-btn youtube ${activePlayer === "youtube" ? "active" : ""}`}
              onClick={() => setActivePlayer("youtube")}
            >
              <i className="ri-youtube-fill" style={{ color: "#ef4444" }}></i> Classics
            </button>
            <button
              className={`switch-btn spotify ${activePlayer === "spotify" ? "active" : ""}`}
              onClick={() => setActivePlayer("spotify")}
            >
              <i className="ri-spotify-fill" style={{ color: "#22c55e" }}></i> Spotify
            </button>
          </div>

          {/* Active Player Deck */}
          {activePlayer === "master" && (
            <MusicPlayer
              songs={songs}
              currentMood={currentMood}
              onOpenAddSong={handleOpenAddSong}
              onOpenPlaylistModal={handleOpenPlaylistModal}
              onToast={showToast}
              onPlaySong={handlePlaySingleSong}
            />
          )}

          {activePlayer === "playlists" && (
            <PlaylistView
              onPlaySongList={handlePlayCustomSongList}
              onOpenAddSong={handleOpenAddSong}
              onToast={showToast}
            />
          )}

          {activePlayer === "youtube" && (
            <YouTubePlayer
              mood={currentMood}
              onOpenAddSong={handleOpenAddSong}
              onOpenPlaylistModal={handleOpenPlaylistModal}
              onToast={showToast}
            />
          )}

          {activePlayer === "spotify" && (
            <SpotifyPlayer mood={currentMood} />
          )}
        </section>
      </main>

      {/* Add Favorite Song Modal Dialog */}
      <AddSongModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSongAdded={handleSongAdded}
        initialData={addSongInitialData}
        defaultMood={currentMood}
      />

      {/* Add to Playlist Modal Dialog */}
      <PlaylistModal
        isOpen={isPlaylistModalOpen}
        onClose={() => setIsPlaylistModalOpen(false)}
        song={songForPlaylist}
        onToast={showToast}
      />
    </div>
  );
}

export default App;
