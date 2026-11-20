import { useRef, useState } from "react";
import "./MoodSongs.css";

const MoodSongs = ({ Songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);
  const [progress, setProgress] = useState({});
  const [durations, setDurations] = useState({});
  const audioRefs = useRef([]);

  const handlePlayPause = (index) => {
    const currentAudio = audioRefs.current[index];
    if (!currentAudio) return;

    if (isPlaying === index) {
      currentAudio.pause();
      setIsPlaying(null);
    } else {
      audioRefs.current.forEach((audio, idx) => {
        if (audio && idx !== index) {
          audio.pause();
        }
      });
      currentAudio.play();
      setIsPlaying(index);
    }
  };

  const handleTimeUpdate = (index) => {
    const currentAudio = audioRefs.current[index];
    if (!currentAudio) return;

    setProgress((prev) => ({
      ...prev,
      [index]: currentAudio.currentTime,
    }));
  };

  const handleLoadedMetadata = (index) => {
    const currentAudio = audioRefs.current[index];
    if (!currentAudio) return;

    setDurations((prev) => ({
      ...prev,
      [index]: currentAudio.duration,
    }));
  };

  const handleSeek = (index, value) => {
    const currentAudio = audioRefs.current[index];
    if (!currentAudio) return;

    currentAudio.currentTime = Number(value);
    setProgress((prev) => ({
      ...prev,
      [index]: Number(value),
    }));
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const detectedMood = Songs.length > 0 && Songs[0].mood ? Songs[0].mood : null;

  return (
    <div className="mood-songs">
      <h2>Recommended Songs {detectedMood ? `(${detectedMood.toUpperCase()})` : ""}</h2>
      {Songs.length === 0 ? (
        <p style={{ textAlign: "center", color: "#94a3b8", padding: "1.5rem 0", margin: 0, fontSize: "0.95rem" }}>
          Camera ke samne aakar <strong>"Detect Expression"</strong> par click karein taaki aapke mood ke hisaab se gaane show ho sakein!
        </p>
      ) : (
        Songs.map((song, index) => {
          const currentTime = progress[index] || 0;
          const duration = durations[index] || 0;

          return (
            <div className="song" key={song._id || index}>
              <div className="song-top">
                <div className="title">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>

                <audio
                  ref={(el) => (audioRefs.current[index] = el)}
                  src={song.audio}
                  onTimeUpdate={() => handleTimeUpdate(index)}
                  onLoadedMetadata={() => handleLoadedMetadata(index)}
                  onEnded={() => setIsPlaying(null)}
                />

                <button
                  className="play-pause-button"
                  onClick={() => handlePlayPause(index)}
                >
                  {isPlaying === index ? (
                    <i className="ri-pause-line"></i>
                  ) : (
                    <i className="ri-play-large-fill"></i>
                  )}
                </button>
              </div>

              <div className="seek-bar-container">
                <span className="time">{formatTime(currentTime)}</span>
                <input
                  type="range"
                  className="seek-bar"
                  min={0}
                  max={duration || 0}
                  step="0.1"
                  value={currentTime}
                  onChange={(e) => handleSeek(index, e.target.value)}
                />
                <span className="time">{formatTime(duration)}</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MoodSongs;