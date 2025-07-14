"use client";

import { useState, useEffect } from "react";
import "./HeroSection.css";

const HeroSection = ({ scrollY }) => {
  const [owlMessage, setOwlMessage] = useState(0);
  const [showOwl, setShowOwl] = useState(true);

  const owlMessages = [
    "Pick a land and power up your brain! 🧠✨",
    "Learning is your superpower! 🦸‍♀️💫",
    "Adventure awaits, young explorer! 🗺️🌟",
    "Ready to become a learning legend? 🏆⚡",
    "Magic happens when you learn! 🎭✨",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowOwl(false);
      setTimeout(() => {
        setOwlMessage((prev) => (prev + 1) % owlMessages.length);
        setShowOwl(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollToGames = () => {
    document.getElementById("games").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-magical-effects">
        <div className="floating-sparkles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className={`sparkle sparkle-${i % 5}`}>
              {["✨", "⭐", "🌟", "💫", "🎭"][i % 5]}
            </div>
          ))}
        </div>
      </div>

      <div className="hero-container">
        <div className="hero-island">
          <div className="magical-island-base">
            <div className="island-glow"></div>

            <div className="characters-stage">
              <div className="character ninja">
                <div className="character-emoji">🥷</div>
                <div className="character-wave"></div>
              </div>
              <div className="character cowboy">
                <div className="character-emoji">🤠</div>
                <div className="character-wave"></div>
              </div>
              <div className="character fairy">
                <div className="character-emoji">🧚‍♀️</div>
                <div className="character-wave"></div>
              </div>
              <div className="character prince">
                <div className="character-emoji">👑</div>
                <div className="character-wave"></div>
              </div>
            </div>

            <div className="island-decorations">
              <div className="decoration tree">🌳</div>
              <div className="decoration flower">🌸</div>
              <div className="decoration crystal">💎</div>
            </div>
          </div>
        </div>

        <div className="hero-content">
          {/* <div className={`owl-guide ${showOwl ? "show" : "hide"}`}>
            <div className="owl-container">
              <div className="owl">🦉</div>
              <div className="owl-glow"></div>
            </div>
            <div className="speech-bubble">
              <div className="bubble-content">{owlMessages[owlMessage]}</div>
              <div className="bubble-tail"></div>
            </div>
          </div> */}

          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-line">Learning Has Never</span>
              <span className="title-line sparkle-text">Been This Fun!</span>
              <div className="title-sparkles">
                <span>🎉</span>
                <span>✨</span>
                <span>🌟</span>
              </div>
            </h1>

            <p className="hero-subtitle">
              <span className="subtitle-sparkle">✨</span>
              Explore mystical lands, meet amazing characters, and overcome
              playful challenges that transform learning into an incredible
              magical adventure!
              <span className="subtitle-sparkle">✨</span>
            </p>

            <div className="hero-buttons">
              <button className="cta-button primary" onClick={scrollToGames}>
                <span className="button-icon">🚀</span>
                <span className="button-text">Start Learning</span>
                <div className="button-sparkles">
                  <span>✨</span>
                  <span>⭐</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-magic">
          {/* <div className="scroll-arrow">⬇️</div>
          <div className="scroll-text">Discover magical worlds below!</div> */}
          <div className="scroll-sparkles">
            <span>✨</span>
            <span>🌟</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
