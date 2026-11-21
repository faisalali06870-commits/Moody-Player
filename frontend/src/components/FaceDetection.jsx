import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "./faceDetection.css";
import axios from "axios";
import { DEFAULT_SONGS, MOOD_DETAILS } from "../data/songsData";

const ALL_MOODS = ["happy", "sad", "neutral", "surprised", "angry", "fearful", "disgusted"];

function FaceDetection({ setSongs, setCurrentMood, currentMood, onSelectMood }) {
  const videoRef = useRef(null);

  const [expression, setExpression] = useState(currentMood || "neutral");
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detecting, setDetecting] = useState(false);

  useEffect(() => {
    if (currentMood) {
      setExpression(currentMood);
    }
  }, [currentMood]);

  // Load models and start webcam
  useEffect(() => {
    let stream;
    let isMounted = true;

    const startCamera = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(`${import.meta.env.BASE_URL}models`);
        await faceapi.nets.faceLandmark68Net.loadFromUri(`${import.meta.env.BASE_URL}models`);
        await faceapi.nets.faceExpressionNet.loadFromUri(`${import.meta.env.BASE_URL}models`);

        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        setLoading(false);
      } catch (error) {
        console.error("Camera or model error:", error);
        if (isMounted) {
          setExpression("neutral");
          setLoading(false);
        }
      }
    };

    startCamera();

    return () => {
      isMounted = false;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const detectExpression = async () => {
    if (!videoRef.current || detecting || loading) return;

    if (videoRef.current.readyState < 2) {
      console.log("Video is not ready yet!");
      return;
    }

    setDetecting(true);

    try {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections.length > 0) {
        const expressions = detections[0].expressions;

        // Find strongest expression
        const strongestExpression = Object.entries(expressions).sort(
          (a, b) => b[1] - a[1],
        )[0];

        const detectedExpression = strongestExpression[0].toLowerCase();
        const confPercent = Math.round(strongestExpression[1] * 100);

        setExpression(detectedExpression);
        setConfidence(confPercent);

        if (onSelectMood) {
          onSelectMood(detectedExpression);
        } else if (setCurrentMood) {
          setCurrentMood(detectedExpression);
        }

        axios
          .get(`http://localhost:3000/songs?mood=${detectedExpression}`)
          .then((response) => {
            if (response.data && response.data.songs && response.data.songs.length > 0) {
              setSongs(response.data.songs);
            } else {
              const fallback = DEFAULT_SONGS.filter(
                (s) => s.mood.toLowerCase() === detectedExpression,
              );
              setSongs(fallback.length > 0 ? fallback : DEFAULT_SONGS.slice(0, 15));
            }
          })
          .catch(() => {
            const fallback = DEFAULT_SONGS.filter(
              (s) => s.mood.toLowerCase() === detectedExpression,
            );
            setSongs(fallback.length > 0 ? fallback : DEFAULT_SONGS.slice(0, 15));
          });
      } else {
        setExpression("No face detected");
        setConfidence(null);
      }
    } catch (error) {
      console.error("Expression detection error:", error);
      setExpression("Detection failed");
    } finally {
      setDetecting(false);
    }
  };

  const moodInfo = MOOD_DETAILS[expression.toLowerCase()] || MOOD_DETAILS.neutral;

  return (
    <div className="face-glass-card">
      <div className="face-header">
        <div className="live-indicator">
          <span className="live-dot"></span>
          <span>AI CAMERA SCANNER</span>
        </div>
        <span className="camera-status">{loading ? "Starting..." : "Live"}</span>
      </div>

      {loading && <p className="loading-txt">Initializing face models...</p>}

      {/* Circular Glowing Camera Viewport */}
      <div className={`video-wrapper ${detecting ? "scanning" : ""}`}>
        <video
          className="face_video"
          ref={videoRef}
          autoPlay
          muted
          playsInline
        />
        {detecting && <div className="scan-line"></div>}
      </div>

      {/* Main Scan Button */}
      <button
        className="detect-btn"
        onClick={detectExpression}
        disabled={loading || detecting}
      >
        {loading ? (
          <span>Starting Camera...</span>
        ) : detecting ? (
          <span>
            <i className="ri-loader-4-line spin"></i> Scanning Face...
          </span>
        ) : (
          <span>
            <i className="ri-scan-2-line"></i> Detect My Mood
          </span>
        )}
      </button>

      {/* Detected Result Tag */}
      <div className="expression-result">
        <span className="exp-label">Active Mood:</span>
        <span className="exp-value" style={{ color: moodInfo.color }}>
          {moodInfo.emoji} <strong>{moodInfo.label}</strong>
          {confidence !== null ? ` (${confidence}%)` : ""}
        </span>
      </div>

      {/* Compact Manual Mood Selector Underneath Camera */}
      <div className="compact-mood-picker">
        <span className="picker-title">Or Pick Mood Manually:</span>
        <div className="picker-chips">
          {ALL_MOODS.map((m) => {
            const info = MOOD_DETAILS[m];
            const isSelected = (currentMood || "").toLowerCase() === m;
            return (
              <button
                key={m}
                className={`picker-chip ${isSelected ? "active" : ""}`}
                onClick={() => onSelectMood && onSelectMood(m)}
                style={
                  isSelected
                    ? {
                        background: `${info.color}25`,
                        borderColor: info.color,
                        color: info.color,
                        boxShadow: `0 0 10px ${info.color}35`,
                      }
                    : {}
                }
              >
                <span>{info.emoji}</span>
                <span>{info.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FaceDetection;
