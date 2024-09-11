import React, { useEffect, useState } from "react";
import "./gameboard-style.css";
import loadingPlaceholder from "../assets/loading_placeholder.png";
import home from "../assets/home.png";
import Warning from "./Warning";
const getNumberOfTiles = (difficulty) => {
  let tiles, columns, rows;

  switch (difficulty) {
    case "easy":
      tiles = 9;
      columns = 3;
      rows = 3;
      break;
    case "medium":
      tiles = 12;
      columns = 4;
      rows = 3;
      break;
    case "hard":
      tiles = 15;
      columns = 5;
      rows = 3;
      break;
    case "impossible":
      tiles = 18;
      columns = 6;
      rows = 3;
      break;
    default:
      tiles = 8;
      columns = 4;
      rows = 2;
      break;
  }

  return { tiles, columns, rows };
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
      .map((skin) => ({ ...skin, hasBeenClicked: false }));
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
  const [hasFailed, setHasFailed] = useState(false);
  const [score, setscore] = useState(0);
  const [showEndGame, setShowEndGame] = useState(false);
  const { tiles, columns, rows } = getNumberOfTiles(difficulty);
  const [showEndScreen, setShowEndScreen] = useState("dontShow");
  const [errorTileIndex, setErrorTileIndex] = useState(null);

  useEffect(() => {
    fetchRandomSkins(tiles).then(setSkins);
  }, [tiles]);

  const adjustedTiles = columns * rows;

  const handleTileClick = (index) => {
    setSkins((prevSkins) => {
      const newSkins = [...prevSkins];
      const clickedSkin = { ...newSkins[index] }; // Make a copy of the skin because i was having issues(thanks google)

      // Ensure clickedSkin is valid
      if (!clickedSkin || !clickedSkin.name) {
        console.error("Skin data not fully loaded");
        return prevSkins;
      }
      // Check if the skin has already been clicked
      if (clickedSkin.hasBeenClicked) {
        setHasFailed(true);
        setShowEndGame(true);
        setShowEndScreen("show");
        setErrorTileIndex(index);
        console.log(`${clickedSkin.name} was clicked twice`);
      } else {
        clickedSkin.hasBeenClicked = true; // mark skin as clicked in the copy
        newSkins[index] = clickedSkin; // update array with the modified skin
        setHasFailed(false);
        console.log(`${clickedSkin.name} was clicked for the first time`);
        setscore((prevScore) => prevScore + 1);
        //shuffle
        const shuffledSkins = shuffleArray(newSkins);
        return shuffledSkins;
      }

      return prevSkins; // Return the original state if no valid skin was clicked
    });
  };
  const fetchNewSetOfSkins = () => {
    fetchRandomSkins(tiles).then(setSkins);
    setscore(0);
    setHasFailed(false);
    setShowEndGame(false);
    setShowEndScreen("dontShow");
    setErrorTileIndex(null);
  };
  return (
    <div className="gameboard">
      <Warning
        showWarning={showWarning}
        closeWarning={cancelHome}
        onHome={goHome}
      />
      <div className={showEndScreen === "show" ? "show" : "dontShow"}>
        <div className="end">
          <div className="end-modal">
            <h2>GAME OVER</h2>
            <div className="elo">
              <p>Your final score is: {score}</p>
            </div>
            <p className="possible">Out of {tiles} possible skins</p>
            <div className="score-btn">
              <button onClick={goHome}>Change Difficulty</button>
              <button onClick={fetchNewSetOfSkins}>Play Again</button>
            </div>
          </div>
        </div>
      </div>

      <div className="topbar">
        <button className="home" onClick={openWarning}>
          <img src={home} alt="Home" />
        </button>
        <div className="simple">
          <p>
            The rules are simple... don&apos;t click on the same skin twice!
          </p>
        </div>
        <div className="score">
          <p>
            SCORE: {score}/{tiles}
          </p>
        </div>
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
            const skin = skins[index] || {};
            const borderColor = skin.rarity?.color || "rgb(176, 195, 217);";
            const tileClass = errorTileIndex === index ? "tile red" : "tile";
            return (
              <div key={index} className={tileClass}>
                <button
                  style={{ borderBottom: `7px solid ${borderColor}` }}
                  onClick={() => handleTileClick(index)}
                >
                  {skin.name ? (
                    <>
                      <img src={skin.image} alt={skin.name} />
                    </>
                  ) : (
                    <img src={loadingPlaceholder} alt="Loading..." />
                  )}
                </button>
                {skin.name ? (
                  <>
                    <p className="gun">{skin.name.split(" | ")[0]}</p>
                    <p className="skinname">{skin.name.split(" | ")[1]}</p>
                  </>
                ) : (
                  <>
                    <p className="gun">Loading...</p>
                    <p className="skinname"></p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
