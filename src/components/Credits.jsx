import { useState } from "react";

function Credits({ showCredits, closeCredits }) {
  if (!showCredits) {
    return null;
  }

  return (
    <div className="credits">
      <div className="credits-modal">
        <h2>Made by Isabeli Estefano</h2>
        <button onClick={closeCredits}>Close</button>
      </div>
    </div>
  );
}
export default Credits;
