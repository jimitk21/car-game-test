"use client";

import { useState } from "react";
import "./MathQuestion.css";

const MathQuestion = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    setTimeout(() => {
      onAnswer(answer);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 1000);
  };

  if (!question) return null;

  return (
    <div className="math-question-sticky-wrapper">
      <div className="math-question-container">
        <div className="question-card">
          <div className="question-header">
            <h3>🧮 Solve to Boost Your Car! 🚀</h3>
          </div>
          <div className="question-content">
            <div className="question-text">{question.question} = ?</div>
            <div className="answer-options">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  className={`answer-option ${
                    selectedAnswer === option
                      ? option === question.answer
                        ? "correct"
                        : "incorrect"
                      : ""
                  } ${
                    showFeedback && option === question.answer
                      ? "highlight-correct"
                      : ""
                  }`}
                  onClick={() => handleAnswerClick(option)}
                  disabled={showFeedback}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathQuestion;
