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
      id: "instant-safe-access",
      icon: "🛡️",
      title: "Instant & Safe Learning",
      description:
        "Start learning instantly—no sign-up needed! Our ad-free, secure platform ensures a child-friendly space with no distractions or risks.",
      // tooltip:
      //   "Enjoy a protected, password-free environment built just for young minds. No ads, no data collection—just safe, fun learning!",
      color: "linear-gradient(135deg, #98FB98, #FFB6C1)",
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
        </div>
      </div>
    </section>
  );
};

export default ParentsTeachersSection;
