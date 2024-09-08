import { useState } from "react";
import "./title-screen-style.css";
import { SpeakerLoudIcon, SpeakerOffIcon } from "@radix-ui/react-icons";
import Credits from "./Credits"; // Import the Credits component

function TitleScreen() {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [showSoundButton, setShowSoundButton] = useState(false);
  const [showCredits, setShowCredits] = useState(false); // State to control credits visibility

  const handleSoundToggle = () => {
    setIsSoundOn((prev) => !prev);
  };

  const handleSoundButtonClick = () => {
    setShowSoundButton((prev) => !prev);
  };

  const openCredits = () => {
    setShowCredits(true); // Show the credits modal
  };

  const closeCredits = () => {
    setShowCredits(false); // Hide the credits modal
  };

  return (
    <div className="title-screen">
      <div className="moving-lines-background"></div>
      <h1 className="cs-memory" data-text="CS-MEMORY">
        CS-MEMORY
      </h1>
      <div className="content">
        <div className="buttons">
          <button>
            <span data-text="PLAY">PLAY</span>
          </button>
          <div className="sound">
            <button onClick={handleSoundButtonClick}>
              <span data-text="SOUND">SOUND</span>
            </button>
            {showSoundButton && (
              <button className="sound-icon" onClick={handleSoundToggle}>
                {isSoundOn ? <SpeakerLoudIcon /> : <SpeakerOffIcon />}
              </button>
            )}
          </div>
          <button onClick={openCredits}>
            <span data-text="CREDITS">CREDITS</span>
          </button>
        </div>
      </div>

      <Credits showCredits={showCredits} closeCredits={closeCredits} />
    </div>
  );
}

export default TitleScreen;
