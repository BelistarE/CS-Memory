import { useState } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import mainmenuSound from "../assets/sounds/submenu_scroll_01.wav";

function Credits({ showCredits, closeCredits }) {
  if (!showCredits) {
    return null;
  }

  const audio = new Audio(mainmenuSound);

  // Function to handle the click event
  const handleCloseCredits = () => {
    audio.play(); // Play the sound
    closeCredits(); // Call the closeCredits function
  };
  return (
    <div className="credits">
      <div className="credits-modal">
        <div className="top">
          <button className="exit" onClick={handleCloseCredits}>
            <Cross1Icon />
          </button>
        </div>
        <div className="credits-container">
          <h2>CS-Memory</h2>
          <p>
            A Counter Strike 2 memory game for{" "}
            <a
              className="linkblue"
              href="https://www.theodinproject.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Odin Project
            </a>
          </p>

          <h2>Resources and Inspiration</h2>
          <ul>
            <li>
              <a
                className="linkblue"
                href="https://github.com/ByMykel/CSGO-API"
                target="_blank"
                rel="noopener noreferrer"
              >
                CSGO API
              </a>{" "}
              created by{" "}
              <a
                className="linkblue"
                href="https://github.com/ByMykel"
                target="_blank"
                rel="noopener noreferrer"
              >
                ByMykel
              </a>
            </li>
            <li>
              <a
                className="linkblue"
                href="https://freefrontend.com/css-glitch-effects/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Glitch effects
              </a>{" "}
              from freefrontend.com
            </li>
            <li>
              Sounds decompiled by{" "}
              <a
                className="linkblue"
                href="https://valveresourceformat.github.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source 2 Viewer
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Credits;
