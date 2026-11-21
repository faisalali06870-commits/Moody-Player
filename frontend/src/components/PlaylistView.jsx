import React, { useState, useEffect } from "react";
import {
  getUserPlaylists,
  getLikedSongs,
  createPlaylist,
  deletePlaylist,
  removeSongFromPlaylist,
  toggleLikeSong,
} from "../utils/playlistUtils";
import "./PlaylistView.css";

const PlaylistView = ({ onPlaySongList, onOpenAddSong, onToast }) => {
  const [activeTab, setActiveTab] = useState("liked"); // 'liked' or 'custom'
  const [likedSongs, setLikedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newPlName, setNewPlName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const refreshData = () => {
    setLikedSongs(getLikedSongs());
    const pls = getUserPlaylists();
    setPlaylists(pls);
    if (pls.length > 0 && !selectedPlaylistId) {
      setSelectedPlaylistId(pls[0].id);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newPlName.trim()) return;
    const created = createPlaylist(newPlName.trim());
    setNewPlName("");
    setIsCreating(false);
    refreshData();
    setSelectedPlaylistId(created.id);
    setActiveTab("custom");
    if (onToast) onToast(`📁 Created playlist "${created.name}"!`);
  };

  const handleDelete = (plId, plName) => {
    if (window.confirm(`Delete playlist "${plName}"?`)) {
      deletePlaylist(plId);
      refreshData();
      if (selectedPlaylistId === plId) {
        setSelectedPlaylistId(null);
      }
      if (onToast) onToast(`Deleted playlist "${plName}".`);
    }
  };

  const handleRemoveSong = (e, plId, song) => {
    e.stopPropagation();
    if (plId === "liked") {
      toggleLikeSong(song);
      refreshData();
      if (onToast) onToast(`Removed "${song.title}" from Liked Songs`);
    } else {
      removeSongFromPlaylist(plId, song._id || song.videoId, song.title);
      refreshData();
      if (onToast) onToast(`Removed "${song.title}" from playlist`);
    }
  };

  const activeCustomPl = playlists.find((p) => p.id === selectedPlaylistId) || null;

  // Active song list to display
  let currentList = activeTab === "liked" ? likedSongs : activeCustomPl?.songs || [];

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    currentList = currentList.filter(
      (s) =>
        (s.title || "").toLowerCase().includes(q) ||
        (s.artist || "").toLowerCase().includes(q)
    );
  }

  return (
    <div className="pl-view-root">
      {/* Top Banner */}
      <div className="pl-view-banner">
        <div className="pl-tabs-switch">
          <button
            className={`pl-tab-btn ${activeTab === "liked" ? "active" : ""}`}
            onClick={() => setActiveTab("liked")}
          >
            <i className="ri-heart-fill" style={{ color: "#ef4444" }}></i> Liked Songs (
            {likedSongs.length})
          </button>
          <button
            className={`pl-tab-btn ${activeTab === "custom" ? "active" : ""}`}
            onClick={() => setActiveTab("custom")}
          >
            <i className="ri-folder-music-fill" style={{ color: "#6366f1" }}></i> My Playlists (
            {playlists.length})
          </button>
        </div>

        <button
          className="pl-create-btn"
          onClick={() => {
            setIsCreating(true);
            setActiveTab("custom");
          }}
        >
          <i className="ri-add-circle-fill"></i> New Playlist
        </button>
      </div>

      {/* New Playlist Form Modal */}
      {isCreating && (
        <form onSubmit={handleCreate} className="pl-new-inline-box">
          <input
            type="text"
            placeholder="Enter playlist name (e.g. Sufi Nights, Romantic Hits)..."
            value={newPlName}
            onChange={(e) => setNewPlName(e.target.value)}
            autoFocus
          />
          <div className="pl-inline-actions">
            <button
              type="button"
              className="btn-cancel-sm"
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-save-sm">
              Create
            </button>
          </div>
        </form>
      )}

      {/* Custom Playlists Selector Tabs */}
      {activeTab === "custom" && playlists.length > 0 && (
        <div className="pl-chips-scroller">
          {playlists.map((pl) => {
            const isSel = pl.id === selectedPlaylistId;
            return (
              <div
                key={pl.id}
                className={`pl-chip-item ${isSel ? "active" : ""}`}
                onClick={() => setSelectedPlaylistId(pl.id)}
              >
                <i className="ri-folder-music-line"></i>
                <span className="pl-chip-name">{pl.name}</span>
                <span className="pl-chip-count">{pl.songs?.length || 0}</span>
                {isSel && (
                  <button
                    className="pl-del-chip"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(pl.id, pl.name);
                    }}
                    title="Delete playlist"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Active Playlist Header & Play All Action */}
      <div className="pl-deck-header">
        <div className="pl-deck-info">
          <h3>
            {activeTab === "liked" ? (
              <>
                <i className="ri-heart-fill" style={{ color: "#ef4444" }}></i> Liked Songs
              </>
            ) : (
              <>
                <i className="ri-folder-music-fill" style={{ color: "#6366f1" }}></i>{" "}
                {activeCustomPl?.name || "Select Playlist"}
              </>
            )}
          </h3>
          <p>{currentList.length} tracks available to play anytime</p>
        </div>

        {currentList.length > 0 && (
          <button
            className="pl-play-all-btn"
            onClick={() => onPlaySongList(currentList)}
            title="Play these songs in Master Player"
          >
            <i className="ri-play-circle-fill"></i> Play All
          </button>
        )}
      </div>

      {/* Search Inside Playlist */}
      {currentList.length > 4 && (
        <div className="pl-search-wrap">
          <i className="ri-search-line"></i>
          <input
            type="text"
            placeholder="Search songs inside this playlist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Songs List */}
      <div className="pl-songs-queue">
        {currentList.length === 0 ? (
          <div className="pl-empty-card">
            <div className="pl-empty-icon">
              {activeTab === "liked" ? "❤️" : "📁"}
            </div>
            <h4>
              {activeTab === "liked"
                ? "No liked songs yet"
                : "This playlist is empty"}
            </h4>
            <p>
              Tap the heart ❤️ or "+ Add to Playlist" button on any song in the app to save it here!
            </p>
          </div>
        ) : (
          currentList.map((song, idx) => {
            return (
              <div
                key={song._id || song.videoId || idx}
                className="pl-song-item"
                onClick={() => onPlaySongList([song, ...currentList.filter((_, i) => i !== idx)])}
              >
                <span className="pl-idx">{idx + 1}</span>
                <img
                  src={
                    song.cover ||
                    `https://img.youtube.com/vi/${song.videoId}/hqdefault.jpg` ||
                    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500"
                  }
                  alt={song.title}
                  className="pl-song-thumb"
                />
                <div className="pl-song-meta">
                  <h4>{song.title}</h4>
                  <p>
                    {song.artist}
                    {song.tag && <span className="pl-meta-tag">{song.tag}</span>}
                  </p>
                </div>

                <div className="pl-song-actions">
                  <button
                    className="pl-btn-play-mini"
                    title="Play track"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlaySongList([song, ...currentList.filter((_, i) => i !== idx)]);
                    }}
                  >
                    <i className="ri-play-fill"></i>
                  </button>
                  <button
                    className="pl-btn-remove"
                    title="Remove from playlist"
                    onClick={(e) =>
                      handleRemoveSong(
                        e,
                        activeTab === "liked" ? "liked" : selectedPlaylistId,
                        song
                      )
                    }
                  >
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PlaylistView;
