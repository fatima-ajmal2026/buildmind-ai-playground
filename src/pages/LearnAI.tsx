import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Brain, Sparkles, AlertCircle, TrendingUp, Search, Network, Bot, ShieldCheck, CheckCircle2, ChevronRight, Eye, MessageSquareText, FileCode2, Layers, Gamepad2, Mic, CloudLightning, UserCheck, Puzzle, Keyboard, Rocket, Stethoscope, Music, Car, Film, Cpu, Trophy, ScanFace, Lock, Telescope } from "lucide-react";

// Interactive Flip Card Component
const FunFactCard = ({ fact }: { fact: string }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div 
      onClick={() => setRevealed(true)} 
      className={`w-full p-6 rounded-[2rem] border-4 cursor-pointer transition-all duration-300 transform ${
         revealed 
           ? "bg-primary/10 border-primary shadow-inner scale-100" 
           : "bg-card border-border border-dashed hover:scale-[1.02] hover:bg-muted shadow-sm"
      }`}
    >
      {revealed ? (
        <div className="animate-fade-in flex flex-col items-center text-center gap-2">
          <span className="text-3xl">🤯</span>
          <p className="font-body font-bold text-lg text-foreground">{fact}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center gap-2 opacity-70 hover:opacity-100">
          <span className="text-3xl">❔</span>
          <p className="font-heading font-bold text-xl uppercase tracking-widest text-muted-foreground">Did You Know?</p>
          <span className="text-xs font-mono font-bold bg-primary/20 text-primary px-3 py-1 rounded-full mt-2">TAP TO REVEAL</span>
        </div>
      )}
    </div>
  );
};

// Module Data Definition
type Module = {
  id: string;
  title: string;
  icon: JSX.Element;
  color: string;
  description: string[];
  emojiFormula: { left: string, operator: string, right: string, result: string };
  funFact: string;
};

