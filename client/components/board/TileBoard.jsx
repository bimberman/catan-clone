import React, { useState, useEffect } from 'react';
import Tile from './Tile';


const TileBoard = props => {

  const [tiles, setTiles] = useState(makeTileObj(props.resources));

  return (
    <div className="tile-board" style={{ width: "1000px", height: "1000px" }}>
      {
        tiles.map(tile => {
          return <Tile type={tile.type} position={tile.position}/>
        })
      }
    </div>
  )
}

const makeTileObj = (array) => {
  const { innerWidth, innerHeight } = window;
  const dim = innerHeight < innerWidth ? innerWidth : innerHeight;
  const size = dim*0.04;
  const r = Math.sqrt(3) * size;
  let x = innerWidth / 2;
  let y = innerHeight / 2;
  let a = 0;
  let c = 0;
  let offset = 0;

  array = shuffle(array);
  array = array.map((resource, index)=>{

    if (index === 0) {
      c = 0;
    } else if (index < 7) {
      c = 1;
      offset = 0;
    } else if (index < 19) {
      c = 2;
      if (index > 12) {
        c = 0;
        offset = -30;
        a = 3;
      }
    }
    const angle_deg = 60 * index + offset
    const angle_rad = Math.PI / 180 * angle_deg

    return {
      "type": resource,
      "index": index,
      "position": {
        "x": 390 + Math.cos(angle_rad) * (r*c + size*a),
        "y": 390 + Math.sin(angle_rad) * (r*c + size*a),
      }
    }
  })

  return array;
}

const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default TileBoard;
