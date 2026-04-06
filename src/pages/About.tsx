import Layout from "@/components/Layout";
import { MapPin, Heart, Shield, Sparkles, UserCircle } from "lucide-react";
import creatorAvatar from "@/assets/creator-avatar.png";

const About = () => (
  <Layout>
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto mb-12 flex flex-col gap-2 text-center md:text-left">
        <span className="text-black font-mono font-bold tracking-widest text-sm uppercase flex items-center justify-center md:justify-start gap-2">
          <UserCircle size={16} /> Origin Story
        </span>
        <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tight mb-2">About Building Minds</h1>
        <p className="text-lg text-muted-foreground font-body">The story behind the platform that's making AI fun for young minds.</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-3xl border border-border p-8 md:p-12 text-center mb-10 shadow-sm relative overflow-hidden">
          {/* Subtle geometric element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <img src={creatorAvatar} alt="Fatima Ajmal" width={140} height={140} loading="lazy" className="rounded-3xl mx-auto mb-6 shadow-sm ring-4 ring-border bg-muted p-1" />
            <h3 className="text-3xl font-heading font-bold mb-2 tracking-tight">Hi, I'm Fatima Ajmal 👋</h3>
            <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-sm mb-6 font-mono font-semibold uppercase tracking-wider">
              <MapPin size={14} /> Solihull, UK
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto text-[15px]">
              I created Building Minds because I believe every young person deserves to understand the technology that's shaping our world. AI can feel complicated and even scary — but it doesn't have to be! My goal is to break down complex ideas into fun, simple, and safe experiences that inspire curiosity and creativity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Heart size={24} />, title: "Our Mission", text: "Helping young minds understand and use AI safely and creatively.", color: "bg-coral/20 text-coral-foreground border-coral/30" },
            { icon: <Shield size={24} />, title: "Safe & Trusted", text: "All content is designed to be age-appropriate, fun, and educational.", color: "bg-mint/20 text-mint-foreground border-mint/30" },
            { icon: <Sparkles size={24} />, title: "Always Learning", text: "New games, videos, and stories are added regularly to keep things fresh!", color: "bg-sunshine/20 text-sunshine-foreground border-sunshine/30" },
          ].map((item) => (
            <div key={item.title} className={`bg-card rounded-3xl border p-6 text-center hover:-translate-y-1 transition-transform cursor-pointer ${item.color.split(' ')[2]}`}>
              <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mx-auto mb-4`}>{item.icon}</div>
              <h4 className="font-heading font-bold text-lg mb-2">{item.title}</h4>
              <p className="text-sm text-foreground/70 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
