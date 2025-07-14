"use client";

import { useState, useEffect, useRef } from "react";
import "./ClockKingdomGame.css";
import GuessTheTime from "./GuessTheTime.jsx";
import SetTheTime from "./SetTheTime.jsx";
import AMPMAdventure from "./AMPMAdventure.jsx";

function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_SECTION = 4;

const guessTimeQuestionsOrig = [
  {
    time: { hours: 4, minutes: 0 },
    options: ["4:00", "4:15", "3:45"],
    correct: 0,
  },
  {
    time: { hours: 12, minutes: 30 },
    options: ["12:45", "12:30", "1:00"],
    correct: 1,
  },
  {
    time: { hours: 7, minutes: 50 },
    options: ["8:00", "7:30", "7:50"],
    correct: 2,
  },
  {
    time: { hours: 2, minutes: 15 },
    options: ["2:15", "2:45", "2:00"],
    correct: 0,
  },
  {
    time: { hours: 9, minutes: 40 },
    options: ["9:30", "9:40", "10:00"],
    correct: 1,
  },
  {
    time: { hours: 6, minutes: 10 },
    options: ["6:30", "6:00", "6:10"],
    correct: 2,
  },
  {
    time: { hours: 10, minutes: 0 },
    options: ["9:45", "10:00", "10:30"],
    correct: 1,
  },
  {
    time: { hours: 1, minutes: 5 },
    options: ["1:00", "1:15", "1:05"],
    correct: 2,
  },
  {
    time: { hours: 8, minutes: 45 },
    options: ["8:45", "9:00", "8:30"],
    correct: 0,
  },
  {
    time: { hours: 11, minutes: 20 },
    options: ["11:30", "11:20", "11:00"],
    correct: 1,
  },
  {
    time: { hours: 3, minutes: 35 },
    options: ["3:45", "3:15", "3:35"],
    correct: 2,
  },
  {
    time: { hours: 5, minutes: 25 },
    options: ["5:25", "5:45", "5:15"],
    correct: 0,
  },
  {
    time: { hours: 12, minutes: 0 },
    options: ["12:30", "11:45", "12:00"],
    correct: 2,
  },
  {
    time: { hours: 7, minutes: 5 },
    options: ["7:00", "7:05", "7:15"],
    correct: 1,
  },
  {
    time: { hours: 2, minutes: 55 },
    options: ["3:00", "2:45", "2:55"],
    correct: 2,
  },
  {
    time: { hours: 6, minutes: 30 },
    options: ["6:30", "6:00", "6:45"],
    correct: 0,
  },
  {
    time: { hours: 9, minutes: 15 },
    options: ["9:00", "9:15", "9:30"],
    correct: 1,
  },
  {
    time: { hours: 10, minutes: 20 },
    options: ["10:15", "10:30", "10:20"],
    correct: 2,
  },
  {
    time: { hours: 1, minutes: 45 },
    options: ["1:45", "2:00", "1:30"],
    correct: 0,
  },
  {
    time: { hours: 11, minutes: 10 },
    options: ["11:30", "11:10", "10:50"],
    correct: 1,
  },
  {
    time: { hours: 4, minutes: 50 },
    options: ["4:30", "5:00", "4:50"],
    correct: 2,
  },
  {
    time: { hours: 7, minutes: 0 },
    options: ["7:00", "7:15", "6:45"],
    correct: 0,
  },
  {
    time: { hours: 8, minutes: 25 },
    options: ["8:30", "8:25", "8:15"],
    correct: 1,
  },
  {
    time: { hours: 2, minutes: 40 },
    options: ["2:45", "2:30", "2:40"],
    correct: 2,
  },
  {
    time: { hours: 5, minutes: 35 },
    options: ["5:35", "5:45", "5:15"],
    correct: 0,
  },
  {
    time: { hours: 3, minutes: 20 },
    options: ["3:15", "3:30", "3:20"],
    correct: 2,
  },
  {
    time: { hours: 12, minutes: 10 },
    options: ["12:10", "12:30", "11:50"],
    correct: 0,
  },
  {
    time: { hours: 9, minutes: 55 },
    options: ["10:00", "9:45", "9:55"],
    correct: 2,
  },
  {
    time: { hours: 6, minutes: 5 },
    options: ["6:15", "6:00", "6:05"],
    correct: 2,
  },
  {
    time: { hours: 10, minutes: 10 },
    options: ["10:00", "10:10", "10:30"],
    correct: 1,
  },
];

