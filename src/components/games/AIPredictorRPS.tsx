import { useState } from "react";
import { Hand, Activity, Sparkles } from "lucide-react";

type Move = "ROCK" | "PAPER" | "SCISSORS";

const beats: Record<Move, Move> = {
  ROCK: "SCISSORS",
  PAPER: "ROCK",
  SCISSORS: "PAPER"
};

const losesTo: Record<Move, Move> = {
  ROCK: "PAPER",
  PAPER: "SCISSORS",
  SCISSORS: "ROCK"
};

const emojis: Record<Move, string> = {
  ROCK: "🪨", PAPER: "📄", SCISSORS: "✂️"
};

const AIPredictorRPS = () => {
  const [history, setHistory] = useState<Move[]>([]);
  const [playerMove, setPlayerMove] = useState<Move | null>(null);
  const [aiMove, setAiMove] = useState<Move | null>(null);
  const [result, setResult] = useState<"WIN" | "LOSE" | "TIE" | null>(null);
  const [score, setScore] = useState({ player: 0, ai: 0 });

  const predictNextMove = (): Move => {
    // Trivial Markov prediction. Looks at the last move, searches history for the most common move the user made AFTER playing that last move.
    if (history.length < 2) return ["ROCK", "PAPER", "SCISSORS"][Math.floor(Math.random() * 3)] as Move;
    
    const lastMove = history[history.length - 1];
    const counts = { ROCK: 0, PAPER: 0, SCISSORS: 0 };
    
    for (let i = 0; i < history.length - 1; i++) {
      if (history[i] === lastMove) {
        counts[history[i + 1]]++;
      }
    }

    // Find highest count
    let predictedMove: Move = "ROCK";
    let max = -1;
    (Object.keys(counts) as Move[]).forEach(move => {
      if (counts[move] > max) {
        max = counts[move];
        predictedMove = move;
      }
    });

    // If no data to predict, pick random
    if (max === 0) return ["ROCK", "PAPER", "SCISSORS"][Math.floor(Math.random() * 3)] as Move;

    // Return the move that beats the predicted move
    return losesTo[predictedMove];
  };

  const play = (move: Move) => {
    const aiPrediction = predictNextMove();
    setPlayerMove(move);
    setAiMove(aiPrediction);
    setHistory(prev => [...prev, move]);

    if (move === aiPrediction) {
      setResult("TIE");
    } else if (beats[move] === aiPrediction) {
      setResult("WIN");
      setScore(s => ({ ...s, player: s.player + 1 }));
    } else {
      setResult("LOSE");
      setScore(s => ({ ...s, ai: s.ai + 1 }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full max-w-2xl mx-auto h-full space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-heading font-bold text-foreground">Pattern Predictor AI</h2>
        <p className="text-muted-foreground font-body">This AI secretly watches your moves to predict what you'll pick next. Can you be unpredictable?</p>
      </div>

      <div className="grid grid-cols-2 gap-8 w-full">
        {/* Score Board */}
        <div className="col-span-2 flex justify-center gap-8 bg-card border border-border p-4 rounded-3xl shadow-sm">
           <div className="text-center">
             <div className="text-sm font-mono text-muted-foreground font-bold">YOU</div>
             <div className="text-3xl font-heading font-bold text-primary">{score.player}</div>
           </div>
           <div className="w-px bg-border my-2"></div>
           <div className="text-center">
             <div className="text-sm font-mono text-muted-foreground font-bold flex items-center justify-center gap-1"><Sparkles size={12}/> AI</div>
             <div className="text-3xl font-heading font-bold text-secondary">{score.ai}</div>
           </div>
        </div>

        {/* Battle Arena */}
        <div className="col-span-2 bg-muted/30 border border-border rounded-[2rem] p-8 flex items-center justify-between relative shadow-inner h-48">
          <div className="flex flex-col items-center justify-center gap-2 w-32">
            <div className="text-5xl animate-bounce-soft">{playerMove ? emojis[playerMove] : "❓"}</div>
            <div className="text-xs font-mono font-bold text-muted-foreground uppercase">{playerMove || "Waiting"}</div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             {result && (
               <div className={`px-4 py-2 font-black italic rounded-xl rotate-[-10deg] scale-125 border-4 
                 ${result === 'WIN' ? 'bg-primary text-primary-foreground border-background shadow-primary/20' : 
                   result === 'LOSE' ? 'bg-destructive text-destructive-foreground border-background shadow-destructive/20' : 
                   'bg-foreground text-background border-border'}
               `}>
                 {result === "TIE" ? "DRAW!" : result === "WIN" ? "YOU WIN!" : "AI WINS!"}
               </div>
             )}
             {!result && <Activity className="text-muted-foreground/50 animate-pulse" size={32} />}
          </div>

          <div className="flex flex-col items-center justify-center gap-2 w-32">
            <div className="text-5xl animate-bounce-soft animation-delay-500">{aiMove ? emojis[aiMove] : "🤖"}</div>
            <div className="text-xs font-mono font-bold text-muted-foreground uppercase">{aiMove || "Ready"}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="col-span-2 flex justify-center gap-4 mt-2">
          {(["ROCK", "PAPER", "SCISSORS"] as Move[]).map(move => (
            <button key={move} onClick={() => play(move)} className="flex flex-col items-center gap-2 p-4 bg-card border-2 border-border hover:border-primary hover:bg-primary/5 rounded-2xl transition-all shadow-sm group">
              <span className="text-3xl group-hover:scale-125 transition-transform">{emojis[move]}</span>
              <span className="text-xs font-mono font-bold text-foreground">{move}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIPredictorRPS;
