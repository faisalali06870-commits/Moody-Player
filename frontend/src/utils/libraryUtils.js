// libraryUtils.js - Master Unified Music Library for instant universal search

import { DEFAULT_SONGS } from "../data/songsData";
import { CURATED_YOUTUBE_SONGS, searchWorldSongs } from "./youtubeUtils";

export function getAllLibrarySongs() {
  const songsList = [];
  const seenTitles = new Set();

  // 1. Add any custom songs added by user
  try {
    const custom = JSON.parse(localStorage.getItem("moody_custom_songs") || "[]");
    custom.forEach((s) => {
      const normTitle = (s.title || "").toLowerCase().trim();
      if (normTitle && !seenTitles.has(normTitle)) {
        seenTitles.add(normTitle);
        songsList.push({
          ...s,
          _id: s._id || "custom-" + Date.now(),
          isCustom: true,
          tag: s.tag || "My Song ✨",
        });
      }
    });
  } catch (e) {
    console.error("Error reading custom songs:", e);
  }

  // 2. Add all 105 Bollywood Songs
  DEFAULT_SONGS.forEach((s) => {
    const normTitle = (s.title || "").toLowerCase().trim();
    if (normTitle && !seenTitles.has(normTitle)) {
      seenTitles.add(normTitle);
      songsList.push({
        ...s,
        source: "audio",
        tag: s.mood === "romantic" ? "Romantic Hit ❤️" : (s.tag || "Bollywood Hit 🎵"),
      });
    }
  });

  // 3. Add all Pakistani Coke Studio & Hindustani Retro YouTube Classics
  Object.keys(CURATED_YOUTUBE_SONGS).forEach((moodKey) => {
    const moodSongs = CURATED_YOUTUBE_SONGS[moodKey] || [];
    moodSongs.forEach((s) => {
      const normTitle = (s.title || "").toLowerCase().trim();
      if (normTitle && !seenTitles.has(normTitle)) {
        seenTitles.add(normTitle);
        songsList.push({
          _id: "yt-" + s.videoId,
          title: s.title,
          artist: s.artist,
          mood: s.mood || moodKey,
          cover: s.thumbnail,
          source: "youtube",
          youtubeId: s.videoId,
          tag: s.tag || "Classic Hit 🎙️",
        });
      }
    });
  });

  return songsList;
}

// Search across all local songs (instant 0ms response)
export function searchLibrarySongs(query) {
  if (!query || !query.trim()) {
    return getAllLibrarySongs();
  }
  const q = query.toLowerCase().trim();
  const all = getAllLibrarySongs();

  return all.filter((s) => {
    const titleMatch = (s.title || "").toLowerCase().includes(q);
    const artistMatch = (s.artist || "").toLowerCase().includes(q);
    const moodMatch = (s.mood || "").toLowerCase().includes(q);
    const tagMatch = (s.tag || "").toLowerCase().includes(q);
    return titleMatch || artistMatch || moodMatch || tagMatch;
  });
}

// Master Unified World Search: searches 150+ local Bollywood/Pakistani classics + any song in the world
export async function searchUnifiedSongs(query, apiKey = "") {
  if (!query || !query.trim()) {
    return getAllLibrarySongs();
  }

  // 1. Instant local results
  const localMatches = searchLibrarySongs(query);

  // 2. World catalog results
  const worldMatches = await searchWorldSongs(query, apiKey);

  // 3. Deduplicate
  const seen = new Set();
  const combined = [];

  for (const s of [...localMatches, ...worldMatches]) {
    const key = `${(s.title || "").toLowerCase()} ${(s.artist || "").toLowerCase()}`.trim();
    if (key && !seen.has(key)) {
      seen.add(key);
      combined.push(s);
    }
  }

  return combined;
}
