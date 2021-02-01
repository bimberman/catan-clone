import React, { useState, useEffect } from "react";
import HexBoard from "./hexBoard"
import Canvas from './Canvas'

const Board = (props) => {

  const [resources, setResources] = useState(initializeResources());

  return (
    <HexBoard tiles={resources.tiles}/>
  );
}

const initializeResources = () => {
  return {
    tiles: {
      lumber: 4,
      brick: 3,
      sheep: 4,
      wheat: 4,
      ore: 3,
      desert: 1
    }
  }
}

export default Board;
