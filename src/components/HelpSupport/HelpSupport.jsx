"use client";

import { useState } from "react";
import "./HelpSupport.css";

const HelpSupport = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    if (onClose) {
      onClose();
    }
  };

  if (isVisible) {
    return (
      <div className="help-overlay">
        <div className="help-modal">
          <div className="help-header">
            <h2>❓ Help & Support</h2>
            <button className="close-button" onClick={toggleVisibility}>
              ✕
            </button>
          </div>
          <div className="help-content">
            <div className="welcome-section">
              <h3>🌟 Welcome to EduQuest!</h3>
              <p>
                Need help with your learning adventure? We're here to support
                you on your magical journey!
              </p>
            </div>

            <div className="help-section">
              <h3>🎮 How to Play</h3>
              <div className="help-item">
                <span className="help-icon">🏰</span>
                <div className="help-text">
                  <h4>Clock Kingdom</h4>
                  <p>
                    Learn to tell time with magical clock towers and daily
                    adventures!
                  </p>
                </div>
              </div>
              <div className="help-item">
                <span className="help-icon">🤠</span>
                <div className="help-text">
                  <h4>Math Rangers</h4>
                  <p>
                    Defeat math bandits in epic duels with addition,
                    subtraction, and more!
                  </p>
                </div>
              </div>
              <div className="help-item">
                <span className="help-icon">🧚‍♀️</span>
                <div className="help-text">
                  <h4>Fraction Forest</h4>
                  <p>
                    Mix magical potions and learn fractions with forest spirits!
                  </p>
                </div>
              </div>
              <div className="help-item">
                <span className="help-icon">🥷</span>
                <div className="help-text">
                  <h4>Number Ninjas</h4>
                  <p>
                    Master place values in a peaceful dojo with floating
                    numbers!
                  </p>
                </div>
              </div>
              <div className="help-item">
                <span className="help-icon">⏳</span>
                <div className="help-text">
                  <h4>Time Traveler's Tower</h4>
                  <p>
                    Climb the mystical tower and face the Time Bandit in the
                    ultimate challenge!
                  </p>
                </div>
              </div>
            </div>

            <div className="help-section">
              <h3>💡 Tips for Success</h3>
              <ul className="tips-list">
                <li>🎯 Start with easier games and work your way up</li>
                <li>
                  🎵 Turn on the background music for a magical experience
                </li>
                <li>🏆 Collect badges and celebrate your achievements</li>
                <li>🔄 Practice regularly to improve your skills</li>
                <li>🌟 Have fun - learning is an adventure!</li>
              </ul>
            </div>

            <div className="help-section">
              <h3>🔧 Technical Support</h3>
              <p>
                This is a demo application created for the Playpower Labs
                Hackathon. For technical support or questions about the
                hackathon, please contact the developers below.
              </p>
            </div>

            <div className="developers-section">
              <h3>👨‍💻 Meet the Developers</h3>
              <div className="developer-cards">
                <div className="developer-card">
                  <div className="developer-avatar">🚀</div>
                  <h4>Jimit Karangia</h4>
                  <p className="developer-role">Senior Analyst, Capgemini</p>
                  <p className="developer-qualification">
                    🎓 B.Tech - PDEU (2025 passout)
                  </p>
                  <div className="developer-links">
                    <a
                      href="mailto:jimitk191@gmail.com"
                      className="contact-link email"
                    >
                      📧 jimitk191@gmail.com
                    </a>
                    <a
                      href="https://www.linkedin.com/in/jimit-karangia-7090062bb/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link linkedin"
                    >
                      💼 LinkedIn Profile
                    </a>
                  </div>
                </div>

                <div className="developer-card">
                  <div className="developer-avatar">⭐</div>
                  <h4>Meet Kathiriya</h4>
                  <p className="developer-role">
                    Full Stack Developer, Optimoz
                  </p>
                  <p className="developer-qualification">
                    🎓 B.Tech - PDEU (2025 passout)
                  </p>
                  <div className="developer-links">
                    <a
                      href="mailto:meetkathiriya596@gmail.com"
                      className="contact-link email"
                    >
                      📧 meetkathiriya596@gmail.com
                    </a>
                    <a
                      href="https://www.linkedin.com/in/meet-kathiriya-534318224/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link linkedin"
                    >
                      💼 LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="hackathon-badge">
              <div className="badge-content">
                <span className="badge-icon">🏆</span>
                <div className="badge-text">
                  <p className="badge-title">Playpower Labs Hackathon</p>
                  <p className="badge-subtitle">
                    Transforming Education Through Play
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default HelpSupport;
