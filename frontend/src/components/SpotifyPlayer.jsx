import React from "react";
import "./SpotifyPlayer.css";
import { MOOD_DETAILS } from "../data/songsData";

const SPOTIFY_BOLLYWOOD_PLAYLISTS = {
  happy: {
    name: "Bollywood Butter (Feel-Good Hits)",
    playlistId: "37i9dQZF1DX0XUfTFmNBRM",
  },
  sad: {
    name: "Bollywood Sad & Heartbreak Hits",
    playlistId: "37i9dQZF1DX6xZZEgC9Ubl",
  },
  neutral: {
    name: "Bollywood Acoustic & Chill Melodies",
    playlistId: "37i9dQZF1DX2vY38DhL29k",
  },
  surprised: {
    name: "Punjabi & Bollywood Party Hits",
    playlistId: "37i9dQZF1DX843Qf4lrFtZ",
  },
  angry: {
    name: "Bollywood Power & Workout Anthems",
    playlistId: "37i9dQZF1DX843Qf4lrFtZ",
  },
  fearful: {
    name: "Cinematic & Tension Atmosphere",
    playlistId: "37i9dQZF1DX56b2WjR2x1p",
  },
  disgusted: {
    name: "Rebellious Bollywood Rock Hits",
    playlistId: "37i9dQZF1DX3LD579OGFFJ",
  },
};

const SpotifyPlayer = ({ mood }) => {
  const cleanMood = (mood || "neutral").toLowerCase();
  const moodInfo = MOOD_DETAILS[cleanMood] || MOOD_DETAILS.neutral;
  const config = SPOTIFY_BOLLYWOOD_PLAYLISTS[cleanMood] || SPOTIFY_BOLLYWOOD_PLAYLISTS.neutral;

  return (
    <div className="spotify-classic-card">
      <div className="spotify-classic-header">
        <div className="spotify-brand">
          <i className="ri-spotify-fill"></i>
          <div>
            <h3>Spotify Bollywood</h3>
            <p>{config.name}</p>
          </div>
        </div>

        <div className="spotify-mood-badge" style={{ borderColor: `${moodInfo.color}50` }}>
          <span>{moodInfo.emoji}</span>
          <span style={{ color: moodInfo.color }}>{moodInfo.label}</span>
        </div>
      </div>

      <div className="spotify-embed-wrapper">
        <iframe
          key={`${config.playlistId}-${cleanMood}`}
          src={`https://open.spotify.com/embed/playlist/${config.playlistId}?utm_source=generator&theme=0`}
          width="100%"
          height="380"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={`Spotify Playlist - ${config.name}`}
        ></iframe>
      </div>
    </div>
  );
};

export default SpotifyPlayer;
