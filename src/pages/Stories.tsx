import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { BookOpen, Glasses, Search, X, Sparkles, CalendarDays } from "lucide-react";
import sourceStories from "@/data/stories.json";

type Story = {
  id: number;
  title: string;
  preview: string;
  color: string;
  textColor: string;
  borderColor: string;
  content: string[];
};

const Stories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  // Compute Story of the Day (rotates perfectly every 24 hours)
  const storyOfTheDay = useMemo(() => {
    const dayIndex = Math.floor(Date.now() / 86400000);
    return sourceStories[dayIndex % sourceStories.length];
  }, []);

  // Filter Library (excludes the hero story unless searched specifically)
  const filteredStories = useMemo(() => {
    let filtered = sourceStories;
    
    // If not searching, visually remove the featured story from the grid
    if (!searchQuery) {
       filtered = sourceStories.filter(s => s.id !== storyOfTheDay.id);
    }

    return filtered.filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, storyOfTheDay]);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16 relative">
        
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-black font-mono font-bold tracking-widest text-sm uppercase flex items-center gap-2">
              <Glasses size={16} /> Reading Room
            </span>
            <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tight mb-2">Awesome AI Adventures</h1>
            <p className="text-lg text-muted-foreground font-body max-w-xl">
              Imaginative, educational short stories about robots, algorithms, and the future!
            </p>
          </div>

          <div className="relative w-full md:w-72 mt-4 md:mt-0 shadow-sm shrink-0">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
             <input 
               type="text" 
               placeholder="Search stories..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-card border border-border rounded-full py-3.5 pl-12 pr-4 text-sm font-mono focus:outline-none focus:border-foreground transition-all focus:ring-4 focus:ring-foreground/10"
             />
          </div>
        </div>

        {/* Story of the Day Hero (Only show if not actively filtering) */}
        {!searchQuery && (
          <div className="max-w-6xl mx-auto mb-16">
            <div 
              onClick={() => setActiveStory(storyOfTheDay)}
              className={`rounded-[3rem] border-4 p-8 md:p-12 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group flex flex-col md:flex-row gap-8 ${storyOfTheDay.color} ${storyOfTheDay.borderColor}`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-background/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
              
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarDays size={18} className="opacity-80" />
                  <span className={`text-[12px] font-mono font-bold uppercase tracking-widest bg-background/50 px-3 py-1.5 rounded-full ${storyOfTheDay.textColor}`}>
                    Featured Daily Story
                  </span>
                </div>
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">{storyOfTheDay.title}</h2>
                <p className="text-lg md:text-xl font-body opacity-90 leading-relaxed max-w-2xl mb-8">{storyOfTheDay.preview}</p>
                <button className={`font-mono font-bold bg-foreground text-background px-6 py-3 rounded-full text-sm inline-flex items-center gap-2 shadow-sm group-hover:scale-105 transition-transform`}>
                   <BookOpen size={16} /> READ NOW
                </button>
              </div>

              {/* Decorative side block */}
              <div className="hidden md:flex shrink-0 w-48 h-48 bg-background/60 rounded-[2rem] border-2 border-border/10 shadow-inner items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform">
                <div className={`scale-[3] opacity-40 ${storyOfTheDay.textColor}`}>
                  <Sparkles size={24} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Library Grid */}
        <div className="max-w-6xl mx-auto">
          <h3 className="font-mono font-bold text-xl mb-6 text-foreground/80 flex items-center gap-2">
            <BookOpen size={18} /> 
            {searchQuery ? "Search Results" : "The Library"}
          </h3>
          
          {filteredStories.length === 0 ? (
             <div className="text-center py-20 bg-muted/30 border-2 border-border border-dashed rounded-3xl">
                <p className="text-muted-foreground font-mono">No matching stories found. Try another search!</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((s) => (
                <div 
                  key={s.id} 
                  onClick={() => setActiveStory(s)}
                  className={`rounded-[2rem] border-2 p-8 hover:-translate-y-1 transition-all cursor-pointer ${s.color} hover:bg-opacity-80 shadow-sm hover:shadow-md relative overflow-hidden group`}
                >
                  <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-background/30 rounded-full mix-blend-overlay group-hover:scale-150 transition-transform duration-500"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="font-heading text-2xl font-bold mb-3 tracking-tight">{s.title}</h3>
                    <p className="text-[15px] font-body opacity-80 leading-relaxed flex-1 mb-8">{s.preview}</p>
                    <div className="text-xs font-mono font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                       <BookOpen size={14} /> Read Story →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Native Full-Screen Reader Modal Overlay */}
        {activeStory && (
           <div className="fixed inset-0 z-[100] flex animate-fade-in pointer-events-auto">
              {/* Blur backdrop overlay */}
              <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setActiveStory(null)}></div>
              
              {/* Reader Container */}
              <div className="relative z-10 w-full h-full md:h-[90vh] md:w-[800px] md:max-w-[95vw] md:m-auto flex flex-col bg-card border-x md:border-4 border-border md:rounded-[3rem] shadow-2xl overflow-hidden animate-scale-in">
                 
                 {/* Reader Toolbar */}
                 <div className={`p-4 md:p-6 border-b border-border/50 flex justify-between items-center shrink-0 ${activeStory.color}`}>
                    <span className={`text-[11px] font-mono font-bold uppercase tracking-widest bg-background/50 px-3 py-1.5 rounded-full shadow-sm ${activeStory.textColor}`}>
                       Short Story #{activeStory.id}
                    </span>
                    <button 
                      onClick={() => setActiveStory(null)}
                      className="w-10 h-10 bg-background/50 hover:bg-background rounded-full flex items-center justify-center transition-colors shadow-sm"
                    >
                      <X size={20} className={activeStory.textColor} />
                    </button>
                 </div>

                 {/* Reader Content Area (Scrollable) */}
                 <div className="flex-1 overflow-y-auto px-6 py-10 md:p-16 hide-scrollbar relative">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground !leading-tight mb-8">
                       {activeStory.title}
                    </h1>

                    <div className="space-y-8 pb-12">
                       {activeStory.content.map((paragraph, idx) => (
                         <p key={idx} className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed md:leading-[1.8]">
                           {paragraph}
                         </p>
                       ))}
                    </div>

                    <div className="mt-12 flex justify-center pb-12">
                       <button 
                         onClick={() => setActiveStory(null)}
                         className="font-mono font-bold uppercase tracking-widest text-sm text-foreground/50 hover:text-foreground border border-border/50 hover:border-border px-8 py-3 rounded-full transition-all"
                       >
                         End of Story (Close)
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        )}

      </section>
    </Layout>
  );
};

export default Stories;
