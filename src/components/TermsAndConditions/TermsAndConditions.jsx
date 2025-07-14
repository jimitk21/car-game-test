"use client";

import { useState } from "react";
import "./TermsAndConditions.css";

const TermsAndConditions = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    if (onClose) {
      onClose();
    }
  };

  if (isVisible) {
    return (
      <div className="terms-overlay">
        <div className="terms-modal">
          <div className="terms-header">
            <h2>📜 Terms & Conditions</h2>
            <button className="close-button" onClick={toggleVisibility}>
              ✕
            </button>
          </div>
          <div className="terms-content">
            <div className="hackathon-info">
              <h3>🏆 Playpower Labs Hackathon Project</h3>
              <p>
                <strong>EduQuest</strong> was created as a fun educational
                project during the Playpower Labs Hackathon.
              </p>
              <div className="creators">
                <p>
                  <strong>Created by:</strong>
                </p>
                <ul>
                  <li>
                    🎮 <strong>Jimit Karangia</strong>
                  </li>
                  <li>
                    🎮 <strong>Meet Kathiriya</strong>
                  </li>
                </ul>
              </div>
            </div>

            <div className="terms-section">
              <h3>🎯 Purpose</h3>
              <p>
                This application is designed for educational purposes and
                entertainment. It's a demonstration of how learning can be made
                fun and engaging through interactive games and storytelling.
              </p>
            </div>

            <div className="terms-section">
              <h3>🎮 Educational Content</h3>
              <p>
                All games and learning activities are designed for children in
                grades 1-3. The content focuses on fundamental math skills,
                time-telling, and logical thinking.
              </p>
            </div>

            <div className="terms-section">
              <h3>🔒 Privacy & Safety</h3>
              <p>
                This is a demo application with no data collection or storage.
                No personal information is required to use the games. All
                interactions are local and temporary.
              </p>
            </div>

            <div className="terms-section">
              <h3>🎨 Creative Commons</h3>
              <p>
                This project is created for educational demonstration purposes.
                Feel free to explore and learn from the code and design
                concepts.
              </p>
            </div>

            <div className="terms-section">
              <h3>🌟 Acknowledgments</h3>
              <p>
                Special thanks to Playpower Labs for organizing this amazing
                hackathon and providing the platform to create innovative
                educational solutions!
              </p>
            </div>

            <div className="terms-section">
              <h3>📞 Contact</h3>
              <p>
                This is a hackathon project created for demonstration purposes.
                For questions about the Playpower Labs Hackathon, please contact
                the organizers.
              </p>
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

export default TermsAndConditions;
