import React, { useContext } from 'react'
import { AppContext } from '../App'
import './GameOver.css'

function GameOver() {
  const { gameOver, currAttempt, correctWord } = useContext(AppContext);
    return (
    <div className='game-over'>
        <h3>{gameOver.guessedWord ? 'You guessed it right' : 'You missed your chances'}</h3>
        <h1>Correct: {correctWord}</h1>
        {gameOver.guessedWord && (
            <h3>You guessed in {currAttempt.attempt} attempts</h3>
        )}
    </div>
  )
}

export default GameOver