import { useState, useEffect } from "react";
import { Brain, Zap, CheckCircle2, RotateCcw, Monitor, Cpu } from "lucide-react";

const ICONS_ROUND_1 = ["🐱", "🐶", "🐭", "🦁", "🐼", "🐸"];
const ICONS_ROUND_2 = ["💻", "🧠", "🤖", "💾", "📱", "🛰️", "🎮", "🔋"];

const NeuralMemory = () => {
  const [round, setRound] = useState(1);
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const initRound = (r: number) => {
    const icons = r === 1 ? ICONS_ROUND_1 : ICONS_ROUND_2;
    const newCards = [...icons, ...icons].sort(() => Math.random() - 0.5);
    setCards(newCards);
    setSolved([]);
    setFlipped([]);
    setMoves(0);
  };

  useEffect(() => {
    initRound(1);
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      const [id1, id2] = flipped;
      if (cards[id1] === cards[id2]) {
        setSolved([...solved, id1, id2]);
        setFlipped([]);
      } else {
        const timer = setTimeout(() => setFlipped([]), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [flipped, cards, solved]);

  const handleFlip = (index: number) => {
    if (flipped.length < 2 && !flipped.includes(index) && !solved.includes(index)) {
      setFlipped([...flipped, index]);
      setMoves(moves + 1);
    }
  };

  const isDone = solved.length === cards.length && cards.length > 0;

  const nextRound = () => {
    if (round === 1) {
      setRound(2);
      initRound(2);
    } else {
      setRound(1);
      initRound(1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-primary/5">
      <h2 className="text-4xl font-heading font-bold text-primary mb-4">Neural Memory Match</h2>
      <p className="font-body text-xl text-muted-foreground mb-8 text-center max-w-xl">
        Round {round}: Match the data pairs! {round === 1 ? "Start simple." : "Complexity increased!"}
      </p>

      {!isDone ? (
        <div className={`grid gap-4 w-full max-w-2xl ${round === 1 ? "grid-cols-4" : "grid-cols-4"}`}>
          {cards.map((symbol, i) => {
            const isFlipped = flipped.includes(i) || solved.includes(i);
            return (
              <div 
                key={i} 
                onClick={() => handleFlip(i)}
                className={`aspect-square rounded-2xl border-4 border-border flex items-center justify-center text-4xl font-bold cursor-pointer transition-all duration-300 transform
                  ${isFlipped ? "bg-white rotate-y-180 border-primary shadow-lg" : "bg-primary/20 hover:bg-primary/30"}
                `}
              >
                {isFlipped ? symbol : (
                  round === 1 ? <Brain size={40} className="text-primary/40" /> : <Cpu size={40} className="text-primary/40" />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center animate-in fade-in zoom-in duration-500 bg-white p-12 rounded-[3rem] border-4 border-primary shadow-2xl">
           <Zap size={80} className="text-sunshine mx-auto mb-6 animate-pulse" />
           <h3 className="text-4xl font-heading font-bold text-primary mb-2">Round {round} Complete!</h3>
           <p className="text-xl font-mono mb-8 opacity-80">Network stabilized in {Math.floor(moves/2)} steps.</p>
           <button 
             onClick={nextRound} 
             className="bg-primary text-primary-foreground px-12 py-5 rounded-full font-bold text-2xl hover:scale-105 transition-transform flex items-center gap-3 shadow-lg"
           >
             <RotateCcw size={24} /> {round === 1 ? "Start Round 2 →" : "Play Round 1 Again"}
           </button>
        </div>
      )}
      
      <div className="mt-12 flex gap-4">
         <div className={`px-4 py-2 rounded-full border-2 font-mono text-xs font-bold ${round === 1 ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>PHASE 1: BIOLOGICAL</div>
         <div className={`px-4 py-2 rounded-full border-2 font-mono text-xs font-bold ${round === 2 ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}>PHASE 2: SYNTHETIC</div>
      </div>
    </div>
  );
};

export default NeuralMemory;
