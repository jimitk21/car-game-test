"use client";

import { useState, useEffect } from "react";
import "./Navigation.css";

const Navigation = ({ onHelpOpen }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const handleHelpClick = () => {
    if (onHelpOpen) {
      onHelpOpen();
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="logo">
          <div className="logo-icon">🏰</div>
          <span className="logo-text">EduQuest</span>
          <div className="logo-sparkles">
            <span>✨</span>
            <span>⭐</span>
          </div>
        </div>

        <div className="nav-links">
          <button
            className={`nav-button ${activeSection === "home" ? "active" : ""}`}
            onClick={() => scrollToSection("hero")}
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
          </button>
          <button
            className={`nav-button ${
              activeSection === "games" ? "active" : ""
            }`}
            onClick={() => scrollToSection("games")}
          >
            <span className="nav-icon">🎮</span>
            <span className="nav-text">Games</span>
          </button>
          <button
            className={`nav-button ${
              activeSection === "features" ? "active" : ""
            }`}
            onClick={() => scrollToSection("features")}
          >
            <span className="nav-icon">⭐</span>
            <span className="nav-text">Features</span>
          </button>
          <button className="nav-button help-button" onClick={handleHelpClick}>
            <span className="nav-icon">❓</span>
            <span className="nav-text">Help</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
