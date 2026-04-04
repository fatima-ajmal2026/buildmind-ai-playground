import { Link } from "react-router-dom";
import { Gamepad2, Video, Bot, Sparkles, Rocket, Lightbulb } from "lucide-react";
import Layout from "@/components/Layout";
import FunCard from "@/components/FunCard";
import SectionTitle from "@/components/SectionTitle";
import heroRobot from "@/assets/hero-robot.png";
import creatorAvatar from "@/assets/creator-avatar.png";

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-5" />
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-sunshine/15 text-sunshine-foreground px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Sparkles size={16} className="text-sunshine" /> For Ages 7–17
            </div>
            <h1 className="text-4xl md:text-6xl font-heading leading-tight mb-4">
              Build Your Mind{" "}
              <span className="gradient-text">with AI</span> 🚀
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Learn, Play, and Create with Artificial Intelligence — the fun way!
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Link to="/games" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                <Gamepad2 size={18} /> Play Games 🎮
              </Link>
              <Link to="/videos" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold hover:opacity-90 transition-opacity">
                <Video size={18} /> Watch Videos 🎥
              </Link>
              <Link to="/learn" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity">
                <Bot size={18} /> Start Learning 🤖
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0">
            <img src={heroRobot} alt="Buildmind Robot" width={320} height={320} className="float-animation drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </section>

    {/* What You'll Discover */}
    <section className="container mx-auto px-4 py-16">
      <SectionTitle emoji="✨" title="What You'll Discover" subtitle="Explore AI through games, videos, stories, and hands-on learning!" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FunCard icon={<Gamepad2 size={24} />} title="AI Games & Puzzles" description="Test your brain with fun quizzes, logic puzzles, and AI challenges." color="primary" />
        <FunCard icon={<Video size={24} />} title="Cool Videos" description="Watch simple and fun videos that explain how AI works." color="lavender" />
        <FunCard icon={<Bot size={24} />} title="Learn AI Concepts" description="Discover what AI is, how chatbots work, and how AI creates images." color="mint" />
        <FunCard icon={<Lightbulb size={24} />} title="AI Stories" description="Read imaginative stories about robots, smart machines, and the future." color="sunshine" />
        <FunCard icon={<Rocket size={24} />} title="AI News" description="Stay up to date with kid-friendly AI news and discoveries." color="coral" />
        <FunCard icon={<Sparkles size={24} />} title="Creative Projects" description="Get inspired to build your own AI-powered creations!" color="secondary" />
      </div>
    </section>

    {/* Meet the Creator */}
    <section className="container mx-auto px-4 py-16">
      <div className="bg-card rounded-3xl border border-border p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        <img src={creatorAvatar} alt="Fatima Ajmal" width={160} height={160} loading="lazy" className="rounded-2xl" />
        <div>
          <h3 className="text-2xl font-heading mb-2">Meet the Creator 👋</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Buildmind was created by <strong className="text-foreground">Fatima Ajmal</strong>, based in Solihull, UK, with a mission to make AI fun, simple, and accessible for young minds.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            "I believe every child deserves to understand the technology shaping their future — and learning should always be an adventure!"
          </p>
          <Link to="/about" className="inline-flex items-center gap-1 mt-4 text-primary font-semibold hover:underline text-sm">
            Learn more about Buildmind →
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default Index;
