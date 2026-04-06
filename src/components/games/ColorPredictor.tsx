import { useState, useMemo } from "react";
import { Eye, Check } from "lucide-react";

type TrainingData = {
  bg: string;
  choice: "black" | "white";
};

const ColorPredictor = () => {
  const [history, setHistory] = useState<TrainingData[]>([]);
  const [currentColor, setCurrentColor] = useState("#ff0000");
  const [prediction, setPrediction] = useState<"black" | "white" | null>(null);

  const generateColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
    setCurrentColor(randomColor);
    
    // AI Prediction Logic (Very simple weighted model)
    if (history.length >= 3) {
      // Calculate average brightness of selected 'white' vs 'black'
      const getBrightness = (hex: string) => {
        const rgb = parseInt(hex.slice(1), 16);
        const r = (rgb >> 16) & 0xff, g = (rgb >> 8) & 0xff, b = (rgb >> 0) & 0xff;
        return (r * 0.299 + g * 0.587 + b * 0.114);
      };
      
      const currentBright = getBrightness(randomColor);
      const whiteChoices = history.filter(h => h.choice === "white");
      const blackChoices = history.filter(h => h.choice === "black");
      
      const avgWhite = whiteChoices.length > 0 ? whiteChoices.reduce((acc, curr) => acc + getBrightness(curr.bg), 0) / whiteChoices.length : 128;
      const avgBlack = blackChoices.length > 0 ? blackChoices.reduce((acc, curr) => acc + getBrightness(curr.bg), 0) / blackChoices.length : 128;

      if (Math.abs(currentBright - avgWhite) < Math.abs(currentBright - avgBlack)) {
        setPrediction("white");
      } else {
        setPrediction("black");
      }
    }
  };

  const handleChoice = (choice: "black" | "white") => {
    setHistory([...history, { bg: currentColor, choice }]);
    generateColor();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-50">
      <h2 className="text-4xl font-heading font-bold mb-4">Supervised Color Predictor</h2>
      <p className="font-body text-xl text-muted-foreground mb-8 text-center max-w-xl">
        Train the AI! Pick which text color is easier to read. After a few tries, the AI will guess your preference!
      </p>

      <div className="w-full max-w-2xl flex flex-col items-center gap-8">
        <div 
          className="w-full h-64 rounded-[3rem] shadow-2xl flex items-center justify-center gap-12 transition-colors duration-500 border-8 border-white"
          style={{ backgroundColor: currentColor }}
        >
          <button 
            onClick={() => handleChoice("black")}
            className="text-4xl font-bold font-heading px-8 py-4 bg-white/20 backdrop-blur-md rounded-2xl hover:scale-110 transition-transform text-black"
          >
            Black Text
          </button>
          <button 
             onClick={() => handleChoice("white")}
             className="text-4xl font-bold font-heading px-8 py-4 bg-black/20 backdrop-blur-md rounded-2xl hover:scale-110 transition-transform text-white"
          >
            White Text
          </button>
        </div>

        {prediction && (
          <div className="bg-white p-6 rounded-3xl border-2 border-primary shadow-lg flex items-center gap-4 animate-bounce">
            <Eye className="text-primary" />
            <span className="font-mono font-bold text-xl uppercase tracking-tighter">AI Predicts you will choose: <span className="text-primary underline">{prediction.toUpperCase()}</span></span>
          </div>
        )}

        <div className="w-full border-t border-border pt-6 flex justify-between items-center px-4">
           <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">Training Points Collected: {history.length}</span>
           <button onClick={() => setHistory([])} className="text-sm font-bold text-red-500 hover:underline">Reset AI Knowledge</button>
        </div>
      </div>
    </div>
  );
};

export default ColorPredictor;
