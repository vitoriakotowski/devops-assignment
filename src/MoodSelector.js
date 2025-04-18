// src/MoodSelector.js
import { useState } from "react";
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

  return (
    <div className="mood-container">
      <h2>How are you feeling today?</h2>
      <div className="emoji-list">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => setSelectedMood(mood)}
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
