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

  const [screen, setScreen] = useState("title");

  const handleStartGame = () => {
    setScreen("difficulty");
  };

  return (
    <div className="App">
      {screen === "title" && <TitleScreen onStartGame={handleStartGame} />}
      {screen === "difficulty" && (
        <Difficulty
          onHome={() => setScreen("title")}
          onPlay={() => setScreen("gameBoard")}
        />
      )}
      {screen === "gameBoard" && <GameBoard />}
    </div>
  );
}

export default App;
