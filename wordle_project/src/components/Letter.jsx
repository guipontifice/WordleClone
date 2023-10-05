import React, { useContext, useEffect } from 'react'
import './Board.css'
import { AppContext } from '../App'

function Letter({ letterPosition, attemptVal }) {
  const {
    board,
    correctWord,
    currAttempt,
    setDisabledLetters
  } = useContext(AppContext);
  const letter = board[attemptVal][letterPosition]

  const correct = correctWord.toUpperCase()[letterPosition] === letter.toUpperCase();
  const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" : "wrong")

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter])
    }
  }, [currAttempt.attempt]);

  return (
    <div className='letter' id={letterState}>
      {" "}
      {letter}
    </div>
  )
}

export default Letter