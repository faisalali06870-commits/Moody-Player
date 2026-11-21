// Curated YouTube Bollywood Tracks for all 7 moods
const YOUTUBE_MOOD_SONGS = {
  happy: [
    {
      videoId: "724_FvKdyf4",
      title: "Gallan Goodiyaan - Dil Dhadakne Do",
      artist: "Yashita Sharma, Manish Kumar Tipu, Farhan Akhtar",
      thumbnail: "https://img.youtube.com/vi/724_FvKdyf4/hqdefault.jpg",
      mood: "happy",
    },
    {
      videoId: "II2EO3NwUrQ",
      title: "Badtameez Dil - Yeh Jawaani Hai Deewani",
      artist: "Benny Dayal, Shefali Alvares",
      thumbnail: "https://img.youtube.com/vi/II2EO3NwUrQ/hqdefault.jpg",
      mood: "happy",
    },
    {
      videoId: "NTHz95hkGdB",
      title: "Kar Gayi Chull - Kapoor & Sons",
      artist: "Badshah, Neha Kakkar, Fazilpuria",
      thumbnail: "https://img.youtube.com/vi/NTHz95hkGdB/hqdefault.jpg",
      mood: "happy",
    },
    {
      videoId: "k4yXQkGLeAA",
      title: "London Thumakda - Queen",
      artist: "Labh Janjua, Sonu Kakkar, Neha Kakkar",
      thumbnail: "https://img.youtube.com/vi/k4yXQkGLeAA/hqdefault.jpg",
      mood: "happy",
    },
    {
      videoId: "lkdpq3oU5t4",
      title: "Tauba Tauba - Bad Newz",
      artist: "Karan Aujla",
      thumbnail: "https://img.youtube.com/vi/lkdpq3oU5t4/hqdefault.jpg",
      mood: "happy",
    },
    {
      videoId: "0n_OpV5zC60",
      title: "Ghungroo - War",
      artist: "Arijit Singh, Shilpa Rao",
      thumbnail: "https://img.youtube.com/vi/0n_OpV5zC60/hqdefault.jpg",
      mood: "happy",
    },
  ],
  sad: [
    {
      videoId: "bzSThVYvPzo",
      title: "Channa Mereya - Ae Dil Hai Mushkil",
      artist: "Arijit Singh, Pritam",
      thumbnail: "https://img.youtube.com/vi/bzSThVYvPzo/hqdefault.jpg",
      mood: "sad",
    },
    {
      videoId: "VOLKJJvfAbg",
      title: "Bekhayali - Kabir Singh",
      artist: "Sachet Tandon",
      thumbnail: "https://img.youtube.com/vi/VOLKJJvfAbg/hqdefault.jpg",
      mood: "sad",
    },
    {
      videoId: "sK7riqg2mr4",
      title: "Agar Tum Saath Ho - Tamasha",
      artist: "Alka Yagnik, Arijit Singh",
      thumbnail: "https://img.youtube.com/vi/sK7riqg2mr4/hqdefault.jpg",
      mood: "sad",
    },
    {
      videoId: "g0eO74UmRBs",
      title: "Kal Ho Naa Ho - Title Track",
      artist: "Sonu Nigam",
      thumbnail: "https://img.youtube.com/vi/g0eO74UmRBs/hqdefault.jpg",
      mood: "sad",
    },
    {
      videoId: "4-f-b6ZcR2g",
      title: "Hamari Adhuri Kahani - Title Track",
      artist: "Arijit Singh",
      thumbnail: "https://img.youtube.com/vi/4-f-b6ZcR2g/hqdefault.jpg",
      mood: "sad",
    },
    {
      videoId: "Umqb9KENgmk",
      title: "Tujhe Kitna Chahne Lage - Kabir Singh",
      artist: "Arijit Singh",
      thumbnail: "https://img.youtube.com/vi/Umqb9KENgmk/hqdefault.jpg",
      mood: "sad",
    },
  ],
  neutral: [
    {
      videoId: "BddP6PYo2gs",
      title: "Kesariya - Brahmāstra",
      artist: "Arijit Singh, Pritam",
      thumbnail: "https://img.youtube.com/vi/BddP6PYo2gs/hqdefault.jpg",
      mood: "neutral",
    },
    {
      videoId: "gvyUuxdRdR4",
      title: "Raataan Lambiyan - Shershaah",
      artist: "Jubin Nautiyal, Asees Kaur",
      thumbnail: "https://img.youtube.com/vi/gvyUuxdRdR4/hqdefault.jpg",
      mood: "neutral",
    },
    {
      videoId: "IJq0ywWFlSE",
      title: "Tum Hi Ho - Aashiqui 2",
      artist: "Arijit Singh, Mithoon",
      thumbnail: "https://img.youtube.com/vi/IJq0ywWFlSE/hqdefault.jpg",
      mood: "neutral",
    },
    {
      videoId: "r6tX7iX_0S4",
      title: "Shayad - Love Aaj Kal",
      artist: "Arijit Singh, Pritam",
      thumbnail: "https://img.youtube.com/vi/r6tX7iX_0S4/hqdefault.jpg",
      mood: "neutral",
    },
    {
      videoId: "2y2_qJv-N0s",
      title: "Pehle Bhi Main - Animal",
      artist: "Vishal Mishra, Raj Shekhar",
      thumbnail: "https://img.youtube.com/vi/2y2_qJv-N0s/hqdefault.jpg",
      mood: "neutral",
    },
    {
      videoId: "hu6Z0HwG8zY",
      title: "Apna Bana Le - Bhediya",
      artist: "Arijit Singh, Sachin-Jigar",
      thumbnail: "https://img.youtube.com/vi/hu6Z0HwG8zY/hqdefault.jpg",
      mood: "neutral",
    },
  ],
  surprised: [
    {
      videoId: "1iApyz7uX8U",
      title: "Kala Chashma - Baar Baar Dekho",
      artist: "Amar Arshi, Badshah, Neha Kakkar",
      thumbnail: "https://img.youtube.com/vi/1iApyz7uX8U/hqdefault.jpg",
      mood: "surprised",
    },
    {
      videoId: "9iIX4PBplAY",
      title: "Hookah Bar - Khiladi 786",
      artist: "Himesh Reshammiya, Vineet Singh",
      thumbnail: "https://img.youtube.com/vi/9iIX4PBplAY/hqdefault.jpg",
      mood: "surprised",
    },
    {
      videoId: "xmU0s2QURVE",
      title: "Swag Se Swagat - Tiger Zinda Hai",
      artist: "Vishal Dadlani, Neha Bhasin",
      thumbnail: "https://img.youtube.com/vi/xmU0s2QURVE/hqdefault.jpg",
      mood: "surprised",
    },
    {
      videoId: "G5xS_gG4f8Q",
      title: "O Saki Saki - Batla House",
      artist: "Neha Kakkar, Tulsi Kumar, B Praak",
      thumbnail: "https://img.youtube.com/vi/G5xS_gG4f8Q/hqdefault.jpg",
      mood: "surprised",
    },
  ],
  angry: [
    {
      videoId: "jFGKJBPzA-o",
      title: "Apna Time Aayega - Gully Boy",
      artist: "Ranveer Singh, DIVINE",
      thumbnail: "https://img.youtube.com/vi/jFGKJBPzA-o/hqdefault.jpg",
      mood: "angry",
    },
    {
      videoId: "WpW4N9G7mD4",
      title: "Sultan - Title Track",
      artist: "Sukhwinder Singh, Shadab Faridi",
      thumbnail: "https://img.youtube.com/vi/WpW4N9G7mD4/hqdefault.jpg",
      mood: "angry",
    },
    {
      videoId: "l_MyUGq7pgs",
      title: "Malhari - Bajirao Mastani",
      artist: "Vishal Dadlani, Sanjay Leela Bhansali",
      thumbnail: "https://img.youtube.com/vi/l_MyUGq7pgs/hqdefault.jpg",
      mood: "angry",
    },
    {
      videoId: "4z-L4k_8780",
      title: "Zinda - Bhaag Milkha Bhaag",
      artist: "Siddharth Mahadevan",
      thumbnail: "https://img.youtube.com/vi/4z-L4k_8780/hqdefault.jpg",
      mood: "angry",
    },
  ],
  fearful: [
    {
      videoId: "z3l_kX6oWwA",
      title: "Bhoot Hoon Main - Bhoot",
      artist: "Sunidhi Chauhan",
      thumbnail: "https://img.youtube.com/vi/z3l_kX6oWwA/hqdefault.jpg",
      mood: "fearful",
    },
    {
      videoId: "8lT4-tV7dZs",
      title: "Gumnaam Hai Koi - Gumnaam",
      artist: "Lata Mangeshkar",
      thumbnail: "https://img.youtube.com/vi/8lT4-tV7dZs/hqdefault.jpg",
      mood: "fearful",
    },
    {
      videoId: "LgC8u2M_J9o",
      title: "Panghat - Roohi",
      artist: "Asees Kaur, Divya Kumar, Sachin-Jigar",
      thumbnail: "https://img.youtube.com/vi/LgC8u2M_J9o/hqdefault.jpg",
      mood: "fearful",
    },
  ],
  disgusted: [
    {
      videoId: "9X1mC0P9k_E",
      title: "Bhaag D.K. Bose - Delhi Belly",
      artist: "Ram Sampath",
      thumbnail: "https://img.youtube.com/vi/9X1mC0P9k_E/hqdefault.jpg",
      mood: "disgusted",
    },
    {
      videoId: "vXQnL_U6s1g",
      title: "Emosanal Attyachaar - Dev.D",
      artist: "Band Master Rangeela & Rasila",
      thumbnail: "https://img.youtube.com/vi/vXQnL_U6s1g/hqdefault.jpg",
      mood: "disgusted",
    },
    {
      videoId: "H4R6Z_xJ-rU",
      title: "Character Dheela - Ready",
      artist: "Neeraj Shridhar, Amrita Kak",
      thumbnail: "https://img.youtube.com/vi/H4R6Z_xJ-rU/hqdefault.jpg",
      mood: "disgusted",
    },
  ],
};

function getCuratedYouTubeSongs(mood) {
  const cleanMood = (mood || "neutral").toLowerCase().trim();
  return YOUTUBE_MOOD_SONGS[cleanMood] || YOUTUBE_MOOD_SONGS.neutral;
}

module.exports = {
  YOUTUBE_MOOD_SONGS,
  getCuratedYouTubeSongs,
};
