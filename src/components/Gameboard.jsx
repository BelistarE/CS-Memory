import React, { useEffect, useState } from "react";
const getNumberOfTiles = (difficulty) => {
  let tiles;

  switch (difficulty) {
    case "easy":
      tiles = 8;
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
    return shuffled.slice(0, numberOfSkins); // Get a random subset of skins
  } catch (error) {
    console.error("Error fetching skin data:", error);
    return [];
  }
};

const GameBoard = ({ difficulty }) => {
  const [skins, setSkins] = useState([]);

  const tiles = getNumberOfTiles(difficulty);
  const columns = Math.ceil(Math.sqrt(tiles));
  const rows = Math.ceil(tiles / columns);

  useEffect(() => {
    // Fetch a number of random skins based on the number of tiles
    fetchRandomSkins(tiles).then(setSkins);
  }, [tiles]);

  const adjustedTiles = columns * rows;

  return (
    <div
      className="game-board"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: adjustedTiles }).map((_, index) => {
        const skin = skins[index] || {}; // Use an empty object if there's no skin for this tile

        return (
          <div key={index} className="tile">
            {skin.name ? (
              <>
                <img
                  src={skin.image} // Adjust this based on the actual property for the image URL
                  alt={skin.name}
                  style={{ width: "100%", height: "auto" }} // Adjust as needed
                />
                <p>{skin.name}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;
