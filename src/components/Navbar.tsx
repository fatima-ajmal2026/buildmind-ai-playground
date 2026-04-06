import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/games", label: "Games" },
  { to: "/videos", label: "Videos" },
  { to: "/learn", label: "Learn AI" },
  { to: "/stories", label: "Stories" },
  { to: "/news", label: "News" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border shadow-sm">
      {/* Navigation Bar (Marquee) */}
      <div className="bg-background/40 backdrop-blur-md overflow-hidden relative group h-14 flex items-center">
        <div className="flex whitespace-nowrap animate-marquee w-max py-2 group-hover:[animation-play-state:paused] will-change-transform">
          {/* Main Set */}
          <div className="flex items-center gap-6 px-4">
            {[...links, ...links].map((l, i) => {
              const bgColors = [
                "bg-pink-100 text-pink-900 border-pink-200",
                "bg-purple-100 text-purple-900 border-purple-200",
                "bg-blue-100 text-blue-900 border-blue-200",
                "bg-yellow-100 text-yellow-900 border-yellow-200"
              ];
              const bgClass = bgColors[i % 4];
              const isActive = location.pathname === l.to;
              return (
                <Link 
                  key={`set1-${i}`} 
                  to={l.to} 
                  className={`text-[13px] font-mono font-bold px-4 py-1.5 rounded-full border transition-transform duration-200 cursor-pointer shadow-sm ${bgClass} ${isActive ? "ring-2 ring-foreground" : "hover:scale-105"}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
          {/* Duplicate Set for Seamless Loop */}
          <div className="flex items-center gap-6 px-4" aria-hidden="true">
            {[...links, ...links].map((l, i) => {
              const bgColors = [
                "bg-pink-100 text-pink-900 border-pink-200",
                "bg-purple-100 text-purple-900 border-purple-200",
                "bg-blue-100 text-blue-900 border-blue-200",
                "bg-yellow-100 text-yellow-900 border-yellow-200"
              ];
              const bgClass = bgColors[i % 4];
              const isActive = location.pathname === l.to;
              return (
                <Link 
                  key={`set2-${i}`} 
                  to={l.to} 
                  className={`text-[13px] font-mono font-bold px-4 py-1.5 rounded-full border transition-transform duration-200 cursor-pointer shadow-sm ${bgClass} ${isActive ? "ring-2 ring-foreground" : "hover:scale-105"}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
