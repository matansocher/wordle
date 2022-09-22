import React, { useContext } from 'react';
import Box from './Box';
import { BoardContext } from '../context';

function Board() {
  const { board } = useContext(BoardContext);

  const drawBoard = () => {
    return board.map((line, i) => {
      return <div className='board-line' key={i}>
        { drawLine(line) }
      </div>
    });
  }

  const drawLine = (line) => {
    return line.map((box, i) => {
      return <Box box={box} key={i}></Box>
    });
  }

  return (
    <div className='board'>
      { drawBoard() }
    </div>
  );
}

export default Board;
