import { useState } from "react";
import { Smile, Frown, MessageSquareIcon, Send, Sparkles } from "lucide-react";

const happyWords = ["happy", "good", "great", "awesome", "fun", "love", "excited", "best", "yay", "cool", "wonderful", "nice", "bright", "sunny", "laugh"];
const sadWords = ["sad", "bad", "terrible", "awful", "cry", "hate", "mean", "worst", "boo", "rainy", "down", "lonely", "angry", "mad", "upset"];

const CHALLENGES = [
  { target: "happy", prompt: "Can you type a sentence that makes me feel HAPPY?" },
  { target: "sad", prompt: "Think of something that sounds SAD. Can you type it?" },
  { target: "happy", prompt: "Make me feel GOOD without using the word 'Happy'!" }
];

const SentimentGuesser = () => {
  const [input, setInput] = useState("");
  const [sentiment, setSentiment] = useState<"happy" | "sad" | "neutral" | null>(null);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [isChallengeMode, setIsChallengeMode] = useState(false);
  const [challengePassed, setChallengePassed] = useState<boolean | null>(null);

  const analyze = () => {
    const text = input.toLowerCase();
    let score = 0;
    
    happyWords.forEach(w => { if (text.includes(w)) score++; });
    sadWords.forEach(w => { if (text.includes(w)) score--; });

    let result: "happy" | "sad" | "neutral" = "neutral";
    if (score > 0) result = "happy";
    else if (score < 0) result = "sad";
    
    setSentiment(result);

    if (isChallengeMode) {
      if (result === CHALLENGES[challengeIdx].target) {
        setChallengePassed(true);
      } else {
        setChallengePassed(false);
      }
    }
  };

  const nextChallenge = () => {
    setChallengeIdx((challengeIdx + 1) % CHALLENGES.length);
    setChallengePassed(null);
    setInput("");
    setSentiment(null);
  };

  return (
    <div className="w-full h-full flex flex-col p-8 bg-mint/10">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-heading font-bold text-mint-foreground mb-4">Sentiment Analyzer</h2>
        <p className="font-body text-xl text-muted-foreground mb-6">Type a sentence below. The AI will look for keywords to guess how you are feeling!</p>
        
        <button 
          onClick={() => { setIsChallengeMode(!isChallengeMode); setChallengePassed(null); }}
          className={`px-6 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-widest border-2 transition-all ${isChallengeMode ? "bg-mint text-mint-foreground border-mint" : "bg-white text-muted-foreground border-border hover:border-mint"}`}
        >
          {isChallengeMode ? "✨ Challenge Mode Active" : "Play Challenge Mode"}
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full gap-8">
        {isChallengeMode && !challengePassed && (
          <div className="bg-white p-6 rounded-3xl border-4 border-mint/20 shadow-sm text-center mb-4 w-full">
            <span className="text-xs font-mono font-bold text-mint uppercase tracking-widest block mb-1">Challenge Phase {challengeIdx + 1}</span>
            <h3 className="text-2xl font-heading font-bold text-foreground">{CHALLENGES[challengeIdx].prompt}</h3>
          </div>
        )}

        {sentiment && (
          <div className={`p-8 rounded-[3rem] bg-card border-4 flex flex-col items-center gap-4 transition-all animate-bounce ${challengePassed === true ? "border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]" : challengePassed === false ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]" : "border-mint shadow-lg"}`}>
            {sentiment === "happy" && <Smile size={64} className="text-mint" />}
            {sentiment === "sad" && <Frown size={64} className="text-destructive" />}
            {sentiment === "neutral" && <MessageSquareIcon size={64} className="text-primary" />}
            <h3 className="text-3xl font-bold font-mono uppercase tracking-widest text-mint-foreground">
              {sentiment === "neutral" ? "I'm not sure!" : `I guess you are: ${sentiment}!`}
            </h3>
            {challengePassed === true && (
               <div className="flex flex-col items-center gap-2">
                 <span className="text-green-600 font-bold font-mono">✅ CHALLENGE PASSED!</span>
                 <button onClick={nextChallenge} className="text-sm font-bold underline text-mint-foreground">Next Round →</button>
               </div>
            )}
            {challengePassed === false && <span className="text-red-500 font-bold font-mono text-sm leading-tight">❌ THAT'S NOT {CHALLENGES[challengeIdx].target.toUpperCase()} ENOUGH! TRY AGAIN!</span>}
          </div>
        )}

        <div className="w-full flex gap-4">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyze()}
            placeholder="e.g. I had a really fun day playing with my dog!"
            className="flex-1 px-8 py-6 rounded-full border-4 border-border text-xl font-body focus:border-mint focus:outline-none transition-all"
          />
          <button 
            onClick={analyze}
            className="bg-mint text-mint-foreground px-8 rounded-full font-bold text-xl hover:-translate-y-1 transition-all"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SentimentGuesser;
