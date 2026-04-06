import { useState, useEffect } from "react";
import { RotateCw, Cpu } from "lucide-react";

type Player = "X" | "O" | null;

const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const checkWinner = (squares: Player[]): Player | "DRAW" => {
  for (let i = 0; i < WIN_LINES.length; i++) {
    const [a, b, c] = WIN_LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return squares.includes(null) ? null : "DRAW";
};

// Minimax algorithm for unbeatable AI
const minimax = (board: Player[], depth: number, isMaximizing: boolean): number => {
  const winner = checkWinner(board);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (winner === "DRAW") return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

const getBestMove = (board: Player[]): number => {
  let bestScore = -Infinity;
  let move = 0;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
       board[i] = "O";
       let score = minimax(board, 0, false);
       board[i] = null;
       if (score > bestScore) {
         bestScore = score;
         move = i;
       }
    }
  }
  return move;
};

const AITicTacToe = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<Player | "DRAW">(null);

  const handleClick = (index: number) => {
    if (board[index] || winner || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);
  };

  useEffect(() => {
    const w = checkWinner(board);
    if (w) {
      setWinner(w);
      return;
    }

    if (!isXNext) {
      // AI's turn
      const timer = setTimeout(() => {
        const move = getBestMove([...board]);
        const newBoard = [...board];
        newBoard[move] = "O";
        setBoard(newBoard);
        setIsXNext(true);
        const nw = checkWinner(newBoard);
        if (nw) setWinner(nw);
      }, 500); // 500ms delay to simulate "thinking"
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full h-full max-w-xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-heading font-bold text-foreground flex items-center justify-center gap-3">
          <Cpu className="text-mint" /> Unbeatable AI
        </h2>
        <p className="text-muted-foreground font-body">
          This AI uses a "Minimax" algorithm to look into the future of every possible move. It will never lose!
        </p>
      </div>

      <div className="bg-card p-6 rounded-3xl border border-border shadow-md">
        <div className="grid grid-cols-3 gap-3 mb-6 bg-border p-3 rounded-2xl w-fit mx-auto">
          {board.map((cell, idx) => (
            <div 
              key={idx}
              onClick={() => handleClick(idx)}
              className={`w-20 h-20 bg-background rounded-xl flex items-center justify-center text-4xl font-heading font-bold ${
                !cell && isXNext && !winner ? "hover:bg-muted cursor-pointer" : "cursor-default"
              } transition-colors
              ${cell === "X" ? "text-primary shadow-inner" : cell === "O" ? "text-secondary shadow-inner" : ""}`}
            >
              {cell}
            </div>
          ))}
        </div>

        <div className="h-12 flex items-center justify-center">
          {winner ? (
            <div className={`px-6 py-2 rounded-full font-bold font-mono tracking-widest uppercase text-sm
              ${winner === "DRAW" ? "bg-muted text-muted-foreground" : winner === "X" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"}
            `}>
              {winner === "DRAW" ? "It's a draw!" : `${winner} WINS!`}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground font-mono font-semibold uppercase text-sm">
              {!isXNext && <Cpu className="animate-pulse text-secondary" size={16} />}
              {isXNext ? "Your Turn (X)" : "AI is thinking (O)..."}
            </div>
          )}
        </div>

        {winner && (
          <div className="mt-4 flex justify-center">
            <button 
              onClick={resetGame}
              className="flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity shadow-lg"
            >
              <RotateCw size={18} /> Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AITicTacToe;
