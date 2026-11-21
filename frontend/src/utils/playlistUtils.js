// playlistUtils.js - Full Playlist & Favorites Manager with LocalStorage Persistence

const LIKED_STORAGE_KEY = "moody_liked_songs";
const PLAYLISTS_STORAGE_KEY = "moody_custom_playlists";

// Get all Liked / Favorite songs
export function getLikedSongs() {
  try {
    const data = localStorage.getItem(LIKED_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error reading liked songs:", e);
    return [];
  }
}

// Check if a song is already liked
export function isSongLiked(songId, songTitle) {
  const liked = getLikedSongs();
  return liked.some(
    (s) =>
      (s._id && songId && s._id === songId) ||
      (s.videoId && songId && s.videoId === songId) ||
      (s.title && songTitle && s.title.toLowerCase() === songTitle.toLowerCase())
  );
}

// Toggle like/favorite on a song
export function toggleLikeSong(song) {
  if (!song) return false;
  const liked = getLikedSongs();
  const songId = song._id || song.videoId || song.title;

  const existsIndex = liked.findIndex(
    (s) =>
      (s._id && song._id && s._id === song._id) ||
      (s.videoId && song.videoId && s.videoId === song.videoId) ||
      (s.title && song.title && s.title.toLowerCase() === song.title.toLowerCase())
  );

  let newLiked = [];
  let isNowLiked = false;

  if (existsIndex >= 0) {
    // Remove from liked
    newLiked = liked.filter((_, idx) => idx !== existsIndex);
    isNowLiked = false;
  } else {
    // Add to liked (at top)
    const normalizedSong = {
      ...song,
      _id: song._id || song.videoId || "song-" + Date.now(),
      likedAt: Date.now(),
    };
    newLiked = [normalizedSong, ...liked];
    isNowLiked = true;
  }

  try {
    localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(newLiked));
  } catch (e) {
    console.error("Error saving liked songs:", e);
  }

  return isNowLiked;
}

// Get all user custom created playlists
export function getUserPlaylists() {
  try {
    const data = localStorage.getItem(PLAYLISTS_STORAGE_KEY);
    if (!data) {
      // Default initial starter playlist
      const defaultPlaylists = [
        {
          id: "pl-favorites",
          name: "My All-Time Favorites ❤️",
          description: "Songs you love listening to anytime",
          createdAt: Date.now(),
          songs: [],
        },
        {
          id: "pl-chill",
          name: "Late Night Chill & Relax 🌙",
          description: "Soothing acoustic and classic melodies",
          createdAt: Date.now(),
          songs: [],
        },
      ];
      localStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify(defaultPlaylists));
      return defaultPlaylists;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error("Error reading custom playlists:", e);
    return [];
  }
}

// Create a new custom playlist
export function createPlaylist(name, description = "") {
  const playlists = getUserPlaylists();
  const newPl = {
    id: "pl-" + Date.now(),
    name: name.trim() || "My New Playlist",
    description: description.trim(),
    createdAt: Date.now(),
    songs: [],
  };

  const updated = [newPl, ...playlists];
  try {
    localStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Error saving playlist:", e);
  }
  return newPl;
}

// Add a song to a specific playlist
export function addSongToPlaylist(playlistId, song) {
  if (!playlistId || !song) return false;
  const playlists = getUserPlaylists();
  const pl = playlists.find((p) => p.id === playlistId);
  if (!pl) return false;

  // Prevent duplicates in the same playlist
  const alreadyIn = pl.songs.some(
    (s) =>
      (s._id && song._id && s._id === song._id) ||
      (s.videoId && song.videoId && s.videoId === song.videoId) ||
      (s.title && song.title && s.title.toLowerCase() === song.title.toLowerCase())
  );

  if (!alreadyIn) {
    pl.songs.unshift({
      ...song,
      _id: song._id || song.videoId || "song-" + Date.now(),
      addedAt: Date.now(),
    });

    try {
      localStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify(playlists));
    } catch (e) {
      console.error("Error saving playlist:", e);
    }
    return true;
  }

  return false;
}

// Remove a song from a playlist
export function removeSongFromPlaylist(playlistId, songId, songTitle) {
  const playlists = getUserPlaylists();
  const pl = playlists.find((p) => p.id === playlistId);
  if (!pl) return false;

  pl.songs = pl.songs.filter(
    (s) =>
      !(
        (s._id && songId && s._id === songId) ||
        (s.videoId && songId && s.videoId === songId) ||
        (s.title && songTitle && s.title.toLowerCase() === songTitle.toLowerCase())
      )
  );

  try {
    localStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify(playlists));
  } catch (e) {
    console.error("Error saving playlist:", e);
  }
  return true;
}

// Delete a custom playlist
export function deletePlaylist(playlistId) {
  const playlists = getUserPlaylists();
  const updated = playlists.filter((p) => p.id !== playlistId);
  try {
    localStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Error deleting playlist:", e);
  }
  return updated;
}
