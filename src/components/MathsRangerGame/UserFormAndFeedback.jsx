"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import "./UserFormAndFeedback.css";

const UserFormAndFeedback = ({
  onStartGame,
  gameState,
  winner,
  score,
  gameTime,
  wrongAnswers,
}) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [standard, setStandard] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !gender || !age) {
      setFormError("Please fill in all required fields (Name, Gender, Age).");
      return;
    }
    setFormError("");
    setFormSubmitted(true);
    onStartGame({ name, gender, age, standard });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Maths Rangers Feedback Report", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Platform: EduQuest`, 20, 30);
    doc.text(`Created by: EduQuest Team`, 20, 40);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("User Details", 20, 50);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${name}`, 20, 60);
    doc.text(`Gender: ${gender}`, 20, 70);
    doc.text(`Age: ${age}`, 20, 80);
    doc.text(`Standard: ${standard || "N/A"}`, 20, 90);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Game Results", 20, 100);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Result: ${winner === "player" ? "Victory" : "Defeat"}`, 20, 110);
    doc.text(`Final Score: ${score}`, 20, 120);
    doc.text(`Time Taken: ${(gameTime / 10).toFixed(1)} seconds`, 20, 130);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Incorrect Answers", 20, 140);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    if (wrongAnswers.length === 0) {
      doc.text("No incorrect answers! Great job!", 20, 150);
    } else {
      wrongAnswers.forEach((item, index) => {
        doc.text(
          `${index + 1}. Question: ${item.question}`,
          20,
          150 + index * 10
        );
        doc.text(
          `   Your Answer: ${item.selectedAnswer}, Correct Answer: ${item.correctAnswer}`,
          20,
          155 + index * 10
        );
      });
    }

    doc.save("MathsRangers_Feedback.pdf");
  };

  if (gameState === "ready" && !formSubmitted) {
    return (
      <div className="user-form-container">
        <div className="user-form-content">
          <h2>Enter Your Details to Start 🚗</h2>
          {formError && <p className="form-error">{formError}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="standard">Standard (Optional)</label>
              <input
                type="text"
                id="standard"
                value={standard}
                onChange={(e) => setStandard(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button">
              Submit & Start Game
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (gameState === "finished") {
    return (
      <div className="feedback-container">
        <div className="feedback-content">
          <h2>Game Feedback 📊</h2>
          <div className="user-details">
            <h3>User Details</h3>
            <p>Name: {name}</p>
            <p>Gender: {gender}</p>
            <p>Age: {age}</p>
            <p>Standard: {standard || "N/A"}</p>
          </div>
          <div className="game-results">
            <h3>Game Results</h3>
            <p>Result: {winner === "player" ? "Victory" : "Defeat"}</p>
            <p>Final Score: {score}</p>
            <p>Time Taken: {(gameTime / 10).toFixed(1)} seconds</p>
          </div>
          <div className="wrong-answers">
            <h3>Incorrect Answers</h3>
            {wrongAnswers.length === 0 ? (
              <p>No incorrect answers! Great job!</p>
            ) : (
              <ul>
                {wrongAnswers.map((item, index) => (
                  <li key={index}>
                    Question: {item.question} <br />
                    Your Answer: {item.selectedAnswer}, Correct Answer:{" "}
                    {item.correctAnswer}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="download-pdf-button" onClick={generatePDF}>
            Download Feedback as PDF
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default UserFormAndFeedback;
