"use client";

import { useState } from "react";
import "./GameWorldsSection.css";

const GameWorldsSection = ({ onStartClockKingdom, onStartMathsRangers }) => {
  const [hoveredGame, setHoveredGame] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: "clock-kingdom",
      title: "Clock Kingdom",
      subtitle: "Time-Telling Adventures",
      description:
        "Journey through magical realms where rising suns and rotating clock towers teach you to master time!",
      icon: "🏰",
      backgroundEmoji: "⏰",
      features: [
        "Analog Clock Reading",
        "Digital Time Matching",
        "AM/PM Adventures",
        // "Daily Scheduling",
      ],
      difficulty: "Beginner",
      color: "linear-gradient(135deg, #FFE4B5 0%, #FFEAA7 50%, #FDCB6E 100%)",
      decorations: ["🌅", "🐦", "⏰", "🔔"],
    },
    {
      id: "math-rangers",
      title: "Math Rangers",
      subtitle: "Wild West Math Duels",
      description:
        "Saddle up and defeat math bandits in epic cowboy duels that burst into confetti with every correct answer!",
      icon: "🤠",
      backgroundEmoji: "🏜️",
      features: [
        "Addition Duels",
        "Subtraction Showdowns",
        "Multiplication Battles",
        // "Division Challenges",
      ],
      difficulty: "Moderate",
      color: "linear-gradient(135deg, #DEB887 0%, #D2B48C 50%, #CD853F 100%)",
      decorations: ["🌵", "🐎", "⭐", "🎯"],
    },
  ];

  const handleGameClick = (gameId) => {
    if (gameId === "clock-kingdom" && onStartClockKingdom) {
      onStartClockKingdom();
    } else if (gameId === "math-rangers" && onStartMathsRangers) {
      onStartMathsRangers();
    } else {
      setSelectedGame(selectedGame === gameId ? null : gameId);
    }
  };

  return (
    <section id="games" className="game-worlds-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-text">Choose Your Magical World!</span>
          <div className="title-decorations">
            <span>🌟</span>
            <span>✨</span>
            <span>🎭</span>
          </div>
        </h2>
        <p className="section-subtitle">
          Each floating island holds incredible learning adventures waiting for
          brave explorers like you!
        </p>
      </div>

      <div className="games-container">
        {games.map((game, index) => (
          <div
            key={game.id}
            className={`game-island ${
              hoveredGame === game.id ? "hovered" : ""
            } ${selectedGame === game.id ? "selected" : ""}`}
            style={{
              background: game.color,
              animationDelay: `${index * 0.3}s`,
            }}
            onMouseEnter={() => setHoveredGame(game.id)}
            onMouseLeave={() => setHoveredGame(null)}
            onClick={() => handleGameClick(game.id)}
          >
            <div className="island-background">
              <div className="background-emoji">{game.backgroundEmoji}</div>
            </div>

            <div className="island-content">
              <div className="game-header">
                <div className="game-icon">{game.icon}</div>
                <div className="game-info">
                  <h3 className="game-title">{game.title}</h3>
                  <p className="game-subtitle">{game.subtitle}</p>
                </div>
              </div>

              <p className="game-description">{game.description}</p>

              <div className="game-features">
                {game.features.map((feature, idx) => (
                  <span key={idx} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="game-footer">
                <span
                  className={`difficulty-badge ${game.difficulty.toLowerCase()}`}
                >
                  {game.difficulty}
                </span>
                <button className="play-button">
                  <span>🎮</span>
                  <span>Start Adventure</span>
                </button>
              </div>
            </div>

            <div className="island-decorations">
              {game.decorations.map((decoration, idx) => (
                <div key={idx} className={`decoration decoration-${idx + 1}`}>
                  {decoration}
                </div>
              ))}
            </div>

            <div className="hover-effects">
              <div className="sparkle-trail">
                {[...Array(8)].map((_, i) => (
                  <span key={i} className={`trail-sparkle trail-${i}`}>
                    ✨
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GameWorldsSection;