const ampmQuestionsOrig = [
  {
    question: "When do we drink warm milk before bed?",
    scene: "🥛🌙",
    correct: "PM",
    description: "A cozy night with a glass of warm milk",
  },
  {
    question: "When do we see the school assembly?",
    scene: "🎤🏫",
    correct: "AM",
    description: "A morning gathering at school",
  },
  {
    question: "When do we play outside after school?",
    scene: "⚽🌆",
    correct: "PM",
    description: "Evening playtime as the sun goes down",
  },
  {
    question: "When do we wake up?",
    scene: "⏰🌞",
    correct: "AM",
    description: "Rising early with the alarm and sunshine",
  },
  {
    question: "When do we read a book before sleeping?",
    scene: "📚🛏️",
    correct: "PM",
    description: "Nighttime reading before bed",
  },
  {
    question: "When do we hear the rooster crow?",
    scene: "🐓🌄",
    correct: "AM",
    description: "Morning call of the rooster at sunrise",
  },
  {
    question: "When do we have an afternoon snack?",
    scene: "🍪☀️",
    correct: "PM",
    description: "Enjoying cookies during a sunny afternoon",
  },
  {
    question: "When do we see the moon in the sky?",
    scene: "🌝🌌",
    correct: "PM",
    description: "A glowing moon in the night sky",
  },
  {
    question: "When do we get ready for school?",
    scene: "🧼👕🎒",
    correct: "AM",
    description: "Morning routine of washing up and dressing",
  },
  {
    question: "When do we dream while sleeping?",
    scene: "💤🌙",
    correct: "PM",
    description: "Peaceful dreams under the night sky",
  },
];

