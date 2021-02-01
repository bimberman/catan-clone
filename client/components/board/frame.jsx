import React, { useEffect, useState } from "react";
import Canvas from './Canvas';

const Frame = (props) => {

  const [frames, setFrame] = useState(initializeFrames(props.frames))

  const draw = (ctx) => {
    drawFrames(ctx, frames);
  }

  return (
    <Canvas draw={draw} />
  );
}

const drawHex = (ctx, frames) => {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const dim = height < width ? width : height;
  const size = dim * 0.05;
  const r = Math.sqrt(3) * size;
  let x = width / 2;
  let y = height / 2;
  let a = 0;
  let c = 0;
  let offset = -30;

  for (let i = 0; i < tiles.length; i++) {
    ctx.beginPath();

    if (i === 0) {
      c = 0;
    } else if (i < 7) {
      c = 1;
      offset = -30;
    } else if (i < 19) {
      c = 2;
      if (i > 12) {
        c = 0;
        offset = 0;
        a = 3;
      }
    }

    const angle_deg = 60 * i + offset
    const angle_rad = Math.PI / 180 * angle_deg
    x = width / 2 +
      r * c * Math.cos(angle_rad) +
      size * a * Math.cos(angle_rad)
    y = height / 2 +
      r * c * Math.sin(angle_rad) +
      size * a * Math.sin(angle_rad)

    ctx.moveTo(x, y);

    for (let side = 0; side < 7; side++) {
      ctx.lineTo(x + (size - 1) * Math.cos(side * 2 * Math.PI / 6),
        y + (size - 1) * Math.sin(side * 2 * Math.PI / 6));
    }

    background_image(tiles[i], ctx, x - size, y - size, 2 * size, 2 * size - 4);
  }
}

const background_image = (img, ctx, x, y, dWidth, dHeight) => {
  const image = new Image();
  image.src = `./images/${img}.png`;
  ctx.imageSmoothingEnabled = true;
  image.onload = function () {
    ctx.drawImage(image, x, y, dWidth, dHeight);
  }
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

const initializeTiles = (tiles) => {
  const res = [];

  for (const [resource, quantity] of Object.entries(tiles)) {
    for (let i = 0; i < quantity; i++) {
      res.push(resource);
    }
  }

  return res;
}

export default HexBoard;
