import { Brain, Heart, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground mt-20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Brain className="text-primary-foreground" size={18} />
            </div>
            <span className="text-lg font-heading font-bold">Buildmind</span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Empowering the next generation to understand AI safely and creatively.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-base mb-3">Explore</h4>
          <div className="flex flex-col gap-2 text-sm opacity-70">
            <Link to="/games" className="hover:opacity-100 transition-opacity">Games</Link>
            <Link to="/videos" className="hover:opacity-100 transition-opacity">Videos</Link>
            <Link to="/learn" className="hover:opacity-100 transition-opacity">Learn AI</Link>
            <Link to="/stories" className="hover:opacity-100 transition-opacity">Stories</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading text-base mb-3">Connect</h4>
          <div className="flex gap-3">
            {[Twitter, Instagram, Youtube, Mail].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-sm opacity-60">
        <p className="flex items-center gap-1">
          Built with <Heart size={14} className="text-coral fill-coral" /> by Fatima Ajmal
        </p>
        <p>© {new Date().getFullYear()} Buildmind. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
