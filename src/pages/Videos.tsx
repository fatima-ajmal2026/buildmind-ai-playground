import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import { Play } from "lucide-react";

const categories = [
  {
    label: "Beginner AI",
    videos: [
      { title: "What is Artificial Intelligence?", duration: "5:30" },
      { title: "AI for Kids: The Basics", duration: "4:15" },
      { title: "How Computers Learn", duration: "6:00" },
    ],
  },
  {
    label: "Cool AI Projects",
    videos: [
      { title: "AI That Draws Pictures!", duration: "7:20" },
      { title: "Building a Chatbot from Scratch", duration: "8:45" },
      { title: "AI Music Generator", duration: "5:10" },
    ],
  },
  {
    label: "AI Explained Simply",
    videos: [
      { title: "How Does ChatGPT Work?", duration: "6:30" },
      { title: "Self-Driving Cars Explained", duration: "5:55" },
      { title: "AI in Video Games", duration: "7:00" },
    ],
  },
];

const colors = ["bg-primary", "bg-secondary", "bg-accent"];

const Videos = () => (
  <Layout>
    <section className="container mx-auto px-4 py-16">
      <SectionTitle emoji="🎥" title="Learn with Videos" subtitle="Watch fun and easy-to-understand videos about Artificial Intelligence!" />
      {categories.map((cat, ci) => (
        <div key={cat.label} className="mb-12">
          <h3 className="text-xl font-heading mb-4">{cat.label}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.videos.map((v) => (
              <div key={v.title} className="bg-card rounded-2xl border border-border overflow-hidden card-hover cursor-pointer group">
                <div className={`aspect-video ${colors[ci]} relative flex items-center justify-center`}>
                  <div className="w-14 h-14 rounded-full bg-card/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play size={24} className="text-foreground ml-1" />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-foreground/70 text-primary-foreground text-xs px-2 py-0.5 rounded-md">{v.duration}</span>
                </div>
                <div className="p-4">
                  <h4 className="font-heading text-base">{v.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  </Layout>
);

export default Videos;
