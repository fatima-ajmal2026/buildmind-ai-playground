import { useState } from "react";
import Layout from "@/components/Layout";
import FunCard from "@/components/FunCard";
import { Sparkles, Activity, Cpu, Bot, Gamepad2, X, Smile, Navigation, Mail, Brain, Eye, Camera, Bug, Lock, User, FastForward, PlayCircle, BookOpen } from "lucide-react";

import InfiniteCraftSim from "@/components/games/InfiniteCraftSim";
import AITicTacToe from "@/components/games/AITicTacToe";
import ChatbotSim from "@/components/games/ChatbotSim";
import AIPredictorRPS from "@/components/games/AIPredictorRPS";
import SentimentGuesser from "@/components/games/SentimentGuesser";
import PathRobot from "@/components/games/PathRobot";
import SpamSorter from "@/components/games/SpamSorter";
import NeuralMemory from "@/components/games/NeuralMemory";
import ColorPredictor from "@/components/games/ColorPredictor";
import PixelReader from "@/components/games/PixelReader";
import WhackABug from "@/components/games/WhackABug";
import CodeBreaker from "@/components/games/CodeBreaker";
import TuringTest from "@/components/games/TuringTest";
import CoinPredictor from "@/components/games/CoinPredictor";
import FlappyAI from "@/components/games/FlappyAI";
import EmojiTranslator from "@/components/games/EmojiTranslator";

type Game = {
  icon: JSX.Element;
  title: string;
  description: string;
  color: "primary" | "lavender" | "sunshine" | "mint" | "coral" | "secondary";
  badge: string;
  component: JSX.Element;
};

const games: Game[] = [
  { icon: <Bot size={24} />, title: "Rule-Bot 9000", description: "Chat with a simple, programmed AI simulator. Can you figure out what words it knows?", color: "coral", badge: "Chatbot", component: <ChatbotSim /> },
  { icon: <Cpu size={24} />, title: "Unbeatable Tic-Tac-Toe", description: "Try to beat an AI that uses a 'Minimax' algorithm to predict your every move. It never loses!", color: "mint", badge: "Logic algorithm", component: <AITicTacToe /> },
  { icon: <Activity size={24} />, title: "Pattern Predictor RPS", description: "Play Rock, Paper, Scissors against an AI that secretly learns your play patterns to beat you.", color: "lavender", badge: "Machine Learning", component: <AIPredictorRPS /> },
  { icon: <Sparkles size={24} />, title: "AI Crafting Simulator", description: "Combine basic elements together to craft anything. What happens when you combine Robot and Lightning?", color: "primary", badge: "Creation", component: <InfiniteCraftSim /> },
  { icon: <BookOpen size={24} />, title: "Emoji Translator", description: "Help the AI learn language by matching words to emojis! 3 rounds of increasing difficulty.", color: "mint", badge: "NLP Training", component: <EmojiTranslator /> },
  { icon: <Smile size={24} />, title: "Sentiment Analyzer", description: "Type how you feel and watch a keyword-based AI guess your emotion in real-time!", color: "mint", badge: "NLP", component: <SentimentGuesser /> },
  { icon: <Navigation size={24} />, title: "Pathfinder Robot", description: "Draw walls and obstacles, then watch an AI algorithm compute the shortest path instantly.", color: "lavender", badge: "A* Algorithm", component: <PathRobot /> },
  { icon: <Mail size={24} />, title: "Spam Sorter", description: "How does your email know what is junk? Train the AI to tell the difference between real and fake mail.", color: "sunshine", badge: "Classification", component: <SpamSorter /> },
  { icon: <Brain size={24} />, title: "Neural Connection", description: "Establish strong neural connections in this fast-paced hidden memory match game.", color: "primary", badge: "Network Training", component: <NeuralMemory /> },
  { icon: <Eye size={24} />, title: "Color Predictor", description: "Train the AI to learn your formatting style! After 10 clicks, it will predict your next choice.", color: "lavender", badge: "Supervised Learning", component: <ColorPredictor /> },
  { icon: <Camera size={24} />, title: "Computer Vision Eye", description: "Draw simple shapes on a pixel grid and see if the AI's CV model can recognize them correctly.", color: "primary", badge: "Computer Vision", component: <PixelReader /> },
  { icon: <Bug size={24} />, title: "Data Scrubbing", description: "Scrub the corrupted training data as fast as you can. Bugs are ruining the AI's learning!", color: "coral", badge: "Data Cleaning", component: <WhackABug /> },
  { icon: <Lock size={24} />, title: "Firewall Breaker", description: "Use logical reasoning and algorithmic guessing to bypass the hidden 4-digit security code.", color: "secondary", badge: "Brute Force Logic", component: <CodeBreaker /> },
  { icon: <User size={24} />, title: "The Turing Test", description: "Is it a human or a robot? Chat with the mysterious entity and try to spot the conversational AI.", color: "secondary", badge: "Conversational AI", component: <TuringTest /> },
  { icon: <FastForward size={24} />, title: "Mind Reader", description: "Humans are predictable! Play a game of Heads or Tails and see if the AI can predict your next click.", color: "sunshine", badge: "Probability", component: <CoinPredictor /> },
  { icon: <PlayCircle size={24} />, title: "Automated Agent", description: "Watch an automated script learn to fly through obstacles perfectly. Adjust the brain's logic yourself!", color: "sunshine", badge: "AI Agents", component: <FlappyAI /> },
];

const Games = () => {
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16 relative">
        <div className="max-w-4xl mx-auto mb-12 flex flex-col gap-2 text-center md:text-left">
          <span className="text-black font-mono font-bold tracking-widest text-sm uppercase flex items-center justify-center md:justify-start gap-2">
            <Gamepad2 size={16} /> Play & Learn
          </span>
          <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tight mb-2">AI Mini-Games</h1>
          <p className="text-lg text-black font-body max-w-2xl">
            Play custom interactive mini-games built directly into the site that playfully explain how real AI algorithms, predictors, and chatbots work!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {games.map((g) => (
            <div key={g.title} onClick={() => setActiveGame(g)} className="cursor-pointer">
              <div className="pointer-events-none h-full">
                <FunCard 
                  icon={g.icon} 
                  title={g.title} 
                  description={g.description} 
                  color={g.color} 
                  badge={g.badge} 
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Local Game Playing Modal Overlay */}
      {activeGame && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md p-4 animate-fade-in overflow-hidden">
           
           {/* Close Button top right */}
           <button 
             onClick={() => setActiveGame(null)} 
             className="absolute top-6 right-6 bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground p-3 rounded-full transition-all shadow-md z-[101]"
             aria-label="Close game"
           >
             <X size={28} />
           </button>

          {/* Full Screen Game Container */}
          <div className="w-full h-full max-w-7xl max-h-[90vh] bg-background rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.1)] flex flex-col relative border-4 border-border overflow-hidden">
             <div className="flex-1 overflow-auto">
                {activeGame.component}
             </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Games;
