// src/MoodSelector.js
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./MoodSelector.css";

const moods = [
  { emoji: "😊", label: "Happy", message: "Yay! Keep smiling!" },
  { emoji: "😔", label: "Sad", message: "Sending virtual hugs 💖" },
  { emoji: "😡", label: "Angry", message: "Take a deep breath 💨" },
  { emoji: "😴", label: "Tired", message: "Nap time? 😴💤" },
  { emoji: "😻", label: "Loved", message: "You are loved! 💕" },
];

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    if (mood.label === "Happy" || mood.label === "Loved") {
      setShowConfetti(true);
    }
  };

  useEffect(() => {
    if (showConfetti) {
      const timeout = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [showConfetti]);

  return (
    <div className={`mood-container ${darkMode ? "dark" : ""}`}>
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
      <div className="toggle">
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode((prev) => !prev)}
          />
          <span className="slider" />
        </label>
        <span className="toggle-label">{darkMode ? "Dark" : "Light"} Mode</span>
      </div>

      <h2>How are you feeling today?</h2>

      <div className="emoji-list">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => handleMoodSelect(mood)}
            className="emoji-btn"
            aria-label={mood.label}
          >
            {mood.emoji}
          </button>
        ))}
      </div>

      {selectedMood && <p className="mood-message">{selectedMood.message}</p>}
    </div>
  );
}
