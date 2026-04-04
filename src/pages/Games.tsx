import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import FunCard from "@/components/FunCard";
import { Brain, Puzzle, Zap, Trophy, Target, Cpu } from "lucide-react";

const games = [
  { icon: <Brain size={24} />, title: "AI Quiz Challenge", description: "Test what you know about AI with fun multiple-choice questions!", color: "primary" as const },
  { icon: <Puzzle size={24} />, title: "Logic Puzzles", description: "Solve puzzles that teach you how AI thinks and makes decisions.", color: "lavender" as const },
  { icon: <Zap size={24} />, title: "Train Your AI Brain", description: "Feed data to a virtual AI and watch it learn — just like real machine learning!", color: "sunshine" as const },
  { icon: <Trophy size={24} />, title: "Pattern Matcher", description: "Find hidden patterns in images and data, just like an AI would.", color: "mint" as const },
  { icon: <Target size={24} />, title: "Spot the AI", description: "Can you tell if something was made by a human or AI? Play and find out!", color: "coral" as const },
  { icon: <Cpu size={24} />, title: "Build-a-Bot", description: "Design your own chatbot by choosing how it should respond to questions.", color: "secondary" as const },
];

const Games = () => (
  <Layout>
    <section className="container mx-auto px-4 py-16">
      <SectionTitle emoji="🎮" title="AI Games & Puzzles" subtitle="Challenge yourself with fun games that teach you how AI works!" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((g) => (
          <FunCard key={g.title} {...g} />
        ))}
      </div>
    </section>
  </Layout>
);

export default Games;
