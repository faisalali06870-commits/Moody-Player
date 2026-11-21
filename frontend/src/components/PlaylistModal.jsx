import React, { useState, useEffect } from "react";
import {
  getUserPlaylists,
  createPlaylist,
  addSongToPlaylist,
  toggleLikeSong,
  isSongLiked,
} from "../utils/playlistUtils";
import "./PlaylistModal.css";

const PlaylistModal = ({ isOpen, onClose, song, onToast }) => {
  const [playlists, setPlaylists] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (isOpen && song) {
      setPlaylists(getUserPlaylists());
      setLiked(isSongLiked(song._id || song.videoId, song.title));
      setIsCreating(false);
      setNewPlaylistName("");
    }
  }, [isOpen, song]);

  if (!isOpen || !song) return null;

  const handleToggleLike = () => {
    const isNowLiked = toggleLikeSong(song);
    setLiked(isNowLiked);
    if (onToast) {
      onToast(
        isNowLiked
          ? `❤️ Added "${song.title}" to Liked Songs!`
          : `Removed "${song.title}" from Liked Songs`
      );
    }
  };

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    const newPl = createPlaylist(newPlaylistName.trim());
    addSongToPlaylist(newPl.id, song);
    setPlaylists(getUserPlaylists());
    setIsCreating(false);
    setNewPlaylistName("");
    if (onToast) {
      onToast(`📁 Created playlist "${newPl.name}" and added "${song.title}"!`);
    }
    onClose();
  };

  const handleAddToPlaylist = (playlistId, playlistName) => {
    const added = addSongToPlaylist(playlistId, song);
    if (added) {
      if (onToast) {
        onToast(`✨ Added "${song.title}" to "${playlistName}"!`);
      }
      onClose();
    } else {
      if (onToast) {
        onToast(`ℹ️ "${song.title}" is already in "${playlistName}".`);
      }
    }
  };

  return (
    <div className="pl-modal-backdrop" onClick={onClose}>
      <div className="pl-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="pl-modal-header">
          <div className="pl-modal-title">
            <span className="pl-icon">📁</span>
            <div>
              <h3>Add to Playlist</h3>
              <p>Save this song to your custom collections</p>
            </div>
          </div>
          <button className="pl-close-btn" onClick={onClose}>
            <i className="ri-close-line"></i>
          </button>
        </div>

        {/* Selected Song Preview */}
        <div className="pl-song-preview">
          <img
            src={
              song.cover ||
              `https://img.youtube.com/vi/${song.videoId}/hqdefault.jpg` ||
              "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500"
            }
            alt={song.title}
            className="pl-preview-thumb"
          />
          <div className="pl-preview-meta">
            <h4>{song.title}</h4>
            <p>{song.artist}</p>
          </div>
          <button
            className={`pl-heart-btn ${liked ? "liked" : ""}`}
            onClick={handleToggleLike}
            title={liked ? "Remove from Liked" : "Add to Liked Songs"}
          >
            <i className={liked ? "ri-heart-fill" : "ri-heart-line"}></i>
          </button>
        </div>

        {/* Quick Liked Songs Action */}
        <div className="pl-quick-liked" onClick={handleToggleLike}>
          <div className="pl-liked-icon">
            <i className="ri-heart-fill"></i>
          </div>
          <div className="pl-liked-info">
            <h5>Liked Songs Favorites</h5>
            <p>{liked ? "Already in Liked Songs" : "Click to save as favorite"}</p>
          </div>
          <span className="pl-status-check">
            {liked ? <i className="ri-check-line"></i> : <i className="ri-add-line"></i>}
          </span>
        </div>

        {/* Existing Custom Playlists */}
        <div className="pl-section-title">
          <span>YOUR PLAYLISTS</span>
          {!isCreating && (
            <button
              className="pl-new-btn"
              onClick={() => setIsCreating(true)}
            >
              <i className="ri-add-circle-fill"></i> New Playlist
            </button>
          )}
        </div>

        {isCreating && (
          <form onSubmit={handleCreatePlaylist} className="pl-create-form">
            <input
              type="text"
              placeholder="e.g. My Top 10, Late Night Sufi, Road Trip..."
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              autoFocus
            />
            <div className="pl-create-actions">
              <button
                type="button"
                className="pl-btn-sm-cancel"
                onClick={() => setIsCreating(false)}
              >
                Cancel
              </button>
              <button type="submit" className="pl-btn-sm-create">
                Create & Add
              </button>
            </div>
          </form>
        )}

        <div className="pl-list">
          {playlists.map((pl) => {
            const hasSong = pl.songs?.some(
              (s) =>
                (s._id && song._id && s._id === song._id) ||
                (s.videoId && song.videoId && s.videoId === song.videoId) ||
                (s.title && song.title && s.title.toLowerCase() === song.title.toLowerCase())
            );

            return (
              <div
                key={pl.id}
                className={`pl-item ${hasSong ? "in-playlist" : ""}`}
                onClick={() => handleAddToPlaylist(pl.id, pl.name)}
              >
                <div className="pl-item-icon">
                  <i className="ri-folder-music-fill"></i>
                </div>
                <div className="pl-item-info">
                  <h5>{pl.name}</h5>
                  <p>{pl.songs?.length || 0} songs</p>
                </div>
                <span className="pl-action-tag">
                  {hasSong ? (
                    <span className="pl-tag-saved">
                      <i className="ri-check-line"></i> In Playlist
                    </span>
                  ) : (
                    <span className="pl-tag-add">
                      <i className="ri-add-line"></i> Add
                    </span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlaylistModal;
