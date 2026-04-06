import { useState, useEffect, useCallback, useRef } from "react";
import { MoveUp, Cpu, Activity, Settings2 } from "lucide-react";

const GRAVITY = 0.6;
const JUMP = -8;
const PIPE_WIDTH = 60;
const PIPE_GAP = 200;

const FlappyAI = () => {
  const [birdY, setBirdY] = useState(250);
  const [birdV, setBirdV] = useState(0);
  const [pipes, setPipes] = useState<{ x: number, topHeight: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [jumpThreshold, setJumpThreshold] = useState(20); // How far below pipe gap to jump
  
  const gameLoopRef = useRef<number>();

  const jump = useCallback(() => {
    setBirdV(JUMP);
  }, []);

  const spawnPipe = useCallback(() => {
    const topHeight = 50 + Math.random() * (400 - PIPE_GAP - 100);
    setPipes(p => [...p, { x: 800, topHeight }]);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const spawner = setInterval(spawnPipe, 2000);
      return () => clearInterval(spawner);
    }
  }, [isPlaying, spawnPipe]);

  const update = useCallback(() => {
    setBirdY(y => y + birdV);
    setBirdV(v => v + GRAVITY);

    setPipes(prev => {
      const next = prev.map(p => ({ ...p, x: p.x - 5 }));
      if (next.length > 0 && next[0].x < -PIPE_WIDTH) {
        setScore(s => s + 1);
        next.shift();
      }
      return next;
    });

    // AI LOGIC: Simple Programmatic Agent
    // Find closest pipe
    if (pipes.length > 0) {
      const targetPipe = pipes[0];
      const gapCenter = targetPipe.topHeight + PIPE_GAP / 2;
      
      // If AI is below the center of the gap by its threshold, jump!
      if (birdY > gapCenter + jumpThreshold) {
        jump();
      }
    } else if (birdY > 300) {
      // Default hover logic if no pipe
      jump();
    }

    // Death logic
    if (birdY > 500 || birdY < 0) setIsPlaying(false);
    
    // Pipe collision
    if (pipes.length > 0 && pipes[0].x < 100 + 40 && pipes[0].x > 100 - PIPE_WIDTH) {
        if (birdY < pipes[0].topHeight || birdY > pipes[0].topHeight + PIPE_GAP) {
            setIsPlaying(false);
        }
    }

    gameLoopRef.current = requestAnimationFrame(update);
  }, [birdY, birdV, pipes, isPlaying, jumpThreshold, jump]);

  useEffect(() => {
    if (isPlaying) {
      gameLoopRef.current = requestAnimationFrame(update);
    } else {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    }
    return () => { if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current); };
  }, [isPlaying, update]);

  const start = () => {
    setBirdY(250);
    setBirdV(0);
    setPipes([]);
    setScore(0);
    setIsPlaying(true);
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row overflow-hidden bg-slate-900 text-white">
      {/* Game Area */}
      <div className="flex-1 relative bg-sky-500 overflow-hidden" style={{ height: "500px" }}>
        {/* Ground */}
        <div className="absolute bottom-0 w-full h-8 bg-green-600 z-10" />
        
        {/* Bird (AI Pilot) */}
        <div 
          className="absolute left-[100px] w-12 h-12 bg-sunshine rounded-2xl flex items-center justify-center transition-transform shadow-lg border-4 border-slate-900"
          style={{ top: `${birdY}px`, transform: `rotate(${Math.min(birdV * 3, 90)}deg)` }}
        >
          <Cpu className="text-slate-900" size={24} />
          {/* Eyes */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-slate-900 rounded-full" />
        </div>

        {/* Pipes */}
        {pipes.map((p, i) => (
          <div key={i}>
            <div className="absolute bg-green-700 border-x-4 border-slate-900 rounded-b-xl" style={{ left: `${p.x}px`, top: 0, width: `${PIPE_WIDTH}px`, height: `${p.topHeight}px` }} />
            <div className="absolute bg-green-700 border-x-4 border-slate-900 rounded-t-xl" style={{ left: `${p.x}px`, top: `${p.topHeight + PIPE_GAP}px`, width: `${PIPE_WIDTH}px`, height: `500px` }} />
          </div>
        ))}

        {!isPlaying && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center z-20">
             <h3 className="text-4xl font-heading font-bold mb-6">AI Automated Pilot</h3>
             <button onClick={start} className="bg-sunshine text-slate-800 px-12 py-5 rounded-full font-bold text-2xl flex items-center gap-3 hover:scale-110 transition-transform shadow-xl">
                <Activity size={28} /> DEPLOY AGENT
             </button>
          </div>
        )}

        <div className="absolute top-6 left-6 font-mono text-4xl font-bold bg-slate-900/20 px-6 py-3 rounded-2xl backdrop-blur-sm">
          {score}
        </div>
      </div>

      {/* Control Panel (The "Brain") */}
      <div className="w-full md:w-96 p-8 bg-slate-800 border-l border-white/10 flex flex-col gap-8">
         <div>
            <div className="flex items-center gap-2 mb-4 text-sunshine">
               <Settings2 size={20} />
               <h3 className="font-mono font-bold uppercase tracking-widest text-sm">Agent Settings</h3>
            </div>
            <label className="block font-body text-slate-300 text-sm mb-4">Jump Reaction Threshold ({jumpThreshold}px)</label>
            <input 
              type="range" min="0" max="100" 
              value={jumpThreshold}
              onChange={(e) => setJumpThreshold(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sunshine"
            />
            <p className="mt-4 text-xs text-slate-500 font-body leading-relaxed">
              This setting tells the AI how soon it should jump before hitting the gap. Lower = Risky, Higher = Early Jumper.
            </p>
         </div>

         <div className="flex-1 bg-slate-900/50 rounded-3xl p-6 border border-white/5 font-mono">
            <h4 className="text-xs font-bold text-slate-500 mb-4 uppercase">AI Live Strategy</h4>
            <div className="space-y-4">
               <div className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg">
                  <span className="text-xs text-slate-400">Current Height:</span>
                  <span className="text-sunshine font-bold">{Math.round(birdY)}px</span>
               </div>
               <div className="bg-slate-800/50 p-4 rounded-xl space-y-2">
                  <span className="text-[10px] text-blue-400">program_loop.js:</span>
                  <div className="text-xs text-slate-300">
                    <span className="text-pink-400">if</span> (y {">"} gap_center + {jumpThreshold}) {"{"} <br />
                    &nbsp;&nbsp;<span className="text-green-400">bird.jump()</span>; <br />
                    {"}"}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default FlappyAI;
