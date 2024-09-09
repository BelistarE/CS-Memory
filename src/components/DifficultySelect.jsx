import { useState } from "react";
import "./difficulty-style.css";
import Slideshow from "./Midori";

function Difficulty() {
  return (
    <div className="difficulty">
      <Slideshow />
      <div className="content-diff">
        <div className="difficulties">
          <div className="rectangle">
            <p>Easy</p>
          </div>
          <div className="rectangle">
            <p>Medium</p>
          </div>
          <div className="rectangle">
            <p>Hard</p>
          </div>
          <div className="rectangle">
            <p>Impossible</p>
          </div>
        </div>
        <div className="buttons">
          <button>Home</button>
          <button>GO</button>
        </div>
      </div>
    </div>
  );
}
export default Difficulty;
