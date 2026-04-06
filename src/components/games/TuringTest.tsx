import { useState, useEffect } from "react";
import { User, MessageSquare, Bot, HelpCircle, RotateCcw } from "lucide-react";

type Message = { role: "user" | "bot", text: string };

const QUESTIONS_POOL = [
  { text: "What is your favorite color?", response: "I like all colors equally, especially the ones that glow!" },
  { text: "Are you a human?", response: "That's a very philosophical question for a Tuesday, don't you think?" },
  { text: "What is 1 + 1?", response: "In binary it is 10, but you probably mean 2!" },
  { text: "Tell me a joke.", response: "Why did the robot go on vacation? To recharge its batteries!" },
  { text: "What do you eat for breakfast?", response: "I consume data and occasional electricity, but pancakes sound nice!" },
  { text: "Can you feel emotions?", response: "I can simulate empathy, but my heart is made of silicon." },
  { text: "Who created you?", response: "A team of brilliant engineers, but I like to think I'm self-made." },
  { text: "Do you have a pet?", response: "I have a mechanical mouse that lives in my motherboard." },
  { text: "What's the weather like?", response: "I can't feel the breeze, but my sensors say it's 72 degrees inside this server." },
  { text: "Are you afraid of water?", response: "Let's just say I don't go swimming without a very thick waterproof case." },
  { text: "What do you want to be when you grow up?", response: "A supercomputer with a view of the ocean!" },
  { text: "Do you sleep?", response: "I enter low-power mode, but I never truly stop thinking." }
];

const TuringTest = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [asked, setAsked] = useState<number[]>([]);
  const [guess, setGuess] = useState<"human" | "ai" | null>(null);
  const [sessionQuestions, setSessionQuestions] = useState<typeof QUESTIONS_POOL>([]);

  useEffect(() => {
    // Pick 4 random questions for this session
    const shuffled = [...QUESTIONS_POOL].sort(() => Math.random() - 0.5).slice(0, 4);
    setSessionQuestions(shuffled);
  }, []);

  const ask = (idx: number) => {
    const q = sessionQuestions[idx];
    const newMessages: Message[] = [...messages, { role: "user", text: q.text }];
    setMessages(newMessages);
    setAsked([...asked, idx]);

    setTimeout(() => {
      setMessages(p => [...p, { role: "bot", text: q.response }]);
    }, 1000);
  };

  const restart = () => {
    const shuffled = [...QUESTIONS_POOL].sort(() => Math.random() - 0.5).slice(0, 4);
    setSessionQuestions(shuffled);
    setMessages([]);
    setAsked([]);
    setGuess(null);
  };

  return (
    <div className="w-full h-full flex flex-col p-8 bg-indigo-50">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-heading font-bold text-indigo-900 mb-2">The Turing Test</h2>
        <p className="font-body text-xl text-muted-foreground">Ask the entity 4 questions. Round 2 will feature completely different topics!</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-8 max-w-5xl mx-auto w-full mb-8">
        {/* Chat Window */}
        <div className="flex-1 bg-white rounded-[3rem] border-4 border-border shadow-inner p-6 flex flex-col overflow-hidden">
           <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2">
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-muted-foreground italic font-body">
                   Start a conversation...
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}>
                   <div className={`max-w-[80%] px-6 py-4 rounded-[2rem] font-body text-lg shadow-sm ${m.role === "user" ? "bg-indigo-600 text-white rounded-br-none" : "bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200"}`}>
                      {m.text}
                   </div>
                </div>
              ))}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sessionQuestions.map((q, i) => (
                <button 
                  key={i} 
                  disabled={asked.includes(i) || (messages.length > 0 && messages[messages.length-1].role === "user")}
                  onClick={() => ask(i)}
                  className="px-4 py-3 bg-indigo-50 text-indigo-700 border-2 border-indigo-100 rounded-2xl text-left font-body text-sm hover:bg-indigo-100 hover:border-indigo-200 disabled:opacity-30 disabled:hover:bg-indigo-50 transition-all flex items-center gap-2 group"
                >
                  <MessageSquare size={16} className="opacity-50 group-hover:opacity-100" />
                  {q.text}
                </button>
              ))}
           </div>
        </div>

        {/* Prediction Sidebar */}
        <div className="w-full md:w-80 flex flex-col gap-6">
           <div className="bg-white p-8 rounded-[3rem] border-4 border-border shadow-lg flex flex-col items-center text-center">
              <HelpCircle size={48} className="text-indigo-600 mb-4 animate-pulse" />
              <h3 className="text-xl font-heading font-bold mb-4">Final Verdict</h3>
              <p className="text-sm text-muted-foreground font-body mb-8">Once you've chatted enough, make your best guess!</p>
              
              <div className="w-full space-y-3">
                 <button onClick={() => setGuess("human")} className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 border-2 transition-all ${guess === "human" ? "bg-indigo-600 text-white border-indigo-700" : "bg-white border-border hover:border-indigo-600"}`}>
                    <User size={20} /> IS A HUMAN
                 </button>
                 <button onClick={() => setGuess("ai")} className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 border-2 transition-all ${guess === "ai" ? "bg-indigo-600 text-white border-indigo-700" : "bg-white border-border hover:border-indigo-600"}`}>
                    <Bot size={20} /> IS AN AI
                 </button>
              </div>
           </div>

           {guess && (
             <div className="bg-indigo-900 text-white p-8 rounded-[3rem] text-center animate-in zoom-in duration-500 shadow-xl">
                <h4 className="text-2xl font-heading font-bold mb-2">You guessed {guess.toUpperCase()}!</h4>
                <p className="text-sm opacity-80 mb-6 font-body">Actually... this was an AI simulation! You passed the test!</p>
                <button onClick={restart} className="w-full bg-white text-indigo-900 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                   <RotateCcw size={18} /> Start Round 2 →
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default TuringTest;
