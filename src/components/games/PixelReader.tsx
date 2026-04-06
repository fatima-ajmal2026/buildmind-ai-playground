import { useState } from "react";
import { Camera, RefreshCw, Sparkles } from "lucide-react";

const GRID_SIZE = 5;
const TEMPLATE_X = [0, 4, 6, 8, 12, 16, 18, 20, 24]; // Approx X shape
const TEMPLATE_O = [1, 2, 3, 5, 9, 10, 14, 15, 19, 21, 22, 23]; // Approx O shape

const PixelReader = () => {
  const [pixels, setPixels] = useState<boolean[]>(new Array(GRID_SIZE * GRID_SIZE).fill(false));
  const [guess, setGuess] = useState<string | null>(null);

  const togglePixel = (i: number) => {
    const newPixels = [...pixels];
    newPixels[i] = !newPixels[i];
    setPixels(newPixels);
    setGuess(null);
  };

  const analyze = () => {
    const activeIndices = pixels.map((p, i) => p ? i : -1).filter(i => i !== -1);
    
    const countMatches = (template: number[]) => {
      let matches = 0;
      activeIndices.forEach(idx => { if (template.includes(idx)) matches++; });
      return matches / Math.max(activeIndices.length, template.length);
    };

    const xScore = countMatches(TEMPLATE_X);
    const oScore = countMatches(TEMPLATE_O);

    if (xScore > oScore && xScore > 0.3) setGuess("an 'X'");
    else if (oScore > xScore && oScore > 0.3) setGuess("an 'O'");
    else setGuess("Something confusing...");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-primary/5">
      <h2 className="text-4xl font-heading font-bold text-primary mb-4">Computer Vision Eye</h2>
      <p className="font-body text-xl text-muted-foreground mb-8 text-center max-w-xl">
        Draw a simple letter 'X' or 'O' on the grid. The AI will scan the pixels to see what you made!
      </p>

      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="grid grid-cols-5 gap-2 bg-card p-4 rounded-3xl border-4 border-border shadow-xl">
          {pixels.map((active, i) => (
            <button 
              key={i} 
              onClick={() => togglePixel(i)}
              className={`w-16 h-16 rounded-xl border-2 transition-all ${active ? "bg-primary border-primary shadow-md scale-95" : "bg-background border-border hover:bg-muted"}`}
            />
          ))}
        </div>

        <div className="flex flex-col gap-6 w-full max-w-xs">
          <button 
            onClick={analyze}
            className="w-full bg-primary text-primary-foreground py-6 rounded-3xl font-bold text-2xl flex items-center justify-center gap-3 hover:-translate-y-1 transition-all shadow-lg"
          >
            <Camera size={28} /> ANALYZE
          </button>
          
          <button 
            onClick={() => { setPixels(new Array(25).fill(false)); setGuess(null); }}
            className="w-full bg-muted text-muted-foreground py-4 rounded-3xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-border transition-colors"
          >
            <RefreshCw size={20} /> Clear Grid
          </button>

          {guess && (
            <div className="bg-white p-8 rounded-[2rem] border-4 border-primary/20 shadow-inner flex flex-col items-center text-center animate-in zoom-in slide-in-from-right duration-300">
               <Sparkles className="text-sunshine mb-2" />
               <span className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-1">AI Thinking...</span>
               <h3 className="text-2xl font-bold text-primary">I think you drew {guess}!</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PixelReader;
