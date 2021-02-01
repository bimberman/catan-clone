import React, { useRef, useEffect } from 'react'

const Canvas = props => {

  const { draw, ...canvasProps } = props
  const canvasRef = useRef(null)

  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const render = () => {
      draw(context)
    }

    render()

    return () => {
    }
  }, [draw])

  return <canvas ref={canvasRef} style={{width:"60vw", height:"60vh"}} {...canvasProps} />
}

export default Canvas
