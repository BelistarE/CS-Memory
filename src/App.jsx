import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import TitleScreen from "./components/TitleScreen";
import pageStartup from "./assets/sounds/logo_startup.wav";

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
  return (
    <div className="App">
      <TitleScreen />
    </div>
  );
}

export default App;
