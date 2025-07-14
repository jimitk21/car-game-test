"use client";

import { useState } from "react";
import "./Footer.css";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";
import HelpSupport from "../HelpSupport/HelpSupport";
import ContactUs from "../ContactUs/ContactUs";

const Footer = ({
  onTermsOpen,
  showTerms,
  onTermsClose,
  onHelpOpen,
  showHelp,
  onHelpClose,
  onContactOpen,
  showContact,
  onContactClose,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const openTerms = () => {
    if (onTermsOpen) {
      onTermsOpen();
    }
  };

  const closeTerms = () => {
    if (onTermsClose) {
      onTermsClose();
    }
  };

  const openHelp = () => {
    if (onHelpOpen) {
      onHelpOpen();
    }
  };

  const closeHelp = () => {
    if (onHelpClose) {
      onHelpClose();
    }
  };

  const openContact = () => {
    if (onContactOpen) {
      onContactOpen();
    }
  };

  const closeContact = () => {
    if (onContactClose) {
      onContactClose();
    }
  };

  return (
    <footer className="footer">
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(30)].map((_, i) => (
            <div key={i} className={`confetti confetti-${i % 6}`}>
              {["🎉", "✨", "⭐", "🌟", "💖", "🎭"][i % 6]}
            </div>
          ))}
        </div>
      )}

      {showTerms && <TermsAndConditions onClose={closeTerms} />}
      {showHelp && <HelpSupport onClose={closeHelp} />}
      {showContact && <ContactUs onClose={closeContact} />}

      <div className="footer-book">
        <div className="book-spine"></div>
        <div className="book-glow"></div>

        <div className="book-content">
          <div className="footer-header">
            <div className="footer-logo">
              <span className="logo-icon">🏰</span>
              <h3 className="footer-title">EduQuest: Adventures in Learning</h3>
              <div className="logo-sparkles">
                <span>✨</span>
                <span>⭐</span>
                <span>🌟</span>
              </div>
            </div>
            <p className="footer-tagline">
              Made with 💖 for young learners everywhere
            </p>
          </div>

          <div className="footer-sections">
            <div
              className="footer-section"
              onMouseEnter={() => setHoveredSection("links")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <h4>🎮 Quick Adventures</h4>
              <ul>
                <li>
                  <a href="#hero">🏠 Home Base</a>
                </li>
                <li>
                  <a href="#games">🎯 Game Worlds</a>
                </li>
                <li>
                  <a href="#features">⭐ Features</a>
                </li>
                <li>
                  <button className="footer-link-button" onClick={openHelp}>
                    ❓ Help & Support
                  </button>
                </li>
              </ul>
              {hoveredSection === "links" && (
                <div className="section-sparkles">
                  <span>✨</span>
                  <span>🌟</span>
                </div>
              )}
            </div>

            <div
              className="footer-section"
              onMouseEnter={() => setHoveredSection("badges")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <h4>🏆 Achievement Badges</h4>
              <div className="achievement-showcase">
                <div className="badge-grid">
                  <span className="badge time">⭐ Time Master</span>
                  <span className="badge math">🏆 Math Sheriff</span>
                  <span className="badge fraction">🎓 Fraction Fairy</span>
                  <span className="badge ninja">🥋 Number Ninja</span>
                  <span className="badge champion">👑 Time Champion</span>
                  <span className="badge learner">🌟 Super Learner</span>
                </div>
              </div>
              {hoveredSection === "badges" && (
                <div className="section-sparkles">
                  <span>🎉</span>
                  <span>✨</span>
                </div>
              )}
            </div>

            <div
              className="footer-section"
              onMouseEnter={() => setHoveredSection("connect")}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <h4>🌟 Connect & Explore</h4>
              <div className="social-links">
                <button
                  className="social-link github"
                  onClick={triggerConfetti}
                >
                  <span>🐙</span>
                  <span>GitHub Repository</span>
                </button>
                <button className="social-link contact" onClick={openContact}>
                  <span>📧</span>
                  <span>Contact Us</span>
                </button>
                <button className="social-link terms" onClick={openTerms}>
                  <span>📋</span>
                  <span>Terms & Conditions</span>
                </button>
              </div>
              {hoveredSection === "connect" && (
                <div className="section-sparkles">
                  <span>💫</span>
                  <span>🎭</span>
                </div>
              )}
            </div>
          </div>

          <div className="footer-bottom">
            <div className="creators-section">
              <h4>👨‍💻 Created by</h4>
              <div className="creators">
                <div className="creator">
                  <span className="creator-emoji">🚀</span>
                  <span className="creator-name">Jimit Karangia</span>
                </div>
                <div className="creator">
                  <span className="creator-emoji">⭐</span>
                  <span className="creator-name">Meet Kathiriya</span>
                </div>
              </div>
            </div>

            <div className="hackathon-credit">
              <div className="hackathon-badge">
                <span className="badge-icon">🏆</span>
                <div className="badge-text">
                  <p className="hackathon-title">
                    Built during Playpower Labs Hackathon
                  </p>
                  <p className="hackathon-subtitle">
                    Transforming education through play!
                  </p>
                </div>
              </div>
            </div>

            <div className="magic-quote">
              <div className="quote-container">
                <p className="quote-text">"Let's make education magical!"</p>
                <div className="quote-sparkles">
                  <span>✨</span>
                  <span>🎭</span>
                  <span>🌟</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="book-decorations">
          <div className="floating-icon icon-1">📚</div>
          <div className="floating-icon icon-2">🎓</div>
          <div className="floating-icon icon-3">⭐</div>
          <div className="floating-icon icon-4">🌟</div>
          <div className="floating-icon icon-5">✨</div>
          <div className="floating-icon icon-6">🎭</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
