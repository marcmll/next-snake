import React, { useState, useEffect } from 'react'
import drawRoundRect from 'lib/roundRect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SnakeGame ({ highScoreData }) {
  const canvasRef = React.useRef(null)
  const canvasWidth = 500
  const canvasHeight = 380
  const canvasGridSize = 20
  const gameSpeed = 100

  const [velocity, setVelocity] = useState({ dx: 0, dy: 0 })
  const [running, setRunning] = useState(false)
  const [gameState, setGameState] = useState({
    lost: false,
    score: 0,
    snake: [ { x: 12, y: 9 }, { x: 12, y: 10 }, { x: 12, y: 11 }, { x: 12, y: 12 }, { x: 12, y: 13 } ],
    velocityHistory: []
  })

  const clearCanvas = ctx => ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  const drawSnake = ctx => {
    console.log(gameState)
    ctx.fillStyle = '#6175DE'
    ctx.strokeStyle = '#222F70'
    gameState.snake.forEach(snakePart => {
      drawRoundRect(ctx, (snakePart.x * canvasGridSize), (snakePart.y * canvasGridSize), canvasGridSize, canvasGridSize, 4, true)
    })
  }

  const updateSnake = () => {
    const updatedVelocityHistory = [velocity, ...gameState.velocityHistory]
    updatedVelocityHistory.splice(gameState.snake.length)
    setGameState({
      ...gameState,
      velocityHistory: updatedVelocityHistory
    })

    const updatedSnake = gameState.snake
    // for (const [index, snakePart] of updatedSnake.entries()) {
    updatedSnake.forEach((snakePart, index) => {
      for (let i = 0; i <= index; i++) {
        if (gameState.velocityHistory[(index - i)] && gameState.velocityHistory[(index - i)]) {
          snakePart.x += gameState.velocityHistory[(index - i)].dx
          snakePart.y += gameState.velocityHistory[(index - i)].dy
          break
        }
      }
    })
    //   if (index === 0) {
    //     if (snakePart.x < 0 || snakePart.y < 0 || snakePart.x >= (canvasWidth / canvasGridSize) || snakePart.y >= (canvasHeight / canvasGridSize)) {
    //       updatedGameState.lost = true
    //       break
    //     }
    //     for (let i = 1; i < gameState.snake.length; i++) {
    //       if (gameState.snake[i].x === snakePart.x && gameState.snake[i].y === snakePart.y) {
    //         updatedGameState.lost = true
    //         break
    //       }
    //     }
    //   }
    // }
    setGameState({
      ...gameState,
      snake: updatedSnake
    })
  }

  // Game Loop
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    clearCanvas(ctx)
    if (!gameState.lost) {
      drawSnake(ctx)
    }
  }, [gameState])

  // Key Event Handler
  const handleKeyPress = e => {
    if (!gameState.started && e.key === 'ArrowUp') {
      setVelocity({ dx: 0, dy: -1 })
      setRunning(!running)
    } else if (gameState.started && !gameState.lost && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      switch (e.key) {
        case 'ArrowRight':
          setVelocity({ dx: 1, dy: 0 })
          break
        case 'ArrowLeft':
          setVelocity({ dx: -1, dy: 0 })
          break
        case 'ArrowDown':
          setVelocity({ dx: 0, dy: 1 })
          break
        case 'ArrowUp':
          setVelocity({ dx: 0, dy: -1 })
          break
        default:
          console.error('Error with key press handler')
      }
    }
  }
  
  // Init Event Listener
  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress, false)
    const gameInterval = setInterval(() => {
      if (!gameState.lost) {
        updateSnake()
      }
    }, gameSpeed)
    return () => {
      clearInterval(gameInterval)
      document.removeEventListener('keyup', handleKeyPress, false)
    }
  }, [])

  return (
    <>
      <main>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
        />
        <section className='score'>
          { (!gameState.started) ?
            <p><FontAwesomeIcon icon={['fad', 'arrow-square-up']} />Press up to start...</p> :
            <p><FontAwesomeIcon icon={['fad', 'stars']} />Score: {gameState.score}</p>
          }
          <p><FontAwesomeIcon icon={['fad', 'flag']} />Highscore: {highScoreData ? highScoreData[0].score : '0'}</p>
        </section>
        { gameState.lost &&
          <div className='game-over-screen'>
            <p className='large'>Game Over</p>
            <p className='final-score'>You scored: {gameState.score}</p>
          </div>
        }
      </main>
      <footer>
        Copyright &copy; <a href='https://mueller.dev'>Marc Müller</a> 2020
      </footer>
    </>
  )
}

export async function getStaticProps () {
  const res = await fetch('http://localhost:3000/api/highscores/get')
  const highScoreData = await res.json()

  return {
    props: {
      highScoreData
    }
  }
}
