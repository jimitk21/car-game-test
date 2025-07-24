"use client";

import { useState, useEffect, useRef } from "react";
import RaceTrack from "./RaceTrack";
import MathQuestion from "./MathQuestion";
import UserFormAndFeedback from "./UserFormAndFeedback";
import "./MathsRangersGame.css";
import { useNavigate } from "react-router-dom";

const BASE_PLAYER_SPEED = 1.2;
const NITRO_SPEED = 3.2;
const NITRO_DURATION = 2000;
const SLOW_SPEED = 0.5;
const SLOW_DURATION = 1500;

const MathsRangersGame = ({ onExitGame }) => {
  const navigate = useNavigate();
  const [musicOn, setMusicOn] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const musicRef = useRef(null);
  const nitroRef = useRef(null);
  const [gameState, setGameState] = useState("ready");
  const [playerPosition, setPlayerPosition] = useState(0);
  const [aiVehicles, setAiVehicles] = useState([
    { type: "car", position: 0, speed: 1 },
    { type: "bus", position: 0, speed: 1 },
    { type: "truck", position: 0, speed: 1 },
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [playerSpeed, setPlayerSpeed] = useState(BASE_PLAYER_SPEED);
  const [nitroActive, setNitroActive] = useState(false);
  const [nitroQueue, setNitroQueue] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [winner, setWinner] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [timeLimit, setTimeLimit] = useState(2400);
  const [userDetails, setUserDetails] = useState(null);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const gameLoopRef = useRef();
  const nitroTimeoutRef = useRef();
  const speedTimeoutRef = useRef();

  const generateQuestion = () => {
    const operations = ["+", "-", "×"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer;

    switch (operation) {
      case "+":
        num1 = Math.floor(Math.random() * 9) + 2;
        num2 = Math.floor(Math.random() * 9) + 2;
        answer = num1 + num2;
        break;
      case "-":
        num1 = Math.floor(Math.random() * 9) + 2;
        num2 = Math.floor(Math.random() * (num1 - 1)) + 2;
        answer = num1 - num2;
        break;
      case "×":
        num1 = Math.floor(Math.random() * 9) + 2;
        num2 = Math.floor(Math.random() * 9) + 2;
        answer = num1 * num2;
        break;
      default:
        num1 = 2;
        num2 = 2;
        answer = 4;
    }
    return {
      question: `${num1} ${operation} ${num2}`,
      answer: answer,
      options: generateOptions(answer),
    };
  };

  const generateOptions = (correctAnswer) => {
    const options = [correctAnswer];
    while (options.length < 3) {
      const wrongAnswer = correctAnswer + Math.floor(Math.random() * 20) - 10;
      if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }
    return options.sort(() => Math.random() - 0.5).slice(0, 3);
  };

  const clearAllTimeouts = () => {
    if (nitroTimeoutRef.current) {
      clearTimeout(nitroTimeoutRef.current);
      nitroTimeoutRef.current = null;
    }
    if (speedTimeoutRef.current) {
      clearTimeout(speedTimeoutRef.current);
      speedTimeoutRef.current = null;
    }
  };

  const activateNitro = () => {
    if (speedTimeoutRef.current) {
      clearTimeout(speedTimeoutRef.current);
      speedTimeoutRef.current = null;
    }

    setPlayerSpeed(NITRO_SPEED);
    setNitroActive(true);

    if (nitroTimeoutRef.current) {
      clearTimeout(nitroTimeoutRef.current);
    }

    nitroTimeoutRef.current = setTimeout(() => {
      setNitroActive(false);
      setPlayerSpeed(BASE_PLAYER_SPEED);
      nitroTimeoutRef.current = null;
    }, NITRO_DURATION);
  };

  useEffect(() => {
    if (!nitroActive && nitroQueue > 0) {
      const timer = setTimeout(() => {
        setNitroQueue((prev) => prev - 1);
        activateNitro();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [nitroActive, nitroQueue]);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = 0.2;
      if (musicOn) {
        musicRef.current.play();
      } else {
        musicRef.current.pause();
        musicRef.current.currentTime = 0;
      }
    }
  }, [musicOn]);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = 0.2;
      if (musicOn) {
        musicRef.current.play();
      }
    }
    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current.currentTime = 0;
      }
    };
  }, []);

  const getCurrentGameHint = () => {
    switch (gameState) {
      case "ready":
        return "Enter your details to start your math adventure!";
      case "playing":
        return "Answer math questions correctly to boost your car and win the race! Use Nitro wisely!";
      case "finished":
        return "Check your feedback and try again to improve your score!";
      default:
        return "";
    }
  };

  const startGame = (userInfo) => {
    setUserDetails(userInfo);
    setGameState("playing");
    setPlayerPosition(0);
    setAiVehicles([
      { type: "car", position: 0, speed: 1 },
      { type: "bus", position: 0, speed: 1 },
      { type: "truck", position: 0, speed: 1 },
    ]);
    setScore(0);
    setPlayerSpeed(BASE_PLAYER_SPEED);
    setNitroActive(false);
    setNitroQueue(0);
    setGameTime(0);
    setWinner(null);
    setCurrentQuestion(generateQuestion());
    setTimeLimit(3000);
    setFeedback("");
    setWrongAnswers([]);
    clearAllTimeouts();
  };

  const handleAnswer = (selectedAnswer) => {
    if (speedTimeoutRef.current) {
      clearTimeout(speedTimeoutRef.current);
      speedTimeoutRef.current = null;
    }

    if (selectedAnswer === currentQuestion.answer) {
      setScore((prev) => prev + 10);
      if (nitroRef.current) {
        nitroRef.current.currentTime = 0;
        nitroRef.current.play();
      }
      if (nitroActive) {
        setNitroQueue((prev) => prev + 1);
        setFeedback("🎉 Correct! Nitro Boost Queued! 🚀");
      } else {
        setFeedback("🎉 Correct! Nitro Boost Activated! 🚀");
        activateNitro();
      }
    } else {
      setWrongAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          selectedAnswer,
          correctAnswer: currentQuestion.answer,
        },
      ]);
      if (!nitroActive) {
        setPlayerSpeed(SLOW_SPEED);
        setFeedback(
          `❌ Oops! Your car is slowing down... The answer was ${currentQuestion.answer}`
        );
        speedTimeoutRef.current = setTimeout(() => {
          if (!nitroActive) {
            setPlayerSpeed(BASE_PLAYER_SPEED);
          }
          speedTimeoutRef.current = null;
        }, SLOW_DURATION);
      } else {
        setFeedback(
          `❌ Wrong answer! The correct answer was ${currentQuestion.answer}`
        );
      }
    }

    setTimeout(() => {
      setCurrentQuestion(generateQuestion());
      setFeedback("");
    }, 1000);
  };

  // Callback to handle progress updates from RaceTrack
  const handleProgressUpdate = (progressData) => {
    if (gameState !== "playing") return;

    const { playerProgress, aiProgress } = progressData;
    if (
      playerProgress >= 100 ||
      aiProgress.some((progress) => progress >= 100)
    ) {
      setGameState("finished");
      if (
        playerProgress >= 100 &&
        aiProgress.every((progress) => playerProgress >= progress)
      ) {
        setWinner("player");
      } else {
        setWinner("ai");
      }
    }
  };

  useEffect(() => {
    if (gameState === "playing") {
      gameLoopRef.current = setInterval(() => {
        setGameTime((prev) => {
          if (prev + 1 >= timeLimit) {
            setGameState("finished");
            setWinner("ai");
            return timeLimit;
          }
          return prev + 1;
        });
      }, 100);
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, timeLimit]);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, []);

  const resetGame = () => {
    setGameState("ready");
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    clearAllTimeouts();
    setPlayerSpeed(BASE_PLAYER_SPEED);
    setNitroActive(false);
    setNitroQueue(0);
    setPlayerPosition(0);
    setScore(0);
    setGameTime(0);
    setWinner(null);
    setFeedback("");
    setCurrentQuestion(null);
    setUserDetails(null);
    setWrongAnswers([]);
  };

  const exitButton = onExitGame ? (
    <button
      className="exit-game-btn"
      style={{ position: "fixed", bottom: 20, right: 20, zIndex: 10001 }}
      onClick={onExitGame}
    >
      Exit Game
    </button>
  ) : null;

  return (
    <div className="maths-rangers-game">
      <div className="game-header">
        <div className="game-header-title">🏎️ Math Rangers Racing 🏁</div>
        {feedback && <div className="game-feedback-top">{feedback}</div>}
        <div className="game-stats">
          <span className="score">Score: {score}</span>
          <span className="time">
            Time Left: {Math.max(0, ((timeLimit - gameTime) / 10).toFixed(1))}s
          </span>
          {nitroQueue > 0 && (
            <span className="nitro-queue">Nitro Queue: {nitroQueue}</span>
          )}
        </div>
      </div>

      <UserFormAndFeedback
        onStartGame={startGame}
        gameState={gameState}
        winner={winner}
        score={score}
        gameTime={gameTime}
        wrongAnswers={wrongAnswers}
      />

      {gameState === "playing" && (
        <>
          <RaceTrack
            playerPosition={playerPosition}
            aiVehicles={aiVehicles}
            playerSpeed={playerSpeed}
            nitroActive={nitroActive}
            gameState={gameState}
            onProgressUpdate={handleProgressUpdate}
          />
          <MathQuestion question={currentQuestion} onAnswer={handleAnswer} />
        </>
      )}

      {gameState === "finished" && (
        <div className="game-end-screen">
          <div className="end-content">
            {winner === "player" ? (
              <>
                <h2 className="victory-message">
                  🎉 Amazing Champ! You are a Math Sheriff! 🎉
                </h2>
                <div className="victory-stats">
                  <p>Final Score: {score}</p>
                  <p>Time: {(gameTime / 10).toFixed(1)} seconds</p>
                </div>
              </>
            ) : (
              <>
                <h2 className="defeat-message">
                  Well tried chief, better luck next time!
                </h2>
                <div className="defeat-stats">
                  <p>Score: {score}</p>
                  <p>Time: {(gameTime / 10).toFixed(1)} seconds</p>
                </div>
              </>
            )}
            <div className="end-buttons">
              <button
                className="play-again-button"
                onClick={() => startGame(userDetails)}
              >
                🔄 Race Again
              </button>
              <button className="back-button" onClick={() => navigate("/")}>
                🏠 Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}
      {exitButton}

      <audio
        ref={musicRef}
        src={"/src/assets/car-sound.mp3"}
        loop
        preload="auto"
      />
      <audio ref={nitroRef} src={"/src/assets/horn-nitro.mp3"} preload="auto" />
      <div
        className="music-toggle"
        onClick={() => setMusicOn((on) => !on)}
        title={musicOn ? "Turn music off" : "Turn music on"}
      >
        {musicOn ? "🎵" : "🔇"}
      </div>

      {gameState !== "ready" && gameState !== "finished" && (
        <>
          <button
            className="hint-button"
            onClick={() => setShowHint((h) => !h)}
          >
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
    </div>
  );
};

export default MathsRangersGame;
