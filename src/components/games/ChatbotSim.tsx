import { useState, useRef, useEffect } from "react";
import { Send, Bot } from "lucide-react";

type Message = { id: string; text: string; isBot: boolean };

const getBotResponse = (input: string): string => {
  const text = input.toLowerCase();
  if (text.includes("hello") || text.includes("hi")) return "Hello human! How can I help you today?";
  if (text.includes("how are you")) return "I am running at optimal capacity, operating smoothly!";
  if (text.includes("joke")) return "Why did the robot go on vacation? To recharge its batteries! 🔋";
  if (text.includes("ai") || text.includes("artificial intelligence")) return "AI stands for Artificial Intelligence! We are computer programs designed to learn and help you.";
  if (text.includes("name")) return "I am the Building Minds Bot, your virtual assistant!";
  if (text.includes("bye")) return "Goodbye! Have a great day offline.";
  return "That's interesting! My simple rule-based AI doesn't know how to respond to that yet. Try asking me for a joke!";
};

const ChatbotSim = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hi there! I am a simple rule-based AI bot. Ask me a question, or ask for a joke!", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text: input, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate AI thinking time
    setTimeout(() => {
      const response = getBotResponse(userMsg.text);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: response, isBot: true }]);
    }, 600);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full w-full max-w-md mx-auto bg-card rounded-[2rem] border-border shadow-xl overflow-hidden mt-8 md:mt-0">
      <div className="bg-primary/20 px-6 py-4 flex items-center gap-3 border-b border-primary/20">
        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
          <Bot size={22} />
        </div>
        <div>
          <h3 className="font-heading font-bold text-lg text-primary-foreground">Rule-Bot 9000</h3>
          <div className="flex items-center gap-1.5 text-xs text-primary/70 font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> ONLINE
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-background">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.isBot ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[15px] font-body shadow-sm ${
              m.isBot ? "bg-muted text-foreground rounded-tl-sm" : "bg-primary text-primary-foreground rounded-tr-sm"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-4 bg-card border-t border-border">
        <div className="flex items-center gap-2 relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 bg-background border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-full pl-5 pr-12 py-3 outline-none transition-all shadow-inner"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 transition-all shadow-md"
          >
            <Send size={18} className="translate-x-[1px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotSim;
