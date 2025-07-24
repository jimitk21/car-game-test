"use client";

import { useState } from "react";
import "./ContactUs.css";

const ContactUs = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    if (onClose) {
      onClose();
    }
  };

  if (isVisible) {
    return (
      <div className="contact-overlay">
        <div className="contact-modal">
          <div className="contact-header">
            <h2>📧 Contact Us</h2>
            <button className="close-button" onClick={toggleVisibility}>
              ✕
            </button>
          </div>
          <div className="contact-content">
            <div className="welcome-section">
              <h3>🌟 Get in Touch!</h3>
              <p>
                Have questions about EduQuest or want to connect with our
                developers? We'd love to hear from you!
              </p>
            </div>

            <div className="developers-section">
              <h3>👨‍💻 Connect with Our Developers</h3>
              <p>Get in touch directly with our amazing team:</p>

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
                    Finding Relevant Opportunities
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

            <div className="info-section">
              <h3>ℹ️ About This Project</h3>
              <p>
                EduQuest is a demo application created during the Playpower Labs
                Hackathon. It showcases how educational content can be made
                engaging and interactive through gamification and storytelling.
              </p>
              <div className="features-list">
                <div className="feature-item">
                  <span className="feature-icon">🎮</span>
                  <span>Interactive Learning Games</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎨</span>
                  <span>Beautiful UI/UX Design</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📱</span>
                  <span>Responsive Design</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎵</span>
                  <span>Immersive Experience</span>
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

export default ContactUs;
