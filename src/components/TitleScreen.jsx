import { useState } from "react";
import "./title-screen-style.css";

function TitleScreen() {
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
          <button>
            <span data-text="SOUND">SOUND</span>
          </button>
          <button>
            <span data-text="CREDITS">CREDITS</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TitleScreen;
