import { useState, useRef, useEffect } from "react";
import "./MusicPlayer.css";
import { MOOD_DETAILS } from "../data/songsData";
import { extractYouTubeId } from "../utils/youtubeUtils";

const MusicPlayer = ({ songs, currentMood, onOpenAddSong }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  const audioRef = useRef(null);

  // Safe index bounds
  const safeIndex = songs && songs.length > 0 ? Math.min(currentIndex, songs.length - 1) : 0;
  const currentSong = songs && songs.length > 0 ? songs[safeIndex] : null;

  // Mood details
  const moodKey = (currentMood || "neutral").toLowerCase();
  const moodInfo = MOOD_DETAILS[moodKey] || MOOD_DETAILS.neutral;

  // Check if current track is a YouTube video song
  const isYouTube =
    currentSong?.source === "youtube" ||
    Boolean(currentSong?.youtubeId) ||
    Boolean(extractYouTubeId(currentSong?.audio));

  const ytVideoId =
    currentSong?.youtubeId || (isYouTube ? extractYouTubeId(currentSong?.audio) : null);

  // Reset index when mood changes
  useEffect(() => {
    setCurrentIndex(0);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, [songs, currentMood]);

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
            <h3 style={{ color: moodInfo.color }}>{moodInfo.label} Mood Bollywood</h3>
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

      {/* Hidden Native Audio Element (For MP3s) */}
      {!isYouTube && (
        <audio
          ref={audioRef}
          src={currentSong?.audio}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />
      )}

      {/* Glassmorphic Master Audio Deck */}
      <div className="master-glass-card" style={{ borderColor: `${moodInfo.color}35` }}>
        {/* Dynamic Glow */}
        <div
          className="card-ambient-glow"
          style={{ backgroundColor: moodInfo.color }}
        ></div>

        {/* Visual Stage: YouTube Player OR Spinning Vinyl Album Art */}
        <div className="track-showcase">
          {isYouTube && isPlaying && ytVideoId && showVideo ? (
            <div className="master-yt-player-box">
              <iframe
                src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=1&enablejsapi=1`}
                title={currentSong.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="master-yt-iframe"
              />
              <button
                className="yt-toggle-btn"
                onClick={() => setShowVideo(false)}
                title="Switch to Album Art Mode"
              >
                <i className="ri-image-2-line"></i> Art View
              </button>
            </div>
          ) : (
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

              {/* Album Cover */}
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

                {isYouTube && (
                  <div className="yt-video-indicator">
                    <i className="ri-youtube-fill"></i> YouTube
                  </div>
                )}

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

              {isYouTube && isPlaying && (
                <button
                  className="yt-toggle-btn overlay"
                  onClick={() => setShowVideo(true)}
                  title="Switch to Video Mode"
                >
                  <i className="ri-tv-line"></i> Video
                </button>
              )}
            </div>
          )}

          <div className="track-meta">
            <h2>{currentSong?.title}</h2>
            <p>
              {currentSong?.artist}
              {isYouTube && <span className="yt-meta-badge">YouTube</span>}
              {currentSong?.isCustom && <span className="custom-meta-badge">Added by You</span>}
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
                ? `linear-gradient(to right, #ef4444 100%, #252538 100%)`
                : `linear-gradient(to right, ${moodInfo.color} ${
                    (currentTime / (duration || 1)) * 100
                  }%, #252538 ${(currentTime / (duration || 1)) * 100}%)`,
            }}
          />
          <div className="time-row">
            <span>{isYouTube ? "YouTube Stream" : formatTime(currentTime)}</span>
            <span>{isYouTube ? "HD" : formatTime(duration)}</span>
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
              background: isYouTube
                ? "linear-gradient(135deg, #ef4444, #991b1b)"
                : `linear-gradient(135deg, ${moodInfo.color}, #4f46e5)`,
              boxShadow: isYouTube
                ? "0 8px 25px rgba(239, 68, 68, 0.55)"
                : `0 8px 25px ${moodInfo.color}65`,
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

      {/* Playlist Queue Section (15+ Songs in List) */}
      <div className="queue-glass-card">
        <div className="queue-header">
          <div className="queue-header-left">
            <h3>
              <i className="ri-play-list-2-fill"></i> All {songs.length} Tracks ({moodInfo.label})
            </h3>
            <span style={{ fontSize: "0.74rem", color: "#64748b" }}>
              Click any track to play immediately
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

        <div className="queue-list">
          {songs.map((song, idx) => {
            const isCurrent = idx === safeIndex;
            const songIsYt =
              song.source === "youtube" ||
              Boolean(song.youtubeId) ||
              Boolean(extractYouTubeId(song.audio));
            const ytId =
              song.youtubeId || (songIsYt ? extractYouTubeId(song.audio) : null);

            return (
              <div
                key={song._id || song.videoId || idx}
                className={`queue-item ${isCurrent ? "active" : ""}`}
                onClick={() => {
                  setCurrentIndex(idx);
                  setIsPlaying(true);
                }}
              >
                <span className="queue-num">
                  {isCurrent && isPlaying ? (
                    <i
                      className="ri-equalizer-fill"
                      style={{ color: songIsYt ? "#ef4444" : moodInfo.color }}
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
                      color: isCurrent
                        ? songIsYt
                          ? "#fca5a5"
                          : moodInfo.color
                        : "#ffffff",
                    }}
                  >
                    {song.title}
                  </h4>
                  <p>
                    {song.artist}
                    {songIsYt && (
                      <span className="q-yt-badge">
                        <i className="ri-youtube-fill"></i> YouTube
                      </span>
                    )}
                    {song.isCustom && <span className="q-custom-badge">My Song</span>}
                  </p>
                </div>
                <div className="queue-indicator">
                  {isCurrent ? (
                    isPlaying ? (
                      <i
                        className="ri-pause-circle-line"
                        style={{ color: songIsYt ? "#ef4444" : moodInfo.color }}
                      ></i>
                    ) : (
                      <i
                        className="ri-play-circle-line"
                        style={{ color: songIsYt ? "#ef4444" : moodInfo.color }}
                      ></i>
                    )
                  ) : (
                    <i className="ri-play-mini-line"></i>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
