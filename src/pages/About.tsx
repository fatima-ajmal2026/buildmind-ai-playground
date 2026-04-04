import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import { MapPin, Heart, Shield, Sparkles } from "lucide-react";
import creatorAvatar from "@/assets/creator-avatar.png";

const About = () => (
  <Layout>
    <section className="container mx-auto px-4 py-16">
      <SectionTitle emoji="👤" title="About Buildmind" subtitle="The story behind the platform that's making AI fun for young minds." />

      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-3xl border border-border p-8 md:p-12 text-center mb-10">
          <img src={creatorAvatar} alt="Fatima Ajmal" width={140} height={140} loading="lazy" className="rounded-2xl mx-auto mb-6" />
          <h3 className="text-2xl font-heading mb-2">Hi, I'm Fatima Ajmal 👋</h3>
          <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm mb-4">
            <MapPin size={14} /> Solihull, UK
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
            I created Buildmind because I believe every young person deserves to understand the technology that's shaping our world. AI can feel complicated and even scary — but it doesn't have to be! My goal is to break down complex ideas into fun, simple, and safe experiences that inspire curiosity and creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Heart size={24} />, title: "Our Mission", text: "Helping young minds understand and use AI safely and creatively.", color: "bg-coral/10 text-coral" },
            { icon: <Shield size={24} />, title: "Safe & Trusted", text: "All content is designed to be age-appropriate, fun, and educational.", color: "bg-mint/10 text-mint" },
            { icon: <Sparkles size={24} />, title: "Always Learning", text: "New games, videos, and stories are added regularly to keep things fresh!", color: "bg-sunshine/10 text-sunshine" },
          ].map((item) => (
            <div key={item.title} className="bg-card rounded-2xl border border-border p-6 text-center">
              <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-3`}>{item.icon}</div>
              <h4 className="font-heading text-base mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
