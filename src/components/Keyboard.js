import React, { useContext, useState } from 'react';
import { config } from '../config';
import { keyboardLetters } from '../assets/keyboard-buttons';
import Button from './Button';
import { boardEmptyWord } from '../assets/board-empty-word';
import { BoardContext, CurrentLetterIndexContext, CurrentWordIndexContext } from '../context';
import { getEmptyBoard, getLetterRevealedColor, isWordValid, isWordWinner, getColoredKeyboard } from '../services/words.service';

function Keyboard({ randomWord }) {

  const [ defaultKeyboardLetters ] = useState(keyboardLetters);
  const [ isGameEnded, setIsGameEnded ] = useState(false);
  const [ keyboardButtons, setKeyboarButtons ] = useState(defaultKeyboardLetters);
  const { board, setBoard } = useContext(BoardContext);
  const { currentLetterIndex, setCurrentLetterIndex } = useContext(CurrentLetterIndexContext);
  const { currentWordIndex, setCurrentWordIndex } = useContext(CurrentWordIndexContext);

  const drawKeyboard = () => {
    return keyboardButtons.map((line, i) => {
      return <div className='keyboard-line' key={i}>
        { drawLine(line) }
      </div>
    });
  }

  const drawLine = (line) => {
    return line.map(button => {
      const handleClickFunction = button.isDelete ? handleDeleteClick : (button.isEnter ? handleEnterClick : handleLetterClick);
      return <Button key={button.value} button={button} handleClick={handleClickFunction} isGameEnded={isGameEnded}></Button>
    });
  }

  const handleLetterClick = ({ value }) => {
    console.log(`clicked ${value}`);
    if (currentLetterIndex >= boardEmptyWord.length) return;
    const clonedBoard = [...board];
    let currentWord = [...clonedBoard[currentWordIndex]];
    currentWord[currentLetterIndex] = { value };
    clonedBoard[currentWordIndex] = currentWord;
    setBoard(clonedBoard);
    setCurrentLetterIndex(currentLetterIndex + 1);
  }

  const handleDeleteClick = () => {
    console.log('delete clicked');
    if (currentLetterIndex === 0) return;
    const clonedBoard = [...board];
    let currentWord = [...clonedBoard[currentWordIndex]];
    currentWord[currentLetterIndex - 1] = { value: '' };
    clonedBoard[currentWordIndex] = currentWord;
    setBoard(clonedBoard);
    setCurrentLetterIndex(currentLetterIndex - 1);
  }

  const handleEnterClick = async () => {
    console.log('Enter clicked');
    // reveal letters colors
    if (currentLetterIndex < boardEmptyWord.length) {
      return;
    }

    const clonedBoard = [...board];
    let currentWord = [...clonedBoard[currentWordIndex]];
    const isWordAllowed = await isWordValid(currentWord);

    if (!isWordAllowed) {
      console.log('word not valid!');
      return;
    }

    currentWord = currentWord.map((letter, i) => {
      const color = getLetterRevealedColor(randomWord, letter.value.toLowerCase(), i);
      return { value: letter.value, color }
    });
    clonedBoard[currentWordIndex] = currentWord;
    setBoard(clonedBoard);





    const clonedKeyboard = [...keyboardButtons];
    const coloredKeyboard = getColoredKeyboard(clonedKeyboard, currentWord);
    setKeyboarButtons(coloredKeyboard);




    const isWinner = isWordWinner(currentWord);
    if (isWinner) {
      console.log('Game Ended - Winner!!!!!!!!');
      setIsGameEnded(true);
    }
    // check if currentWordIndex === config.NUM_OF_TRIES
    setCurrentLetterIndex(0);
    setCurrentWordIndex(currentWordIndex + 1);
    if ((currentWordIndex + 1) === config.NUM_OF_TRIES) {
      console.log('Game Ended - Loser!!!!!!!!');
    }
  }

  // const resetGame = () => {
  //   setKeyboarButtons(defaultKeyboardLetters);
  //   setBoard(getEmptyBoard());
  //   setCurrentLetterIndex(0);
  //   setCurrentWordIndex(0);
  //   setIsGameEnded(false);
  // };

  return (
    <div className='keyboard'>
      {/* {isGameEnded ? <button onClick={resetGame}>reset game</button> : null} */}
      { drawKeyboard() }
    </div>
  );
}

export default Keyboard;
