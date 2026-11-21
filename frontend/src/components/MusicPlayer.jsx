import { useState, useRef, useEffect } from "react";
import "./MusicPlayer.css";
import { MOOD_DETAILS } from "../data/songsData";
import { extractYouTubeId } from "../utils/youtubeUtils";
import { toggleLikeSong, isSongLiked } from "../utils/playlistUtils";
import { searchLibrarySongs } from "../utils/libraryUtils";

const MusicPlayer = ({
  songs,
  currentMood,
  onOpenAddSong,
  onOpenPlaylistModal,
  onToast,
  onPlaySong,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [likedMap, setLikedMap] = useState({});

  const audioRef = useRef(null);

  // Safe index bounds
  const safeIndex = songs && songs.length > 0 ? Math.min(currentIndex, songs.length - 1) : 0;
  const currentSong = songs && songs.length > 0 ? songs[safeIndex] : null;

  // Mood details
  const moodKey = (currentMood || "neutral").toLowerCase();
  const moodInfo = MOOD_DETAILS[moodKey] || MOOD_DETAILS.neutral;

  // Check if current track is a YouTube audio stream
  const isYouTube =
    currentSong?.source === "youtube" ||
    Boolean(currentSong?.youtubeId) ||
    Boolean(extractYouTubeId(currentSong?.audio));

  const ytVideoId =
    currentSong?.youtubeId || (isYouTube ? extractYouTubeId(currentSong?.audio) : null);

  // Check liked status
  const checkIsLiked = (song) => {
    if (!song) return false;
    const sId = song._id || song.videoId;
    if (likedMap[sId] !== undefined) return likedMap[sId];
    return isSongLiked(sId, song.title);
  };

  const handleToggleLike = (song, e) => {
    if (e) e.stopPropagation();
    if (!song) return;
    const isNowLiked = toggleLikeSong(song);
    const sId = song._id || song.videoId || song.title;
    setLikedMap((prev) => ({ ...prev, [sId]: isNowLiked }));

    if (onToast) {
      onToast(
        isNowLiked
          ? `❤️ Added "${song.title}" to Liked Songs!`
          : `Removed "${song.title}" from Liked Songs`
      );
    }
  };

  // Reset index when songs array changes
  useEffect(() => {
    setCurrentIndex(0);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, [songs]);

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Autoplay when song index changes if isPlaying is true
  useEffect(() => {
    if (isPlaying && audioRef.current && !isYouTube) {
      audioRef.current
        .play()
        .catch((err) => console.log("Audio play error:", err));
    }
  }, [currentIndex, currentSong, isYouTube]);

  const togglePlayPause = () => {
    if (!currentSong) return;

    if (isYouTube) {
      setIsPlaying((prev) => !prev);
      return;
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Playback error:", err));
    }
  };

  // NEXT SONG (Aage Karein)
  const handleNext = () => {
    if (!songs || songs.length <= 1) return;

    if (isShuffle) {
      let nextIdx;
      do {
        nextIdx = Math.floor(Math.random() * songs.length);
      } while (nextIdx === safeIndex && songs.length > 1);
      setCurrentIndex(nextIdx);
    } else {
      setCurrentIndex((prev) => (prev + 1) % songs.length);
    }
    setIsPlaying(true);
  };

  // PREVIOUS SONG (Peeche Karein)
  const handlePrev = () => {
    if (!songs || songs.length <= 1) return;

    if (audioRef.current && audioRef.current.currentTime > 3 && !isYouTube) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      return;
    }

    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = Number(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current && !isYouTube) {
      audioRef.current.currentTime = seekTime;
    }
  };

  const handleEnded = () => {
    if (isLoop) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      handleNext();
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Filter queue songs by search query if user typed something
  const displayedSongs = searchQuery.trim()
    ? searchLibrarySongs(searchQuery)
    : songs;

  if (!songs || songs.length === 0) {
    return (
      <div className="player-wrapper">
        <div className="mood-banner">
          <div className="mood-info">
            <span className="mood-emoji">{moodInfo.emoji}</span>
            <div className="mood-text">
              <h3>{moodInfo.label}</h3>
              <p>Gaane load ho rahe hain...</p>
            </div>
          </div>
          {onOpenAddSong && (
            <button
              className="banner-add-btn"
              onClick={() => onOpenAddSong({ mood: currentMood })}
            >
              + Add Song
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="player-wrapper">
      {/* Mood Header Banner */}
      <div className="mood-banner" style={{ borderColor: `${moodInfo.color}45` }}>
        <div className="mood-info">
          <span className="mood-emoji">{moodInfo.emoji}</span>
          <div className="mood-text">
            <h3 style={{ color: moodInfo.color }}>{moodInfo.label} Mood Audio</h3>
            <p>{moodInfo.quote}</p>
          </div>
        </div>
        <div className="mood-banner-actions">
          <div className="mood-count-badge">
            {safeIndex + 1} / {songs.length} Tracks
          </div>
          {onOpenAddSong && (
            <button
              className="banner-add-btn"
              onClick={() => onOpenAddSong({ mood: currentMood })}
              title="Add your favorite song"
            >
              <i className="ri-add-line"></i> Add
            </button>
          )}
        </div>
      </div>

      {/* Hidden Native Audio Element (For direct MP3s) */}
      {!isYouTube && (
        <audio
          ref={audioRef}
          src={currentSong?.audio}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}

      {/* Hidden YouTube Audio Bridge (Streams audio with ZERO video UI) */}
      {isYouTube && isPlaying && ytVideoId && (
        <iframe
          src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=1&enablejsapi=1`}
          title="YouTube Audio Stream"
          allow="autoplay"
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            opacity: 0,
            pointerEvents: "none",
            border: "none",
          }}
        />
      )}

      {/* Glassmorphic Classic Music Player Deck */}
      <div className="master-glass-card" style={{ borderColor: `${moodInfo.color}35` }}>
        {/* Dynamic Glow */}
        <div
          className="card-ambient-glow"
          style={{ backgroundColor: moodInfo.color }}
        ></div>

        {/* Visual Stage: Classic Album Cover & Rotating Vinyl Disc */}
        <div className="track-showcase">
          <div className={`album-art-stage ${isPlaying ? "playing" : ""}`}>
            {/* Spinning Vinyl Disc */}
            <div className={`vinyl-disc ${isPlaying ? "spinning" : ""}`}>
              <div className="vinyl-grooves">
                <div
                  className="vinyl-center"
                  style={{ backgroundColor: moodInfo.color }}
                >
                  <div className="spindle-hole"></div>
                </div>
              </div>
            </div>

            {/* Square Album Cover */}
            <div className="cover-box">
              <img
                src={
                  currentSong?.cover ||
                  (ytVideoId
                    ? `https://img.youtube.com/vi/${ytVideoId}/hqdefault.jpg`
                    : "https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg")
                }
                alt={currentSong?.title}
                className="cover-img"
              />

              {isPlaying && (
                <div className="playing-badge">
                  <div className="mini-wave">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span>NOW PLAYING</span>
                </div>
              )}
            </div>
          </div>

          {/* Track Meta & Quick Actions */}
          <div className="track-meta">
            <div className="track-title-row">
              <h2 title={currentSong?.title}>{currentSong?.title}</h2>
              <div className="track-quick-btns">
                <button
                  className={`track-heart-btn ${checkIsLiked(currentSong) ? "liked" : ""}`}
                  onClick={(e) => handleToggleLike(currentSong, e)}
                  title={
                    checkIsLiked(currentSong)
                      ? "Remove from Liked Songs"
                      : "Add to Liked Songs ❤️"
                  }
                >
                  <i
                    className={
                      checkIsLiked(currentSong) ? "ri-heart-fill" : "ri-heart-line"
                    }
                  ></i>
                </button>
                {onOpenPlaylistModal && (
                  <button
                    className="track-pl-btn"
                    onClick={() => onOpenPlaylistModal(currentSong)}
                    title="Add to Custom Playlist 📁"
                  >
                    <i className="ri-folder-add-line"></i>
                  </button>
                )}
              </div>
            </div>

            <p>
              {currentSong?.artist}
              {isYouTube && <span className="yt-meta-badge">Classic Audio 🎙️</span>}
              {currentSong?.tag && (
                <span className="custom-meta-badge">{currentSong.tag}</span>
              )}
            </p>
          </div>
        </div>

        {/* Seekbar and Timing */}
        <div className="progress-area">
          <input
            type="range"
            className="scrubber-track"
            min={0}
            max={duration || 100}
            step="0.1"
            value={isYouTube ? 0 : currentTime}
            onChange={handleSeek}
            disabled={isYouTube}
            style={{
              background: isYouTube
                ? `linear-gradient(to right, ${moodInfo.color} 100%, #252538 100%)`
                : `linear-gradient(to right, ${moodInfo.color} ${
                    (currentTime / (duration || 1)) * 100
                  }%, #252538 ${(currentTime / (duration || 1)) * 100}%)`,
            }}
          />
          <div className="time-row">
            <span>{isYouTube ? "Streaming Audio" : formatTime(currentTime)}</span>
            <span>{isYouTube ? "HD Stereo" : formatTime(duration)}</span>
          </div>
        </div>

        {/* Master Controls Deck */}
        <div className="controls-deck">
          {/* Shuffle Button */}
          <button
            className={`sec-btn ${isShuffle ? "active" : ""}`}
            onClick={() => setIsShuffle((prev) => !prev)}
            title="Shuffle Playlist"
          >
            <i className="ri-shuffle-line"></i>
          </button>

          {/* Previous Button (Peeche) */}
          <button
            className="step-btn"
            onClick={handlePrev}
            title="Previous Song (Peeche)"
          >
            <i className="ri-skip-back-fill"></i>
          </button>

          {/* Main Play / Pause Button */}
          <button
            className="main-play-btn"
            onClick={togglePlayPause}
            style={{
              background: `linear-gradient(135deg, ${moodInfo.color}, #4f46e5)`,
              boxShadow: `0 8px 25px ${moodInfo.color}65`,
            }}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <i className="ri-pause-fill"></i>
            ) : (
              <i className="ri-play-fill" style={{ marginLeft: "4px" }}></i>
            )}
          </button>

          {/* Next Button (Aage) */}
          <button
            className="step-btn"
            onClick={handleNext}
            title="Next Song (Aage)"
          >
            <i className="ri-skip-forward-fill"></i>
          </button>

          {/* Loop / Repeat Button */}
          <button
            className={`sec-btn ${isLoop ? "active" : ""}`}
            onClick={() => setIsLoop((prev) => !prev)}
            title="Repeat Song"
          >
            <i className="ri-repeat-line"></i>
          </button>
        </div>

        {/* Volume Dock */}
        <div className="volume-dock">
          <button className="vol-icon" onClick={toggleMute} title="Mute/Unmute">
            {isMuted || volume === 0 ? (
              <i className="ri-volume-mute-fill"></i>
            ) : volume < 0.5 ? (
              <i className="ri-volume-down-fill"></i>
            ) : (
              <i className="ri-volume-up-fill"></i>
            )}
          </button>
          <input
            type="range"
            className="vol-slider"
            min={0}
            max={1}
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
          />
        </div>
      </div>

      {/* Playlist Queue Section & Universal Search */}
      <div className="queue-glass-card">
        <div className="queue-header">
          <div className="queue-header-left">
            <h3>
              <i className="ri-play-list-2-fill"></i>{" "}
              {searchQuery.trim()
                ? `Search Results (${displayedSongs.length})`
                : `All ${songs.length} Tracks (${moodInfo.label})`}
            </h3>
            <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
              Click any song to play instantly or tap ❤️ / 📁 to save
            </span>
          </div>

          {onOpenAddSong && (
            <button
              className="queue-add-song-btn"
              onClick={() => onOpenAddSong({ mood: currentMood })}
              title="Add your favorite song to this mood playlist"
            >
              <i className="ri-add-circle-fill"></i> Add Song
            </button>
          )}
        </div>

        {/* Search Bar Across Entire 150+ Library */}
        <div className="queue-search-input-box">
          <i className="ri-search-line search-icon"></i>
          <input
            type="text"
            placeholder="Search all 150+ songs: Kishore, Arijit, Atif, Pasoori, Rafi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchQuery("")}
            >
              <i className="ri-close-line"></i>
            </button>
          )}
        </div>

        {/* Queue List */}
        <div className="queue-list">
          {displayedSongs.length === 0 ? (
            <div className="queue-empty-box">
              <p>No songs found for "{searchQuery}".</p>
              <button
                className="banner-add-btn"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </button>
            </div>
          ) : (
            displayedSongs.map((song, idx) => {
              const isCurrent =
                !searchQuery && idx === safeIndex;
              const songIsYt =
                song.source === "youtube" ||
                Boolean(song.youtubeId) ||
                Boolean(extractYouTubeId(song.audio));
              const ytId =
                song.youtubeId || (songIsYt ? extractYouTubeId(song.audio) : null);
              const isSongFav = checkIsLiked(song);

              return (
                <div
                  key={song._id || song.videoId || idx}
                  className={`queue-item ${isCurrent ? "active" : ""}`}
                  onClick={() => {
                    if (searchQuery.trim() && onPlaySong) {
                      onPlaySong(song);
                    } else {
                      setCurrentIndex(idx);
                      setIsPlaying(true);
                    }
                  }}
                >
                  <span className="queue-num">
                    {isCurrent && isPlaying ? (
                      <i
                        className="ri-equalizer-fill"
                        style={{ color: moodInfo.color }}
                      ></i>
                    ) : (
                      idx + 1
                    )}
                  </span>
                  <img
                    src={
                      song.cover ||
                      (ytId
                        ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
                        : "https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg")
                    }
                    alt={song.title}
                    className="queue-thumb"
                  />
                  <div className="queue-meta">
                    <h4
                      style={{
                        color: isCurrent ? moodInfo.color : "#ffffff",
                      }}
                    >
                      {song.title}
                    </h4>
                    <p>
                      {song.artist}
                      {song.tag && <span className="q-tag-pill">{song.tag}</span>}
                    </p>
                  </div>

                  {/* Fast Action Buttons: Heart + Playlist */}
                  <div className="queue-item-actions">
                    <button
                      className={`q-action-heart ${isSongFav ? "liked" : ""}`}
                      onClick={(e) => handleToggleLike(song, e)}
                      title={isSongFav ? "Liked" : "Like Song"}
                    >
                      <i
                        className={isSongFav ? "ri-heart-fill" : "ri-heart-line"}
                      ></i>
                    </button>
                    {onOpenPlaylistModal && (
                      <button
                        className="q-action-pl"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPlaylistModal(song);
                        }}
                        title="Add to Playlist"
                      >
                        <i className="ri-folder-add-line"></i>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
