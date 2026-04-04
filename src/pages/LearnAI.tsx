import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import { Bot, MessageCircle, Image, Brain, Sparkles, ArrowRight } from "lucide-react";

const topics = [
  {
    icon: <Brain size={28} />,
    title: "What is AI?",
    color: "bg-primary/10 text-primary",
    points: [
      "AI stands for Artificial Intelligence — it's when computers can do things that usually need human brains!",
      "AI can recognize your face, translate languages, and even beat you at chess.",
      "It's not magic — it's maths, data, and clever programming.",
    ],
  },
  {
    icon: <MessageCircle size={28} />,
    title: "How Chatbots Work",
    color: "bg-secondary/10 text-secondary",
    points: [
      "Chatbots are programs that can have conversations with you.",
      "They learn from millions of examples of human language.",
      "When you ask a question, the chatbot predicts the best answer word by word!",
    ],
  },
  {
    icon: <Image size={28} />,
    title: "How AI Creates Images",
    color: "bg-mint/10 text-mint",
    points: [
      "AI image generators learn by studying millions of pictures.",
      "You type a description, and the AI turns it into a picture — pixel by pixel.",
      "It's like giving a super-fast artist very detailed instructions!",
    ],
  },
];

const LearnAI = () => (
  <Layout>
    <section className="container mx-auto px-4 py-16">
      <SectionTitle emoji="🤖" title="Learn AI the Fun Way" subtitle="Explore big ideas in simple, bite-sized pieces!" />
      <div className="space-y-8 max-w-3xl mx-auto">
        {topics.map((t) => (
          <div key={t.title} className="bg-card rounded-2xl border border-border p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className={`w-12 h-12 rounded-xl ${t.color} flex items-center justify-center`}>{t.icon}</div>
              <h3 className="text-xl font-heading">{t.title}</h3>
            </div>
            <ul className="space-y-3">
              {t.points.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <Sparkles size={16} className="text-sunshine mt-1 flex-shrink-0" />
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <p className="text-muted-foreground">More topics coming soon! Stay curious 🌟</p>
      </div>
    </section>
  </Layout>
);

export default LearnAI;
