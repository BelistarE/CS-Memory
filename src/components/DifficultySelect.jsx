import { useState } from "react";
import "./difficulty-style.css";
import GameBoard from "./Gameboard";
import Slideshow from "./Midori";
import silver from "../assets/silver.png";
import gn from "../assets/goldNova1.png";
import dmg from "../assets/dmg.png";
import ge from "../assets/ge.png";
import easy from "../assets/easy.png";
import medium from "../assets/medium.png";
import hard from "../assets/hard.png";
import impossible from "../assets/impossible.png";
import { useSound } from "./SoundContext";
import rollover from "../assets/sounds/mainmenu_rollover_01.wav";
import pressPlay from "../assets/sounds/mainmenu_press_play_03.wav";

let selectedDifficulty = "medium";
function Difficulty({ onHome, onPlay, selectedDifficulty: initialDifficulty }) {
  //sound handling
  const { isSoundOn, toggleSound } = useSound();
  const playSound = (soundFile) => {
    if (isSoundOn) {
      const audio = new Audio(soundFile);
      audio.play();
    }
  };
  const handleMouseEnter = (difficulty) => {
    if (selected !== difficulty) {
      playSound(rollover);
    }
  };

  const [selected, setSelected] = useState(initialDifficulty || "medium");
  const handleDifficultyClick = (difficulty) => {
    setSelected(difficulty); // Update local state
    selectedDifficulty = difficulty; // Update global variable
    console.log(`Selected difficulty: ${selectedDifficulty}`);
  };

  const handleGoClick = () => {
    if (selected) {
      onPlay(selected);
      playSound(pressPlay);
    }
  };
  return (
    <div className="difficulty">
      <Slideshow />
      <div className="content-diff">
        <div className="difficulties">
          <button
            className={`rectangle ${selected === "easy" ? "selected" : ""}`}
            onClick={() => handleDifficultyClick("easy")}
            onMouseEnter={() => handleMouseEnter("easy")}
          >
            <img src={silver} alt="Silver" />
            <img src={easy} alt="Silver" />
            <p>Easy</p>
          </button>
          <button
            className={`rectangle ${selected === "medium" ? "selected" : ""}`}
            onClick={() => handleDifficultyClick("medium")}
            onMouseEnter={() => handleMouseEnter("medium")}
          >
            <img src={gn} alt="Silver" />
            <img src={medium} alt="Silver" />
            <p>Medium</p>
          </button>
          <button
            className={`rectangle ${selected === "hard" ? "selected" : ""}`}
            onClick={() => handleDifficultyClick("hard")}
            onMouseEnter={() => handleMouseEnter("hard")}
          >
            <img src={dmg} alt="Silver" />
            <img src={hard} alt="Silver" />
            <p>Hard</p>
          </button>
          <button
            className={`rectangle ${
              selected === "impossible" ? "selected" : ""
            }`}
            onClick={() => handleDifficultyClick("impossible")}
            onMouseEnter={() => handleMouseEnter("impossible")}
          >
            <img src={ge} alt="Silver" />
            <img src={impossible} alt="Silver" />
            <p>Impossible</p>
          </button>
        </div>
        <div className="buttons">
          <button onClick={onHome} onMouseEnter={() => playSound(rollover)}>
            BACK
          </button>
          <button
            className="go"
            onClick={handleGoClick}
            onMouseEnter={() => playSound(rollover)}
          >
            <p>GO</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Difficulty;
