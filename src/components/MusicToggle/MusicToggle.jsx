"use client";

import { useState, useEffect, useRef } from "react";
import "./MusicToggle.css";
import landingPageMusic from "../../assets/landingpagemusic.mp3";

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNote, setShowNote] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(landingPageMusic);
    audioRef.current.loop = true; // Make it loop continuously
    audioRef.current.volume = 0.3; // Set volume to 30%

    // Auto-play when component mounts
    const playMusic = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Auto-play prevented by browser:", error);
        // Don't set isPlaying to true if auto-play fails
      }
    };

    playMusic();

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }

    setShowNote(true);
    setTimeout(() => setShowNote(false), 2000);
  };

  return (
    <div className="music-toggle">
      <button
        className={`music-button ${isPlaying ? "playing" : ""}`}
        onClick={toggleMusic}
      >
        <div className="button-content">
          <span className="music-icon">{isPlaying ? "🎵" : "🎶"}</span>
          <div className="button-glow"></div>
        </div>
      </button>

      {showNote && (
        <div className="music-notification">
          <div className="notification-content">
            <span className="notification-icon">{isPlaying ? "🎼" : "🔇"}</span>
            <span className="notification-text">
              {isPlaying ? "Soft piano music on!" : "Music paused"}
            </span>
          </div>
        </div>
      )}

      <div className="floating-notes">
        {isPlaying && (
          <>
            <span className="note note-1">♪</span>
            <span className="note note-2">♫</span>
            <span className="note note-3">♪</span>
            <span className="note note-4">♬</span>
            <span className="note note-5">♫</span>
          </>
        )}
      </div>
    </div>
  );
};

export default MusicToggle;
