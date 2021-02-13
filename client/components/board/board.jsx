import React, { useState, useEffect } from "react";
import TileBoard from './TileBoard';

const Board = (props) => {

  const [resources, setResources] = useState(initializeResources());

  return (
    <div className="game-board">
      {
        <TileBoard  resources={resources.tiles}/>
      }
    </div>
  );
}

const initializeResources = () => {
  return {
    tiles: [
      "lumber", "lumber", "lumber", "lumber",
      "brick", "brick", "brick",
      "sheep", "sheep", "sheep", "sheep",
      "wheat", "wheat", "wheat", "wheat",
      "ore", "ore", "ore", "desert"
    ]
  }
}

export default Board;