const ClockKingdom = ({ onExitGame }) => {
  const [gameState, setGameState] = useState("welcome");
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [badges, setBadges] = useState([]);
  const [showFeedback, setShowFeedback] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [showMonkey, setShowMonkey] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Shuffled questions and indices
  const [guessTimeQuestions, setGuessTimeQuestions] = useState([]);
  const [ampmQuestions, setAMPMQuestions] = useState([]);
  const [guessIndex, setGuessIndex] = useState(0);
  const [setClockIndex, setSetClockIndex] = useState(0);
  const [ampmIndex, setAMPMIndex] = useState(0);

  // Set the Clock state
  const [targetTime, setTargetTime] = useState({ hours: 3, minutes: 15 });
  const [clockHours, setClockHours] = useState(12);
  const [clockMinutes, setClockMinutes] = useState(0);

  const audioRef = useRef(null);
  const [musicOn, setMusicOn] = useState(true);
  const musicRef = useRef(null);
  const tickRef = useRef(null);
  const prevScoreRef = useRef(score);

  useEffect(() => {
    if (score < 3) setTimeOfDay("morning");
    else if (score < 6) setTimeOfDay("noon");
    else setTimeOfDay("evening");
  }, [score]);

  useEffect(() => {
    // Shuffle questions at the start
    setGuessTimeQuestions(shuffle(guessTimeQuestionsOrig));
    setAMPMQuestions(shuffle(ampmQuestionsOrig));
  }, []);

  // Get current game name based on game state
  const getCurrentGameName = () => {
    switch (gameState) {
      case "guessTime":
        return "Guess the Time";
      case "setClock":
        return "Set the Clock";
      case "ampm":
        return "AM/PM Adventure";
      case "completed":
        return "Game Complete";
      default:
        return "";
    }
  };

  // Get current game hint based on game state
  const getCurrentGameHint = () => {
    switch (gameState) {
      case "guessTime":
        return "Check the time in the analog watch and choose the correct option";
      case "setClock":
        return "Check the digital time and set the clock using the buttons, then click 'Check Answer'";
      case "ampm":
        return "Look at the scene and think about when this activity happens - morning (AM) or evening (PM)?";
      default:
        return "";
    }
  };

  // Toggle hint visibility
  const toggleHint = () => {
    setShowHint(!showHint);
  };

  // Reset hint when game state changes
  useEffect(() => {
    setShowHint(false);
  }, [gameState]);

  // Start the game
  const startGame = () => {
    setGameState("guessTime");
    setGuessIndex(0);
    setSetClockIndex(0);
    setAMPMIndex(0);
    setScore(0);
    setProgress(0);
    setBadges([]);
  };

  // Guess the Time logic
  const handleGuessAnswer = (selectedIndex) => {
    const current = guessTimeQuestions[guessIndex];
    if (selectedIndex === current.correct) {
      setScore((s) => s + 1);
      setProgress((p) => p + 100 / TOTAL_QUESTIONS);
      setShowFeedback("correct");
      setShowMonkey(true);
      setTimeout(() => {
        setShowFeedback("");
        setShowMonkey(false);
        if (guessIndex + 1 < QUESTIONS_PER_SECTION) {
          setGuessIndex(guessIndex + 1);
        } else {
          setGameState("setClock");
        }
      }, 1200);
    } else {
      setShowFeedback("incorrect");
      setTimeout(() => setShowFeedback(""), 1200);
    }
  };

  // Set the Clock logic
  const generateNewTargetTime = () => {
    // Generate a random time for each set clock question
    return {
      hours: Math.floor(Math.random() * 12) + 1,
      minutes: Math.floor(Math.random() * 12) * 5,
    };
  };

  useEffect(() => {
    if (gameState === "setClock") {
      setTargetTime(generateNewTargetTime());
      setClockHours(12);
      setClockMinutes(0);
    }
  }, [gameState, setClockIndex]);

  const checkClockAnswer = () => {
    const normalizedTargetHours =
      targetTime.hours === 0 ? 12 : targetTime.hours;
    const normalizedClockHours = clockHours === 0 ? 12 : clockHours;
    const hourMatch = normalizedClockHours === normalizedTargetHours;
    const minuteMatch = Math.abs(clockMinutes - targetTime.minutes) <= 5;
    if (hourMatch && minuteMatch) {
      setScore((s) => s + 1);
      setProgress((p) => p + 100 / TOTAL_QUESTIONS);
      setShowFeedback("correct");
      setBadges((b) => [...b, "⭐"]);
      setTimeout(() => {
        setShowFeedback("");
        if (setClockIndex + 1 < QUESTIONS_PER_SECTION) {
          setSetClockIndex(setClockIndex + 1);
          setTargetTime(generateNewTargetTime());
        } else {
          setGameState("ampm");
        }
      }, 1200);
    } else {
      setShowFeedback("incorrect");
      setTimeout(() => setShowFeedback(""), 1200);
    }
  };

  // AM/PM logic
  const handleAMPMAnswer = (answer) => {
    const current = ampmQuestions[ampmIndex];
    if (answer === current.correct) {
      setScore((s) => s + 1);
      setProgress((p) => p + 100 / TOTAL_QUESTIONS);
      setShowFeedback("correct");
      setBadges((b) => [...b, "🏆"]);
      setTimeout(() => {
        setShowFeedback("");
        if (ampmIndex + 1 < QUESTIONS_PER_SECTION) {
          setAMPMIndex(ampmIndex + 1);
        } else {
          setGameState("completed");
        }
      }, 1200);
    } else {
      setShowFeedback("incorrect");
      setTimeout(() => setShowFeedback(""), 1200);
    }
  };

  const AnalogClock = ({ hours, minutes, interactive = false, size = 180 }) => {
    const hourAngle = (hours % 12) * 30 + minutes * 0.5;
    const minuteAngle = minutes * 6;
    const numberRadius = size * 0.33; // 60 for 180px
    const hourHandLength = size * 0.22; // 40 for 180px
    const minuteHandLength = size * 0.33; // 60 for 180px
    const hourHandTop = size * 0.33; // 60 for 180px
    const minuteHandTop = size * 0.17; // 30 for 180px

    return (
      <div className="analog-clock" style={{ width: size, height: size }}>
        <div className="clock-face">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="hour-mark"
              style={{ transform: `rotate(${i * 30}deg)` }}
            />
          ))}
          {[...Array(12)].map((_, i) => (
            <div
              key={`number-${i}`}
              className="hour-number"
              style={{
                transform: `rotate(${
                  i * 30
                }deg) translateY(-${numberRadius}px) rotate(-${i * 30}deg)`,
              }}
            >
              {i === 0 ? 12 : i}
            </div>
          ))}
          <div
            className="clock-hand hour-hand-guess-time"
            style={{
              transform: `rotate(${hourAngle}deg)`,
              height: `${hourHandLength}px`,
              top: `${hourHandTop}px`,
            }}
          />
          <div
            className="clock-hand minute-hand"
            style={{
              transform: `rotate(${minuteAngle}deg)`,
              height: `${minuteHandLength}px`,
              top: `${minuteHandTop}px`,
            }}
          />
          <div className="clock-center" />
        </div>
      </div>
    );
  };

  const InteractiveAnalogClock = () => {
    const handleHourUp = () => {
      setClockHours((prev) => (prev === 12 ? 1 : prev + 1));
    };

    const handleHourDown = () => {
      setClockHours((prev) => (prev === 1 ? 12 : prev - 1));
    };

    const handleMinuteUp = () => {
      setClockMinutes((prev) => (prev + 5) % 60);
    };

    const handleMinuteDown = () => {
      setClockMinutes((prev) => (prev === 0 ? 55 : prev - 5));
    };

    return (
      <div className="interactive-clock-container">
        <div className="target-time">
          Set the clock to:{" "}
          <span className="time-display">
            {String(targetTime.hours).padStart(2, "0")}:
            {String(targetTime.minutes).padStart(2, "0")}
          </span>
        </div>

        <div className="clock-game-layout">
          <div className="clock-section">
            <div className="analog-clock">
              <div className="clock-face">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="hour-mark"
                    style={{ transform: `rotate(${i * 30}deg)` }}
                  />
                ))}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={`number-${i}`}
                    className="hour-number"
                    style={{
                      transform: `rotate(${
                        i * 30
                      }deg) translateY(-60px) rotate(-${i * 30}deg)`,
                    }}
                  >
                    {i === 0 ? 12 : i}
                  </div>
                ))}
                <div
                  className="clock-hand hour-hand-set-clock"
                  style={{
                    transform: `rotate(${
                      (clockHours % 12) * 30 + clockMinutes * 0.5
                    }deg)`,
                  }}
                />
                <div
                  className="clock-hand minute-hand"
                  style={{ transform: `rotate(${clockMinutes * 6}deg)` }}
                />
                <div className="clock-center" />
              </div>
            </div>
          </div>

          <div className="controls-section">
            <div className="clock-controls">
              <div className="current-time-display">
                Current: {String(clockHours).padStart(2, "0")}:
                {String(clockMinutes).padStart(2, "0")}
              </div>

              <div className="control-buttons">
                <div className="hour-controls">
                  <button
                    className="control-btn hour-btn"
                    onClick={handleHourUp}
                  >
                    ⬆️ Hour +1
                  </button>
                  <button
                    className="control-btn hour-btn"
                    onClick={handleHourDown}
                  >
                    ⬇️ Hour -1
                  </button>
                </div>

                <div className="minute-controls">
                  <button
                    className="control-btn minute-btn"
                    onClick={handleMinuteUp}
                  >
                    ⬆️ Minute +5
                  </button>
                  <button
                    className="control-btn minute-btn"
                    onClick={handleMinuteDown}
                  >
                    ⬇️ Minute -5
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="check-answer-btn" onClick={checkClockAnswer}>
          ✨ Check My Answer ✨
        </button>
      </div>
    );
  };

  // Play/pause background music when toggled
  useEffect(() => {
    if (musicRef.current) {
      if (musicOn) {
        musicRef.current.play();
      } else {
        musicRef.current.pause();
        musicRef.current.currentTime = 0;
      }
    }
  }, [musicOn]);

  // Play/pause music on mount/unmount
  useEffect(() => {
    if (musicRef.current && musicOn) {
      musicRef.current.play();
    }
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.currentTime = 0;
      }
    };
  }, []);

  // Play tick sound when score increases
  useEffect(() => {
    if (score > prevScoreRef.current && tickRef.current) {
      tickRef.current.currentTime = 0;
      tickRef.current.play();
    }
    prevScoreRef.current = score;
  }, [score]);

  return (
    <div className={`clock-kingdom ${timeOfDay}`}>
      {/* Animated Background Elements */}
      <div className="background-elements">
        <div className="floating-clouds">
          <div className="cloud cloud-1">☁️</div>
          <div className="cloud cloud-2">☁️</div>
          <div className="cloud cloud-3">☁️</div>
        </div>
        <div className="floating-balloons">
          <div className="balloon balloon-1">🎈</div>
          <div className="balloon balloon-2">🎈</div>
        </div>
        <div className="flying-birds">
          <div className="bird bird-1">🐦</div>
          <div className="bird bird-2">🐦</div>
        </div>
        <div className="rotating-gears">
          <div className="gear gear-1">⚙️</div>
          <div className="gear gear-2">⚙️</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-container" style={{ position: "relative" }}>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {/* Monkey Animation */}
        {showMonkey && <div className="monkey-fall-animation">🐒</div>}
        <div className="badges">
          {badges.map((badge, index) => (
            <span key={index} className="badge">
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Gem Score Card */}
      <div className="gem-score-card">
        <div className="gem-icon">💎</div>
        <div className="gem-score">{score}</div>
      </div>

      {/* Main Game Container */}
      <div className="game-container">
        <div className="floating-island">
          {/* Game Name Display */}
          {gameState !== "welcome" && (
            <div className="game-name-display">{getCurrentGameName()}</div>
          )}
          <div className="game-card">
            {gameState === "welcome" && (
              <div className="welcome-screen">
                <div className="owl-guardian">🦉</div>
                <div className="welcome-scroll">
                  <h1 className="game-title">Clock Kingdom</h1>
                  <h2 className="subtitle">Time-Telling Adventures</h2>
                  <div className="owl-message">
                    "Welcome to Clock Kingdom! Let's master the magic of time!"
                  </div>
                  <button className="start-adventure-btn" onClick={startGame}>
                    ✨ Start Adventure ✨
                  </button>
                </div>
              </div>
            )}
            {gameState === "guessTime" && guessTimeQuestions.length > 0 && (
              <GuessTheTime
                currentQuestion={guessTimeQuestions[guessIndex]}
                handleGuessAnswer={handleGuessAnswer}
                showFeedback={showFeedback}
              />
            )}
            {gameState === "setClock" && (
              <SetTheTime
                targetTime={targetTime}
                clockHours={clockHours}
                clockMinutes={clockMinutes}
                setClockHours={setClockHours}
                setClockMinutes={setClockMinutes}
                checkClockAnswer={checkClockAnswer}
                showFeedback={showFeedback}
              />
            )}
            {gameState === "ampm" && ampmQuestions.length > 0 && (
              <AMPMAdventure
                currentQuestion={ampmQuestions[ampmIndex]}
                handleAMPMAnswer={handleAMPMAnswer}
                showFeedback={showFeedback}
              />
            )}
            {gameState === "completed" && (
              <div className="completed-screen">
                <h2 className="completed-title">Congratulations! 🎉</h2>
                <p className="completed-desc">You finished all 12 questions!</p>
                <div className="completed-celebration">
                  <span className="confetti">🎊</span>
                  <span className="confetti">🎉</span>
                  <span className="confetti">✨</span>
                  <span className="confetti">🎈</span>
                </div>
                <div className="completed-buttons">
                  <button className="start-adventure-btn" onClick={startGame}>
                    Play Again
                  </button>
                  <button className="landing-btn" onClick={onExitGame}>
                    Back to EduQuest
                  </button>
                </div>
              </div>
            )}
            {showFeedback && (
              <div className={`feedback-overlay ${showFeedback}`}>
                <div className="feedback-content">
                  {showFeedback === "correct" ? (
                    <>
                      <div className="feedback-icon">✨🎉✨</div>
                      <div className="feedback-text">
                        You did it! Time is on your side!
                      </div>
                      <div className="confetti">🎊🎊🎊</div>
                    </>
                  ) : (
                    <>
                      <div className="feedback-icon">💨</div>
                      <div className="feedback-text">
                        Oops, try again! Almost there!
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add audio elements and music toggle button at the root level */}
      <audio
        ref={musicRef}
        src="/src/assets/clockkingdom.mp3"
        loop
        preload="auto"
      />
      <audio ref={tickRef} src="/src/assets/clocktick.mp3" preload="auto" />
      {/* Hint Button and Hint Display */}
      {gameState !== "welcome" && gameState !== "completed" && (
        <>
          <button className="hint-button" onClick={toggleHint}>
            💡 Hint
          </button>
          {showHint && (
            <div className="game-hint">
              <div className="hint-icon">💡</div>
              <div className="hint-text">{getCurrentGameHint()}</div>
            </div>
          )}
        </>
      )}

      <div
        className="music-toggle"
        onClick={() => setMusicOn((on) => !on)}
        title={musicOn ? "Turn music off" : "Turn music on"}
      >
        {musicOn ? "🎵" : "🔇"}
      </div>

      {/* Exit Game Button */}
      <button className="exit-game-btn" onClick={onExitGame}>
        Exit Game
      </button>
    </div>
  );
};

export default ClockKingdom;
