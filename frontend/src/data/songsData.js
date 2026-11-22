import romanticSongs from "./romanticSongs.json";

const BASE_DEFAULT_SONGS = [
  {
    "_id": "bolly-1",
    "title": "Tauba Tauba",
    "artist": "Karan Aujla",
    "mood": "happy",
    "audio": "https://aac.saavncdn.com/992/5d44da8bc1d78fb72d18b701d758fd1f_320.mp4",
    "cover": "https://c.saavncdn.com/992/Bad-Newz-Hindi-2024-20250730113701-500x500.jpg"
  },
  {
    "_id": "bolly-2",
    "title": "Chaleya",
    "artist": "Anirudh Ravichander, Arijit Singh, Shilpa Rao",
    "mood": "happy",
    "audio": "https://aac.saavncdn.com/047/d1366530468931703ac909e82a3ee788_320.mp4",
    "cover": "https://c.saavncdn.com/047/Jawan-Hindi-2023-20230921190854-500x500.jpg"
  },
  {
    "_id": "bolly-3",
    "title": "Badtameez Dil",
    "artist": "Pritam, Benny Dayal, Shefali Alvares",
    "mood": "happy",
    "audio": "https://aac.saavncdn.com/440/71ef535f42247d0ffcd3c9cfa04cdd60_320.mp4",
    "cover": "https://c.saavncdn.com/440/Yeh-Jawaani-Hai-Deewani-2013-500x500.jpg"
  },
  {
    "_id": "bolly-4",
    "title": "Tum Hi Ho Bandhu",
    "artist": "Pritam, Neeraj Shridhar, Kavita Seth",
    "mood": "happy",
    "audio": "https://aac.saavncdn.com/891/e256b2df33aa705ea336506ab77c4466_320.mp4",
    "cover": "https://c.saavncdn.com/891/Cocktail-Hindi-2025-20260120201154-500x500.jpg"
  },
  {
    "_id": "bolly-5",
    "title": "Gallan Goodiyaan",
    "artist": "Yashita Sharma, Manish Kumar Tipu, Farhan Akhtar, Shankar Mahadevan, Sukhwinder Singh",
    "mood": "happy",
    "audio": "https://aac.saavncdn.com/240/2a80b5248e85af6a6567011982bc5cfc_320.mp4",
    "cover": "https://c.saavncdn.com/240/Dil-Dhadakne-Do-Hindi-2015-500x500.jpg"
  },
  {
    "_id": "bolly-6",
    "title": "Ilahi",
    "artist": "Pritam, Arijit Singh",
    "mood": "happy",
    "audio": "https://aac.saavncdn.com/440/a784bdaf2e6e4faba7b8282b8612f829_320.mp4",
    "cover": "https://c.saavncdn.com/440/Yeh-Jawaani-Hai-Deewani-2013-500x500.jpg"
  },
  {
    "_id": "bolly-7",
    "title": "Subha Hone Na De",
    "artist": "Pritam, Mika Singh, Shefali Alvares",
    "mood": "happy",
    "audio": "https://aac.saavncdn.com/743/75c6adf15c7ce788993785a9c2becef1_320.mp4",
    "cover": "https://c.saavncdn.com/743/Desi-Boyz-Hindi-2011-20241223142123-500x500.jpg"
  },
  {
    "_id": "bolly-8",
    "title": "Ghungroo",
    "artist": "Arijit Singh, Shilpa Rao",
    "mood": "happy",
    "audio": "https://aac.saavncdn.com/881/604fb2ba41aac81b5db565fcbf4fca9b_320.mp4",
    "cover": "https://c.saavncdn.com/881/War-Hindi-2019-20191001104931-500x500.jpg"
  },
  {
    "_id": "bolly-9",
    "title": "Nashe Si Chadh Gayi",
    "artist": "Arijit Singh, Caralisa Monteiro",
    "mood": "happy",
    "audio": "https://aac.saavncdn.com/256/6786cb875bc75dd60a541261ef04a919_320.mp4",
    "cover": "https://c.saavncdn.com/256/Befikre-Hindi-2016-20190329150318-500x500.jpg"
  },
  {
    "_id": "bolly-10",
    "title": "Matargashti",
    "artist": "Mohit Chauhan",
    "mood": "happy",
    "audio": "https://aac.saavncdn.com/994/319b6797d55352c49cbdf53e57ec9095_320.mp4",
    "cover": "https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg"
  },
  {
    "_id": "bolly-11",
    "title": "Kar Gayi Chull",
    "artist": "Badshah, Amaal Mallik, Fazilpuria, Sukriti Kakar, Neha Kakkar",
    "mood": "happy",
    "audio": "https://aac.saavncdn.com/978/e7a6e97299ca851067e09e31fec18e6f_320.mp4",
    "cover": "https://c.saavncdn.com/978/Kapoor-Sons-Since-1921--Hindi-2016-20180504172446-500x500.jpg"
  },
  {
    "_id": "bolly-12",
    "title": "Dil Dhadakne Do",
    "artist": "Shankar-Ehsaan-Loy, Javed Akhtar, Joi Barua, Suraj Jagan",
    "mood": "happy",
    "audio": "https://aac.saavncdn.com/296/2d65bfc643b919472add73c7ac65fe24_320.mp4",
    "cover": "https://c.saavncdn.com/296/Zindagi-Na-Milegi-Dobara-Hindi-2011-20260525191006-500x500.jpg"
  },
  {
    "_id": "bolly-13",
    "title": "London Thumakda",
    "artist": "Labh Janjua, Sonu Kakkar, Neha Kakkar",
    "mood": "happy",
    "audio": "https://aac.saavncdn.com/125/1b203d1d1e51a1bd0035baa481cb1b13_96.mp4",
    "cover": "https://c.saavncdn.com/125/Queen-2014-500x500.jpg"
  },
  {
    "_id": "bolly-14",
    "title": "Aankh Marey",
    "artist": "Neha Kakkar, Mika Singh, Kumar Sanu",
    "mood": "happy",
    "audio": "https://aac.saavncdn.com/616/c1235768b97843c8b539caa41974bf70_320.mp4",
    "cover": "https://c.saavncdn.com/616/Simmba-Hindi-2018-20231017141628-500x500.jpg"
  },
  {
    "_id": "bolly-15",
    "title": "Cutiepie",
    "artist": "Pritam, Pardeep Singh Sran, Nakash Aziz, Pritam, Pardeep Singh Sran & Nakash Aziz",
    "mood": "happy",
    "audio": "https://aac.saavncdn.com/597/e59b654006019314f78ad74c37e1c9e9_320.mp4",
    "cover": "https://c.saavncdn.com/257/Ae-Dil-Hai-Mushkil-Hindi-2016-500x500.jpg"
  },
  {
    "_id": "bolly-16",
    "title": "Channa Mereya",
    "artist": "Pritam, Arijit Singh, Pritam & Arijit Singh",
    "mood": "sad",
    "audio": "https://aac.saavncdn.com/597/6da0627cfcc4b937160f664841e4572d_320.mp4",
    "cover": "https://c.saavncdn.com/257/Ae-Dil-Hai-Mushkil-Hindi-2016-500x500.jpg"
  },
  {
    "_id": "bolly-17",
    "title": "Tum Hi Ho",
    "artist": "Arijit Singh",
    "mood": "sad",
    "audio": "https://aac.saavncdn.com/430/5c5ea5cc00e3bff45616013226f376fe_320.mp4",
    "cover": "https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg"
  },
  {
    "_id": "bolly-18",
    "title": "Agar Tum Saath Ho",
    "artist": "Alka Yagnik, Arijit Singh",
    "mood": "sad",
    "audio": "https://aac.saavncdn.com/994/2e6b47719cea3e7c9f971a3f1ddc9b0a_320.mp4",
    "cover": "https://c.saavncdn.com/994/Tamasha-Hindi-2015-500x500.jpg"
  },
  {
    "_id": "bolly-19",
    "title": "Bekhayali",
    "artist": "Sachet Tandon",
    "mood": "sad",
    "audio": "https://aac.saavncdn.com/807/db5027c7f61ea05b4f9841bfc056e1c5_320.mp4",
    "cover": "https://c.saavncdn.com/807/Kabir-Singh-Hindi-2019-20240131131003-500x500.jpg"
  },
  {
    "_id": "bolly-20",
    "title": "Kabira",
    "artist": "Pritam, Tochi Raina, Rekha Bhardwaj",
    "mood": "sad",
    "audio": "https://aac.saavncdn.com/440/664097ba2ddb94e9a8c9e9527b3010ec_320.mp4",
    "cover": "https://c.saavncdn.com/440/Yeh-Jawaani-Hai-Deewani-2013-500x500.jpg"
  },
  {
    "_id": "bolly-21",
    "title": "Hamari Adhuri Kahani (Title Track)",
    "artist": "Jeet Gannguli, Arijit Singh, Rashmi-Virag",
    "mood": "sad",
    "audio": "https://aac.saavncdn.com/656/cf05625b84417e59ec8e4fd3d8e3db7f_320.mp4",
    "cover": "https://c.saavncdn.com/577/Hamari-Adhuri-Kahani-Hindi-2015-500x500.jpg"
  },
  {
    "_id": "bolly-22",
    "title": "Tujhe Kitna Chahne Lage",
    "artist": "Arijit Singh",
    "mood": "sad",
    "audio": "https://aac.saavncdn.com/807/bda6cd88c18ee0d75854146145922bcc_320.mp4",
    "cover": "https://c.saavncdn.com/807/Kabir-Singh-Hindi-2019-20240131131003-500x500.jpg"
  },
  {
    "_id": "bolly-23",
    "title": "Phir Bhi Tumko Chaahunga",
    "artist": "Manoj Muntashir, Mithoon, Arijit Singh, Shashaa Tirupati",
    "mood": "sad",
    "audio": "https://aac.saavncdn.com/051/8e568348528193a1e263857c5b46395b_320.mp4",
    "cover": "https://c.saavncdn.com/051/Late-Night-Bollywood-Sad-Songs-Hindi-2026-20260603180213-500x500.jpg"
  },
  {
    "_id": "bolly-24",
    "title": "Sunn Raha Hai (Male)",
    "artist": "Ankit Tiwari",
    "mood": "sad",
    "audio": "https://aac.saavncdn.com/430/4e7afc316526ec0080992ca335ebd5da_320.mp4",
    "cover": "https://c.saavncdn.com/430/Aashiqui-2-Hindi-2013-500x500.jpg"
  },
  {
    "_id": "bolly-25",
    "title": "Judaai",
    "artist": "Sachin-Jigar, Rekha Bhardwaj, Arijit Singh",
    "mood": "sad",
    "audio": "https://aac.saavncdn.com/747/576e13e8c4c94d4602509abb9aca94e6_320.mp4",
    "cover": "https://c.saavncdn.com/747/Badlapur-Hindi-2025-20260404112709-500x500.jpg"
  },
  {
    "_id": "bolly-26",
    "title": "Kalank (Title Track)",
    "artist": "Pritam, Arijit Singh",
    "mood": "sad",
    "audio": "https://aac.saavncdn.com/204/0f3f473c8f44cb533c1c79d65dc8ba72_320.mp4",
    "cover": "https://c.saavncdn.com/204/Pritam-Non-Stop-Hits-Hindi-2026-20260629172440-500x500.jpg"
  },
  {
    "_id": "bolly-27",
    "title": "Ae Dil Hai Mushkil Title Track",
    "artist": "Pritam, Arijit Singh",
    "mood": "sad",
    "audio": "https://aac.saavncdn.com/608/414dd7443dc32677964b64e5f37670f9_320.mp4",
    "cover": "https://c.saavncdn.com/608/Ae-Dil-Hai-Mushkil-Deluxe-Edition-Hindi-2016-500x500.jpg"
  },
  {
    "_id": "bolly-28",
    "title": "Main Dhoondne Ko Zamaane Mein",
    "artist": "Arijit Singh",
    "mood": "sad",
    "audio": "https://aac.saavncdn.com/112/7592616d8b2c04597c1ee01ec373a636_320.mp4",
    "cover": "https://c.saavncdn.com/112/Heartless-2014-500x500.jpg"
  },
  {
    "_id": "bolly-29",
    "title": "Visar Aata Mala (Bhula Dena)",
    "artist": "Vishal Kothari",
    "mood": "sad",
    "audio": "https://aac.saavncdn.com/428/9895d91d31d99e191663ae560f7b43af_320.mp4",
    "cover": "https://c.saavncdn.com/428/Aashiqui-2-Marathi-2013-500x500.jpg"
  },
  {
    "_id": "bolly-30",
    "title": "Hasi Ban Gaye",
    "artist": "Ami Mishra, Kunaal Vermaa, Kasyap, VIBIE",
    "mood": "sad",
    "audio": "https://aac.saavncdn.com/945/b5067a1a8f2c0f7fc098fbb9277615a2_320.mp4",
    "cover": "https://c.saavncdn.com/945/Hasi-Ban-Gaye-Hindi-2023-20230608172234-500x500.jpg"
  },
  {
    "_id": "bolly-31",
    "title": "Iktara",
    "artist": "Amit Trivedi, Kavita Seth, Amitabh Bhattacharya",
    "mood": "neutral",
    "audio": "https://aac.saavncdn.com/910/00bad068211036ad7a4c06d705c52bd4_320.mp4",
    "cover": "https://c.saavncdn.com/910/Wake-Up-Sid-Hindi-2009-20190617160255-500x500.jpg"
  },
  {
    "_id": "bolly-32",
    "title": "Pee Loon",
    "artist": "Pritam, Mohit Chauhan",
    "mood": "neutral",
    "audio": "https://aac.saavncdn.com/512/95ff31ff7ae963c417ec207d7de91f5c_320.mp4",
    "cover": "https://c.saavncdn.com/512/Once-Upon-A-Time-In-Mumbaai-Hindi-2010-20241223141749-500x500.jpg"
  },
  {
    "_id": "bolly-33",
    "title": "Tum Se Hi",
    "artist": "Pritam, Mohit Chauhan, Irshad Kamil",
    "mood": "neutral",
    "audio": "https://aac.saavncdn.com/223/7eddc0f9b56f110ae39a145752fabb34_320.mp4",
    "cover": "https://c.saavncdn.com/223/Jab-We-Met-Hindi-2007-20231016162009-500x500.jpg"
  },
  {
    "_id": "bolly-34",
    "title": "Zehnaseeb",
    "artist": "Vishal & Shekhar, Chinmayi, Shekhar Ravjiani",
    "mood": "neutral",
    "audio": "https://aac.saavncdn.com/479/1e4db1b4896f1022f1d1f4e32e5ff9e3_320.mp4",
    "cover": "https://c.saavncdn.com/479/Hasee-Toh-Phasee-Hindi-2014-20260120201339-500x500.jpg"
  },
  {
    "_id": "bolly-35",
    "title": "Kun Faaya Kun",
    "artist": "Javed Ali, Mohit Chauhan, A.R. Rahman",
    "mood": "neutral",
    "audio": "https://aac.saavncdn.com/274/aee250c500588f117ae5343688e12b42_320.mp4",
    "cover": "https://c.saavncdn.com/408/Rockstar-Hindi-2011-20221212023139-500x500.jpg"
  },
  {
    "_id": "bolly-36",
    "title": "Raabta (From \"Agent Vinod\")",
    "artist": "Arijit Singh, Pritam, Amitabh Bhattacharya",
    "mood": "neutral",
    "audio": "https://aac.saavncdn.com/840/2be7053be63d9a4b6ea952eb972de3cb_320.mp4",
    "cover": "https://c.saavncdn.com/840/Best-Of-Arijit-Singh-Collection-Of-Romantic-Songs-Hindi-2025-20251203161112-500x500.jpg"
  },
  {
    "_id": "bolly-37",
    "title": "Hawayein (From \"Jab Harry Met Sejal\")",
    "artist": "Pritam, Arijit Singh",
    "mood": "neutral",
    "audio": "https://aac.saavncdn.com/423/6aea1a20329cc974b77f9bef13a37f64_320.mp4",
    "cover": "https://c.saavncdn.com/423/Arijit-Singh-All-Time-Best-Hindi-Hit-Love-Songs-Collection-Hindi-2026-20261008160834-500x500.jpg"
  },
  {
    "_id": "bolly-38",
    "title": "Samjhawan",
    "artist": "Jawad Ahmad, Sharib Toshi, Arijit Singh, Shreya Ghoshal",
    "mood": "neutral",
    "audio": "https://aac.saavncdn.com/540/f807aad8e5c60a87334231f72267c725_320.mp4",
    "cover": "https://c.saavncdn.com/540/Humpty-Sharma-Ki-Dulhania-Hindi-2014-20190618095042-500x500.jpg"
  },
  {
    "_id": "bolly-39",
    "title": "Mast Magan",
    "artist": "Arijit Singh, Chinmayi Sripada",
    "mood": "neutral",
    "audio": "https://aac.saavncdn.com/930/951f2d707e9ea617fce5e5d8338393ae_320.mp4",
    "cover": "https://c.saavncdn.com/930/2-States-2014-500x500.jpg"
  },
  {
    "_id": "bolly-40",
    "title": "Soch Na Sake",
    "artist": "Arijit Singh, Tulsi Kumar, Amaal Mallik",
    "mood": "neutral",
    "audio": "https://aac.saavncdn.com/026/335ea6a63ec7a32bd0403ae809a1ab36_320.mp4",
    "cover": "https://c.saavncdn.com/451/Airlift-Hindi-2015-500x500.jpg"
  },
  {
    "_id": "bolly-41",
    "title": "Enna Sona",
    "artist": "A.R. Rahman, Arijit Singh",
    "mood": "neutral",
    "audio": "https://aac.saavncdn.com/835/3bb5690b365de4a583ed5a98632cc8c4_320.mp4",
    "cover": "https://c.saavncdn.com/835/OK-Jaanu-Original-Motion-Picture-Soundtrack-Hindi-2017-20230203133341-500x500.jpg"
  },
  {
    "_id": "bolly-42",
    "title": "Tera Ban Jaunga",
    "artist": "Akhil Sachdeva, Tulsi Kumar",
    "mood": "neutral",
    "audio": "https://aac.saavncdn.com/807/51d8b889e616f66747b515a26e59d9ad_320.mp4",
    "cover": "https://c.saavncdn.com/807/Kabir-Singh-Hindi-2019-20240131131003-500x500.jpg"
  },
  {
    "_id": "bolly-43",
    "title": "Kesariya",
    "artist": "Pritam, Arijit Singh, Amitabh Bhattacharya",
    "mood": "neutral",
    "audio": "https://aac.saavncdn.com/871/c2febd353f3a076a406fa37510f31f9f_320.mp4",
    "cover": "https://c.saavncdn.com/871/Brahmastra-Original-Motion-Picture-Soundtrack-Hindi-2022-20221006155213-500x500.jpg"
  },
  {
    "_id": "bolly-44",
    "title": "Sajde",
    "artist": "Shankar-Ehsaan-Loy, Arijit Singh, Nihira Joshi Deshpande, Gulzar",
    "mood": "neutral",
    "audio": "https://aac.saavncdn.com/808/7b25afa33846c194c46e9171e183d91a_160.mp4",
    "cover": "https://c.saavncdn.com/808/Kill-Dil-Hindi-2014-20250515111308-500x500.jpg"
  },
  {
    "_id": "bolly-45",
    "title": "Phir Le Aya Dil (Reprise)",
    "artist": "Arijit Singh",
    "mood": "neutral",
    "audio": "https://aac.saavncdn.com/678/2fa567f57cfc85469780214d9a8910af_320.mp4",
    "cover": "https://c.saavncdn.com/678/Barfi-2012-500x500.jpg"
  },
  {
    "_id": "bolly-46",
    "title": "Kala Chashma",
    "artist": "Amar Arshi, Badshah, Neha Kakkar, Indeep Bakshi, Prem &amp; Hardeep, Kumaar",
    "mood": "surprised",
    "audio": "https://aac.saavncdn.com/232/6df3460de86bb1e2d19df314fa02da1a_320.mp4",
    "cover": "https://c.saavncdn.com/232/Next-On-Repeat-Hindi-2026-20260818072141-500x500.jpg"
  },
  {
    "_id": "bolly-47",
    "title": "What Jhumka ? (From \"Rocky Aur Rani Kii Prem Kahaani\")",
    "artist": "Amitabh Bhattacharya, Pritam, Arijit Singh, Jonita Gandhi, Ranveer Singh",
    "mood": "surprised",
    "audio": "https://aac.saavncdn.com/001/a03631c9d383bac6ed57524bfb79ad96_320.mp4",
    "cover": "https://c.saavncdn.com/001/Rocky-Aur-Rani-Kii-Prem-Kahaani-Hindi-2023-20250130073112-500x500.jpg"
  },
  {
    "_id": "bolly-48",
    "title": "Hookah Bar",
    "artist": "Himesh Reshammiya, Vineet Singh, Aaman Trikha",
    "mood": "surprised",
    "audio": "https://aac.saavncdn.com/485/b5634f549c269af126d4b6da4bea9faa_320.mp4",
    "cover": "https://c.saavncdn.com/485/Khiladi-786-Hindi-2012-20221213035019-500x500.jpg"
  },
  {
    "_id": "bolly-49",
    "title": "Abhi Toh Party Shuru Hui Hai",
    "artist": "Badshah, Aastha",
    "mood": "surprised",
    "audio": "https://aac.saavncdn.com/666/114f4b83eedf5b119ebefc4b0ad0e759_320.mp4",
    "cover": "https://c.saavncdn.com/282/Khoobsurat-Hindi-2014-20250510165659-500x500.jpg"
  },
  {
    "_id": "bolly-50",
    "title": "Dilliwaali Girlfriend",
    "artist": "Pritam, Arijit Singh, Sunidhi Chauhan",
    "mood": "surprised",
    "audio": "https://aac.saavncdn.com/440/86f7b25631b3c24cdd54ca82b62d2523_320.mp4",
    "cover": "https://c.saavncdn.com/440/Yeh-Jawaani-Hai-Deewani-2013-500x500.jpg"
  },
  {
    "_id": "bolly-51",
    "title": "Zingaat",
    "artist": "Ajay Gogavale, Atul Gogavale",
    "mood": "surprised",
    "audio": "https://aac.saavncdn.com/070/3e92c4dca618fd80f83da3a892ed91e6_320.mp4",
    "cover": "https://c.saavncdn.com/070/Dhadak-Hindi-2018-20180814-500x500.jpg"
  },
  {
    "_id": "bolly-52",
    "title": "Sauda Khara Khara",
    "artist": "Sukhbir, Diljit Dosanjh, Kumaar, Lijo George, Dj Chetas, Dhvani Bhanushali",
    "mood": "surprised",
    "audio": "https://aac.saavncdn.com/955/fd6b0cde37157ef640ba06ee189ef04e_320.mp4",
    "cover": "https://c.saavncdn.com/955/Dance-Vibes-Only-Hindi-2026-20260529163927-500x500.jpg"
  },
  {
    "_id": "bolly-53",
    "title": "High Rated Gabru",
    "artist": "Guru Randhawa",
    "mood": "surprised",
    "audio": "https://aac.saavncdn.com/344/4e7a96829b1ab444247a2a8db16673a8_320.mp4",
    "cover": "https://c.saavncdn.com/344/High-Rated-Gabru-Punjabi-2017-500x500.jpg"
  },
  {
    "_id": "bolly-54",
    "title": "Coca Cola",
    "artist": "Tony Kakkar, Neha Kakkar, Young Desi, Tanishk Bagchi, Mellow D",
    "mood": "surprised",
    "audio": "https://aac.saavncdn.com/685/faa749c3a6e4b3cdb6131b01b6d66cac_320.mp4",
    "cover": "https://c.saavncdn.com/685/Luka-Chuppi-Hindi-2019-20240530191338-500x500.jpg"
  },
  {
    "_id": "bolly-55",
    "title": "Makhna",
    "artist": "Tanishk Bagchi, Asees Kaur, Yasser Desai",
    "mood": "surprised",
    "audio": "https://aac.saavncdn.com/622/c1a0e6f34388089a4c52c1026bee0831_320.mp4",
    "cover": "https://c.saavncdn.com/622/Drive-Hindi-2019-20191014095305-500x500.jpg"
  },
  {
    "_id": "bolly-56",
    "title": "Bom Diggy Diggy",
    "artist": "Jasmin Walia, Zack Knight",
    "mood": "surprised",
    "audio": "https://aac.saavncdn.com/074/57b11cf147b198b52d68db5515c59356_320.mp4",
    "cover": "https://c.saavncdn.com/074/Sonu-Ke-Titu-Ki-Sweety-Hindi-2018-20180214153942-500x500.jpg"
  },
  {
    "_id": "bolly-57",
    "title": "The Humma Song",
    "artist": "A.R. Rahman, Badshah, Tanishk Bagchi, Shashaa Tirupati, Jubin Nautiyal",
    "mood": "surprised",
    "audio": "https://aac.saavncdn.com/835/7f48cd7810c60f28390a0ebe8e277d5b_320.mp4",
    "cover": "https://c.saavncdn.com/835/OK-Jaanu-Original-Motion-Picture-Soundtrack-Hindi-2017-20230203133341-500x500.jpg"
  },
  {
    "_id": "bolly-58",
    "title": "Nachde Ne Saare",
    "artist": "Jasleen Royal, Harshdeep Kaur, Siddharth Mahadevan",
    "mood": "surprised",
    "audio": "https://aac.saavncdn.com/168/61404bc9ed27cd39f527ebbd911829a2_320.mp4",
    "cover": "https://c.saavncdn.com/168/The-Bollywood-Wedding-Collection-Hindi-2025-20251226211835-500x500.jpg"
  },
  {
    "_id": "bolly-59",
    "title": "Tareefan",
    "artist": "QARAN, Badshah",
    "mood": "surprised",
    "audio": "https://aac.saavncdn.com/168/c76133ee887885717bf3af9d50ebda36_320.mp4",
    "cover": "https://c.saavncdn.com/168/The-Bollywood-Wedding-Collection-Hindi-2025-20251226211835-500x500.jpg"
  },
  {
    "_id": "bolly-60",
    "title": "Proper Patola",
    "artist": "Badshah, Diljit Dosanjh, Aastha Gill",
    "mood": "surprised",
    "audio": "https://aac.saavncdn.com/036/4b3640bd0d281f1f94a858e0850fd733_320.mp4",
    "cover": "https://c.saavncdn.com/036/Namaste-England-Hindi-2018-20260120201449-500x500.jpg"
  },
  {
    "_id": "bolly-61",
    "title": "Apna Time Aayega",
    "artist": "Ranveer Singh, DIVINE, Dub Sharma",
    "mood": "angry",
    "audio": "https://aac.saavncdn.com/367/82d550fc5ef58ea544139207f26b1677_320.mp4",
    "cover": "https://c.saavncdn.com/367/The-Power-Pack-Mix-Shashwat-Sachdev-Ranveer-Singh-Hindi-2026-20260317144146-500x500.jpg"
  },
  {
    "_id": "bolly-62",
    "title": "Malhari",
    "artist": "Sanjay Leela Bhansali, Vishal Dadlani, Prashant Ingole",
    "mood": "angry",
    "audio": "https://aac.saavncdn.com/808/c7ce4aa3c7b4d278fb83d92ebaf5b255_320.mp4",
    "cover": "https://c.saavncdn.com/808/Bajirao-Mastani-Hindi-2025-20260120201154-500x500.jpg"
  },
  {
    "_id": "bolly-63",
    "title": "Zinda",
    "artist": "Shankar-Ehsaan-Loy, Siddharth Mahadevan",
    "mood": "angry",
    "audio": "https://aac.saavncdn.com/575/cf7dbb23a4ba808632752d4f12f93ddb_320.mp4",
    "cover": "https://c.saavncdn.com/575/Bhaag-Milkha-Bhaag-Hindi-2013-20260120201340-500x500.jpg"
  },
  {
    "_id": "bolly-64",
    "title": "Sultan",
    "artist": "Sukhwinder Singh, Shadab Faridi",
    "mood": "angry",
    "audio": "https://aac.saavncdn.com/778/d974ed77e7afa4f1acb018e4e26c9946_320.mp4",
    "cover": "https://c.saavncdn.com/778/Sultan-Hindi-2016-20190329150247-500x500.jpg"
  },
  {
    "_id": "bolly-65",
    "title": "Aarambh",
    "artist": "Piyush Mishra",
    "mood": "angry",
    "audio": "https://aac.saavncdn.com/317/592e973b5675314a4477de253a9ab944_320.mp4",
    "cover": "https://c.saavncdn.com/317/Gulaal-Hindi-2009-20221125215618-500x500.jpg"
  },
  {
    "_id": "bolly-66",
    "title": "Chak De India",
    "artist": "Sukhvinder Singh, Salim Merchant, Marianne D'Cruz-Aiman",
    "mood": "angry",
    "audio": "https://aac.saavncdn.com/620/1a8f9f6db4adf6aa9d7dc8ab58eecbe8_320.mp4",
    "cover": "https://c.saavncdn.com/620/Chak-De-India-Hindi-2007-20190329150809-500x500.jpg"
  },
  {
    "_id": "bolly-67",
    "title": "Brothers Anthem",
    "artist": "Ajay-Atul, Vishal Dadlani",
    "mood": "angry",
    "audio": "https://aac.saavncdn.com/211/3c2f4737bafe129f9ddf90b6afbefea1_320.mp4",
    "cover": "https://c.saavncdn.com/211/Brothers-Hindi-2015-20260120201355-500x500.jpg"
  },
  {
    "_id": "bolly-68",
    "title": "Sher Aaya Sher",
    "artist": "DIVINE, Major C",
    "mood": "angry",
    "audio": "https://aac.saavncdn.com/133/5b74bb4e510cd627a7fa85a44c73637e_320.mp4",
    "cover": "https://c.saavncdn.com/133/Josh-High-Game-On-Bollywood-Energy-Hindi-2026-20260619182728-500x500.jpg"
  },
  {
    "_id": "bolly-69",
    "title": "Kar Har Maidaan Fateh",
    "artist": "Shreya Ghoshal, Sukhwinder Singh",
    "mood": "angry",
    "audio": "https://aac.saavncdn.com/319/d3527e7086440a3948677ae0fd591c04_320.mp4",
    "cover": "https://c.saavncdn.com/319/Sanju-Hindi-2018-20180629-500x500.jpg"
  },
  {
    "_id": "bolly-70",
    "title": "Dangal Title Track - Tamil",
    "artist": "Rajesh G, Pritam, John Bruno, Denniz Joseph",
    "mood": "angry",
    "audio": "https://aac.saavncdn.com/107/5dfdaf5aae7fd39d0cbbda7ee972a124_320.mp4",
    "cover": "https://c.saavncdn.com/107/Dangal-Title-Track-Tamil-Tamil-2025-20250621015112-500x500.jpg"
  },
  {
    "_id": "bolly-71",
    "title": "Get Ready To Fight Again",
    "artist": "Pranaay, Jatinder Singh, Siddharth Basrur, Big Dhillon, Anand Bhaskar",
    "mood": "angry",
    "audio": "https://aac.saavncdn.com/203/9f164619eebb7403a98d906aaaf6e179_320.mp4",
    "cover": "https://c.saavncdn.com/203/Baaghi-2-Hindi-2018-20180320-500x500.jpg"
  },
  {
    "_id": "bolly-72",
    "title": "Dhaakad",
    "artist": "Pritam, Raftaar",
    "mood": "angry",
    "audio": "https://aac.saavncdn.com/480/878d71ebca578e140338cc692bd20bb7_320.mp4",
    "cover": "https://c.saavncdn.com/480/Dangal-Hindi-2016-20200116120806-500x500.jpg"
  },
  {
    "_id": "bolly-73",
    "title": "Arjan Vailly",
    "artist": "Bhupinder Babbal, Manan Bhardwaj",
    "mood": "angry",
    "audio": "https://aac.saavncdn.com/092/52f3f74bcb4295cde59e44ac020d0126_320.mp4",
    "cover": "https://c.saavncdn.com/092/ANIMAL-Hindi-2023-20260724191152-500x500.jpg"
  },
  {
    "_id": "bolly-74",
    "title": "Mere Gully Mein",
    "artist": "Ranveer Singh, Naezy, DIVINE, Sez On The Beat",
    "mood": "angry",
    "audio": "https://aac.saavncdn.com/312/0dffeda08f4f9dc79531e0b7124d0f78_320.mp4",
    "cover": "https://c.saavncdn.com/312/Desi-Hip-Hop-Vibes-Hindi-2026-20260317171123-500x500.jpg"
  },
  {
    "_id": "bolly-75",
    "title": "Saadda Haq (Featuring Orianthi Panagaris On Guitars)",
    "artist": "Clinton Cerejo, Mohit Chauhan",
    "mood": "angry",
    "audio": "https://aac.saavncdn.com/274/ec39b6b040265fdf0c97080bad3b9e86_320.mp4",
    "cover": "https://c.saavncdn.com/408/Rockstar-Hindi-2011-20221212023139-500x500.jpg"
  },
  {
    "_id": "bolly-76",
    "title": "Gumnaam Hai Koi",
    "artist": "Jubin Nautiyal, Antara Mitra",
    "mood": "fearful",
    "audio": "https://aac.saavncdn.com/382/9f43b27beba80f3190e0d6591b2d301e_sar_320.mp4",
    "cover": "https://c.saavncdn.com/382/Gumnaam-Hai-Koi-1920-London-Hindi-2016-500x500.jpg"
  },
  {
    "_id": "bolly-77",
    "title": "Kahin Deep Jale Kahin Dil",
    "artist": "Lata Mangeshkar",
    "mood": "fearful",
    "audio": "https://aac.saavncdn.com/948/2cb84c5112037818e4289e81b05e1799_sar_320.mp4",
    "cover": "https://c.saavncdn.com/948/Bees-Saal-Baad-1962-500x500.jpg"
  },
  {
    "_id": "bolly-78",
    "title": "Wafa Na Raas Aayee",
    "artist": "Jubin Nautiyal, Meet Bros, Nikhil-Vinay",
    "mood": "fearful",
    "audio": "https://aac.saavncdn.com/067/a44887097b4119b07f0f02b45782702d_320.mp4",
    "cover": "https://c.saavncdn.com/067/Wafa-Na-Raas-Aayee-Hindi-2021-20210423061001-500x500.jpg"
  },
  {
    "_id": "bolly-79",
    "title": "Bheegi Bheegi Raaton Mein",
    "artist": "Lata Mangeshkar, Kishore Kumar",
    "mood": "fearful",
    "audio": "https://aac.saavncdn.com/721/63d67c223146a4c465a0bd327df6d34e_sar_320.mp4",
    "cover": "https://c.saavncdn.com/721/Ajanabee-Hindi-1974-20230316093444-500x500.jpg"
  },
  {
    "_id": "bolly-80",
    "title": "Raaz Aankhein Teri",
    "artist": "Arijit Singh",
    "mood": "fearful",
    "audio": "https://aac.saavncdn.com/311/f78ef8c2a9d3dc51dc4fc22bcf604648_320.mp4",
    "cover": "https://c.saavncdn.com/311/Raaz-Reboot-2-Hindi-2016-500x500.jpg"
  },
  {
    "_id": "bolly-81",
    "title": "Wafa Na Raas Aayee - Remix",
    "artist": "Nitin Mukesh",
    "mood": "fearful",
    "audio": "https://aac.saavncdn.com/249/34b4330661d4c85bcb9b3dca002c7fec_320.mp4",
    "cover": "https://c.saavncdn.com/249/Achha-Sila-Diya-Remix-Hindi-2002-20230317203701-500x500.jpg"
  },
  {
    "_id": "bolly-82",
    "title": "Jadu Hai Nasha Hai (Female Version)",
    "artist": "Shreya Ghoshal",
    "mood": "fearful",
    "audio": "https://aac.saavncdn.com/494/65bb1a0b4c1d70317320b6bacaae00c7_sar_320.mp4",
    "cover": "https://c.saavncdn.com/494/Jism-Hindi-2003-20221214104252-500x500.jpg"
  },
  {
    "_id": "bolly-83",
    "title": "Beedi",
    "artist": "Vishal Bhardwaj, Sunidhi Chauhan, Sukhwinder Singh, Nachiketa Chakraborty, Clinton Cerejo",
    "mood": "fearful",
    "audio": "https://aac.saavncdn.com/123/22c889cabc83dff0d4f07fe629dcdba8_320.mp4",
    "cover": "https://c.saavncdn.com/123/Omkara-Hindi-2025-20260120201218-500x500.jpg"
  },
  {
    "_id": "bolly-84",
    "title": "Aye Khuda",
    "artist": "Kshitij Tarey, Saim Bhat, Mithoon",
    "mood": "fearful",
    "audio": "https://aac.saavncdn.com/916/c58d2a3471ebe93e5132207971150032_320.mp4",
    "cover": "https://c.saavncdn.com/916/Murder-2-Hindi-2011-20221211193711-500x500.jpg"
  },
  {
    "_id": "bolly-85",
    "title": "Labon Ko",
    "artist": "Pritam, KK",
    "mood": "fearful",
    "audio": "https://aac.saavncdn.com/056/15f4ea0f635f05ede93c4169d1ece6ac_320.mp4",
    "cover": "https://c.saavncdn.com/056/Bhool-Bhulaiyaa-Hindi-2007-20241223151003-500x500.jpg"
  },
  {
    "_id": "bolly-86",
    "title": "Mere Dholna",
    "artist": "Pritam, Shreya Ghoshal, M. G.Shreekumar",
    "mood": "fearful",
    "audio": "https://aac.saavncdn.com/056/424bde35f74b20498517491dfd612894_320.mp4",
    "cover": "https://c.saavncdn.com/056/Bhool-Bhulaiyaa-Hindi-2007-20241223151003-500x500.jpg"
  },
  {
    "_id": "bolly-87",
    "title": "Zara Zara",
    "artist": "Bombay Jayashri",
    "mood": "fearful",
    "audio": "https://aac.saavncdn.com/724/94ef89173720daf48d90c535f0e8c622_sar_320.mp4",
    "cover": "https://c.saavncdn.com/724/Rehnaa-Hai-Terre-Dil-Mein-Hindi-2001-20220429143424-500x500.jpg"
  },
  {
    "_id": "bolly-88",
    "title": "Bakhuda Tumhi Ho (Unplugged Cover)",
    "artist": "Yash Tiwari",
    "mood": "fearful",
    "audio": "https://aac.saavncdn.com/991/da24106d29c41298f9f8dc9f49418129_320.mp4",
    "cover": "https://c.saavncdn.com/991/Bakhuda-Tumhi-Ho-Unplugged-Cover-Hindi-2024-20261024113313-500x500.jpg"
  },
  {
    "_id": "bolly-89",
    "title": "Hale Dil (From \"Murder 2\")",
    "artist": "Harshit Saxena",
    "mood": "fearful",
    "audio": "https://aac.saavncdn.com/106/a4910a59c33706d2d62cfcce15d56525_160.mp4",
    "cover": "https://c.saavncdn.com/106/Emraan-Hashmi-Hits-Hindi-2026-20260905191028-500x500.jpg"
  },
  {
    "_id": "bolly-90",
    "title": "Tere Dwar Khule To Mere Bhagya",
    "artist": "Mahendra Kapoor, Hemlata",
    "mood": "disgusted",
    "audio": "https://aac.saavncdn.com/977/c18e0be5bd12c248f990ff869ba2325b_320.mp4",
    "cover": "https://c.saavncdn.com/977/Badrinath-Dham-Hindi-1980-500x500.jpg"
  },
  {
    "_id": "bolly-91",
    "title": "Jee Karda",
    "artist": "Pritam, Labh Janjua, Suzie.Q, Mayur Puri",
    "mood": "disgusted",
    "audio": "https://aac.saavncdn.com/172/ef18e79280770b73aae6dd85bb1432e4_320.mp4",
    "cover": "https://c.saavncdn.com/172/Chatpate-Gaane-Punjabi-2026-20261022104611-500x500.jpg"
  },
  {
    "_id": "bolly-92",
    "title": "Emosanal Attyachaar (Brass Band Version)",
    "artist": "Amit Trivedi, Band Master Rangeela, Rasila",
    "mood": "disgusted",
    "audio": "https://aac.saavncdn.com/846/5bee91443e2d668cd51547742ab7a46c_320.mp4",
    "cover": "https://c.saavncdn.com/846/Dev-D-Hindi-2009-20241119154244-500x500.jpg"
  },
  {
    "_id": "bolly-93",
    "title": "Nadaan Parindey",
    "artist": "Mohit Chauhan, A.R. Rahman",
    "mood": "disgusted",
    "audio": "https://aac.saavncdn.com/274/ed2193d56b29e06f96ad428cf6ffeae0_320.mp4",
    "cover": "https://c.saavncdn.com/408/Rockstar-Hindi-2011-20221212023139-500x500.jpg"
  },
  {
    "_id": "bolly-94",
    "title": "Jo Bhi Main",
    "artist": "Mohit Chauhan",
    "mood": "disgusted",
    "audio": "https://aac.saavncdn.com/274/a0c47c2ade58e93115e1774c9199e33b_320.mp4",
    "cover": "https://c.saavncdn.com/408/Rockstar-Hindi-2011-20221212023139-500x500.jpg"
  },
  {
    "_id": "bolly-95",
    "title": "Dhan Te Nan",
    "artist": "Sukhwinder Singh, Vishal Dadlani, Robert Bob Omulo",
    "mood": "disgusted",
    "audio": "https://aac.saavncdn.com/999/241c4aab53108fed9333198e83620642_320.mp4",
    "cover": "https://c.saavncdn.com/999/Kaminey-Hindi-2009-20221201031425-500x500.jpg"
  },
  {
    "_id": "bolly-96",
    "title": "Kaminey",
    "artist": "Vishal Bhardwaj",
    "mood": "disgusted",
    "audio": "https://aac.saavncdn.com/999/b986baf75718e83709d3cdcdc847b47b_320.mp4",
    "cover": "https://c.saavncdn.com/999/Kaminey-Hindi-2009-20221201031425-500x500.jpg"
  },
  {
    "_id": "bolly-97",
    "title": "Tai Tai Phis",
    "artist": "Amit Trivedi, Jaishri Trivedi",
    "mood": "disgusted",
    "audio": "https://aac.saavncdn.com/889/e03a562f96aed85dbf3cc0d31eb04118_320.mp4",
    "cover": "https://c.saavncdn.com/889/Chillar-Party-Original-Motion-Picture-Soundtrack--Hindi-2011-20210303181911-500x500.jpg"
  },
  {
    "_id": "bolly-98",
    "title": "Masti Ki Paathshala",
    "artist": "A.R. Rahman, Naresh Iyer, Mohammed Aslam",
    "mood": "disgusted",
    "audio": "https://aac.saavncdn.com/825/4efbcfb85a0714a3e0b798ba496bc4ff_320.mp4",
    "cover": "https://c.saavncdn.com/825/Rang-De-Basanti-Hindi-2005-20190516125130-500x500.jpg"
  },
  {
    "_id": "bolly-99",
    "title": "Khalbali",
    "artist": "A.R. Rahman, Nacim, Mohammed Aslam",
    "mood": "disgusted",
    "audio": "https://aac.saavncdn.com/825/0a6514a16cf9961ff2038212d471c4a4_320.mp4",
    "cover": "https://c.saavncdn.com/825/Rang-De-Basanti-Hindi-2005-20190516125130-500x500.jpg"
  },
  {
    "_id": "bolly-100",
    "title": "Challa",
    "artist": "Rabbi Shergill",
    "mood": "disgusted",
    "audio": "https://aac.saavncdn.com/024/0e501120a912e019f8f348fac1ba38d9_320.mp4",
    "cover": "https://c.saavncdn.com/024/Jab-Tak-Hai-Jaan-Hindi-2012-20190329150717-500x500.jpg"
  },
  {
    "_id": "bolly-101",
    "title": "Dil Haara",
    "artist": "Sukhwinder Singh",
    "mood": "disgusted",
    "audio": "https://aac.saavncdn.com/045/26491e367d2d3e5d623f4bf31b7a9c13_320.mp4",
    "cover": "https://c.saavncdn.com/951/Tashan-Hindi-2008-20190329150932-500x500.jpg"
  },
  {
    "_id": "bolly-102",
    "title": "atif aslam",
    "artist": "Ambient Aura",
    "mood": "disgusted",
    "audio": "https://aac.saavncdn.com/953/9b1581a4c5948df2b42e16132e02ed51_320.mp4",
    "cover": "https://c.saavncdn.com/953/club-ambition-Unknown-2024-20240628202752-500x500.jpg"
  },
  {
    "_id": "bolly-103",
    "title": "Woh Lamhe Woh Baatein",
    "artist": "Roopkumar Rathod, Mithoon, Naresh Sharma",
    "mood": "disgusted",
    "audio": "https://aac.saavncdn.com/732/7911fde1aebed09a3822131e97a10527_320.mp4",
    "cover": "https://c.saavncdn.com/732/Emraan-Hashmi-Sad-Love-Hits-Hindi-2026-20260604155755-500x500.jpg"
  },
  {
    "_id": "bolly-104",
    "title": "Bulleya",
    "artist": "Papon",
    "mood": "disgusted",
    "audio": "https://aac.saavncdn.com/778/d3a4b97df0a5df5bfb437c194313eccb_320.mp4",
    "cover": "https://c.saavncdn.com/778/Sultan-Hindi-2016-20190329150247-500x500.jpg"
  },
  {
    "_id": "bolly-105",
    "title": "Bhoot Hoon Main",
    "artist": "Sunidhi Chauhan, Salim-Sulaiman",
    "mood": "fearful",
    "audio": "https://aac.saavncdn.com/438/8829a18a58e63de5ad3866fc15aa0787_320.mp4",
    "cover": "https://c.saavncdn.com/438/Bhoot-Hindi-2003-500x500.jpg"
  }
];

