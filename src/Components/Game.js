import React, { useState } from 'react';
import { calculateWinner } from '../helper';
import Board from './Board';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? 'X' : 'O';

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : 'Go to start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <h1 className='title'>React Tic Tac Toe (Hooks)</h1>

      <div className='mainContainer'>
        <div className='info-wrapper'>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <Board squares={history[stepNumber]} onClick={handleClick} />
        <div className='info-wrapper'>
          <h3>
            {winner ? (
              <h1 className='ifWinner'>Winner: {winner} </h1>
            ) : (
              <h3 className='ifPlaying'>Next Player: {xO}</h3>
            )}
          </h3>
        </div>
      </div>
    </>
  );
};
export default Game;
