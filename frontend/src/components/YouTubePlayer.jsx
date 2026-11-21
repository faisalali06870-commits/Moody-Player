import { useState, useEffect } from "react";
import axios from "axios";
import {
  getCuratedYouTubeTracks,
  extractYouTubeId,
  YOUTUBE_CATEGORIES,
  searchWorldSongs,
} from "../utils/youtubeUtils";
import { searchLibrarySongs } from "../utils/libraryUtils";
import { MOOD_DETAILS } from "../data/songsData";
import { toggleLikeSong, isSongLiked } from "../utils/playlistUtils";
import "./YouTubePlayer.css";

const YouTubePlayer = ({ mood = "neutral", onOpenAddSong, onOpenPlaylistModal, onToast }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState(() => getCuratedYouTubeTracks(mood));
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeVideo, setActiveVideo] = useState(() => {
    const list = getCuratedYouTubeTracks(mood);
    return list.length > 0 ? list[0] : null;
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState("audio"); // 'audio' (music player look) or 'video'
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("moody_yt_api_key") || "");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [likedMap, setLikedMap] = useState({});

  const cleanMood = (mood || "neutral").toLowerCase();
  const moodInfo = MOOD_DETAILS[cleanMood] || MOOD_DETAILS.neutral;

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

  // Whenever mood changes, fetch songs for this mood
  useEffect(() => {
    fetchMoodSongs(cleanMood);
    setSelectedCategory("all");
  }, [cleanMood]);

  const fetchMoodSongs = async (targetMood) => {
    setLoading(true);
    try {
      // 1. Try backend YouTube route
      const backendRes = await axios.get(
        `http://localhost:3000/api/youtube/search?mood=${targetMood}`,
        { timeout: 3000 }
      );
      if (backendRes.data?.songs?.length > 0) {
        setSongs(backendRes.data.songs);
        setActiveVideo(backendRes.data.songs[0]);
        setLoading(false);
        return;
      }
    } catch {
      // Fallback
    }

    // 2. Fallback to rich curated Hindustani & Pakistani tracks
    const curated = getCuratedYouTubeTracks(targetMood);
    setSongs(curated);
    if (curated.length > 0) setActiveVideo(curated[0]);
    setLoading(false);
  };

  // Universal World Song Search (Searches ANY song in the entire world)
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      fetchMoodSongs(cleanMood);
      return;
    }

    setLoading(true);

    try {
      // 1. Search the whole world (YouTube live search engine)
      const worldResults = await searchWorldSongs(searchQuery, apiKey);
      if (worldResults && worldResults.length > 0) {
        setSongs(worldResults);
        setActiveVideo(worldResults[0]);
        setIsPlaying(true);
        setLoading(false);
        return;
      }

      // 2. Fallback: Search 150+ library
      const libResults = searchLibrarySongs(searchQuery);
      if (libResults.length > 0) {
        setSongs(libResults);
        setActiveVideo(libResults[0]);
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem("moody_yt_api_key", key);
  };

  // Filter songs based on selected category
  const displayedSongs = songs.filter((s) => {
    if (selectedCategory === "all") return true;
    return s.category === selectedCategory;
  });

  return (
    <div className="youtube-player-deck">
      {/* Mood Header */}
      <div className="yt-mood-banner">
        <div className="yt-mood-title">
          <span className="yt-badge">
            <i className="ri-earth-fill"></i> World Music
          </span>
          <h3>Search & Play Any Song in the World</h3>
        </div>
        <div className="yt-header-actions">
          <button
            className="yt-mode-toggle-btn"
            onClick={() => setViewMode((prev) => (prev === "audio" ? "video" : "audio"))}
            title={viewMode === "audio" ? "Switch to Video Mode" : "Switch to Music Player Mode"}
          >
            {viewMode === "audio" ? (
              <>
                <i className="ri-tv-line"></i> Video
              </>
            ) : (
              <>
                <i className="ri-disc-line"></i> Audio Player
              </>
            )}
          </button>
          <button
            className="yt-settings-btn"
            onClick={() => setShowKeyInput((prev) => !prev)}
            title="Custom YouTube API Key"
          >
            <i className="ri-settings-4-line"></i>
          </button>
        </div>
      </div>

      {/* Optional YouTube API Key Drawer */}
      {showKeyInput && (
        <div className="yt-key-drawer">
          <p>
            <i className="ri-key-2-fill"></i> <strong>Custom Google YouTube API Key</strong> (Optional):
          </p>
          <div className="yt-key-row">
            <input
              type="text"
              placeholder="Paste Google YouTube API Key (AIzaSy...)"
              value={apiKey}
              onChange={(e) => saveApiKey(e.target.value)}
            />
            {apiKey && (
              <button className="yt-key-clear" onClick={() => saveApiKey("")}>
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Universal Search Form (Duniya Ka Koi Bhi Gaana Search Karein) */}
      <form onSubmit={handleSearch} className="yt-search-form">
        <div className="yt-search-input-wrap">
          <i className="ri-search-line yt-search-icon"></i>
          <input
            type="text"
            placeholder="Search ANY song in the world (e.g. Arijit, Pasoori, Coldplay, Diljit)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="yt-clear-btn"
              onClick={() => {
                setSearchQuery("");
                fetchMoodSongs(cleanMood);
              }}
            >
              <i className="ri-close-circle-fill"></i>
            </button>
          )}
        </div>
        <button type="submit" className="yt-search-btn" disabled={loading}>
          {loading ? <i className="ri-loader-4-line spin"></i> : "Search"}
        </button>
      </form>

      {/* Classic Genres Filter Bar */}
      <div className="yt-category-tabs">
        {YOUTUBE_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              className={`yt-cat-btn ${isActive ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <i className={cat.icon}></i> {cat.label}
            </button>
          );
        })}
      </div>

      {/* Quick Search Tags */}
      <div className="yt-quick-tags">
        <button
          type="button"
          className="yt-tag"
          onClick={() => {
            setSearchQuery("Coke Studio Pakistan best songs");
            handleSearch();
          }}
        >
          🇵🇰 Coke Studio
        </button>
        <button
          type="button"
          className="yt-tag"
          onClick={() => {
            setSearchQuery("Kishore Kumar Mohammad Rafi evergreen hits");
            handleSearch();
          }}
        >
          📻 Retro Classics
        </button>
        <button
          type="button"
          className="yt-tag"
          onClick={() => {
            setSearchQuery("Nusrat Fateh Ali Khan qawwali");
            handleSearch();
          }}
        >
          🕊️ Sufi Qawwali
        </button>
        <button
          type="button"
          className="yt-tag"
          onClick={() => {
            setSearchQuery("Arijit Singh latest romantic hits");
            handleSearch();
          }}
        >
          ❤️ Arijit Singh
        </button>
        <button
          type="button"
          className="yt-tag"
          onClick={() => {
            setSearchQuery("Sidhu Moose Wala Diljit Dosanjh");
            handleSearch();
          }}
        >
          🔥 Punjabi Hits
        </button>
        <button
          type="button"
          className="yt-tag"
          onClick={() => {
            setSearchQuery("Top Global Pop Hits 2024");
            handleSearch();
          }}
        >
          🌍 Global Hits
        </button>
      </div>

      {/* Active Music Player Stage (Audio Mode vs Video Mode) */}
      {activeVideo && (
        <div className="yt-screen-card">
          {viewMode === "video" ? (
            /* Video Mode */
            <div className="yt-iframe-container">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&enablejsapi=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            /* Audio Music Player Mode (Clean Album Art + Spinning Vinyl) */
            <div className="yt-audio-player-box">
              {/* Hidden YouTube audio bridge */}
              <iframe
                src={
                  isPlaying
                    ? `https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&enablejsapi=1`
                    : ""
                }
                title="Audio Stream"
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  opacity: 0,
                  pointerEvents: "none",
                  border: "none",
                }}
              />

              <div className="yt-music-art-stage">
                {/* Vinyl disc */}
                <div className={`yt-vinyl-disc ${isPlaying ? "spinning" : ""}`}>
                  <div className="yt-vinyl-grooves">
                    <div className="yt-vinyl-center"></div>
                  </div>
                </div>

                {/* Album Cover */}
                <div className="yt-cover-square">
                  <img
                    src={
                      activeVideo.thumbnail ||
                      `https://img.youtube.com/vi/${activeVideo.videoId}/hqdefault.jpg`
                    }
                    alt={activeVideo.title}
                    className="yt-cover-pic"
                  />
                  {isPlaying && (
                    <div className="yt-live-badge">
                      <i className="ri-headphone-fill"></i> PLAYING AUDIO
                    </div>
                  )}
                </div>
              </div>

              {/* Play / Pause Toggle Button */}
              <div className="yt-audio-controls">
                <button
                  className="yt-play-toggle-btn"
                  onClick={() => setIsPlaying((prev) => !prev)}
                >
                  <i className={isPlaying ? "ri-pause-fill" : "ri-play-fill"}></i>
                </button>
              </div>
            </div>
          )}

          {/* Meta & Quick Actions */}
          <div className="yt-screen-meta">
            <div className="yt-screen-text">
              <div className="yt-title-row">
                <h4 title={activeVideo.title}>{activeVideo.title}</h4>
                <button
                  className={`yt-heart-btn ${checkIsLiked(activeVideo) ? "liked" : ""}`}
                  onClick={(e) => handleToggleLike(activeVideo, e)}
                  title={checkIsLiked(activeVideo) ? "Liked" : "Like Song ❤️"}
                >
                  <i
                    className={
                      checkIsLiked(activeVideo) ? "ri-heart-fill" : "ri-heart-line"
                    }
                  ></i>
                </button>
              </div>
              <p>
                {activeVideo.artist || "Classic Artist"}
                {activeVideo.tag && (
                  <span className="yt-screen-badge">{activeVideo.tag}</span>
                )}
              </p>
            </div>

            <div className="yt-action-group">
              {onOpenPlaylistModal && (
                <button
                  className="yt-add-btn"
                  onClick={() => onOpenPlaylistModal(activeVideo)}
                  title="Add to Custom Playlist"
                >
                  <i className="ri-folder-add-line"></i> Save
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results / Playlist Queue */}
      <div className="yt-queue-card">
        <div className="yt-queue-header">
          <h4>
            <i className="ri-play-list-2-fill"></i> Songs List ({displayedSongs.length})
          </h4>
          <span className="yt-queue-sub">Tap song to play audio or ❤️ to save</span>
        </div>

        <div className="yt-queue-list">
          {displayedSongs.length === 0 ? (
            <div className="yt-empty-box">
              <p>No songs found for "{searchQuery}".</p>
              <button
                className="yt-tag"
                onClick={() => {
                  setSearchQuery("");
                  fetchMoodSongs(cleanMood);
                }}
              >
                Reset Search
              </button>
            </div>
          ) : (
            displayedSongs.map((song, idx) => {
              const isCurrent = activeVideo?.videoId === song.videoId;
              const isFav = checkIsLiked(song);

              return (
                <div
                  key={song.videoId || idx}
                  className={`yt-queue-item ${isCurrent ? "active" : ""}`}
                  onClick={() => {
                    setActiveVideo(song);
                    setIsPlaying(true);
                  }}
                >
                  <div className="yt-thumb-wrap">
                    <img
                      src={
                        song.thumbnail ||
                        `https://img.youtube.com/vi/${song.videoId}/hqdefault.jpg`
                      }
                      alt={song.title}
                      className="yt-thumb"
                    />
                    {isCurrent && isPlaying ? (
                      <div className="yt-playing-overlay">
                        <i className="ri-equalizer-fill"></i>
                      </div>
                    ) : (
                      <div className="yt-play-overlay">
                        <i className="ri-play-fill"></i>
                      </div>
                    )}
                  </div>

                  <div className="yt-meta">
                    <div className="yt-meta-row">
                      <h5 title={song.title}>{song.title}</h5>
                      {song.tag && <span className="yt-item-tag">{song.tag}</span>}
                    </div>
                    <p>{song.artist}</p>
                  </div>

                  {/* Quick Liked and Playlist buttons */}
                  <div className="yt-item-actions">
                    <button
                      type="button"
                      className={`yt-item-heart ${isFav ? "liked" : ""}`}
                      title={isFav ? "Liked" : "Like Song"}
                      onClick={(e) => handleToggleLike(song, e)}
                    >
                      <i className={isFav ? "ri-heart-fill" : "ri-heart-line"}></i>
                    </button>
                    {onOpenPlaylistModal && (
                      <button
                        type="button"
                        className="yt-item-add"
                        title="Add to Playlist"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPlaylistModal(song);
                        }}
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

export default YouTubePlayer;