export const DEFAULT_SONGS = [...BASE_DEFAULT_SONGS, ...romanticSongs];

export const MOOD_DETAILS = {
  romantic: { label: "Romantic", emoji: "❤️", color: "#f43f5e", quote: "Soulful Romantic Hits & Heartfelt Love Melodies" },
  happy: { label: "Happy", emoji: "😄", color: "#f59e0b", quote: "Bollywood Party & Feel-Good Beats" },
  sad: { label: "Sad", emoji: "😢", color: "#60a5fa", quote: "Heart-touching Arijit Singh & Melancholy Melodies" },
  neutral: { label: "Neutral", emoji: "😌", color: "#10b981", quote: "Soothing, Relaxed & Acoustic Bollywood" },
  surprised: { label: "Surprised", emoji: "😲", color: "#ec4899", quote: "High Energy Dance & Wedding Party Anthems" },
  angry: { label: "Angry", emoji: "🔥", color: "#ef4444", quote: "Power Anthem & Intense Motivational Energy" },
  fearful: { label: "Fearful", emoji: "😨", color: "#8b5cf6", quote: "Mysterious, Dark & Atmospheric Classics" },
  disgusted: { label: "Disgusted", emoji: "⚡", color: "#14b8a6", quote: "Rebellious Rock & Unfiltered High-Impact Hits" },
};
