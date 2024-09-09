import { useState } from "react";
import "./title-screen-style.css";
import { SpeakerLoudIcon, SpeakerOffIcon } from "@radix-ui/react-icons";
import Credits from "./Credits";
import handsgif from "../assets/handsgif.gif";
import mainmenuPressPlay from "../assets/sounds/mainmenu_press_play.wav";
import mainmenuSound from "../assets/sounds/mainmenu_press_settings_02.wav";
import creditsSound from "../assets/sounds/mainmenu_press_news_01.wav";
import soundToggleFile from "../assets/sounds/submenu_scroll_01.wav";
import rollover from "../assets/sounds/mainmenu_rollover_01.wav";

function TitleScreen({ onStartGame }) {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [showSoundButton, setShowSoundButton] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const handleSoundToggle = () => {
    setIsSoundOn((prev) => !prev);
    playSound(soundToggleFile);
  };

  const handleSoundButtonClick = () => {
    setShowSoundButton((prev) => !prev);
    playSound(mainmenuSound);
  };

  const openCredits = () => {
    setShowCredits(true);
    playSound(creditsSound);
  };

  const closeCredits = () => {
    setShowCredits(false);
  };

  return (
    <div className="title-screen">
      <div className="moving-lines-background"></div>
      <div className="fullscreen-gif">
        <img src={handsgif} alt="Background GIF" />
      </div>
      <h1 className="cs-memory" data-text="CS-MEMORY">
        CS-MEMORY
      </h1>
      <div className="content">
        <div className="buttons">
          <button
            onClick={() => {
              playSound(mainmenuPressPlay);
              onStartGame();
            }}
            onMouseEnter={() => playSound(rollover)}
          >
            <span data-text="PLAY">PLAY</span>
          </button>
          <div className="sound">
            <button
              onClick={handleSoundButtonClick}
              onMouseEnter={() => playSound(rollover)}
            >
              <span data-text="SOUND">SOUND</span>
            </button>
            {showSoundButton && (
              <button className="sound-icon" onClick={handleSoundToggle}>
                {isSoundOn ? <SpeakerLoudIcon /> : <SpeakerOffIcon />}
              </button>
            )}
          </div>
          <button
            onClick={openCredits}
            onMouseEnter={() => playSound(rollover)}
          >
            <span data-text="CREDITS">CREDITS</span>
          </button>
        </div>
      </div>
      <Credits showCredits={showCredits} closeCredits={closeCredits} />
    </div>
  );
}

export default TitleScreen;
