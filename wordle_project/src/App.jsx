import { useState, createContext, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import NavBar from './components/NavBar';
import Board from './components/Board';
import { boardDefault, generateWordSet } from './Words'
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 })
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false})
  const [correctWord, setCorrectWord] = useState("")


  useEffect(() => {
    generateWordSet().then(words => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord )
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 })
  };

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 })
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    let currWord = '';
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i].toLowerCase()
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert('Word not Found');
      setCurrAttempt({ attempt: currAttempt.attempt, letterPos: 5 });
    }

    if (currWord.toLowerCase() === correctWord.toLowerCase()) {
      setGameOver({gameOver: true, guessedWord: true}) 
      return;
    }

    if (currAttempt.attempt === 5) {
      setGameOver({gameOver: true, guessedWord: false})
    }
  }
  return (
    <>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          setDisabledLetters,
          disabledLetters,
          setGameOver,
          gameOver
        }}>
        <NavBar />
        <Board />
        {gameOver.gameOver ? <GameOver /> : <Keyboard />}
      </AppContext.Provider>
    </>
  )
}
export default App
