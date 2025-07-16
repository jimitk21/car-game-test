"use client";

import { useState, useEffect, useRef } from "react";
import "./ClockKingdomGame.css";
import GuessTheTime from "./GuessTheTime.jsx";
import SetTheTime from "./SetTheTime.jsx";
import AMPMAdventure from "./AMPMAdventure.jsx";
import UserFormAndFeedback from "./UserFormAndFeedback.jsx";

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
  const [userDetails, setUserDetails] = useState(null);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const [guessTimeQuestions, setGuessTimeQuestions] = useState([]);
  const [ampmQuestions, setAMPMQuestions] = useState([]);
  const [guessIndex, setGuessIndex] = useState(0);
  const [setClockIndex, setSetClockIndex] = useState(0);
  const [ampmIndex, setAMPMIndex] = useState(0);

  const [targetTime, setTargetTime] = useState({ hours: 3, minutes: 15 });
  const [clockHours, setClockHours] = useState(12);
  const [clockMinutes, setClockMinutes] = useState(0);

  const musicRef = useRef(null);
  const tickRef = useRef(null);
  const prevScoreRef = useRef(score);
  const [musicOn, setMusicOn] = useState(true);

  useEffect(() => {
    if (score < 3) setTimeOfDay("morning");
    else if (score < 6) setTimeOfDay("noon");
    else setTimeOfDay("evening");
  }, [score]);

  useEffect(() => {
    setGuessTimeQuestions(shuffle(guessTimeQuestionsOrig));
    setAMPMQuestions(shuffle(ampmQuestionsOrig));
  }, []);

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

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  useEffect(() => {
    setShowHint(false);
  }, [gameState]);

  const startGame = (userInfo) => {
    setUserDetails(userInfo);
    setGameState("guessTime");
    setGuessIndex(0);
    setSetClockIndex(0);
    setAMPMIndex(0);
    setScore(0);
    setProgress(0);
    setBadges([]);
    setWrongAnswers([]);
    setShowFeedback("");
    setTargetTime(generateNewTargetTime());
    setClockHours(12);
    setClockMinutes(0);
  };

  const generateNewTargetTime = () => {
    return {
      hours: Math.floor(Math.random() * 12) + 1,
      minutes: Math.floor(Math.random() * 12) * 5,
    };
  };

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
      setWrongAnswers((prev) => [
        ...prev,
        {
          game: "Guess the Time",
          question: `${current.time.hours}:${String(
            current.time.minutes
          ).padStart(2, "0")}`,
          selectedAnswer: current.options[selectedIndex],
          correctAnswer: current.options[current.correct],
        },
      ]);
      setShowFeedback("incorrect");
      setTimeout(() => setShowFeedback(""), 1200);
    }
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
      setWrongAnswers((prev) => [
        ...prev,
        {
          game: "Set the Clock",
          question: `${String(targetTime.hours).padStart(2, "0")}:${String(
            targetTime.minutes
          ).padStart(2, "0")}`,
          selectedAnswer: `${String(clockHours).padStart(2, "0")}:${String(
            clockMinutes
          ).padStart(2, "0")}`,
          correctAnswer: `${String(targetTime.hours).padStart(2, "0")}:${String(
            targetTime.minutes
          ).padStart(2, "0")}`,
        },
      ]);
      setShowFeedback("incorrect");
      setTimeout(() => setShowFeedback(""), 1200);
    }
  };

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
      setWrongAnswers((prev) => [
        ...prev,
        {
          game: "AM/PM Adventure",
          question: current.question,
          selectedAnswer: answer,
          correctAnswer: current.correct,
        },
      ]);
      setShowFeedback("incorrect");
      setTimeout(() => setShowFeedback(""), 1200);
    }
  };

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

  useEffect(() => {
    if (score > prevScoreRef.current && tickRef.current) {
      tickRef.current.currentTime = 0;
      tickRef.current.play();
    }
    prevScoreRef.current = score;
  }, [score]);

  return (
    <div className={`clock-kingdom ${timeOfDay}`}>
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

      <div className="progress-container" style={{ position: "relative" }}>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {showMonkey && <div className="monkey-fall-animation">🐒</div>}
        <div className="badges">
          {badges.map((badge, index) => (
            <span key={index} className="badge">
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="gem-score-card">
        <div className="gem-icon">💎</div>
        <div className="gem-score">{score}</div>
      </div>

      <div className="game-container">
        <div className="floating-island">
          {gameState !== "welcome" && gameState !== "completed" && (
            <div className="game-name-display">{getCurrentGameName()}</div>
          )}
          <div className="game-card">
            <UserFormAndFeedback
              onStartGame={startGame}
              gameState={gameState}
              score={score}
              badges={badges}
              wrongAnswers={wrongAnswers}
            />
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
                  <button
                    className="start-adventure-btn"
                    onClick={() => startGame(userDetails)}
                  >
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

      <audio
        ref={musicRef}
        src="/src/assets/clockkingdom.mp3"
        loop
        preload="auto"
      />
      <audio ref={tickRef} src="/src/assets/clocktick.mp3" preload="auto" />

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

      <button className="exit-game-btn" onClick={onExitGame}>
        Exit Game
      </button>
    </div>
  );
};

export default ClockKingdom;
