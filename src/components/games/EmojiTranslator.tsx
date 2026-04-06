import { useState } from "react";
import { Smile, BookOpen, CheckCircle, ArrowRight } from "lucide-react";

const ROUNDS = [
  {
    title: "Animal Kingdom",
    instructions: "Translate these animals into emojis!",
    questions: [
      { word: "Cat", answer: "🐱" },
      { word: "Dog", answer: "🐶" },
      { word: "Mouse", answer: "🐭" }
    ],
    options: ["🐶", "🐱", "🐭", "🦁", "🐼"]
  },
  {
    title: "Fruit Salad",
    instructions: "AI is scanning for healthy food! Match them up.",
    questions: [
      { word: "Apple", answer: "🍎" },
      { word: "Banana", answer: "🍌" },
      { word: "Grapes", answer: "🍇" }
    ],
    options: ["🍇", "🍓", "🍎", "🍌", "🍉"]
  },
  {
    title: "Tech Wizard",
    instructions: "Translate these AI terms into emojis!",
    questions: [
      { word: "Robot", answer: "🤖" },
      { word: "Laptop", answer: "💻" },
      { word: "Brain", answer: "🧠" }
    ],
    options: ["🧠", "🤖", "💻", "💾", "📱"]
  }
];

const EmojiTranslator = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (emoji: string) => {
    if (emoji === ROUNDS[currentRound].questions[currentQuestion].answer) {
      setScore(s => s + 1);
    }
    
    if (currentQuestion < 2) {
      setCurrentQuestion(q => q + 1);
    } else if (currentRound < 2) {
      setCurrentRound(r => r + 1);
      setCurrentQuestion(0);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrentRound(0);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-mint/10 font-body">
      {!showResult ? (
        <div className="max-w-2xl w-full bg-card p-10 rounded-[3rem] border-4 border-mint/30 shadow-xl text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <BookOpen className="text-mint" size={32} />
            <h2 className="text-4xl font-heading font-bold text-mint-foreground">AI Emoji Translator</h2>
          </div>
          
          <div className="mb-8">
            <span className="bg-mint/20 text-mint-foreground px-4 py-1 rounded-full text-sm font-mono font-bold uppercase tracking-widest">
              Round {currentRound + 1}: {ROUNDS[currentRound].title}
            </span>
            <p className="mt-4 text-xl text-muted-foreground">{ROUNDS[currentRound].instructions}</p>
          </div>

          <div className="bg-muted p-12 rounded-[2rem] border-2 border-border mb-10 transform scale-110">
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-2 block">WORD:</span>
            <h3 className="text-5xl font-heading font-black text-foreground">{ROUNDS[currentRound].questions[currentQuestion].word}</h3>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {ROUNDS[currentRound].options.map((emoji) => (
              <button 
                key={emoji}
                onClick={() => handleSelect(emoji)}
                className="text-4xl p-6 bg-background rounded-2xl border-2 border-border hover:border-mint hover:bg-mint/10 transition-all hover:-translate-y-1 shadow-sm active:scale-95"
              >
                {emoji}
              </button>
            ))}
          </div>
          
          <div className="mt-12 flex items-center justify-between px-4">
             <div className="flex items-center gap-2">
                <div className="flex gap-1">
                   {[0,1,2].map(i => (
                     <div key={i} className={`w-3 h-3 rounded-full transition-colors ${i < currentRound ? "bg-mint" : i === currentRound ? "bg-mint/40" : "bg-muted"}`} />
                   ))}
                </div>
                <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-tighter">Phase {currentRound + 1} of 3</span>
             </div>
             <span className="text-sm font-mono font-bold text-mint-foreground">Score: {score}</span>
          </div>
        </div>
      ) : (
        <div className="max-w-md w-full bg-card p-12 rounded-[3rem] border-4 border-mint shadow-2xl text-center animate-in zoom-in duration-500">
           <div className="w-24 h-24 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} className="text-mint" />
           </div>
           <h3 className="text-4xl font-heading font-bold text-foreground mb-4">Training Complete!</h3>
           <p className="text-xl text-muted-foreground mb-8">The AI learned {score} new words thanks to your help!</p>
           <button 
             onClick={restart}
             className="w-full bg-mint text-mint-foreground py-6 rounded-2xl font-bold text-xl hover:scale-105 transition-transform flex items-center justify-center gap-3"
           >
             <ArrowRight size={24} /> Reset Translator
           </button>
        </div>
      )}
    </div>
  );
};

export default EmojiTranslator;
