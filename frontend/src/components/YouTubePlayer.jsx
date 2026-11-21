import { useState, useEffect } from "react";
import axios from "axios";
import {
  getCuratedYouTubeTracks,
  extractYouTubeId,
  YOUTUBE_CATEGORIES,
} from "../utils/youtubeUtils";
import { MOOD_DETAILS } from "../data/songsData";
import "./YouTubePlayer.css";

const YouTubePlayer = ({ mood = "neutral", onOpenAddSong }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState(() => getCuratedYouTubeTracks(mood));
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeVideo, setActiveVideo] = useState(() => {
    const list = getCuratedYouTubeTracks(mood);
    return list.length > 0 ? list[0] : null;
  });
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("moody_yt_api_key") || "");
  const [showKeyInput, setShowKeyInput] = useState(false);

  const cleanMood = (mood || "neutral").toLowerCase();
  const moodInfo = MOOD_DETAILS[cleanMood] || MOOD_DETAILS.neutral;

  // Whenever mood changes, fetch songs for this mood
  useEffect(() => {
    fetchMoodSongs(cleanMood);
    setSelectedCategory("all");
  }, [cleanMood]);

  const fetchMoodSongs = async (targetMood) => {
    setLoading(true);
    try {
      // 1. Try local custom API key if user provided one
      if (apiKey && apiKey.trim()) {
        const query = `${targetMood} bollywood pakistani classic songs`;
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${encodeURIComponent(
            query
          )}&type=video&videoCategoryId=10&key=${apiKey.trim()}`
        );
        if (res.data?.items?.length > 0) {
          const items = res.data.items.map((it) => ({
            videoId: it.id.videoId,
            title: it.snippet.title,
            artist: it.snippet.channelTitle,
            thumbnail: it.snippet.thumbnails?.high?.url || it.snippet.thumbnails?.medium?.url,
            mood: targetMood,
            category: "hindustani",
            tag: "YouTube Search 🔴",
            source: "youtube",
          }));
          setSongs(items);
          setActiveVideo(items[0]);
          setLoading(false);
          return;
        }
      }

      // 2. Try backend YouTube route
      const backendRes = await axios.get(
        `http://localhost:3000/api/youtube/search?mood=${targetMood}`,
        { timeout: 4000 }
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

    // 3. Fallback to rich curated Hindustani & Pakistani tracks
    const curated = getCuratedYouTubeTracks(targetMood);
    setSongs(curated);
    if (curated.length > 0) setActiveVideo(curated[0]);
    setLoading(false);
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      fetchMoodSongs(cleanMood);
      return;
    }

    // Check if user directly pasted a YouTube URL or Video ID
    const directId = extractYouTubeId(searchQuery);
    if (directId) {
      const directVideo = {
        videoId: directId,
        title: "YouTube Video: " + directId,
        artist: "YouTube Classic",
        thumbnail: `https://img.youtube.com/vi/${directId}/hqdefault.jpg`,
        mood: cleanMood,
        category: "all",
        tag: "Direct Link 🔗",
        source: "youtube",
      };
      setSongs((prev) => [directVideo, ...prev.filter((v) => v.videoId !== directId)]);
      setActiveVideo(directVideo);
      setSearchQuery("");
      return;
    }

    setLoading(true);

    try {
      // If user has custom API key in browser
      if (apiKey && apiKey.trim()) {
        const res = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${encodeURIComponent(
            searchQuery
          )}&type=video&key=${apiKey.trim()}`
        );
        if (res.data?.items?.length > 0) {
          const items = res.data.items.map((it) => ({
            videoId: it.id.videoId,
            title: it.snippet.title,
            artist: it.snippet.channelTitle,
            thumbnail: it.snippet.thumbnails?.high?.url || it.snippet.thumbnails?.medium?.url,
            mood: cleanMood,
            category: "all",
            tag: "YouTube Search 🔴",
            source: "youtube",
          }));
          setSongs(items);
          setActiveVideo(items[0]);
          setLoading(false);
          return;
        }
      }

      // Backend route search
      const res = await axios.get(
        `http://localhost:3000/api/youtube/search?q=${encodeURIComponent(
          searchQuery
        )}&mood=${cleanMood}`,
        { timeout: 4000 }
      );
      if (res.data?.songs?.length > 0) {
        setSongs(res.data.songs);
        setActiveVideo(res.data.songs[0]);
      }
    } catch {
      // If search fails, search inside current songs by query
      const filtered = songs.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length > 0) {
        setSongs(filtered);
        setActiveVideo(filtered[0]);
      }
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
            <i className="ri-youtube-fill"></i> Classic Music
          </span>
          <h3>
            {moodInfo.emoji} {moodInfo.label} Pakistani & Hindustani Hits
          </h3>
        </div>
        <button
          className="yt-settings-btn"
          onClick={() => setShowKeyInput((prev) => !prev)}
          title="Custom YouTube API Key"
        >
          <i className="ri-settings-4-line"></i> {apiKey ? "API Key Active" : "API Key"}
        </button>
      </div>

      {/* Optional YouTube API Key Drawer */}
      {showKeyInput && (
        <div className="yt-key-drawer">
          <p>
            <i className="ri-key-2-fill"></i> <strong>YouTube Data API v3 Key</strong> (Optional - allows unlimited live searches):
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

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="yt-search-form">
        <div className="yt-search-input-wrap">
          <i className="ri-search-line yt-search-icon"></i>
          <input
            type="text"
            placeholder="Search Pakistani, Coke Studio, Rafi, Kishore, Atif..."
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
          📻 Retro Kishore & Rafi
        </button>
        <button
          type="button"
          className="yt-tag"
          onClick={() => {
            setSearchQuery("Nusrat Fateh Ali Khan qawwali");
            handleSearch();
          }}
        >
          🕊️ Nusrat Qawwali
        </button>
        <button
          type="button"
          className="yt-tag"
          onClick={() => {
            setSearchQuery("Jagjit Singh best ghazals");
            handleSearch();
          }}
        >
          💫 Jagjit Singh Ghazals
        </button>
        <button
          type="button"
          className="yt-tag"
          onClick={() => {
            setSearchQuery("Atif Aslam evergreen romantic hits");
            handleSearch();
          }}
        >
          🎤 Atif Aslam
        </button>
      </div>

      {/* Active Video Player Screen */}
      {activeVideo && (
        <div className="yt-screen-card">
          <div className="yt-iframe-container">
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&enablejsapi=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="yt-screen-meta">
            <div className="yt-screen-text">
              <h4 title={activeVideo.title}>{activeVideo.title}</h4>
              <p>
                {activeVideo.artist || "Classic Artist"}
                {activeVideo.tag && (
                  <span className="yt-screen-badge">{activeVideo.tag}</span>
                )}
              </p>
            </div>
            <button
              className="yt-add-btn"
              onClick={() =>
                onOpenAddSong({
                  title: activeVideo.title,
                  artist: activeVideo.artist,
                  videoId: activeVideo.videoId,
                  thumbnail: activeVideo.thumbnail,
                  mood: cleanMood,
                  source: "youtube",
                })
              }
              title="Add this song to your Moody Player playlist"
            >
              <i className="ri-add-circle-fill"></i> Add to Playlist
            </button>
          </div>
        </div>
      )}

      {/* Results / Playlist Queue */}
      <div className="yt-queue-card">
        <div className="yt-queue-header">
          <h4>
            <i className="ri-play-list-2-fill"></i> Classic Tracks ({displayedSongs.length})
          </h4>
          <span className="yt-queue-sub">Click to play video or tap + to save</span>
        </div>

        <div className="yt-queue-list">
          {displayedSongs.length === 0 ? (
            <div className="yt-empty-box">
              <p>No tracks in this category for {moodInfo.label}.</p>
              <button
                className="yt-tag"
                onClick={() => setSelectedCategory("all")}
              >
                Show All {songs.length} Tracks
              </button>
            </div>
          ) : (
            displayedSongs.map((song, idx) => {
              const isPlaying = activeVideo?.videoId === song.videoId;
              return (
                <div
                  key={song.videoId || idx}
                  className={`yt-queue-item ${isPlaying ? "active" : ""}`}
                  onClick={() => setActiveVideo(song)}
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
                    {isPlaying ? (
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

                  <button
                    type="button"
                    className="yt-item-add"
                    title="Add to Moody Player"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenAddSong({
                        title: song.title,
                        artist: song.artist,
                        videoId: song.videoId,
                        thumbnail: song.thumbnail,
                        mood: cleanMood,
                        source: "youtube",
                      });
                    }}
                  >
                    <i className="ri-add-line"></i>
                  </button>
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
