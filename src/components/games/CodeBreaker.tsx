import { useState } from "react";
import { Lock, Unlock, ShieldAlert } from "lucide-react";

const COLORS = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];
const CODE_LENGTH = 4;

const CodeBreaker = () => {
  const [secret, setSecret] = useState(() => Array.from({ length: CODE_LENGTH }, () => Math.floor(Math.random() * COLORS.length)));
  const [guess, setGuess] = useState<number[]>([]);
  const [history, setHistory] = useState<{ attempt: number[], result: string[] }[]>([]);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");

  const submitGuess = () => {
    if (guess.length !== CODE_LENGTH) return;

    const result: string[] = [];
    const secretCopy = [...secret];
    const guessCopy = [...guess];

    // Check for correct positions (Green)
    guessCopy.forEach((g, i) => {
      if (g === secretCopy[i]) {
        result.push("green");
        secretCopy[i] = -1;
        guessCopy[i] = -2;
      }
    });

    // Check for wrong positions (Yellow)
    guessCopy.forEach((g, i) => {
      if (g < 0) return;
      const foundIdx = secretCopy.indexOf(g);
      if (foundIdx !== -1) {
        result.push("yellow");
        secretCopy[foundIdx] = -1;
      } else {
        result.push("red");
      }
    });

    const newHistory = [...history, { attempt: guess, result: result.sort() }];
    setHistory(newHistory);
    setGuess([]);

    if (result.filter(r => r === "green").length === CODE_LENGTH) {
      setGameState("won");
    } else if (newHistory.length >= 8) {
      setGameState("lost");
    }
  };

  const restart = () => {
    setSecret(Array.from({ length: CODE_LENGTH }, () => Math.floor(Math.random() * COLORS.length)));
    setHistory([]);
    setGuess([]);
    setGameState("playing");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-900 text-white">
      <h2 className="text-4xl font-heading font-bold text-primary mb-2">Algorithm Code Breaker</h2>
      <p className="font-body text-lg text-slate-400 mb-8 text-center max-w-xl">
        A secret firewall code is hidden! Use logic to break it. 
        <span className="text-green-500 mx-1">Green</span> = Correct. 
        <span className="text-yellow-500 mx-1">Yellow</span> = Wrong spot.
        <span className="text-red-500 mx-1">Red</span> = Wrong altogether.
      </p>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        {/* Progress Board */}
        <div className="flex-1 bg-slate-800 rounded-3xl p-6 border-2 border-slate-700 min-h-[400px]">
           <div className="space-y-3">
             {new Array(8).fill(null).map((_, i) => (
               <div key={i} className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-xl border border-slate-700/50">
                  <span className="text-xs font-mono text-slate-500 w-4">{i + 1}</span>
                  <div className="flex gap-2">
                     {history[i] ? history[i].attempt.map((c, idx) => (
                       <div key={idx} className={`w-8 h-8 rounded-full ${COLORS[c]} border-2 border-white/20`} />
                     )) : new Array(4).fill(null).map((_, idx) => (
                       <div key={idx} className="w-8 h-8 rounded-full bg-slate-700/30 border-2 border-dashed border-slate-600" />
                     ))}
                  </div>
                  <div className="flex-1 flex justify-end gap-1">
                     {history[i]?.result.map((r, idx) => (
                       <div key={idx} className={`w-3 h-3 rounded-full ${r === "green" ? "bg-green-500" : r === "yellow" ? "bg-yellow-500" : "bg-red-500"}`} />
                     ))}
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* Controls */}
        <div className="w-full md:w-80 flex flex-col gap-6">
           <div className="bg-slate-800 p-6 rounded-3xl border-2 border-slate-700">
             <h4 className="text-sm font-mono uppercase tracking-widest text-slate-400 mb-4">Your Guess</h4>
             <div className="flex justify-center gap-3 mb-6">
                {new Array(CODE_LENGTH).fill(null).map((_, i) => (
                  <div key={i} className={`w-12 h-12 rounded-full border-2 border-slate-600 flex items-center justify-center transition-all ${guess[i] !== undefined ? COLORS[guess[i]] : "bg-transparent shadow-inner"}`}>
                    {guess[i] === undefined && <Lock size={16} className="text-slate-700" />}
                  </div>
                ))}
             </div>
             <div className="grid grid-cols-2 gap-3 mb-6">
                {COLORS.map((c, i) => (
                  <button 
                    key={i} 
                    onClick={() => guess.length < CODE_LENGTH && setGuess([...guess, i])}
                    className={`h-12 rounded-2xl ${c} hover:scale-105 transition-transform border-4 border-slate-900 shadow-lg`}
                  />
                ))}
             </div>
             <button 
               onClick={submitGuess}
               disabled={guess.length !== CODE_LENGTH || gameState !== "playing"}
               className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-30 transition-all hover:bg-primary/90"
             >
               <Unlock size={18} /> ATTEMPT BYPASS
             </button>
           </div>

           {gameState !== "playing" && (
             <div className={`p-6 rounded-3xl border-2 animate-in zoom-in slide-in-from-bottom duration-300 ${gameState === "won" ? "bg-green-500/10 border-green-500" : "bg-red-500/10 border-red-500"}`}>
                <div className="flex items-center gap-3 mb-4">
                  {gameState === "won" ? <Unlock className="text-green-500" /> : <ShieldAlert className="text-red-500" />}
                  <h3 className="text-xl font-bold uppercase">{gameState === "won" ? "Firewall Broken!" : "Access Denied!"}</h3>
                </div>
                {gameState === "lost" && (
                  <div className="flex gap-2 mb-4 items-center">
                    <span className="text-xs font-mono text-slate-400">Code was:</span>
                    {secret.map((s, i) => <div key={i} className={`w-4 h-4 rounded-full ${COLORS[s]}`} />)}
                  </div>
                )}
                <button onClick={restart} className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                  Try Again
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default CodeBreaker;
