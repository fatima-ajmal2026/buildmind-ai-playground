import { useState, useEffect, useCallback, useRef } from "react";
import { Bug, ShieldCheck, Timer, Zap } from "lucide-react";

const WhackABug = () => {
  const [bugs, setBugs] = useState<{ id: number, x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [round, setRound] = useState(1);
  
  // Calculate difficulty multipliers
  const spawnRate = Math.max(800 - (score * 15), 400); // Faster as score increases
  const bugLifetime = Math.max(1500 - (score * 20), 800); // Shorter lifetime

  const spawnBug = useCallback(() => {
    const id = Math.random();
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    setBugs(prev => [...prev, { id, x, y }]);
    
    setTimeout(() => {
      setBugs(prev => prev.filter(b => b.id !== id));
    }, bugLifetime);
  }, [bugLifetime]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let spawner: NodeJS.Timeout;

    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      spawner = setInterval(spawnBug, spawnRate);
    }

    return () => {
      clearInterval(timer);
      clearInterval(spawner);
    };
  }, [gameStarted, timeLeft, spawnBug, spawnRate]);

  const whack = (id: number) => {
    setScore(s => s + 1);
    setBugs(prev => prev.filter(b => b.id !== id));
    
    // Every 10 points is a new "Round" 
    if (score > 0 && (score + 1) % 10 === 0) {
       setRound(r => r + 1);
    }
  };

  const restart = () => {
    setScore(0);
    setTimeLeft(30);
    setBugs([]);
    setGameStarted(false);
    setRound(1);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-coral/5 relative overflow-hidden">
      <div className="absolute top-8 left-8 flex items-center gap-2 bg-white px-6 py-3 rounded-2xl border-2 border-border shadow-sm">
         <Timer className="text-primary" />
         <span className="font-mono font-bold text-2xl">{timeLeft}s</span>
      </div>
      <div className="absolute top-8 right-8 flex items-center gap-6 bg-white px-6 py-3 rounded-2xl border-2 border-border shadow-sm">
         <div className="flex flex-col">
            <span className="font-mono text-muted-foreground uppercase text-[10px] tracking-widest">Difficulty</span>
            <span className="font-mono font-bold text-lg text-coral leading-none flex items-center gap-1">
               <Zap size={14} className="fill-coral" /> Stage {round}
            </span>
         </div>
         <div className="flex flex-col ml-4">
            <span className="font-mono text-muted-foreground uppercase text-[10px] tracking-widest">Clean Data</span>
            <span className="font-mono font-bold text-2xl text-slate-800 leading-none">{score}</span>
         </div>
      </div>

      <div className="text-center mb-8 max-w-xl">
        <h2 className="text-4xl font-heading font-bold text-coral mb-4">Training Data Cleaner</h2>
        <p className="font-body text-xl text-muted-foreground">
          AI bugs are evolving! Every 10 points, the data corrupts FASTER. Keep the training set clean!
        </p>
      </div>

      <div className="flex-1 w-full max-w-4xl bg-card border-4 border-border rounded-[3rem] relative shadow-inner overflow-hidden cursor-crosshair">
        {!gameStarted ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
            <button 
              onClick={() => setGameStarted(true)}
              className="bg-coral text-white px-12 py-6 rounded-full font-bold text-2xl hover:scale-110 transition-transform shadow-xl flex items-center gap-4"
            >
              <Bug size={32} /> DEPLOY CLEANER
            </button>
          </div>
        ) : timeLeft === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/95 z-20 animate-in fade-in duration-500">
             <ShieldCheck size={120} className="text-primary mb-6" />
             <h3 className="text-5xl font-heading font-bold mb-2">Dataset Verified!</h3>
             <p className="text-2xl font-mono mb-8 opacity-70">Successfully stabilized {score} data points.</p>
             <button 
               onClick={restart}
               className="bg-coral text-white px-12 py-5 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-lg"
             >
               Start Round 2
             </button>
          </div>
        ) : (
          bugs.map(bug => (
            <button
              key={bug.id}
              onClick={() => whack(bug.id)}
              className="absolute w-20 h-20 bg-coral/20 rounded-full flex items-center justify-center hover:scale-125 hover:bg-coral/40 transition-all animate-bounce"
              style={{ left: `${bug.x}%`, top: `${bug.y}%` }}
            >
              <Bug className="text-coral" size={40} />
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default WhackABug;