const modules: Module[] = [
  {
    id: "basics",
    title: "What is AI?",
    icon: <Brain size={24} />,
    color: "bg-primary/20 text-primary border-primary",
    description: [
      "AI stands for Artificial Intelligence. It's when computers learn how to do things that usually require a human brain!",
      "Instead of just following a strict list of rules, AI can actually figure out patterns to solve puzzles it hasn't seen before.",
      "It helps you find shows you like on Netflix, translates languages, and even powers self-driving cars."
    ],
    emojiFormula: { left: "💻 Computer", operator: "+", right: "🧠 Brain Power", result: "🤖 Artificial Intelligence" },
    funFact: "The very first Artificial Intelligence program was written way back in 1951, before most computers even had screens!"
  },
  {
    id: "ml",
    title: "Machine Learning",
    icon: <TrendingUp size={24} />,
    color: "bg-secondary/20 text-secondary border-secondary",
    description: [
      "Machine Learning (ML) is how we teach an AI. Instead of typing out rules, we just show it millions of examples.",
      "If you show an ML program a million pictures of cats, it will eventually learn what a cat looks like all by itself!",
      "It learns from mistakes. Every time it gets something wrong, it tweaks its invisible math so it gets it right next time."
    ],
    emojiFormula: { left: "📸 Million Examples", operator: "+", right: "❌ Making Mistakes", result: "📈 Machine Learning" },
    funFact: "Netflix uses Machine Learning to look at what you've watched, and guess with high accuracy what you'll want to watch next!"
  },
  {
    id: "neural",
    title: "Neural Networks",
    icon: <Network size={24} />,
    color: "bg-mint/20 text-mint-foreground border-mint",
    description: [
      "Neural Networks are specifically designed to copy how your real, biological brain works!",
      "Your brain has billions of tiny 'neurons' connected by webs. Neural Networks copy this web inside a computer.",
      "Information gets passed through layers of these fake neurons, getting processed tighter and tighter until the computer finds the answer."
    ],
    emojiFormula: { left: "🕸️ Math Web", operator: "x", right: "🧠 Fake Neurons", result: "🔮 Smart Network" },
    funFact: "A human brain has 86 Billion neurons. The biggest Artificial Neural Networks are starting to have over a Trillion connections!"
  },
  {
    id: "genai",
    title: "Generative AI",
    icon: <Sparkles size={24} />,
    color: "bg-sunshine/20 text-sunshine-foreground border-sunshine",
    description: [
      "Generative AI is a magical form of AI that doesn't just sort data—it CREATES completely new things!",
      "It powers Chatbots (like ChatGPT) that generate new stories, and Art AIs that draw brand new paintings.",
      "It works by learning the deep patterns of how humans write and draw, and then generating its own fresh versions."
    ],
    emojiFormula: { left: "📖 Reading Everything", operator: "+", right: "🎨 Creativity", result: "✨ New Art & Text" },
    funFact: "Generative AI doesn't 'copy and paste' past pictures. It generates brand new artwork pixel-by-pixel out of pure static noise!"
  },
  {
    id: "robot",
    title: "Robotics",
    icon: <Bot size={24} />,
    color: "bg-coral/20 text-coral-foreground border-coral",
    description: [
      "Robotics is when we put Artificial Intelligence inside a mechanical body that can walk around the real world.",
      "The AI acts as the invisible brain, while sensors (like cameras) act as eyes, telling the metal body what to do.",
      "Smart robots are going to explore Mars, help doctors in hospitals, and even deliver pizzas!"
    ],
    emojiFormula: { left: "🧠 AI Brain", operator: "+", right: "🦾 Metal Body", result: "🤖 Smart Robot" },
    funFact: "The word 'Robot' is over 100 years old! It comes from a 1920 Czech play about artificial workers."
  },
  {
    id: "ethics",
    title: "AI Safety & Ethics",
    icon: <ShieldCheck size={24} />,
    color: "bg-lavender/20 text-lavender-foreground border-lavender",
    description: [
      "With super-smart computers, we have to make sure they are used fairly, safely, and kindly. This is called AI Ethics.",
      "We have to make sure AI doesn't accidentally learn our bad habits (biases) when we show it examples.",
      "We always want humans to remain in control, ensuring AI remains a helpful tool and not something that hurts anyone."
    ],
    emojiFormula: { left: "🛡️ Safety Rules", operator: "+", right: "🤝 Human Kindness", result: "⚖️ Good AI" },
    funFact: "Companies employ thousands of 'Red Teamers' whose entire job is to playfully try to break AI rules so they can make the AI safer!"
  },
  {
    id: "vision",
    title: "Computer Vision",
    icon: <Eye size={24} />,
    color: "bg-primary/20 text-primary border-primary",
    description: [
      "Computer Vision is how Artificial Intelligence learns to 'see' the world using cameras instead of eyes.",
      "It works by breaking every picture down into millions of tiny squares called pixels, and looking for shapes and lines.",
      "This is exactly how Snapchat knows where to put your funny face filters, and how self-driving cars avoid stop signs!"
    ],
    emojiFormula: { left: "📷 Camera", operator: "+", right: "📐 Pixel Math", result: "👁️ Computer Vision" },
    funFact: "When an AI looks at a picture of an apple, it doesn't see a fruit. It sees a massive grid of thousands of numbers representing colors!"
  },
  {
    id: "nlp",
    title: "Understanding Words (NLP)",
    icon: <MessageSquareText size={24} />,
    color: "bg-secondary/20 text-secondary border-secondary",
    description: [
      "Natural Language Processing (or NLP) is a fancy term for computers learning how to read, write, and understand human languages.",
      "Computers don't naturally understand English. They turn our words into secret number codes called 'tokens'.",
      "By looking at billions of sentences online, the AI learns which words usually belong next to each other!"
    ],
    emojiFormula: { left: "📚 Books", operator: "+", right: "🔢 Number Codes", result: "💬 Talking AI" },
    funFact: "To an AI, the word 'Apple' might be translated into the number '3491'. It does math on those numbers to talk to you!"
  },
  {
    id: "algorithms",
    title: "Data & Algorithms",
    icon: <FileCode2 size={24} />,
    color: "bg-mint/20 text-mint-foreground border-mint",
    description: [
      "An algorithm is just a step-by-step recipe that tells the computer exactly what to do.",
      "Just like baking a cake uses flour and sugar as ingredients, an AI algorithm uses 'Data' (like pictures or text) as its ingredients.",
      "If you give an AI bad or messy data, the algorithm will bake a messy, broken AI!"
    ],
    emojiFormula: { left: "📊 Data", operator: "+", right: "📜 Algorithm", result: "🥧 AI Recipe" },
    funFact: "The word 'Algorithm' was named after a brilliant 9th-century mathematician named Al-Khwarizmi!"
  },
  {
    id: "deeplearning",
    title: "Deep Learning",
    icon: <Layers size={24} />,
    color: "bg-sunshine/20 text-sunshine-foreground border-sunshine",
    description: [
      "Deep Learning is a super-powered version of Machine Learning that uses massive Neural Networks.",
      "Instead of a simple web, Deep Learning uses many, many 'deep' layers of fake neurons stacked on top of each other.",
      "It takes supercomputers to run it, but it's the magical technology behind exactly how ChatGPT works!"
    ],
    emojiFormula: { left: "🥞 Many Layers", operator: "+", right: "🖥️ Supercomputers", result: "🌌 Deep Learning" },
    funFact: "Deep Learning networks are so complex that sometimes even the scientists who build them don't know exactly how the math reached its answer!"
  },
  {
    id: "games",
    title: "AI in Video Games",
    icon: <Gamepad2 size={24} />,
    color: "bg-coral/20 text-coral-foreground border-coral",
    description: [
      "When you play a video game, the bad guys and friendly villagers don't have a real brain—they are controlled by AI!",
      "Game AI uses a hidden 'NavMesh' (like an invisible floor plan) to figure out how to walk around walls and find players.",
      "Modern games are starting to use real ML algorithms to make enemies that learn your hiding spots!"
    ],
    emojiFormula: { left: "🎮 Joypad", operator: "+", right: "🗺️ Hidden Maps", result: "👾 Smart Enemies" },
    funFact: "The ghosts in Pac-Man (made in 1980) use a very early, very simple form of AI. Each colored ghost has its own unique hunting personality!"
  },
  {
    id: "assistants",
    title: "Smart Assistants",
    icon: <Mic size={24} />,
    color: "bg-lavender/20 text-lavender-foreground border-lavender",
    description: [
      "Smart Assistants like Siri, Alexa, and Google Assistant live inside phones and speakers.",
      "They use a special AI called 'Speech Recognition' to turn the sound waves from your voice into typed text.",
      "Then, they use NLP to understand the text, find the answer, and use another AI to generate a human-sounding voice to reply!"
    ],
    emojiFormula: { left: "🗣️ Your Voice", operator: "→", right: "🤖 Brain", result: "🔊 Voice Reply" },
    funFact: "The voice of Siri was originally a real person named Susan Bennett, who recorded thousands of random phrases for an entire month in 2005!"
  },
  {
    id: "predictive",
    title: "Predictive AI",
    icon: <CloudLightning size={24} />,
    color: "bg-primary/20 text-primary border-primary",
    description: [
      "Predictive AI doesn't talk or draw—it acts like a fortune teller that guesses what will happen in the future!",
      "It looks at a huge amount of past data. If it notices that it always rains when the clouds are a certain shape, it predicts rain today.",
      "Hospitals use it to predict when people might get sick, and stores use it to guess what toys will be popular next month."
    ],
    emojiFormula: { left: "⏪ The Past", operator: "+", right: "🔍 Finding Patterns", result: "⏩ The Future" },
    funFact: "Farmers use Predictive AI attached to tractors to guess exactly which day they should plant seeds to get the biggest squashes!"
  },
  {
    id: "turing",
    title: "The Turing Test",
    icon: <UserCheck size={24} />,
    color: "bg-secondary/20 text-secondary border-secondary",
    description: [
      "The Turing Test is a famous game invented to figure out if a computer is truly intelligent.",
      "A human talks to a hidden computer and a hidden person through written messages. If the human can't tell which one is the robot, the robot passes!",
      "For decades, no computer could pass the Turing Test. Today, AI chatbots are so good that they easily trick people!"
    ],
    emojiFormula: { left: "👩 Person", operator: "vs", right: "🤖 Robot", result: "❓ Who is who?" },
    funFact: "Alan Turing, the brilliant man who invented the test in 1950, is widely considered the father of modern computer science."
  },
  {
    id: "patterns",
    title: "Pattern Recognition",
    icon: <Puzzle size={24} />,
    color: "bg-mint/20 text-mint-foreground border-mint",
    description: [
      "Pattern Recognition is the most important super-power of any Artificial Intelligence.",
      "Unlike humans who get bored looking at spreadsheets, an AI can process billions of numbers in a second to find hidden trends.",
      "It can find patterns to identify spam emails, discover new medicines, or even recognize the sound of broken machinery."
    ],
    emojiFormula: { left: "🧩 Scattered Pieces", operator: "+", right: "🔍 AI Vision", result: "🖼️ Finished Puzzle" },
    funFact: "Humans have 'Pareidolia'—we see faces in clouds or burnt toast. That's our brain's organic pattern recognition working exactly like an AI!"
  },
  {
    id: "coding",
    title: "Coding for AI",
    icon: <Keyboard size={24} />,
    color: "bg-sunshine/20 text-sunshine-foreground border-sunshine",
    description: [
      "To build an AI, humans have to write the code. The most popular language for building AI is called Python.",
      "Python is fun and surprisingly easy to read. It lets scientists use pre-built 'libraries' so they don't have to build the complex math from scratch.",
      "Even though AIs are getting smarter, we still need brilliant human programmers to start the code and control the servers!"
    ],
    emojiFormula: { left: "🐍 Python Code", operator: "+", right: "🧑‍💻 Human Brain", result: "🚀 Working AI" },
    funFact: "Modern AIs like ChatGPT have actually learned how to write their own Python code, helping human programmers code twice as fast!"
  },
  {
    id: "space",
    title: "AI in Space",
    icon: <Rocket size={24} />,
    color: "bg-coral/20 text-coral-foreground border-coral",
    description: [
      "Space is so far away that it takes too long for human signals to reach a spaceship. So, we send AI!",
      "The Mars Rovers use AI to safely drive themselves over rocks without waiting for human help from Earth.",
      "AI is also used by astronomers to discover brand new planets and stars hidden inside massive telescope pictures."
    ],
    emojiFormula: { left: "🚀 Spaceships", operator: "+", right: "🤖 Robot Brain", result: "🪐 Space Explorer" },
    funFact: "The NASA Perseverance rover has a special computer chip called the 'Vision Compute Element' just to think like a human driver!"
  },
  {
    id: "medicine",
    title: "AI in Medicine",
    icon: <Stethoscope size={24} />,
    color: "bg-lavender/20 text-lavender-foreground border-lavender",
    description: [
      "AI is becoming an incredible assistant for doctors, helping save thousands of lives.",
      "A computer can examine X-ray pictures of bones incredibly fast and spot tiny fractures that a human doctor might miss.",
      "Scientists also use AI to discover brand new medicines by simulating how chemicals mix together in seconds!"
    ],
    emojiFormula: { left: "🏥 Doctors", operator: "+", right: "🔍 Super Scanner", result: "💊 New Medicines" },
    funFact: "During COVID-19, scientists used an AI program to speed up the discovery of cures by months and months!"
  },
  {
    id: "music",
    title: "AI Music",
    icon: <Music size={24} />,
    color: "bg-sunshine/20 text-sunshine-foreground border-sunshine",
    description: [
      "AI isn't just for math—it can be incredibly musical! AI programs can now write, sing, and play their own songs.",
      "By listening to millions of human songs, the AI learns what rhythm, bass, and melody sound like.",
      "You can type 'Make a jazz song about a flying dog' and the AI will generate an entirely new, fully sung track!"
    ],
    emojiFormula: { left: "🎹 Instruments", operator: "+", right: "🎧 Millions of Songs", result: "🎵 AI Musician" },
    funFact: "An AI once composed the '10th Symphony' of Beethoven by analyzing his past music and guessing how he would have finished it!"
  },
  {
    id: "cars",
    title: "Self-Driving Cars",
    icon: <Car size={24} />,
    color: "bg-primary/20 text-primary border-primary",
    description: [
      "Imagine sitting in a car without holding the steering wheel. That's a self-driving car powered by AI!",
      "These cars are covered in special lasers called 'LiDAR' that constantly scan the road for people, bikes, and stop signs.",
      "The AI has to make split-second decisions to steer, brake, and accelerate completely on its own."
    ],
    emojiFormula: { left: "🚗 Car", operator: "+", right: "⚡ Laser Eyes", result: "🤖 Robot Driver" },
    funFact: "Waymo, a famous self-driving car company, operates entirely driverless taxis that anyone can order right now from an app!"
  },
  {
    id: "film",
    title: "AI in Movies",
    icon: <Film size={24} />,
    color: "bg-mint/20 text-mint-foreground border-mint",
    description: [
      "All of those amazing explosions and CGI monsters in movies? They are largely powered by Artificial Intelligence!",
      "Animators use AI to automatically render the movement of hair blowing in the wind or water splashing.",
      "In some old movies, AI is used to take a blurry black-and-white video and totally restore it to colorful 4K HD!"
    ],
    emojiFormula: { left: "🎥 Cameras", operator: "+", right: "🎨 CGI Magic", result: "🍿 Blockbuster Movies" },
    funFact: "In the movie Avatar, AI was used to accurately track the actors' face muscles and perfectly map them onto the giant blue aliens."
  },
  {
    id: "supercomputers",
    title: "Supercomputers",
    icon: <Cpu size={24} />,
    color: "bg-secondary/20 text-secondary border-secondary",
    description: [
      "To run massive AIs like ChatGPT, you can't use a normal laptop. You need giant buildings filled with Supercomputers!",
      "Supercomputers consist of tens of thousands of powerful graphics cards (GPUs) linked together with cables.",
      "They run incredibly hot, so companies have to build giant water-cooling pipes to stop them from melting!"
    ],
    emojiFormula: { left: "💻 Laptop", operator: "x", right: "🔥 10,000", result: "🏢 Supercomputer" },
    funFact: "The 'Frontier' supercomputer is so incredibly fast it can do over a quintillion math calculations per single second!"
  },
  {
    id: "reinforcement",
    title: "Reinforcement Learning",
    icon: <Trophy size={24} />,
    color: "bg-sunshine/20 text-sunshine-foreground border-sunshine",
    description: [
      "Reinforcement Learning is how we train AI by treating it like a video game—giving it points for being good!",
      "If we want to teach an AI to play Super Mario, we give it a point every time it moves right, and minus a point if it hits a Goomba.",
      "After playing millions of times through trial and error, the AI figures out the perfect path to win the level."
    ],
    emojiFormula: { left: "🕹️ Trial and Error", operator: "+", right: "⭐ Getting Points", result: "🏆 Winning AI" },
    funFact: "An AI named 'AlphaGo' used Reinforcement Learning to become so unbelievably good at a board game that it defeated the world champion!"
  },
  {
    id: "facial",
    title: "Facial Recognition",
    icon: <ScanFace size={24} />,
    color: "bg-coral/20 text-coral-foreground border-coral",
    description: [
      "Facial Recognition is an AI tool that can measure the exact distance between your eyes, nose, and mouth to recognize you.",
      "It uses an invisible grid of math on your face. This is how you can unlock your smartphone just by looking at it!",
      "It's very useful, but we have to be careful with it to protect people's absolute right to privacy."
    ],
    emojiFormula: { left: "👤 Your Face", operator: "+", right: "📐 Invisible Grid", result: "🔓 Phone Unlocked" },
    funFact: "A smartphone shoots 30,000 invisible infrared dots onto your face to build a 3D AI map of your nose and cheekbones!"
  },
  {
    id: "privacy",
    title: "Data Privacy",
    icon: <Lock size={24} />,
    color: "bg-lavender/20 text-lavender-foreground border-lavender",
    description: [
      "Because AI learns from data, protecting our 'Data Privacy' is one of the most important rules in technology.",
      "When we talk to AIs, we shouldn't share our real names, addresses, or secret passwords, because the AI remembers!",
      "Companies must use encryption (secret computer codes) so hackers can never steal the data the AIs use."
    ],
    emojiFormula: { left: "🤐 Secret Data", operator: "+", right: "🔐 Encryption codes", result: "🛡️ Safe Users" },
    funFact: "To keep things extra private, engineers use 'Federated Learning', where an AI learns from your phone without ever saving your data to the cloud!"
  },
  {
    id: "future",
    title: "The Future of AI",
    icon: <Telescope size={24} />,
    color: "bg-primary/20 text-primary border-primary",
    description: [
      "The future of AI is incredibly exciting! Right now we have 'Narrow AI'—software that is very good at just one specific job.",
      "Scientists are trying to build AGI (Artificial General Intelligence), which would be an AI that is as smart as a human at everything.",
      "With humans in charge calling the shots, the future of AI will make the world cleaner, healthier, and full of cool robots!"
    ],
    emojiFormula: { left: "⏱️ Future Time", operator: "x", right: "🧠 Smart Scientists", result: "🌍 Better World" },
    funFact: "Some scientists predict that within the next twenty years, almost every home will have a walking, talking robotic helper!"
  }
];

