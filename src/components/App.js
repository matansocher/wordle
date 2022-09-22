import { useEffect, useMemo, useState } from 'react';
import '../assets/index.css';
import Board from './Board';
import Keyboard from './Keyboard';
import { BoardContext, CurrentLetterIndexContext, CurrentWordIndexContext } from '../context';
import { getEmptyBoard, getRandomWord } from '../services/words.service';

function App() {
  const [randomWord, setRandomWord] = useState(getEmptyBoard());
  const [board, setBoard] = useState(getEmptyBoard());
  const boardValue = useMemo(() => ({ board, setBoard }), [board, setBoard]);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const currentLetterIndexValue = useMemo(() => ({ currentLetterIndex, setCurrentLetterIndex }), [currentLetterIndex, setCurrentLetterIndex]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWordIndexValue = useMemo(() => ({ currentWordIndex, setCurrentWordIndex }), [currentWordIndex, setCurrentWordIndex]);
  
  useEffect(() => {
    const randomWord = getRandomWord();
    console.log(`random word: ${randomWord}`)
    setRandomWord(randomWord);
  }, [])
  
  return (
    <BoardContext.Provider value={boardValue}>
      <CurrentLetterIndexContext.Provider value={currentLetterIndexValue}>
        <CurrentWordIndexContext.Provider value={currentWordIndexValue}>
          <div className='App'>
            <Board />
            <Keyboard randomWord={randomWord} />
          </div>
        </CurrentWordIndexContext.Provider>
      </CurrentLetterIndexContext.Provider>
    </BoardContext.Provider>
  );
}

export default App;
