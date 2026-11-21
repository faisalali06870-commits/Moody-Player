// YouTube utility helper functions & curated tracks

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

export const CURATED_YOUTUBE_SONGS = {
  happy: [
    {
      videoId: "724_FvKdyf4",
      title: "Gallan Goodiyaan",
      artist: "Farhan Akhtar, Shankar Mahadevan, Yashita Sharma",
      thumbnail: "https://img.youtube.com/vi/724_FvKdyf4/hqdefault.jpg",
      mood: "happy",
      source: "youtube",
    },
    {
      videoId: "II2EO3NwUrQ",
      title: "Badtameez Dil",
      artist: "Benny Dayal, Shefali Alvares, Pritam",
      thumbnail: "https://img.youtube.com/vi/II2EO3NwUrQ/hqdefault.jpg",
      mood: "happy",
      source: "youtube",
    },
    {
      videoId: "lkdpq3oU5t4",
      title: "Tauba Tauba",
      artist: "Karan Aujla (Bad Newz)",
      thumbnail: "https://img.youtube.com/vi/lkdpq3oU5t4/hqdefault.jpg",
      mood: "happy",
      source: "youtube",
    },
    {
      videoId: "k4yXQkGLeAA",
      title: "London Thumakda",
      artist: "Labh Janjua, Sonu Kakkar, Neha Kakkar",
      thumbnail: "https://img.youtube.com/vi/k4yXQkGLeAA/hqdefault.jpg",
      mood: "happy",
      source: "youtube",
    },
    {
      videoId: "NTHz95hkGdB",
      title: "Kar Gayi Chull",
      artist: "Badshah, Neha Kakkar, Fazilpuria",
      thumbnail: "https://img.youtube.com/vi/NTHz95hkGdB/hqdefault.jpg",
      mood: "happy",
      source: "youtube",
    },
    {
      videoId: "0n_OpV5zC60",
      title: "Ghungroo",
      artist: "Arijit Singh, Shilpa Rao, Vishal-Shekhar",
      thumbnail: "https://img.youtube.com/vi/0n_OpV5zC60/hqdefault.jpg",
      mood: "happy",
      source: "youtube",
    },
  ],
  sad: [
    {
      videoId: "bzSThVYvPzo",
      title: "Channa Mereya",
      artist: "Arijit Singh, Pritam",
      thumbnail: "https://img.youtube.com/vi/bzSThVYvPzo/hqdefault.jpg",
      mood: "sad",
      source: "youtube",
    },
    {
      videoId: "sK7riqg2mr4",
      title: "Agar Tum Saath Ho",
      artist: "Alka Yagnik, Arijit Singh, A.R. Rahman",
      thumbnail: "https://img.youtube.com/vi/sK7riqg2mr4/hqdefault.jpg",
      mood: "sad",
      source: "youtube",
    },
    {
      videoId: "VOLKJJvfAbg",
      title: "Bekhayali",
      artist: "Sachet Tandon (Kabir Singh)",
      thumbnail: "https://img.youtube.com/vi/VOLKJJvfAbg/hqdefault.jpg",
      mood: "sad",
      source: "youtube",
    },
    {
      videoId: "g0eO74UmRBs",
      title: "Kal Ho Naa Ho",
      artist: "Sonu Nigam, Shankar-Ehsaan-Loy",
      thumbnail: "https://img.youtube.com/vi/g0eO74UmRBs/hqdefault.jpg",
      mood: "sad",
      source: "youtube",
    },
    {
      videoId: "4-f-b6ZcR2g",
      title: "Hamari Adhuri Kahani",
      artist: "Arijit Singh, Jeet Gannguli",
      thumbnail: "https://img.youtube.com/vi/4-f-b6ZcR2g/hqdefault.jpg",
      mood: "sad",
      source: "youtube",
    },
  ],
  neutral: [
    {
      videoId: "BddP6PYo2gs",
      title: "Kesariya",
      artist: "Arijit Singh, Pritam (Brahmāstra)",
      thumbnail: "https://img.youtube.com/vi/BddP6PYo2gs/hqdefault.jpg",
      mood: "neutral",
      source: "youtube",
    },
    {
      videoId: "gvyUuxdRdR4",
      title: "Raataan Lambiyan",
      artist: "Jubin Nautiyal, Asees Kaur, Tanishk Bagchi",
      thumbnail: "https://img.youtube.com/vi/gvyUuxdRdR4/hqdefault.jpg",
      mood: "neutral",
      source: "youtube",
    },
    {
      videoId: "IJq0ywWFlSE",
      title: "Tum Hi Ho",
      artist: "Arijit Singh, Mithoon (Aashiqui 2)",
      thumbnail: "https://img.youtube.com/vi/IJq0ywWFlSE/hqdefault.jpg",
      mood: "neutral",
      source: "youtube",
    },
    {
      videoId: "r6tX7iX_0S4",
      title: "Shayad",
      artist: "Arijit Singh, Pritam (Love Aaj Kal)",
      thumbnail: "https://img.youtube.com/vi/r6tX7iX_0S4/hqdefault.jpg",
      mood: "neutral",
      source: "youtube",
    },
    {
      videoId: "2y2_qJv-N0s",
      title: "Pehle Bhi Main",
      artist: "Vishal Mishra, Raj Shekhar (Animal)",
      thumbnail: "https://img.youtube.com/vi/2y2_qJv-N0s/hqdefault.jpg",
      mood: "neutral",
      source: "youtube",
    },
  ],
  surprised: [
    {
      videoId: "1iApyz7uX8U",
      title: "Kala Chashma",
      artist: "Amar Arshi, Badshah, Neha Kakkar",
      thumbnail: "https://img.youtube.com/vi/1iApyz7uX8U/hqdefault.jpg",
      mood: "surprised",
      source: "youtube",
    },
    {
      videoId: "9iIX4PBplAY",
      title: "Hookah Bar",
      artist: "Himesh Reshammiya, Vineet Singh",
      thumbnail: "https://img.youtube.com/vi/9iIX4PBplAY/hqdefault.jpg",
      mood: "surprised",
      source: "youtube",
    },
    {
      videoId: "xmU0s2QURVE",
      title: "Swag Se Swagat",
      artist: "Vishal Dadlani, Neha Bhasin",
      thumbnail: "https://img.youtube.com/vi/xmU0s2QURVE/hqdefault.jpg",
      mood: "surprised",
      source: "youtube",
    },
    {
      videoId: "G5xS_gG4f8Q",
      title: "O Saki Saki",
      artist: "Neha Kakkar, Tulsi Kumar, B Praak",
      thumbnail: "https://img.youtube.com/vi/G5xS_gG4f8Q/hqdefault.jpg",
      mood: "surprised",
      source: "youtube",
    },
  ],
  angry: [
    {
      videoId: "jFGKJBPzA-o",
      title: "Apna Time Aayega",
      artist: "Ranveer Singh, DIVINE (Gully Boy)",
      thumbnail: "https://img.youtube.com/vi/jFGKJBPzA-o/hqdefault.jpg",
      mood: "angry",
      source: "youtube",
    },
    {
      videoId: "WpW4N9G7mD4",
      title: "Sultan Title Track",
      artist: "Sukhwinder Singh, Shadab Faridi",
      thumbnail: "https://img.youtube.com/vi/WpW4N9G7mD4/hqdefault.jpg",
      mood: "angry",
      source: "youtube",
    },
    {
      videoId: "l_MyUGq7pgs",
      title: "Malhari",
      artist: "Vishal Dadlani, Sanjay Leela Bhansali",
      thumbnail: "https://img.youtube.com/vi/l_MyUGq7pgs/hqdefault.jpg",
      mood: "angry",
      source: "youtube",
    },
    {
      videoId: "4z-L4k_8780",
      title: "Zinda",
      artist: "Siddharth Mahadevan (Bhaag Milkha Bhaag)",
      thumbnail: "https://img.youtube.com/vi/4z-L4k_8780/hqdefault.jpg",
      mood: "angry",
      source: "youtube",
    },
  ],
  fearful: [
    {
      videoId: "z3l_kX6oWwA",
      title: "Bhoot Hoon Main",
      artist: "Sunidhi Chauhan, Salim-Sulaiman",
      thumbnail: "https://img.youtube.com/vi/z3l_kX6oWwA/hqdefault.jpg",
      mood: "fearful",
      source: "youtube",
    },
    {
      videoId: "8lT4-tV7dZs",
      title: "Gumnaam Hai Koi",
      artist: "Lata Mangeshkar, Shankar-Jaikishan",
      thumbnail: "https://img.youtube.com/vi/8lT4-tV7dZs/hqdefault.jpg",
      mood: "fearful",
      source: "youtube",
    },
    {
      videoId: "LgC8u2M_J9o",
      title: "Panghat",
      artist: "Asees Kaur, Divya Kumar (Roohi)",
      thumbnail: "https://img.youtube.com/vi/LgC8u2M_J9o/hqdefault.jpg",
      mood: "fearful",
      source: "youtube",
    },
  ],
  disgusted: [
    {
      videoId: "9X1mC0P9k_E",
      title: "Bhaag D.K. Bose",
      artist: "Ram Sampath (Delhi Belly)",
      thumbnail: "https://img.youtube.com/vi/9X1mC0P9k_E/hqdefault.jpg",
      mood: "disgusted",
      source: "youtube",
    },
    {
      videoId: "vXQnL_U6s1g",
      title: "Emosanal Attyachaar",
      artist: "Band Master Rangeela & Rasila (Dev.D)",
      thumbnail: "https://img.youtube.com/vi/vXQnL_U6s1g/hqdefault.jpg",
      mood: "disgusted",
      source: "youtube",
    },
    {
      videoId: "H4R6Z_xJ-rU",
      title: "Character Dheela",
      artist: "Neeraj Shridhar, Amrita Kak (Ready)",
      thumbnail: "https://img.youtube.com/vi/H4R6Z_xJ-rU/hqdefault.jpg",
      mood: "disgusted",
      source: "youtube",
    },
  ],
};

export function getCuratedYouTubeTracks(mood) {
  const cleanMood = (mood || "neutral").toLowerCase().trim();
  return CURATED_YOUTUBE_SONGS[cleanMood] || CURATED_YOUTUBE_SONGS.neutral;
}
