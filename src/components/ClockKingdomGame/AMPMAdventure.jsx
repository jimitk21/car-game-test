import React from "react";

const AMPMAdventure = ({
  currentQuestion,
  handleAMPMAnswer,
  showFeedback,
  timeLeft,
  timerActive,
}) => {
  return (
    <div className="ampm-game">
      <div className="timer-display">
        Time Left:{" "}
        <span className={timeLeft <= 3 ? "timer-warning" : ""}>{timeLeft}</span>{" "}
        seconds
      </div>
      <div className="question-scene">
        <div className="scene-illustration">{currentQuestion.scene}</div>
        <h3 className="question-text">{currentQuestion.question}</h3>
        <p className="scene-description">{currentQuestion.description}</p>
      </div>
      <div className="ampm-options">
        <button
          className="ampm-btn am-btn"
          onClick={() => handleAMPMAnswer("AM")}
          disabled={showFeedback !== "" || timeLeft <= 0}
        >
          🌅 AM
        </button>
        <button
          className="ampm-btn pm-btn"
          onClick={() => handleAMPMAnswer("PM")}
          disabled={showFeedback !== "" || timeLeft <= 0}
        >
          🌙 PM
        </button>
      </div>
    </div>
  );
};

export default AMPMAdventure;
