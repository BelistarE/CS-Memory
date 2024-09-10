import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import TitleScreen from "./components/TitleScreen";
import Difficulty from "./components/DifficultySelect";
import pageStartup from "./assets/sounds/logo_startup.wav";
import GameBoard from "./components/Gameboard";

function App() {
  useEffect(() => {
    const audio = new Audio(pageStartup);
    const playSoundOnMouseMove = () => {
      audio.play().catch((error) => {
        console.log("Error playing sound:", error);
      });
      document.removeEventListener("mousemove", playSoundOnMouseMove);
    };
    document.addEventListener("mousemove", playSoundOnMouseMove);
    return () => {
      document.removeEventListener("mousemove", playSoundOnMouseMove);
    };
  }, []);

  const [screen, setScreen] = useState("title"); // Screen state to navigate between components
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium"); // Default to 'medium'

  const handleStartGame = () => {
    setScreen("difficulty");
    console.log("difficulty screen");
  };

  const handlePlayGame = (difficulty) => {
    setSelectedDifficulty(difficulty); // Pass the selected difficulty
    setScreen("gameBoard"); // Navigate to the GameBoard screen
  };

  return (
    <div className="App">
      {screen === "title" && <TitleScreen onStartGame={handleStartGame} />}
      {screen === "difficulty" && (
        <Difficulty
          onHome={() => setScreen("title")}
          onPlay={handlePlayGame}
          selectedDifficulty={selectedDifficulty}
        />
      )}
      {screen === "gameBoard" && (
        <GameBoard
          difficulty={selectedDifficulty}
          onHome={() => setScreen("difficulty")}
        />
      )}{" "}
    </div>
  );
}

export default App;
