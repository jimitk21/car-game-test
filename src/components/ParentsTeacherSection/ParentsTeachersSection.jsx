"use client";

import { useState } from "react";
import "./ParentsTeachersSection.css";

const ParentsTeachersSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      id: "progress",
      icon: "📊",
      title: "Track Progress",
      description:
        "Watch your child's learning journey unfold with detailed progress reports, achievement tracking, and milestone celebrations.",
      // tooltip:
      //   "Visual dashboards show learning milestones, time spent, and areas of strength with colorful charts and badges!",
      color: "linear-gradient(135deg, #87CEEB, #98FB98)",
    },
    {
      id: "curriculum",
      icon: "✅",
      title: "Curriculum-Aligned",
      description:
        "All games are carefully designed to match grade 1–3 learning standards and educational objectives.",
      // tooltip:
      // "Created by educators to perfectly complement classroom learning and homework assignments!",
      color: "linear-gradient(135deg, #FFE4B5, #FFEAA7)",
    },
    {
      id: "gemini-ai",
      icon: "🤖",
      title: "Gemini AI Support",
      description:
        "Our intelligent AI guide provides personalized hints, encouragement, and adaptive learning support.",
      // tooltip:
      //   "Smart assistance that adapts to each child's learning pace and provides just the right amount of help!",
      color: "linear-gradient(135deg, #DDA0DD, #E6E6FA)",
    },
    {
      id: "no-signup",
      icon: "🔓",
      title: "No Signup Needed",
      description:
        "Jump straight into learning! No complicated registration, passwords, or personal information required.",
      // tooltip:
      //   "Safe, secure, and ready to play in seconds - just click and start learning!",
      color: "linear-gradient(135deg, #98FB98, #90EE90)",
    },
    {
      id: "safe-environment",
      icon: "🛡️",
      title: "Safe Learning Space",
      description:
        "Ad-free, secure platform designed specifically for young learners with child-safe interactions.",
      // tooltip:
      //   "Protected environment with no external links, inappropriate content, or distracting advertisements!",
      color: "linear-gradient(135deg, #FFB6C1, #FFA0B4)",
    },
    {
      id: "multi-device",
      icon: "📱",
      title: "Works Everywhere",
      description:
        "Seamless experience across tablets, computers, and phones - learning never stops, anywhere you go!",
      // tooltip:
      //   "Responsive design that automatically adjusts to any screen size for the perfect learning experience!",
      color: "linear-gradient(135deg, #DEB887, #D2B48C)",
    },
  ];

  return (
    <section id="features" className="parents-teachers-section">
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-text">For Parents & Teachers</span>
          <div className="title-icons">
            <span>👨‍👩‍👧‍👦</span>
            <span>📚</span>
            <span>✨</span>
          </div>
        </h2>
        <p className="section-subtitle">
          Discover why EduQuest is the perfect learning companion for your child
          or classroom, combining fun with educational excellence!
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`feature-card ${
              hoveredCard === feature.id ? "hovered" : ""
            }`}
            style={{
              background: feature.color,
              animationDelay: `${index * 0.1}s`,
            }}
            onMouseEnter={() => setHoveredCard(feature.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-glow"></div>

            <div className="card-content">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>

            {hoveredCard === feature.id && (
              <div className="tooltip">
                <div className="tooltip-content">{feature.tooltip}</div>
                <div className="tooltip-arrow"></div>
              </div>
            )}

            <div className="card-sparkles">
              <span className="sparkle sparkle-1">✨</span>
              <span className="sparkle sparkle-2">⭐</span>
              <span className="sparkle sparkle-3">🌟</span>
            </div>
          </div>
        ))}
      </div>

      <div className="educational-benefits">
        <h3 className="benefits-title">
          <span>Educational Benefits by Game World</span>
          <div className="title-decoration">📚✨</div>
        </h3>

        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">🏰</div>
            <div className="benefit-content">
              <h4>Clock Kingdom</h4>
              <p>
                Time reading skills, AM/PM concepts, daily scheduling, and
                temporal reasoning development
              </p>
              <div className="benefit-tags">
                <span>Time Reading</span>
                <span>Schedule Planning</span>
                <span>Temporal Logic</span>
              </div>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">🤠</div>
            <div className="benefit-content">
              <h4>Math Rangers</h4>
              <p>
                Fundamental arithmetic operations, problem-solving strategies,
                and mental math fluency
              </p>
              <div className="benefit-tags">
                <span>Basic Math</span>
                <span>Problem Solving</span>
                <span>Mental Calculation</span>
              </div>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">🧚‍♀️</div>
            <div className="benefit-content">
              <h4>Fraction Forest</h4>
              <p>
                Fraction concepts, visual learning, comparison skills, and
                proportional reasoning
              </p>
              <div className="benefit-tags">
                <span>Fraction Basics</span>
                <span>Visual Learning</span>
                <span>Comparisons</span>
              </div>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">🥷</div>
            <div className="benefit-content">
              <h4>Number Ninjas</h4>
              <p>
                Place value understanding, number sense development, and logical
                thinking skills
              </p>
              <div className="benefit-tags">
                <span>Place Value</span>
                <span>Number Sense</span>
                <span>Logic Skills</span>
              </div>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">⏳</div>
            <div className="benefit-content">
              <h4>Time Traveler's Tower</h4>
              <p>
                Advanced time concepts, planning skills, critical thinking, and
                problem-solving mastery
              </p>
              <div className="benefit-tags">
                <span>Advanced Time</span>
                <span>Critical Thinking</span>
                <span>Planning Skills</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParentsTeachersSection;
