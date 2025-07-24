import React from "react";
import AnalogClock from "./AnalogClock.jsx";

const GuessTheTime = ({
  currentQuestion,
  handleGuessAnswer,
  showFeedback,
  timeLeft,
  timerActive,
}) => {
  return (
    <div className="guess-time-game">
      <div className="timer-display">
        Time Left:{" "}
        <span className={timeLeft <= 3 ? "timer-warning" : ""}>{timeLeft}</span>{" "}
        seconds
      </div>
      <div className="clock-display">
        <AnalogClock
          hours={currentQuestion.time.hours}
          minutes={currentQuestion.time.minutes}
          hourHandClass="hour-hand-guess-time"
        />
      </div>
      <div className="answer-options">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className="option-btn"
            onClick={() => handleGuessAnswer(index)}
            disabled={showFeedback !== "" || timeLeft <= 0}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GuessTheTime;
