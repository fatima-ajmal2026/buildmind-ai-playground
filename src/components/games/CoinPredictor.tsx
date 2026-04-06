import { useState, useCallback } from "react";
import { Circle, Square, FastForward, CheckCircle, XCircle } from "lucide-react";

const CoinPredictor = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [aiGuess, setAiGuess] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<"hit" | "miss" | null>(null);
  const [stats, setStats] = useState({ ai: 0, human: 0 });

  const predict = useCallback((currentHistory: string[]) => {
    if (currentHistory.length < 3) return Math.random() > 0.5 ? "H" : "T";
    
    // Simple Pattern Matching (looks for the last sequence of 2)
    const last2 = currentHistory.slice(-2).join("");
    let hCount = 0;
    let tCount = 0;

    for (let i = 0; i < currentHistory.length - 2; i++) {
      if (currentHistory.slice(i, i + 2).join("") === last2) {
        if (currentHistory[i + 2] === "H") hCount++;
        else tCount++;
      }
    }

    if (hCount > tCount) return "H";
    if (tCount > hCount) return "T";
    return Math.random() > 0.5 ? "H" : "T";
  }, []);

  const handlePick = (pick: string) => {
    if (aiGuess === pick) {
      setLastResult("hit");
      setStats(s => ({ ...s, ai: s.ai + 1 }));
    } else {
      setLastResult("miss");
      setStats(s => ({ ...s, human: s.human + 1 }));
    }

    const nextHistory = [...history, pick];
    setHistory(nextHistory);
    setAiGuess(predict(nextHistory));
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-sunshine/5">
      <h2 className="text-4xl font-heading font-bold text-sunshine-foreground mb-4">Mind Reader Predictor</h2>
      <p className="font-body text-xl text-muted-foreground mb-12 text-center max-w-xl">
        Humans are bad at being random. The AI tracks your clicks and tries to guess your next move!
      </p>

      <div className="flex flex-col md:flex-row items-center gap-16 mb-16">
        <div className="flex flex-col items-center gap-6">
           <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Human Score</span>
           <div className="text-7xl font-mono font-bold text-slate-800">{stats.human}</div>
        </div>

        <div className="relative">
           <div className="w-48 h-48 bg-card rounded-full border-8 border-sunshine flex items-center justify-center shadow-2xl relative">
              {lastResult === "hit" ? (
                <div className="absolute inset-0 flex items-center justify-center bg-green-500/10 rounded-full animate-ping" />
              ) : lastResult === "miss" ? (
                <div className="absolute inset-0 flex items-center justify-center bg-red-500/10 rounded-full animate-pulse" />
              ) : null}
              
              {aiGuess === "H" ? <Circle size={80} className="text-sunshine fill-sunshine/20" /> : aiGuess === "T" ? <Square size={80} className="text-sunshine fill-sunshine/20" /> : <FastForward size={80} className="text-muted-foreground/20" />}
              
              <div className="absolute -bottom-6 bg-white px-4 py-2 rounded-full border-2 border-border shadow-sm font-mono font-bold text-xs uppercase tracking-widest text-sunshine-foreground whitespace-nowrap">
                AI's Next Guess
              </div>
           </div>

           <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
             {lastResult === "hit" && <CheckCircle size={48} className="text-green-500 bg-white rounded-full" />}
             {lastResult === "miss" && <XCircle size={48} className="text-red-500 bg-white rounded-full" />}
           </div>
        </div>

        <div className="flex flex-col items-center gap-6">
           <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">AI Score</span>
           <div className="text-7xl font-mono font-bold text-sunshine-foreground">{stats.ai}</div>
        </div>
      </div>

      <div className="flex gap-6">
         <button 
           onClick={() => handlePick("H")}
           className="bg-card hover:bg-muted border-4 border-slate-800 p-10 rounded-[2.5rem] shadow-xl hover:-translate-y-2 transition-all flex flex-col items-center gap-4 group"
         >
           <Circle size={48} className="text-slate-800" />
           <span className="font-mono font-bold text-xl uppercase tracking-widest text-slate-800">Heads</span>
         </button>
         <button 
           onClick={() => handlePick("T")}
           className="bg-card hover:bg-muted border-4 border-slate-800 p-10 rounded-[2.5rem] shadow-xl hover:-translate-y-2 transition-all flex flex-col items-center gap-4 group"
         >
           <Square size={48} className="text-slate-800" />
           <span className="font-mono font-bold text-xl uppercase tracking-widest text-slate-800">Tails</span>
         </button>
      </div>

      <p className="mt-12 font-mono text-xs text-muted-foreground uppercase tracking-[0.2em]">Data collection points: {history.length}</p>
    </div>
  );
};

export default CoinPredictor;