const LearnAI = () => {
  const [activeModuleId, setActiveModuleId] = useState<string>(modules[0].id);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [finishedModule, setFinishedModule] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeModule = modules.find(m => m.id === activeModuleId)!;

  // Complete a module when the finish button is pressed
  const handleFinishModule = () => {
    if (!completedModules.includes(activeModuleId)) {
      setCompletedModules(prev => [...prev, activeModuleId]);
    }
    setFinishedModule(true);
    
    const currentIndex = modules.findIndex(m => m.id === activeModuleId);
    
    // After a brief celebratory animation, switch to the next module and scroll up!
    setTimeout(() => {
      setFinishedModule(false);
      if (currentIndex < modules.length - 1) {
        setActiveModuleId(modules[currentIndex + 1].id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 600);
  };

  const progressPercentage = Math.round((completedModules.length / modules.length) * 100);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        
        {/* Header & Progress */}
        <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-black font-mono font-bold tracking-widest text-sm uppercase flex items-center gap-2">
              <AlertCircle size={16} /> Knowledge Base
            </span>
            <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tight mb-2">Interactive Learning Hub</h1>
            <p className="text-lg text-black font-body max-w-xl">
              Select a module from the control panel to start learning! Earning checkmarks saves your progress.
            </p>
          </div>
          
          <div className="bg-card border border-border p-5 rounded-3xl w-full md:w-64 flex flex-col gap-3 shadow-sm shrink-0">
             <div className="flex justify-between items-center text-sm font-mono font-bold">
               <span className="text-muted-foreground uppercase">Progress</span>
               <span className="text-primary">{progressPercentage}%</span>
             </div>
             <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
               <div 
                 className="h-full bg-primary transition-all duration-1000 ease-out" 
                 style={{ width: `${progressPercentage}%` }}
               ></div>
             </div>
          </div>
        </div>

        {/* Dashboard Split View */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 flex flex-col gap-3">
             <h3 className="font-heading font-bold text-xl mb-2 px-2 text-foreground">Select a Module</h3>
             
             {/* Search Input */}
             <div className="relative mb-2">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
               <input 
                 type="text" 
                 placeholder="Search topics..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-card border-2 border-border rounded-2xl py-3 pl-10 pr-4 text-sm font-mono focus:outline-none focus:border-primary transition-colors shadow-sm"
               />
             </div>

             {modules.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
               <div className="text-center p-6 text-muted-foreground font-mono text-sm border-2 border-dashed border-border rounded-2xl">
                 No matching topics found.
               </div>
             )}

             {modules.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).map((m) => {
               const isActive = activeModuleId === m.id;
               const isCompleted = completedModules.includes(m.id);

               return (
                 <button
                   key={m.id}
                   onClick={() => {
                     setActiveModuleId(m.id);
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                   }}
                   className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border-2 text-left group ${
                     isActive 
                       ? `bg-card border-foreground shadow-[4px_4px_0px_#000000]` 
                       : `bg-card border-border hover:border-foreground/30 hover:-translate-y-0.5`
                   }`}
                 >
                    <div className="flex items-center gap-4 border-none">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? m.color : 'bg-muted text-muted-foreground group-hover:bg-muted/80'}`}>
                        {m.icon}
                      </div>
                      <span className={`font-heading font-bold text-lg ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                        {m.title}
                      </span>
                    </div>
                    
                    {isCompleted ? (
                      <CheckCircle2 size={24} className="text-green-500 animate-fade-in" />
                    ) : (
                      <ChevronRight size={20} className={`text-muted-foreground/30 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                    )}
                 </button>
               )
             })}
          </div>

          {/* Main Content Stage */}
          <div className="lg:col-span-8 flex flex-col h-auto self-start">
            <div className={`bg-card border-4 rounded-[3rem] p-8 md:p-12 shadow-xl relative overflow-hidden transition-colors duration-500 ${finishedModule ? 'border-green-400' : 'border-border'}`}>
              
              {/* Dynamic decorative backdrop */}
              <div className={`absolute top-0 right-0 w-64 h-64 opacity-5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 ${activeModule.color.split(' ')[0]}`}></div>

              <div className="relative z-10 shrink-0">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-md animate-bounce-soft ${activeModule.color}`}>
                    {activeModule.icon}
                  </div>
                  <h2 className="text-4xl font-heading font-bold tracking-tight text-foreground">{activeModule.title}</h2>
                </div>

                <div className="space-y-6 mb-12 min-h-[150px]">
                  {activeModule.description.map((paragraph, index) => (
                    <p key={index} className="text-lg leading-relaxed text-muted-foreground font-body max-w-2xl animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Interactive Emoji Formula */}
                <div className="bg-muted/50 border border-border p-6 rounded-[2rem] flex flex-wrap items-center justify-center gap-4 md:gap-6 font-mono font-bold text-sm md:text-lg mb-12 shadow-inner uppercase tracking-wider">
                  <div className="bg-background px-4 py-2 rounded-xl shadow-sm border border-border/50">{activeModule.emojiFormula.left}</div>
                  <div className="text-muted-foreground">{activeModule.emojiFormula.operator}</div>
                  <div className="bg-background px-4 py-2 rounded-xl shadow-sm border border-border/50">{activeModule.emojiFormula.right}</div>
                  <div className="text-muted-foreground">=</div>
                  <div className={`px-4 py-2 rounded-xl shadow-sm border ${activeModule.color.replace('text-', 'border-').replace('text-', '')}`}>{activeModule.emojiFormula.result}</div>
                </div>

                {/* Flip Card Interaction */}
                <div className="mb-4 max-w-xl mx-auto">
                   <FunFactCard key={activeModule.id} fact={activeModule.funFact} />
                </div>
              </div>

              {/* Module Footer Actions */}
              <div className="pt-8 border-t border-border flex justify-between items-center mt-auto shrink-0 relative z-10">
                <span className="text-sm font-mono font-bold text-muted-foreground">Keep learning!</span>
                <button 
                  onClick={handleFinishModule}
                  disabled={completedModules.includes(activeModuleId)}
                  className={`px-8 py-4 rounded-full font-heading font-bold tracking-wide transition-all ${
                    completedModules.includes(activeModuleId)
                      ? "bg-green-100 text-green-700 cursor-default"
                      : "bg-foreground text-background hover:scale-105 hover:shadow-xl active:scale-95"
                  }`}
                >
                  {completedModules.includes(activeModuleId) ? "MODULE COMPLETED ✓" : "MARK AS DONE"}
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default LearnAI;
