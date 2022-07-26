import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

type SquareState = 'O' | 'X' | null
type SquareProps = {
  value: SquareState
  onClick: () => void
}
type BoardState = [
  SquareState, SquareState, SquareState,
  SquareState, SquareState, SquareState,
  SquareState, SquareState, SquareState
]
type BoardProps = {
  squares: BoardState
  onClick: (i: number) => void
}

const Square = (props: SquareProps) => (
  <button className="square" onClick={props.onClick}>
    {props.value}
  </button>
);

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const handleClick = (i: number) => {
    if (calculateWinner(squares as any) || squares[i]) {
      return;
    }
    const newSquares = squares.slice()
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares)
    setXIsNext(!xIsNext)
  }
  const renderSquare = (i: number) => <Square value={squares[i]} onClick={() => handleClick(i)} />

  const winner = calculateWinner(squares as any);
  let status: string;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row"> {renderSquare(0)} {renderSquare(1)} {renderSquare(2)} </div>
      <div className="board-row"> {renderSquare(3)} {renderSquare(4)} {renderSquare(5)} </div>
      <div className="board-row"> {renderSquare(6)} {renderSquare(7)} {renderSquare(8)} </div>
    </div>
  );
}

const Game = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
    <div className="game-info">
      <div>{/* status */}</div>
      <ol>{/* TODO */}</ol>
    </div>
  </div>
)


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(<Game />);

const calculateWinner = (squares: BoardState) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}