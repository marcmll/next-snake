import { useState, useEffect, useRef } from 'react'
import useInterval from '@use-it/interval'
import drawRoundRect from 'lib/roundRect'
import Head from 'components/Head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SnakeGame () {
  // Canvas Settings
  const canvasRef = useRef(null)
  const canvasWidth = 500
  const canvasHeight = 380
  const canvasGridSize = 20

  // Game State
  const [gameDelay, setGameDelay] = useState()
  const [countDown, setCountDown] = useState(4)
  const [running, setRunning] = useState(false)
  const [isLost, setIsLost] = useState(false)
  const [highscore, setHighscore] = useState(0)
  const [newHighscore, setNewHighscore] = useState(false)
  const [score, setScore] = useState(0)
  const [snake, setSnake] = useState({
    head: { x: 12, y: 9 },
    trail: []
  })
  const [apple, setApple] = useState({})
  const [velocity, setVelocity] = useState({})
  const [previousVelocity, setPreviousVelocity] = useState({})

  const clearCanvas = ctx => ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  const generateApplePosition = () => {
    const x = Math.floor(Math.random() * (canvasWidth / canvasGridSize))
    const y = Math.floor(Math.random() * (canvasHeight / canvasGridSize))
    // Check if random position interferes with snake head or trail
    if ((snake.head.x === x && snake.head.y === y) || (snake.trail.some(snakePart => (snakePart.x === x && snakePart.y === y)))) {
      return generateApplePosition()
    }
    return { x, y }
  }

  // Initialise state and start countdown
  const startGame = () => {
    setGameDelay(1000 / 12)
    setIsLost(false)
    setScore(0)
    setSnake({
      head: { x: 12, y: 9 },
      trail: []
    })
    setApple(generateApplePosition())
    setVelocity({ dx: 0, dy: -1 })
    setRunning(true)
    setNewHighscore(false)
    setCountDown(3)
  }

  // Reset state and check for highscore
  const gameOver = () => {
    if (score > highscore) {
      setHighscore(score)
      localStorage.setItem('highscore', score)
      setNewHighscore(true)
    }
    setIsLost(true)
    setRunning(false)
    setVelocity({ dx: 0, dy: 0 })
    setCountDown(4)
  }

  const drawSnake = ctx => {
    ctx.fillStyle = '#0170F3'
    ctx.strokeStyle = '#003779'
    drawRoundRect(ctx, (snake.head.x * canvasGridSize), (snake.head.y * canvasGridSize), canvasGridSize, canvasGridSize, 4, true)
    snake.trail.forEach(snakePart => {
      drawRoundRect(ctx, (snakePart.x * canvasGridSize), (snakePart.y * canvasGridSize), canvasGridSize, canvasGridSize, 4, true)
    })
  }

  const drawApple = ctx => {
    ctx.fillStyle = '#38C172' // '#F4CA64'
    ctx.strokeStyle = '#187741' // '#8C6D1F
    if (apple && (typeof apple.x !== 'undefined') && (typeof apple.y !== 'undefined')) {
      drawRoundRect(ctx, (apple.x * canvasGridSize), (apple.y * canvasGridSize), canvasGridSize, canvasGridSize, 4, true)
    }
  }

  const updateSnake = () => {
    const nextHeadPosition = { x: snake.head.x + velocity.dx, y: snake.head.y + velocity.dy }
    if (nextHeadPosition.x < 0 || nextHeadPosition.y < 0
        || nextHeadPosition.x >= (canvasWidth / canvasGridSize)
        || nextHeadPosition.y >= (canvasHeight / canvasGridSize)) {
      gameOver()
    }
    if (nextHeadPosition.x === apple.x && nextHeadPosition.y === apple.y) {
      setScore(prevScore => (prevScore + 1))
      setApple(generateApplePosition())
    }
    const updatedSnakeTrail = [...snake.trail, { ...snake.head }]
    while (updatedSnakeTrail.length > (score + 2)) updatedSnakeTrail.shift()
    if (updatedSnakeTrail.some(snakePart => (snakePart.x === nextHeadPosition.x && snakePart.y === nextHeadPosition.y))) gameOver()
    setPreviousVelocity({ ...velocity })
    setSnake({
      head: { ...nextHeadPosition},
      trail: [...updatedSnakeTrail]
    })
  }

  // Game Hook
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!isLost) {
      clearCanvas(ctx)
      drawApple(ctx)
      drawSnake(ctx)
    }
  }, [snake, apple])

  // Game Update Interval
  useInterval(() => {
    if (!isLost) {
      updateSnake()
    }
  }, (running && countDown === 0) ? gameDelay : null)

  // Countdown Interval
  useInterval(() => {
    setCountDown(prevCountDown => (prevCountDown - 1))
  }, (countDown > 0 && countDown < 4) ? 1000 : null)

  // DidMount Hook for Highscore
  useEffect(() => {
    setHighscore(parseInt(localStorage.getItem('highscore')) || 0)
  }, [])

  // Score Hook: increase game speed starting at 16
  useEffect(() => {
    if (score > 12 && score <= 18) {
      setGameDelay((1000 / score))
    }
  }, [score])
  
  // Event Listener: Key Presses
  useEffect(() => {
    const handleKeyDown = e => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        let velocity = {}
        switch (e.key) {
          case 'ArrowRight':
            velocity = { dx: 1, dy: 0 }
            break
          case 'ArrowLeft':
            velocity = { dx: -1, dy: 0 }
            break
          case 'ArrowDown':
            velocity = { dx: 0, dy: 1 }
            break
          case 'ArrowUp':
            velocity = { dx: 0, dy: -1 }
            break
          default:
            console.error('Error with handleKeyDown')
        }
        if (!((previousVelocity.dx + velocity.dx === 0)
            && (previousVelocity.dy + velocity.dy === 0))) {
          setVelocity(velocity)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [previousVelocity])

  return (
    <>
      <Head />
      <main>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
        />
        <section>
          <div className='score'>
            <p><FontAwesomeIcon icon={['fas', 'star']} />Score: {score}</p>
            <p><FontAwesomeIcon icon={['fas', 'trophy']} />Highscore: {highscore > score ? highscore : score}</p>
          </div>
          { (!isLost && countDown > 0) ?
            <button onClick={startGame}>{ countDown === 4 ? 'Start Game' : countDown}</button> :
            <div className='controls'>
              <p>How to Play?</p>
              <p><FontAwesomeIcon icon={['fas', 'arrow-up']} /><FontAwesomeIcon icon={['fas', 'arrow-right']} /><FontAwesomeIcon icon={['fas', 'arrow-down']} /><FontAwesomeIcon icon={['fas', 'arrow-left']} /></p>
            </div>
          }
        </section>
        { isLost &&
          <div className='game-overlay'>
            <p className='large'>Game Over</p>
            <p className='final-score'>
              { newHighscore ? `🎉 New Highscore 🎉` : `You scored: ${score}` }
            </p>
            { (!running && isLost) && <button onClick={startGame}>{ countDown === 4 ? 'Restart Game' : countDown}</button> }
          </div>
        }
      </main>
      <footer>
        Copyright &copy; <a href='https://mueller.dev'>Marc Müller</a> 2020 &nbsp;|&nbsp; <a href='https://github.com/marcmll/next-snake'><FontAwesomeIcon icon={['fab', 'github']} /> Github</a> 
      </footer>
    </>
  )
}
