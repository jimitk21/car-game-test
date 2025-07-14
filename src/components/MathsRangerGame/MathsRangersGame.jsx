"use client";

import { useState, useEffect, useRef } from "react";
import RaceTrack from "./RaceTrack";
import MathQuestion from "./MathQuestion";
import "./MathsRangersGame.css";

const BASE_PLAYER_SPEED = 1.2;
const NITRO_SPEED = 3.2;
const NITRO_DURATION = 2000;
const SLOW_SPEED = 0.5;
const SLOW_DURATION = 1500;

const MathsRangersGame = ({ onExitGame }) => {
  const [musicOn, setMusicOn] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const musicRef = useRef(null);
  const nitroRef = useRef(null);
  const [gameState, setGameState] = useState("ready"); // ready, playing, finished
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
  const [gameTime, setGameTime] = useState(0); // elapsed time in tenths of a second
  const [winner, setWinner] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [timeLimit, setTimeLimit] = useState(2400); // in tenths of a second (default 4 min)
  const gameLoopRef = useRef();
  const nitroTimeoutRef = useRef();
  const speedTimeoutRef = useRef();

  // Generate random math questions
  const generateQuestion = () => {
    // Addition, subtraction, and multiplication, numbers 2-10
    const operations = ["+", "-", "×"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer;

    switch (operation) {
      case "+":
        num1 = Math.floor(Math.random() * 9) + 2; // 2-10
        num2 = Math.floor(Math.random() * 9) + 2; // 2-10
        answer = num1 + num2;
        break;
      case "-":
        num1 = Math.floor(Math.random() * 9) + 2; // 2-10
        num2 = Math.floor(Math.random() * (num1 - 1)) + 2; // 2 to num1
        answer = num1 - num2;
        break;
      case "×":
        num1 = Math.floor(Math.random() * 9) + 2; // 2-10
        num2 = Math.floor(Math.random() * 9) + 2; // 2-10
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
    // Shuffle and return only 3 options
    return options.sort(() => Math.random() - 0.5).slice(0, 3);
  };

  // Clear all timeouts helper function
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

  // Activate nitro boost
  const activateNitro = () => {
    // Clear any existing slow speed timeout when nitro activates
    if (speedTimeoutRef.current) {
      clearTimeout(speedTimeoutRef.current);
      speedTimeoutRef.current = null;
    }

    setPlayerSpeed(NITRO_SPEED);
    setNitroActive(true);

    // Clear any existing nitro timeout
    if (nitroTimeoutRef.current) {
      clearTimeout(nitroTimeoutRef.current);
    }

    // Set new timeout for nitro
    nitroTimeoutRef.current = setTimeout(() => {
      setNitroActive(false);
      setPlayerSpeed(BASE_PLAYER_SPEED);
      nitroTimeoutRef.current = null;
    }, NITRO_DURATION);
  };

  // Process nitro queue when nitro becomes inactive
  useEffect(() => {
    if (!nitroActive && nitroQueue > 0) {
      // Use a shorter delay and process the queue immediately
      const timer = setTimeout(() => {
        setNitroQueue((prev) => prev - 1);
        activateNitro();
      }, 100); // Reduced delay from 50ms to 100ms for better reliability

      return () => clearTimeout(timer);
    }
  }, [nitroActive, nitroQueue]);

  // Play/pause background music when toggled
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = 0.2; // Set background music volume low
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

  // Context-sensitive hint text
  const getCurrentGameHint = () => {
    switch (gameState) {
      case "ready":
        return "Press 'Start Racing!' to begin your math adventure!";
      case "playing":
        return "Answer math questions correctly to boost your car and win the race! Use Nitro wisely!";
      case "finished":
        return "Try again to improve your score or race faster!";
      default:
        return "";
    }
  };

  const startGame = () => {
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

    // Clear all timeouts on new game
    clearAllTimeouts();
  };

  const handleAnswer = (selectedAnswer) => {
    // Clear any existing speed timeout
    if (speedTimeoutRef.current) {
      clearTimeout(speedTimeoutRef.current);
      speedTimeoutRef.current = null;
    }

    if (selectedAnswer === currentQuestion.answer) {
      setScore((prev) => prev + 10);
      // Play nitro/horn sound
      if (nitroRef.current) {
        nitroRef.current.currentTime = 0;
        nitroRef.current.play();
      }
      if (nitroActive) {
        // Queue another nitro if one is already active
        setNitroQueue((prev) => prev + 1);
        setFeedback("🎉 Correct! Nitro Boost Queued! 🚀");
      } else {
        // Activate nitro immediately
        setFeedback("🎉 Correct! Nitro Boost Activated! 🚀");
        activateNitro();
      }
    } else {
      // Wrong answer - slow down (but only if nitro is not active)
      if (!nitroActive) {
        setPlayerSpeed(SLOW_SPEED);
        setFeedback(
          `❌ Oops! Your car is slowing down... The answer was ${currentQuestion.answer}`
        );

        speedTimeoutRef.current = setTimeout(() => {
          // Only reset to base speed if no nitro is active
          if (!nitroActive) {
            setPlayerSpeed(BASE_PLAYER_SPEED);
          }
          speedTimeoutRef.current = null;
        }, SLOW_DURATION);
      } else {
        // If nitro is active, just show the feedback without slowing down
        setFeedback(
          `❌ Wrong answer! The correct answer was ${currentQuestion.answer}`
        );
      }
    }

    // Clear feedback and generate new question
    setTimeout(() => {
      setCurrentQuestion(generateQuestion());
      setFeedback("");
    }, 1000);
  };

  // Game loop
  useEffect(() => {
    if (gameState === "playing") {
      gameLoopRef.current = setInterval(() => {
        setGameTime((prev) => {
          if (prev + 1 >= timeLimit) {
            // Do not end the game on time anymore
            return timeLimit;
          }
          return prev + 1;
        });

        // Move player car
        setPlayerPosition((prev) => prev + playerSpeed);

        // Move AI cars
        setAiVehicles((prev) =>
          prev.map((vehicle, index) => {
            let base = 1 + index * 0.15;
            let random = Math.random() * 0.5 - 0.2; // -0.2 to +0.3
            let speed = base + random;
            if (Math.random() < 0.05) speed += 0.7;
            return { ...vehicle, position: vehicle.position + speed };
          })
        );

        // Check for winner by progress bar (position >= 1800)
        setTimeout(() => {
          // Get latest positions
          let playerPos, aiPositions;
          setPlayerPosition((p) => {
            playerPos = p;
            return p;
          });
          setAiVehicles((ai) => {
            aiPositions = ai.map((v) => v.position);
            return ai;
          });

          // Check if any car finished
          if (
            playerPos >= 1800 ||
            (aiPositions && aiPositions.some((pos) => pos >= 1800))
          ) {
            setGameState("finished");
            if (
              playerPos >= 1800 &&
              (!aiPositions || aiPositions.every((pos) => playerPos >= pos))
            ) {
              setWinner("player");
            } else {
              setWinner("ai");
            }
          }
        }, 0);
      }, 100);
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, playerSpeed, timeLimit]);

  // Clean up all timeouts on unmount or game state change
  useEffect(() => {
    return () => {
      clearAllTimeouts();
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, []);

  // Reset game state
  const resetGame = () => {
    setGameState("ready");

    // Clear all intervals and timeouts
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    clearAllTimeouts();

    // Reset all states
    setPlayerSpeed(BASE_PLAYER_SPEED);
    setNitroActive(false);
    setNitroQueue(0);
    setPlayerPosition(0);
    setScore(0);
    setGameTime(0);
    setWinner(null);
    setFeedback("");
    setCurrentQuestion(null);
  };

  // Exit Game Button (always visible)
  // Style: fixed at bottom right, similar to ClockKingdom
  // Only render if onExitGame is provided
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

      {gameState === "ready" && (
        <div className="game-start-screen">
          <div className="start-content">
            <h2>Ready to Race, Math Sheriff? 🤠</h2>
            <p>
              Answer math questions correctly to boost your car and win the
              race!
            </p>
            <button className="start-button" onClick={startGame}>
              🚗 Start Racing!
            </button>
          </div>
        </div>
      )}

      {gameState === "playing" && (
        <>
          <RaceTrack
            playerPosition={playerPosition}
            aiVehicles={aiVehicles}
            playerSpeed={playerSpeed}
            nitroActive={nitroActive}
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
              <button className="play-again-button" onClick={startGame}>
                🔄 Race Again
              </button>
              <button className="back-button" onClick={resetGame}>
                🏠 Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}
      {exitButton}

      {/* Music Toggle Button */}
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

      {/* Hint Button and Hint Display */}
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
