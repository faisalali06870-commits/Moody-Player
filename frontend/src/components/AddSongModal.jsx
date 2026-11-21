import React, { useState, useEffect } from "react";
import axios from "axios";
import { extractYouTubeId, getYouTubeThumbnail } from "../utils/youtubeUtils";
import { MOOD_DETAILS } from "../data/songsData";
import "./AddSongModal.css";

const AddSongModal = ({ isOpen, onClose, onSongAdded, initialData = null, defaultMood = "neutral" }) => {
  const [sourceType, setSourceType] = useState("youtube"); // 'youtube', 'url', 'upload'
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [mood, setMood] = useState(defaultMood);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [previewCover, setPreviewCover] = useState("");

  // Populate initial data if provided (e.g. from YouTube search result)
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setArtist(initialData.artist || "");
      if (initialData.mood) setMood(initialData.mood);
      if (initialData.videoId) {
        setSourceType("youtube");
        setYoutubeUrl(`https://www.youtube.com/watch?v=${initialData.videoId}`);
        setPreviewCover(initialData.thumbnail || getYouTubeThumbnail(initialData.videoId));
      } else if (initialData.youtubeUrl) {
        setSourceType("youtube");
        setYoutubeUrl(initialData.youtubeUrl);
      } else if (initialData.audio) {
        setSourceType("url");
        setAudioUrl(initialData.audio);
      }
      if (initialData.cover) {
        setCoverUrl(initialData.cover);
        setPreviewCover(initialData.cover);
      }
    } else {
      setMood(defaultMood);
    }
  }, [initialData, defaultMood, isOpen]);

  // Handle YouTube URL change to auto-extract thumbnail & id
  const handleYoutubeUrlChange = (e) => {
    const val = e.target.value;
    setYoutubeUrl(val);
    const ytId = extractYouTubeId(val);
    if (ytId) {
      const thumb = getYouTubeThumbnail(ytId);
      setPreviewCover(thumb);
      if (!coverUrl) setCoverUrl(thumb);
    }
  };

  const handleAudioUrlChange = (e) => {
    const val = e.target.value;
    setAudioUrl(val);
    // Check if user accidentally pasted a YouTube URL in audio field
    const ytId = extractYouTubeId(val);
    if (ytId) {
      setSourceType("youtube");
      setYoutubeUrl(val);
      setPreviewCover(getYouTubeThumbnail(ytId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Please enter a song title.");
      return;
    }

    let finalSource = sourceType;
    let finalYoutubeId = "";
    let finalAudio = audioUrl.trim();
    let finalCover = coverUrl.trim() || previewCover;

    if (sourceType === "youtube") {
      finalYoutubeId = extractYouTubeId(youtubeUrl);
      if (!finalYoutubeId) {
        setError("Please enter a valid YouTube video link or 11-digit video ID.");
        return;
      }
      finalSource = "youtube";
      if (!finalCover) {
        finalCover = getYouTubeThumbnail(finalYoutubeId);
      }
    } else if (sourceType === "url") {
      if (!finalAudio) {
        setError("Please enter a direct MP3 / Audio link.");
        return;
      }
      finalSource = "audio";
    } else if (sourceType === "upload") {
      if (!file) {
        setError("Please select an MP3 audio file to upload.");
        return;
      }
      finalSource = "audio";
    }

    setIsSubmitting(true);

    try {
      const newSongObj = {
        _id: "custom-" + Date.now(),
        title: title.trim(),
        artist: artist.trim() || "Unknown Artist",
        mood: mood.toLowerCase(),
        source: finalSource,
        youtubeId: finalYoutubeId,
        audio: finalAudio,
        cover: finalCover || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop",
        isCustom: true,
      };

      // 1. Try uploading to backend MongoDB if online
      try {
        if (sourceType === "upload" && file) {
          const formData = new FormData();
          formData.append("title", newSongObj.title);
          formData.append("artist", newSongObj.artist);
          formData.append("mood", newSongObj.mood);
          formData.append("audio", file);
          if (newSongObj.cover) formData.append("cover", newSongObj.cover);

          const res = await axios.post("http://localhost:3000/songs", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 10000,
          });
          if (res.data?.song) {
            newSongObj._id = res.data.song._id;
            newSongObj.audio = res.data.song.audio;
          }
        } else {
          const res = await axios.post("http://localhost:3000/songs", {
            title: newSongObj.title,
            artist: newSongObj.artist,
            mood: newSongObj.mood,
            source: newSongObj.source,
            youtubeId: newSongObj.youtubeId,
            audio: newSongObj.audio,
            cover: newSongObj.cover,
          }, { timeout: 4000 });
          if (res.data?.song?._id) {
            newSongObj._id = res.data.song._id;
          }
        }
      } catch (backendErr) {
        console.warn("Backend save failed, saved locally:", backendErr.message);
      }

      // 2. Save in localStorage so user's songs persist across reloads
      try {
        const stored = JSON.parse(localStorage.getItem("moody_custom_songs") || "[]");
        stored.unshift(newSongObj);
        localStorage.setItem("moody_custom_songs", JSON.stringify(stored));
      } catch (storageErr) {
        console.error("Local storage error:", storageErr);
      }

      // 3. Notify parent app
      if (onSongAdded) {
        onSongAdded(newSongObj);
      }

      handleClose();
    } catch (err) {
      console.error("Failed to add song:", err);
      setError(err.message || "Failed to add song.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setArtist("");
    setYoutubeUrl("");
    setAudioUrl("");
    setCoverUrl("");
    setFile(null);
    setPreviewCover("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="add-song-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-icon">✨</span>
            <div>
              <h3>Add Your Favorite Song</h3>
              <p>Add YouTube music or MP3 tracks directly into your mood playlists</p>
            </div>
          </div>
          <button className="close-btn" onClick={handleClose} title="Close">
            <i className="ri-close-line"></i>
          </button>
        </div>

        {error && <div className="modal-error-box"><i className="ri-error-warning-fill"></i> {error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Source Selector Tabs */}
          <div className="source-tabs">
            <button
              type="button"
              className={`source-tab ${sourceType === "youtube" ? "active" : ""}`}
              onClick={() => setSourceType("youtube")}
            >
              <i className="ri-youtube-fill" style={{ color: "#ef4444" }}></i> YouTube Song
            </button>
            <button
              type="button"
              className={`source-tab ${sourceType === "url" ? "active" : ""}`}
              onClick={() => setSourceType("url")}
            >
              <i className="ri-link"></i> Audio URL (.mp3)
            </button>
            <button
              type="button"
              className={`source-tab ${sourceType === "upload" ? "active" : ""}`}
              onClick={() => setSourceType("upload")}
            >
              <i className="ri-upload-cloud-line"></i> Upload File
            </button>
          </div>

          {/* Dynamic Source Input */}
          <div className="form-group source-input-box">
            {sourceType === "youtube" && (
              <>
                <label>
                  <i className="ri-youtube-line"></i> YouTube Video Link or ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. https://www.youtube.com/watch?v=lkdpq3oU5t4 or lkdpq3oU5t4"
                  value={youtubeUrl}
                  onChange={handleYoutubeUrlChange}
                  autoFocus
                />
                <span className="hint-text">
                  Any YouTube music video or song link works! We automatically fetch the cover and video.
                </span>
              </>
            )}

            {sourceType === "url" && (
              <>
                <label>
                  <i className="ri-link-m"></i> Direct Audio / MP3 URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/song.mp3"
                  value={audioUrl}
                  onChange={handleAudioUrlChange}
                  autoFocus
                />
                <span className="hint-text">Direct audio file URL (.mp3, .aac, .m4a)</span>
              </>
            )}

            {sourceType === "upload" && (
              <>
                <label>
                  <i className="ri-file-music-line"></i> Select Audio File (.mp3)
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="file-input"
                />
                <span className="hint-text">Uploads directly to your project ImageKit storage</span>
              </>
            )}
          </div>

          {/* Song Metadata (Title & Artist) */}
          <div className="form-row">
            <div className="form-group flex-1">
              <label>Song Title *</label>
              <input
                type="text"
                placeholder="e.g. Kesariya, Tauba Tauba, Chaleya"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group flex-1">
              <label>Artist / Singer</label>
              <input
                type="text"
                placeholder="e.g. Arijit Singh, Karan Aujla"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              />
            </div>
          </div>

          {/* Mood Selector Chips */}
          <div className="form-group">
            <label>Choose Mood Playlist</label>
            <div className="mood-chips-grid">
              {Object.keys(MOOD_DETAILS).map((mKey) => {
                const info = MOOD_DETAILS[mKey];
                const isSelected = mood === mKey;
                return (
                  <button
                    key={mKey}
                    type="button"
                    className={`mood-picker-chip ${isSelected ? "selected" : ""}`}
                    onClick={() => setMood(mKey)}
                    style={{
                      borderColor: isSelected ? info.color : "rgba(255, 255, 255, 0.1)",
                      backgroundColor: isSelected ? `${info.color}25` : "rgba(255, 255, 255, 0.04)",
                      color: isSelected ? info.color : "#cbd5e1",
                    }}
                  >
                    <span>{info.emoji}</span>
                    <span>{info.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview & Optional Cover Image */}
          <div className="form-row align-center">
            <div className="cover-preview-box">
              <img
                src={previewCover || coverUrl || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop"}
                alt="Song Cover Preview"
                className="cover-preview-img"
              />
            </div>
            <div className="form-group flex-1">
              <label>Cover Art URL (Optional)</label>
              <input
                type="url"
                placeholder="https://.../cover.jpg (Auto-filled for YouTube)"
                value={coverUrl}
                onChange={(e) => {
                  setCoverUrl(e.target.value);
                  setPreviewCover(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <i className="ri-loader-4-line spin"></i> Adding Song...
                </>
              ) : (
                <>
                  <i className="ri-add-circle-fill"></i> Save Song
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSongModal;
