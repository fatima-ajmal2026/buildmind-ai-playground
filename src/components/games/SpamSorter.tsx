import { useState, useEffect } from "react";
import { Mail, ShieldAlert, CheckCircle2, RotateCcw } from "lucide-react";

const EMAILS_POOL = [
  { id: 1, text: "Hey it's Mom! Don't forget your lunch on the counter.", isSpam: false },
  { id: 2, text: "YOU WON A MILLION DOLLARS CLICK HERE NOW SECRETS!!!", isSpam: true },
  { id: 3, text: "School Newsletter: Friday is Pajama Day at school.", isSpam: false },
  { id: 4, text: "URGENT ALARM: Your account is locked send passwords ASAP", isSpam: true },
  { id: 5, text: "Hey dude, what time are we playing Minecraft today?", isSpam: false },
  { id: 6, text: "Your Amazon order for 500 laptops has been confirmed. Click here to cancel.", isSpam: true },
  { id: 7, text: "Grandma wants to know if you can come over for cookies on Sunday?", isSpam: false },
  { id: 8, text: "FREE GIFT CARD FOR ROBLOX!! NO SURVEYS!! CLICK FAST!!", isSpam: true },
  { id: 9, text: "Your library book is overdue. Please return it soon!", isSpam: false },
  { id: 10, text: "WARNING: Virus detected on your computer. Download cleaner now.", isSpam: true },
  { id: 11, text: "Piano Practice is moved to 4 PM today. See you there!", isSpam: false },
  { id: 12, text: "CONGRATULATIONS!! You are our 1,000,000th visitor! Claim prize!", isSpam: true },
  { id: 13, text: "Can you send me the notes from Science class? I was out sick.", isSpam: false },
  { id: 14, text: "ACT NOW: Limited time offer for free V-Bucks. Limited stock!", isSpam: true },
  { id: 15, text: "Soccer practice is cancelled because of the rain. Stay dry!", isSpam: false }
];

const SpamSorter = () => {
  const [sessionEmails, setSessionEmails] = useState<typeof EMAILS_POOL>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Shuffle and pick 5 for this round
    const shuffled = [...EMAILS_POOL].sort(() => Math.random() - 0.5).slice(0, 5);
    setSessionEmails(shuffled);
  }, []);

  const nextMail = () => setCurrentIndex(c => c + 1);

  const guess = (pickedSpam: boolean) => {
    if (sessionEmails[currentIndex].isSpam === pickedSpam) {
      setScore(s => s + 1);
    }
    nextMail();
  };

  const restart = () => {
    const shuffled = [...EMAILS_POOL].sort(() => Math.random() - 0.5).slice(0, 5);
    setSessionEmails(shuffled);
    setCurrentIndex(0);
    setScore(0);
  };

  const isDone = currentIndex >= sessionEmails.length && sessionEmails.length > 0;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-sunshine/10">
      <h2 className="text-4xl font-heading font-bold text-sunshine-foreground mb-4">Spam Filter Training</h2>
      <p className="font-body text-xl text-muted-foreground mb-8 max-w-xl text-center">
        Teach the AI by sorting these emails! Round 2 will feature completely different messages.
      </p>

      {!isDone ? (
        <div className="bg-card w-full max-w-lg rounded-[2rem] border-4 border-border p-8 shadow-xl flex flex-col items-center gap-8 animate-in slide-in-from-bottom">
           <Mail size={48} className="text-muted-foreground opacity-50" />
           <p className="font-mono text-2xl text-center leading-relaxed">
             "{sessionEmails[currentIndex]?.text}"
           </p>
           
           <div className="w-full flex gap-4 mt-4">
             <button onClick={() => guess(false)} className="flex-1 py-6 bg-green-100 hover:bg-green-200 text-green-700 font-bold font-mono text-xl rounded-2xl flex flex-col items-center gap-2 transition-transform hover:-translate-y-1">
               <CheckCircle2 size={32} />
               SAFE INBOX
             </button>
             <button onClick={() => guess(true)} className="flex-1 py-6 bg-red-100 hover:bg-red-200 text-red-700 font-bold font-mono text-xl rounded-2xl flex flex-col items-center gap-2 transition-transform hover:-translate-y-1">
               <ShieldAlert size={32} />
               DELETE SPAM
             </button>
           </div>
           
           <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest">Email {currentIndex + 1} of 5</span>
        </div>
      ) : (
        <div className="bg-card w-full max-w-lg rounded-[2rem] border-4 border-sunshine p-12 shadow-xl flex flex-col items-center text-center">
           <h3 className="text-3xl font-heading font-bold text-sunshine-foreground mb-4">Training Phase Complete!</h3>
           <p className="font-mono text-xl mb-8">You correctly sorted {score} out of 5 emails!</p>
           <button onClick={restart} className="bg-sunshine text-sunshine-foreground px-12 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform flex items-center gap-2 shadow-sm">
             <RotateCcw size={20} /> Start Round 2 →
           </button>
        </div>
      )}
    </div>
  );
};

export default SpamSorter;
