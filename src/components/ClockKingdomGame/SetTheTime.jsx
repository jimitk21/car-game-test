import React from "react";
import InteractiveAnalogClock from "./InteractiveAnalogClock.jsx";

const SetTheTime = ({
  targetTime,
  clockHours,
  clockMinutes,
  setClockHours,
  setClockMinutes,
  checkClockAnswer,
  showFeedback,
  timeLeft,
  timerActive,
}) => {
  return (
    <div className="set-clock-game">
      <div className="timer-display">
        Time Left:{" "}
        <span className={timeLeft <= 3 ? "timer-warning" : ""}>{timeLeft}</span>{" "}
        seconds
      </div>
      <InteractiveAnalogClock
        targetTime={targetTime}
        clockHours={clockHours}
        clockMinutes={clockMinutes}
        setClockHours={setClockHours}
        setClockMinutes={setClockMinutes}
        checkClockAnswer={checkClockAnswer}
        disableAll={showFeedback !== "" || timeLeft <= 0}
      />
      <button
        className="check-answer-btn"
        onClick={() => checkClockAnswer()}
        disabled={showFeedback !== "" || timeLeft <= 0}
      >
        Check Answer
      </button>
    </div>
  );
};

export default SetTheTime;
