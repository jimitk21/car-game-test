"use client";

import { useState, useEffect, useRef } from "react";
import RaceTrack from "./RaceTrack";
import MathQuestion from "./MathQuestion";
import "./MathsRangersGame.css";

const MathsRangersGame = () => {
  const [gameState, setGameState] = useState("ready"); // ready, playing, finished
  const [playerPosition, setPlayerPosition] = useState(0);
  const [aiCarsPositions, setAiCarsPositions] = useState([0, 0, 0]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [playerSpeed, setPlayerSpeed] = useState(1);
  const [gameTime, setGameTime] = useState(0);
  const [winner, setWinner] = useState(null);
  const gameLoopRef = useRef();

  // Generate random math questions
  const generateQuestion = () => {
    const operations = ["+", "-", "×", "÷"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer;

    switch (operation) {
      case "+":
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        answer = num1 + num2;
        break;
      case "-":
        num1 = Math.floor(Math.random() * 50) + 20;
        num2 = Math.floor(Math.random() * num1);
        answer = num1 - num2;
        break;
      case "×":
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = num1 * num2;
        break;
      case "÷":
        answer = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        num1 = answer * num2;
        break;
      default:
        num1 = 5;
        num2 = 3;
        answer = 8;
    }

    return {
      question: `${num1} ${operation} ${num2}`,
      answer: answer,
      options: generateOptions(answer),
    };
  };

  const generateOptions = (correctAnswer) => {
    const options = [correctAnswer];
    while (options.length < 4) {
      const wrongAnswer = correctAnswer + Math.floor(Math.random() * 20) - 10;
      if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const startGame = () => {
    setGameState("playing");
    setPlayerPosition(0);
    setAiCarsPositions([0, 0, 0]);
    setScore(0);
    setPlayerSpeed(1);
    setGameTime(0);
    setWinner(null);
    setCurrentQuestion(generateQuestion());
  };

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.answer) {
      setScore((prev) => prev + 10);
      setPlayerSpeed(3); // Nitro boost
      setTimeout(() => setPlayerSpeed(1.5), 2000); // Return to normal speed after 2 seconds
    } else {
      setPlayerSpeed(0.5); // Slow down
      setTimeout(() => setPlayerSpeed(1), 1500); // Return to normal speed after 1.5 seconds
    }

    // Generate new question after a short delay
    setTimeout(() => {
      setCurrentQuestion(generateQuestion());
    }, 1000);
  };

  // Game loop
  useEffect(() => {
    if (gameState === "playing") {
      gameLoopRef.current = setInterval(() => {
        setGameTime((prev) => prev + 1);

        // Move player car
        setPlayerPosition((prev) => {
          const newPos = prev + playerSpeed;
          if (newPos >= 100) {
            setWinner("player");
            setGameState("finished");
            return 100;
          }
          return newPos;
        });

        // Move AI cars
        setAiCarsPositions((prev) =>
          prev.map((pos, index) => {
            const speed = 0.8 + index * 0.2 + Math.random() * 0.3;
            const newPos = pos + speed;
            if (newPos >= 100 && !winner) {
              setWinner(`ai-${index}`);
              setGameState("finished");
              return 100;
            }
            return newPos;
          })
        );
      }, 100);
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, playerSpeed, winner]);

  const resetGame = () => {
    setGameState("ready");
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
  };

  return (
    <div className="maths-rangers-game">
      <div className="game-header">
        <h1 className="game-title">🏎️ Math Rangers Racing 🏁</h1>
        <div className="game-stats">
          <span className="score">Score: {score}</span>
          <span className="time">Time: {Math.floor(gameTime / 10)}s</span>
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
            aiCarsPositions={aiCarsPositions}
            playerSpeed={playerSpeed}
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
                  <p>Time: {Math.floor(gameTime / 10)} seconds</p>
                </div>
              </>
            ) : (
              <>
                <h2 className="defeat-message">Good try, Deputy! 🤠</h2>
                <p>Keep practicing your math skills and try again!</p>
                <div className="defeat-stats">
                  <p>Score: {score}</p>
                  <p>Time: {Math.floor(gameTime / 10)} seconds</p>
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
    </div>
  );
};

export default MathsRangersGame;
