import React, { useState, useRef, useEffect } from 'react'

const Tile = props => {

  const [isHover, setHover] = useState(false);

  return <div className={`board-piece hex ${props.type} ${isHover?"hover":""}`}
    style={{ transform: `translate(${props.position.x}px, ${props.position.y}px) rotate(-30deg)`}}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}/>
}

export default Tile;
