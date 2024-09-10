import React, { useEffect, useState } from "react";
import "./gameboard-style.css";
import home from "../assets/home.png";
import Warning from "./Warning";
const getNumberOfTiles = (difficulty) => {
  let tiles;

  switch (difficulty) {
    case "easy":
      tiles = 9;
      break;
    case "medium":
      tiles = 12;
      break;
    case "hard":
      tiles = 16;
      break;
    case "impossible":
      tiles = 20;
      break;
    default:
      tiles = 8;
      break;
  }

  return tiles;
};

const fetchRandomSkins = async (numberOfSkins) => {
  try {
    const response = await fetch(
      "https://bymykel.github.io/CSGO-API/api/en/skins.json"
    );
    const data = await response.json();
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled
      .slice(0, numberOfSkins)
      .map((skin) => ({ ...skin, hasBeenClicked: false })); // Add hasBeenClicked property
  } catch (error) {
    console.error("Error fetching skin data:", error);
    return [];
  }
};

const shuffleArray = (array) => {
  return array.sort(() => 0.5 - Math.random());
};

const GameBoard = ({ difficulty, onHome }) => {
  //stuff for the warning modal
  const [showWarning, setShowWarning] = useState(false);
  const cancelHome = () => {
    setShowWarning(false);
  };
  const openWarning = () => {
    setShowWarning(true);
  };
  const goHome = () => {
    onHome();
  };
  //stuff for the game logic
  const [skins, setSkins] = useState([]);

  const tiles = getNumberOfTiles(difficulty);
  const columns = Math.ceil(Math.sqrt(tiles));
  const rows = Math.ceil(tiles / columns);

  useEffect(() => {
    fetchRandomSkins(tiles).then(setSkins);
  }, [tiles]);

  const adjustedTiles = columns * rows;

  const handleTileClick = (index) => {
    setSkins((prevSkins) => {
      const newSkins = [...prevSkins];
      const clickedSkin = newSkins[index];
      if (clickedSkin) {
        clickedSkin.hasBeenClicked = true;
        const shuffledSkins = shuffleArray(newSkins);
        return shuffledSkins;
      }
      return prevSkins;
    });
  };

  return (
    <div className="gameboard">
      <Warning
        showWarning={showWarning}
        closeWarning={cancelHome}
        onHome={goHome}
      />
      <div className="topbar">
        <button className="home" onClick={openWarning}>
          <img src={home} alt="Home" />
        </button>
      </div>
      <div className="inventory">
        <div
          className="weapons"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {Array.from({ length: adjustedTiles }).map((_, index) => {
            const skin = skins[index] || {}; // Use an empty object if no skin for this tile
            const borderColor = skin.rarity?.color || "rgb(176, 195, 217);";
            return (
              <div key={index} className="tile">
                <button
                  style={{ borderBottom: `5px solid ${borderColor}` }}
                  onClick={() => handleTileClick(index)}
                >
                  {skin.name ? (
                    <>
                      <img src={skin.image} alt={skin.name} />
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                </button>
                <p>{skin.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
