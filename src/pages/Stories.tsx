import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import { BookOpen } from "lucide-react";

const stories = [
  { title: "Robo & The Lost Algorithm", preview: "When Robo's memory chip goes missing, it's up to a young coder to help it learn everything again — from scratch!", color: "bg-primary/10 border-primary/20" },
  { title: "The City That Thought", preview: "In the year 2045, an entire city is run by AI. But one day, it starts asking questions no one expected...", color: "bg-secondary/10 border-secondary/20" },
  { title: "Luna's AI Best Friend", preview: "Luna builds an AI companion for a school project. But when it starts getting smarter than her, things get interesting!", color: "bg-mint/10 border-mint/20" },
  { title: "The Pattern Detectives", preview: "Three friends discover that AI can spot hidden patterns everywhere — and use it to solve a mystery in their town.", color: "bg-sunshine/10 border-sunshine/20" },
  { title: "When Robots Dream", preview: "What would happen if a robot could dream? This story explores imagination, creativity, and what makes us human.", color: "bg-coral/10 border-coral/20" },
  { title: "The AI Art Contest", preview: "A school art contest gets heated when someone enters a painting made entirely by AI. Is it really art?", color: "bg-lavender/10 border-lavender/20" },
];

const Stories = () => (
  <Layout>
    <section className="container mx-auto px-4 py-16">
      <SectionTitle emoji="📖" title="AI Stories" subtitle="Fun and imaginative tales about robots, AI, and the future!" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((s) => (
          <div key={s.title} className={`rounded-2xl border p-6 card-hover cursor-pointer ${s.color}`}>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={18} className="text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Short Story</span>
            </div>
            <h3 className="font-heading text-lg mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.preview}</p>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Stories;
