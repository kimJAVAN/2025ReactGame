import { useState } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (i) => {
    const winner = calculateWinner(board);
    // 승자가 있거나 이미 채워진 칸이면 클릭 무시
    if (winner || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(board);
  const isFull = board.every(cell => cell !== null);

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((value, i) => (
          <button
            key={i}
            className="cell"
            onClick={() => handleClick(i)}
            style={{ color: value === 'X' ? 'red' : value === 'O' ? 'blue' : 'black' }}
          >
            {value}
          </button>
        ))}
      </div>
      <h2>
        {winner ? `Winner: ${winner}` : isFull ? '무승부!' : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </h2>
      <button onClick={() => {setBoard(Array(9).fill(null)); setIsXNext(true);}}>Reset</button>
    </div>
  );
}

function calculateWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

export default TicTacToe;
