// YouTube utility helper functions & rich curated Hindustani + Pakistani Classics
import axios from "axios";

export function extractYouTubeId(urlOrId) {
  if (!urlOrId) return null;
  const str = String(urlOrId).trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return str;
  }
  const match = str.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  );
  return match ? match[1] : null;
}

export function getYouTubeThumbnail(videoId) {
  if (!videoId) return "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop";
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export const YOUTUBE_CATEGORIES = [
  { id: "all", label: "All Mood Hits", icon: "ri-sparkling-fill" },
  { id: "pakistani", label: "Pakistani & Coke Studio 🇵🇰", icon: "ri-music-2-fill" },
  { id: "hindustani", label: "Hindustani & Retro Classics 📻", icon: "ri-radio-2-fill" },
  { id: "sufi", label: "Sufi & Qawwali 🕊️", icon: "ri-heart-pulse-fill" },
  { id: "ghazal", label: "Ghazal & Acoustic 💫", icon: "ri-moon-clear-fill" },
];

export const CURATED_YOUTUBE_SONGS = {
  happy: [
    // Pakistani Coke Studio & Pop
    {
      videoId: "5Eqb_-j3FDA",
      title: "Pasoori",
      artist: "Ali Sethi x Shae Gill (Coke Studio 14)",
      thumbnail: "https://img.youtube.com/vi/5Eqb_-j3FDA/hqdefault.jpg",
      mood: "happy",
      category: "pakistani",
      tag: "Coke Studio 🇵🇰",
      source: "youtube",
    },
    {
      videoId: "zQDAi8tP-cU",
      title: "Kana Yaari",
      artist: "Kaifi Khalil, Eva B, Wahab Bugti (Coke Studio 14)",
      thumbnail: "https://img.youtube.com/vi/zQDAi8tP-cU/hqdefault.jpg",
      mood: "happy",
      category: "pakistani",
      tag: "Coke Studio 🇵🇰",
      source: "youtube",
    },
    {
      videoId: "FwRrqfUf5yA",
      title: "Channo",
      artist: "Ali Zafar (Classic Pop)",
      thumbnail: "https://img.youtube.com/vi/FwRrqfUf5yA/hqdefault.jpg",
      mood: "happy",
      category: "pakistani",
      tag: "Pakistani Pop 🇵🇰",
      source: "youtube",
    },
    {
      videoId: "87aR9N1s0E8",
      title: "Disco Deewane",
      artist: "Nazia Hassan & Zoheb Hassan",
      thumbnail: "https://img.youtube.com/vi/87aR9N1s0E8/hqdefault.jpg",
      mood: "happy",
      category: "pakistani",
      tag: "Retro Pop 🇵🇰",
      source: "youtube",
    },
    // Hindustani / Retro Classics
    {
      videoId: "vo1MyS1xUp8",
      title: "Mere Sapno Ki Rani",
      artist: "Kishore Kumar (Aradhana)",
      thumbnail: "https://img.youtube.com/vi/vo1MyS1xUp8/hqdefault.jpg",
      mood: "happy",
      category: "hindustani",
      tag: "Retro Classic 📻",
      source: "youtube",
    },
    {
      videoId: "hZ4W7M5Jm2Y",
      title: "Chura Liya Hai Tumne Jo Dil Ko",
      artist: "Asha Bhosle, Mohammed Rafi, R.D. Burman",
      thumbnail: "https://img.youtube.com/vi/hZ4W7M5Jm2Y/hqdefault.jpg",
      mood: "happy",
      category: "hindustani",
      tag: "Retro Classic 📻",
      source: "youtube",
    },
    {
      videoId: "69V9p1sYtIo",
      title: "Gulabi Aankhen",
      artist: "Mohammed Rafi (The Train)",
      thumbnail: "https://img.youtube.com/vi/69V9p1sYtIo/hqdefault.jpg",
      mood: "happy",
      category: "hindustani",
      tag: "Retro Classic 📻",
      source: "youtube",
    },
    {
      videoId: "YOYN9qNXmAw",
      title: "Chaiyya Chaiyya",
      artist: "Sukhwinder Singh, Sapna Awasthi, A.R. Rahman",
      thumbnail: "https://img.youtube.com/vi/YOYN9qNXmAw/hqdefault.jpg",
      mood: "happy",
      category: "hindustani",
      tag: "Bollywood Evergreen ⚡",
      source: "youtube",
    },
    {
      videoId: "724_FvKdyf4",
      title: "Gallan Goodiyaan",
      artist: "Farhan Akhtar, Shankar Mahadevan, Yashita Sharma",
      thumbnail: "https://img.youtube.com/vi/724_FvKdyf4/hqdefault.jpg",
      mood: "happy",
      category: "hindustani",
      tag: "Party Hit 🎉",
      source: "youtube",
    },
    {
      videoId: "lkdpq3oU5t4",
      title: "Tauba Tauba",
      artist: "Karan Aujla (Bad Newz)",
      thumbnail: "https://img.youtube.com/vi/lkdpq3oU5t4/hqdefault.jpg",
      mood: "happy",
      category: "hindustani",
      tag: "Latest Hit 🔥",
      source: "youtube",
    },
    {
      videoId: "k4yXQkGLeAA",
      title: "London Thumakda",
      artist: "Labh Janjua, Sonu Kakkar, Neha Kakkar",
      thumbnail: "https://img.youtube.com/vi/k4yXQkGLeAA/hqdefault.jpg",
      mood: "happy",
      category: "hindustani",
      tag: "Wedding Anthem 💃",
      source: "youtube",
    },
  ],

  sad: [
    // Pakistani Soulful & Melancholy
    {
      videoId: "_XbvH9XbH7o",
      title: "Kahani Suno 2.0",
      artist: "Kaifi Khalil",
      thumbnail: "https://img.youtube.com/vi/_XbvH9XbH7o/hqdefault.jpg",
      mood: "sad",
      category: "pakistani",
      tag: "Viral Hit 🇵🇰",
      source: "youtube",
    },
    {
      videoId: "1tZ1YQ_s6nE",
      title: "Ranjish Hi Sahi",
      artist: "Ali Sethi (Coke Studio 10)",
      thumbnail: "https://img.youtube.com/vi/1tZ1YQ_s6nE/hqdefault.jpg",
      mood: "sad",
      category: "ghazal",
      tag: "Ghazal Classic 💫",
      source: "youtube",
    },
    {
      videoId: "hXp8u3K2V9o",
      title: "Faasle",
      artist: "Kaavish (Coke Studio 4)",
      thumbnail: "https://img.youtube.com/vi/hXp8u3K2V9o/hqdefault.jpg",
      mood: "sad",
      category: "pakistani",
      tag: "Coke Studio 🇵🇰",
      source: "youtube",
    },
    {
      videoId: "yGzQx7_xK8U",
      title: "Aadat (Deep Soul)",
      artist: "Atif Aslam, Goher Mumtaz (Jal)",
      thumbnail: "https://img.youtube.com/vi/yGzQx7_xK8U/hqdefault.jpg",
      mood: "sad",
      category: "pakistani",
      tag: "Nostalgic Rock 🎸",
      source: "youtube",
    },
    {
      videoId: "d6y3X6N6G_g",
      title: "Bulleya (Pain of Separation)",
      artist: "Quratulain Balouch (QB)",
      thumbnail: "https://img.youtube.com/vi/d6y3X6N6G_g/hqdefault.jpg",
      mood: "sad",
      category: "sufi",
      tag: "Sufi Soul 🕊️",
      source: "youtube",
    },
    // Hindustani / Retro Sad Classics
    {
      videoId: "TFr6G5zveS8",
      title: "Lag Ja Gale",
      artist: "Lata Mangeshkar, Madan Mohan (Woh Kaun Thi)",
      thumbnail: "https://img.youtube.com/vi/TFr6G5zveS8/hqdefault.jpg",
      mood: "sad",
      category: "hindustani",
      tag: "Timeless Gem 📻",
      source: "youtube",
    },
    {
      videoId: "8j-V2tQ-Pyo",
      title: "Ajeeb Dastan Hai Yeh",
      artist: "Lata Mangeshkar (Dil Apna Aur Preet Parai)",
      thumbnail: "https://img.youtube.com/vi/8j-V2tQ-Pyo/hqdefault.jpg",
      mood: "sad",
      category: "hindustani",
      tag: "Retro Gold 📻",
      source: "youtube",
    },
    {
      videoId: "Gv5r0D_r5aA",
      title: "Hothon Se Chhoo Lo Tum",
      artist: "Jagjit Singh (Prem Geet)",
      thumbnail: "https://img.youtube.com/vi/Gv5r0D_r5aA/hqdefault.jpg",
      mood: "sad",
      category: "ghazal",
      tag: "Ghazal Maestro 💫",
      source: "youtube",
    },
    {
      videoId: "N0rQ7V4_e3o",
      title: "Jhuki Jhuki Si Nazar",
      artist: "Jagjit Singh (Arth)",
      thumbnail: "https://img.youtube.com/vi/N0rQ7V4_e3o/hqdefault.jpg",
      mood: "sad",
      category: "ghazal",
      tag: "Ghazal Masterpiece 💫",
      source: "youtube",
    },
    {
      videoId: "g0eO74UmRBs",
      title: "Kal Ho Naa Ho",
      artist: "Sonu Nigam, Shankar-Ehsaan-Loy",
      thumbnail: "https://img.youtube.com/vi/g0eO74UmRBs/hqdefault.jpg",
      mood: "sad",
      category: "hindustani",
      tag: "Bollywood Evergreen 💔",
      source: "youtube",
    },
    {
      videoId: "bzSThVYvPzo",
      title: "Channa Mereya",
      artist: "Arijit Singh, Pritam (Ae Dil Hai Mushkil)",
      thumbnail: "https://img.youtube.com/vi/bzSThVYvPzo/hqdefault.jpg",
      mood: "sad",
      category: "hindustani",
      tag: "Arijit Singh 💔",
      source: "youtube",
    },
    {
      videoId: "sK7riqg2mr4",
      title: "Agar Tum Saath Ho",
      artist: "Alka Yagnik, Arijit Singh, A.R. Rahman",
      thumbnail: "https://img.youtube.com/vi/sK7riqg2mr4/hqdefault.jpg",
      mood: "sad",
      category: "hindustani",
      tag: "Heartbreak Anthem 💔",
      source: "youtube",
    },
  ],

  neutral: [
    // Pakistani Coke Studio & Acoustic
    {
      videoId: "7D4vNcK6D38",
      title: "Tu Jhoom",
      artist: "Abida Parveen x Naseebo Lal (Coke Studio 14)",
      thumbnail: "https://img.youtube.com/vi/7D4vNcK6D38/hqdefault.jpg",
      mood: "neutral",
      category: "sufi",
      tag: "Coke Studio Masterpiece 🇵🇰",
      source: "youtube",
    },
    {
      videoId: "kw4tT7SCmaY",
      title: "Afreen Afreen",
      artist: "Rahat Fateh Ali Khan x Momina Mustehsan (Coke Studio 9)",
      thumbnail: "https://img.youtube.com/vi/kw4tT7SCmaY/hqdefault.jpg",
      mood: "neutral",
      category: "pakistani",
      tag: "Coke Studio Viral 🇵🇰",
      source: "youtube",
    },
    {
      videoId: "8367ETnagHo",
      title: "Tera Woh Pyar (Nawazishein Karam)",
      artist: "Momina Mustehsan & Asim Azhar (Coke Studio 9)",
      thumbnail: "https://img.youtube.com/vi/8367ETnagHo/hqdefault.jpg",
      mood: "neutral",
      category: "pakistani",
      tag: "Coke Studio Romantic 💫",
      source: "youtube",
    },
    {
      videoId: "0b_bcxtGf7s",
      title: "Chaap Tilak",
      artist: "Abida Parveen & Rahat Fateh Ali Khan (Coke Studio 7)",
      thumbnail: "https://img.youtube.com/vi/0b_bcxtGf7s/hqdefault.jpg",
      mood: "neutral",
      category: "sufi",
      tag: "Sufi Classic 🕊️",
      source: "youtube",
    },
    {
      videoId: "p3c7Q9_sJ0o",
      title: "Baari",
      artist: "Bilal Saeed & Momina Mustehsan",
      thumbnail: "https://img.youtube.com/vi/p3c7Q9_sJ0o/hqdefault.jpg",
      mood: "neutral",
      category: "pakistani",
      tag: "Melody Hit 🇵🇰",
      source: "youtube",
    },
    // Hindustani / Retro Peaceful Melodies
    {
      videoId: "E2o7_v4_7oA",
      title: "Pal Pal Dil Ke Paas",
      artist: "Kishore Kumar, Kalyanji-Anandji (Blackmail)",
      thumbnail: "https://img.youtube.com/vi/E2o7_v4_7oA/hqdefault.jpg",
      mood: "neutral",
      category: "hindustani",
      tag: "Retro Evergreen 📻",
      source: "youtube",
    },
    {
      videoId: "8U9T8M3eY0E",
      title: "Kabhie Kabhie Mere Dil Mein",
      artist: "Mukesh, Khayyam (Kabhi Kabhie)",
      thumbnail: "https://img.youtube.com/vi/8U9T8M3eY0E/hqdefault.jpg",
      mood: "neutral",
      category: "hindustani",
      tag: "Timeless Poetry 📻",
      source: "youtube",
    },
    {
      videoId: "o_V7a_x9-yA",
      title: "Yeh Shaam Mastani",
      artist: "Kishore Kumar, R.D. Burman (Kati Patang)",
      thumbnail: "https://img.youtube.com/vi/o_V7a_x9-yA/hqdefault.jpg",
      mood: "neutral",
      category: "hindustani",
      tag: "Soothing Retro 📻",
      source: "youtube",
    },
    {
      videoId: "T94PHkuydcw",
      title: "Kun Faya Kun",
      artist: "A.R. Rahman, Javed Ali, Mohit Chauhan (Rockstar)",
      thumbnail: "https://img.youtube.com/vi/T94PHkuydcw/hqdefault.jpg",
      mood: "neutral",
      category: "sufi",
      tag: "Divine Sufi 🕊️",
      source: "youtube",
    },
    {
      videoId: "BddP6PYo2gs",
      title: "Kesariya",
      artist: "Arijit Singh, Pritam (Brahmāstra)",
      thumbnail: "https://img.youtube.com/vi/BddP6PYo2gs/hqdefault.jpg",
      mood: "neutral",
      category: "hindustani",
      tag: "Romantic Hit 💫",
      source: "youtube",
    },
    {
      videoId: "IJq0ywWFlSE",
      title: "Tum Hi Ho",
      artist: "Arijit Singh, Mithoon (Aashiqui 2)",
      thumbnail: "https://img.youtube.com/vi/IJq0ywWFlSE/hqdefault.jpg",
      mood: "neutral",
      category: "hindustani",
      tag: "Modern Classic 💫",
      source: "youtube",
    },
    {
      videoId: "2y2_qJv-N0s",
      title: "Pehle Bhi Main",
      artist: "Vishal Mishra, Raj Shekhar (Animal)",
      thumbnail: "https://img.youtube.com/vi/2y2_qJv-N0s/hqdefault.jpg",
      mood: "neutral",
      category: "hindustani",
      tag: "Soothing Melody 💫",
      source: "youtube",
    },
  ],

  surprised: [
    {
      videoId: "xmU0s2QURVE",
      title: "Swag Se Swagat",
      artist: "Vishal Dadlani, Neha Bhasin",
      thumbnail: "https://img.youtube.com/vi/xmU0s2QURVE/hqdefault.jpg",
      mood: "surprised",
      category: "hindustani",
      tag: "Party Blockbuster 🎉",
      source: "youtube",
    },
    {
      videoId: "1iApyz7uX8U",
      title: "Kala Chashma",
      artist: "Amar Arshi, Badshah, Neha Kakkar",
      thumbnail: "https://img.youtube.com/vi/1iApyz7uX8U/hqdefault.jpg",
      mood: "surprised",
      category: "hindustani",
      tag: "Global Viral 🔥",
      source: "youtube",
    },
    {
      videoId: "9iIX4PBplAY",
      title: "Hookah Bar",
      artist: "Himesh Reshammiya, Vineet Singh",
      thumbnail: "https://img.youtube.com/vi/9iIX4PBplAY/hqdefault.jpg",
      mood: "surprised",
      category: "hindustani",
      tag: "Dance Anthem 💥",
      source: "youtube",
    },
    {
      videoId: "kK3c1xG646w",
      title: "Yeh Jo Halka Halka Suroor Hai",
      artist: "Nusrat Fateh Ali Khan (Qawwali Masterpiece)",
      thumbnail: "https://img.youtube.com/vi/kK3c1xG646w/hqdefault.jpg",
      mood: "surprised",
      category: "sufi",
      tag: "Nusrat Legacy 🇵🇰",
      source: "youtube",
    },
    {
      videoId: "G5xS_gG4f8Q",
      title: "O Saki Saki",
      artist: "Neha Kakkar, Tulsi Kumar, B Praak",
      thumbnail: "https://img.youtube.com/vi/G5xS_gG4f8Q/hqdefault.jpg",
      mood: "surprised",
      category: "hindustani",
      tag: "High Energy ⚡",
      source: "youtube",
    },
  ],

  angry: [
    {
      videoId: "cM4c0xWb9pE",
      title: "Tajdar-e-Haram",
      artist: "Atif Aslam (Coke Studio 8)",
      thumbnail: "https://img.youtube.com/vi/cM4c0xWb9pE/hqdefault.jpg",
      mood: "angry",
      category: "sufi",
      tag: "Soul Stirring 🕊️",
      source: "youtube",
    },
    {
      videoId: "zU95C7h3bVk",
      title: "Dama Dam Mast Qalandar",
      artist: "Nusrat Fateh Ali Khan",
      thumbnail: "https://img.youtube.com/vi/zU95C7h3bVk/hqdefault.jpg",
      mood: "angry",
      category: "sufi",
      tag: "Pure Sufi Energy 🔥",
      source: "youtube",
    },
    {
      videoId: "T4V2pE1xG_M",
      title: "Sayonee",
      artist: "Junoon (Sufi Rock Pioneer)",
      thumbnail: "https://img.youtube.com/vi/T4V2pE1xG_M/hqdefault.jpg",
      mood: "angry",
      category: "pakistani",
      tag: "Pakistani Sufi Rock 🇵🇰",
      source: "youtube",
    },
    {
      videoId: "jFGKJBPzA-o",
      title: "Apna Time Aayega",
      artist: "Ranveer Singh, DIVINE (Gully Boy)",
      thumbnail: "https://img.youtube.com/vi/jFGKJBPzA-o/hqdefault.jpg",
      mood: "angry",
      category: "hindustani",
      tag: "Desi Hip-Hop 🔥",
      source: "youtube",
    },
    {
      videoId: "WpW4N9G7mD4",
      title: "Sultan Title Track",
      artist: "Sukhwinder Singh, Shadab Faridi",
      thumbnail: "https://img.youtube.com/vi/WpW4N9G7mD4/hqdefault.jpg",
      mood: "angry",
      category: "hindustani",
      tag: "Power Anthem ⚡",
      source: "youtube",
    },
    {
      videoId: "l_MyUGq7pgs",
      title: "Malhari",
      artist: "Vishal Dadlani, Sanjay Leela Bhansali",
      thumbnail: "https://img.youtube.com/vi/l_MyUGq7pgs/hqdefault.jpg",
      mood: "angry",
      category: "hindustani",
      tag: "High Energy Victory 🥁",
      source: "youtube",
    },
  ],

  fearful: [
    {
      videoId: "8lT4-tV7dZs",
      title: "Gumnaam Hai Koi",
      artist: "Lata Mangeshkar, Shankar-Jaikishan",
      thumbnail: "https://img.youtube.com/vi/8lT4-tV7dZs/hqdefault.jpg",
      mood: "fearful",
      category: "hindustani",
      tag: "Haunting Retro 📻",
      source: "youtube",
    },
    {
      videoId: "z3l_kX6oWwA",
      title: "Bhoot Hoon Main",
      artist: "Sunidhi Chauhan, Salim-Sulaiman",
      thumbnail: "https://img.youtube.com/vi/z3l_kX6oWwA/hqdefault.jpg",
      mood: "fearful",
      category: "hindustani",
      tag: "Dark Thriller 🌙",
      source: "youtube",
    },
    {
      videoId: "R4aQ7-l7w98",
      title: "Man Kunto Maula",
      artist: "Javed Bashir (Coke Studio)",
      thumbnail: "https://img.youtube.com/vi/R4aQ7-l7w98/hqdefault.jpg",
      mood: "fearful",
      category: "sufi",
      tag: "Mystical Sufi 🕊️",
      source: "youtube",
    },
    {
      videoId: "LgC8u2M_J9o",
      title: "Panghat",
      artist: "Asees Kaur, Divya Kumar (Roohi)",
      thumbnail: "https://img.youtube.com/vi/LgC8u2M_J9o/hqdefault.jpg",
      mood: "fearful",
      category: "hindustani",
      tag: "Horror Beat ⚡",
      source: "youtube",
    },
  ],

  disgusted: [
    {
      videoId: "p9K7C_sV22E",
      title: "Hamesha (Alternative Rock)",
      artist: "Entity Paradigm (EP) / Fawad Khan",
      thumbnail: "https://img.youtube.com/vi/p9K7C_sV22E/hqdefault.jpg",
      mood: "disgusted",
      category: "pakistani",
      tag: "Pakistani Rock 🎸",
      source: "youtube",
    },
    {
      videoId: "9X1mC0P9k_E",
      title: "Bhaag D.K. Bose",
      artist: "Ram Sampath (Delhi Belly)",
      thumbnail: "https://img.youtube.com/vi/9X1mC0P9k_E/hqdefault.jpg",
      mood: "disgusted",
      category: "hindustani",
      tag: "Rebel Rock 💥",
      source: "youtube",
    },
    {
      videoId: "vXQnL_U6s1g",
      title: "Emosanal Attyachaar",
      artist: "Band Master Rangeela & Rasila (Dev.D)",
      thumbnail: "https://img.youtube.com/vi/vXQnL_U6s1g/hqdefault.jpg",
      mood: "disgusted",
      category: "hindustani",
      tag: "Cult Hit 🎺",
      source: "youtube",
    },
    {
      videoId: "H4R6Z_xJ-rU",
      title: "Character Dheela",
      artist: "Neeraj Shridhar, Amrita Kak",
      thumbnail: "https://img.youtube.com/vi/H4R6Z_xJ-rU/hqdefault.jpg",
      mood: "disgusted",
      category: "hindustani",
      tag: "Funky Beat 🕺",
      source: "youtube",
    },
  ],
};

export function getCuratedYouTubeTracks(mood) {
  const cleanMood = (mood || "neutral").toLowerCase().trim();
  return CURATED_YOUTUBE_SONGS[cleanMood] || CURATED_YOUTUBE_SONGS.neutral;
}

// Universal World Song Searcher (searches ANY song in the entire world with zero lag)
export async function searchWorldSongs(query, apiKey = "") {
  if (!query || !query.trim()) return [];
  const cleanQ = query.trim();

  // 1. Direct YouTube link or 11-char ID
  const directId = extractYouTubeId(cleanQ);
  if (directId) {
    return [
      {
        _id: "yt-" + directId,
        videoId: directId,
        youtubeId: directId,
        title: "YouTube Video: " + directId,
        artist: "YouTube",
        thumbnail: `https://img.youtube.com/vi/${directId}/hqdefault.jpg`,
        cover: `https://img.youtube.com/vi/${directId}/hqdefault.jpg`,
        source: "youtube",
        tag: "Direct Link 🔗",
      },
    ];
  }

  const results = [];
  const seenKeys = new Set();

  const addUnique = (song) => {
    if (!song || !song.title) return;
    const key = `${(song.title || "").toLowerCase()} ${(song.artist || "").toLowerCase()}`.trim();
    if (key && !seenKeys.has(key)) {
      seenKeys.add(key);
      results.push(song);
    }
  };

  // 2. High-speed worldwide audio catalog search (No API key needed, CORS enabled, HTTPS safe for GitHub Pages)
  try {
    const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(cleanQ)}&media=music&entity=song&limit=30`;
    const itunesRes = await axios.get(itunesUrl, { timeout: 4000 });
    if (itunesRes.data?.results?.length > 0) {
      itunesRes.data.results.forEach((it) => {
        const coverArt = it.artworkUrl100
          ? it.artworkUrl100.replace("100x100bb.jpg", "600x600bb.jpg")
          : "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500";
        addUnique({
          _id: "world-" + it.trackId,
          title: it.trackName,
          artist: it.artistName,
          audio: it.previewUrl,
          previewUrl: it.previewUrl,
          cover: coverArt,
          thumbnail: coverArt,
          source: "audio",
          duration: it.trackTimeMillis ? Math.round(it.trackTimeMillis / 1000) : 30,
          tag: "World Hit 🌍",
          youtubeQuery: `${it.trackName} ${it.artistName}`,
        });
      });
    }
  } catch (err) {
    console.warn("World catalog search note:", err?.message || err);
  }

  // 3. Try YouTube Data API v3 if user provided an API key
  if (apiKey && apiKey.trim()) {
    try {
      const ytRes = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${encodeURIComponent(
          cleanQ
        )}&type=video&key=${apiKey.trim()}`,
        { timeout: 3500 }
      );
      if (ytRes.data?.items?.length > 0) {
        ytRes.data.items.forEach((it) => {
          const vId = it.id?.videoId;
          if (vId) {
            const thumb =
              it.snippet?.thumbnails?.high?.url ||
              it.snippet?.thumbnails?.medium?.url ||
              `https://img.youtube.com/vi/${vId}/hqdefault.jpg`;
            addUnique({
              _id: "yt-" + vId,
              videoId: vId,
              youtubeId: vId,
              title: it.snippet.title,
              artist: it.snippet.channelTitle,
              thumbnail: thumb,
              cover: thumb,
              source: "youtube",
              tag: "YouTube Search 🔴",
            });
          }
        });
      }
    } catch (e) {
      console.warn("YouTube API search warning:", e?.message);
    }
  }

  // 4. Try local backend search engine only if running on localhost (never on GitHub Pages to prevent mixed-content blocks)
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    try {
      const backendRes = await axios.get(
        `http://localhost:3000/api/youtube/search?q=${encodeURIComponent(cleanQ)}`,
        { timeout: 1500 }
      );
      if (backendRes.data?.songs?.length > 0) {
        backendRes.data.songs.forEach((s) => addUnique(s));
      }
    } catch {
      // Local backend offline
    }
  }

  // 5. Always provide instant YouTube Search Stream card so user can play any song via YouTube
  addUnique({
    _id: "yt-stream-" + encodeURIComponent(cleanQ.toLowerCase()),
    title: `Play "${cleanQ}" (Full YouTube Stream)`,
    artist: "YouTube Live Audio",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500",
    source: "youtube",
    youtubeQuery: cleanQ,
    tag: "YouTube Live ⚡",
  });

  return results;
}
