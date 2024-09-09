import { useState } from "react";
import "./difficulty-style.css";
import Slideshow from "./Midori";

function Difficulty() {
  return (
    <div className="difficulty">
      <Slideshow />
      <div className="content-diff">
        <div className="difficulties">
          <button className="rectangle">
            <p>Easy</p>
          </button>
          <button className="rectangle">
            <p>Medium</p>
          </button>
          <button className="rectangle">
            <p>Hard</p>
          </button>
          <button className="rectangle">
            <p>Impossible</p>
          </button>
        </div>
        <div className="buttons">
          <button>Home</button>
          <button className="go">
            <p>GO</p>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Difficulty;
