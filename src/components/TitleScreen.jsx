import { useState } from "react";
import "./title-screen-style.css";

function TitleScreen() {
  return (
    <div className="title-screen">
      <div className="moving-lines-background"></div>
      <h1 data-text="CS-MEMORY">CS-MEMORY</h1>
    </div>
  );
}

export default TitleScreen;
