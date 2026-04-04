import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import { Calendar } from "lucide-react";

const news = [
  { title: "AI Can Now Help Doctors Find Diseases Faster", summary: "New AI tools are helping doctors look at X-rays and scans to spot problems quicker than ever before!", date: "March 2026" },
  { title: "Kids Are Learning to Code AI at School", summary: "Schools around the world are starting to teach children how to build their own AI projects. How cool is that?", date: "March 2026" },
  { title: "New AI Tool Creates Music from Your Humming", summary: "Just hum a tune and this AI turns it into a full song! Musicians and kids are loving it.", date: "February 2026" },
  { title: "Robot Dog Learns to Play Fetch", summary: "Scientists built a robot dog that uses AI to learn how to play fetch — and it's getting really good at it!", date: "February 2026" },
  { title: "AI Helps Clean Up Ocean Plastic", summary: "A new AI-powered drone can fly over the ocean and spot plastic waste so boats can collect it faster.", date: "January 2026" },
  { title: "ChatGPT Gets a Kids Mode!", summary: "The popular chatbot now has a special safe mode designed just for young learners. It answers questions in a fun, simple way.", date: "January 2026" },
];

const News = () => (
  <Layout>
    <section className="container mx-auto px-4 py-16">
      <SectionTitle emoji="📰" title="AI News for Young Minds" subtitle="The latest AI discoveries and inventions, explained just for you!" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {news.map((n) => (
          <div key={n.title} className="bg-card rounded-2xl border border-border p-6 card-hover cursor-pointer">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <Calendar size={14} />
              {n.date}
            </div>
            <h3 className="font-heading text-lg mb-2">{n.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{n.summary}</p>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default News;
