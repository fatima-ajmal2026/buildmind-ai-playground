import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { Calendar, X, Sparkles, Newspaper } from "lucide-react";
import sourceNews from "@/data/news.json";

type NewsArticle = {
  id: number;
  title: string;
  preview: string;
  full_article: string[];
  date: string;
  source: string;
  color: string;
  textColor: string;
};

const News = () => {
  const [activeNews, setActiveNews] = useState<NewsArticle | null>(null);

  // Compute News of the Day (rotates perfectly every 24 hours)
  const newsOfTheDay = useMemo(() => {
    const dayIndex = Math.floor(Date.now() / 86400000);
    return sourceNews[dayIndex % sourceNews.length];
  }, []);

  // Exclude the hero article from the main list so it isn't duplicated immediately
  const libraryNews = useMemo(() => {
    return sourceNews.filter(n => n.id !== newsOfTheDay.id);
  }, [newsOfTheDay.id]);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16 relative">
        <div className="max-w-6xl mx-auto mb-10 flex flex-col gap-2">
          <span className="text-black font-mono font-bold tracking-widest text-sm uppercase flex items-center gap-2">
             <Newspaper size={16} /> Recent Updates
          </span>
          <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tight mb-2">Awesome AI News</h1>
          <p className="text-lg text-muted-foreground font-body max-w-xl">
             The latest AI discoveries and inventions, explained just for kids! Every day there is a brand new featured article.
          </p>
        </div>

        {/* Breaking News of the Day Hero */}
        <div className="max-w-6xl mx-auto mb-16">
          <div 
            onClick={() => setActiveNews(newsOfTheDay)}
            className={`rounded-[3rem] border-4 p-8 md:p-12 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group flex flex-col md:flex-row gap-8 ${newsOfTheDay.color} border-border`}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-background/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            
            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={18} className="opacity-80" />
                <span className={`text-[12px] font-mono font-bold uppercase tracking-widest bg-background/50 px-3 py-1.5 rounded-full ${newsOfTheDay.textColor}`}>
                  BREAKING DAILY NEWS
                </span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">{newsOfTheDay.title}</h2>
              <p className="text-lg md:text-xl font-body opacity-90 leading-relaxed max-w-2xl mb-8">{newsOfTheDay.preview}</p>
              <button className={`font-mono font-bold bg-foreground text-background px-6 py-3 rounded-full text-sm inline-flex items-center gap-2 shadow-sm group-hover:scale-105 transition-transform`}>
                 <Newspaper size={16} /> READ FULL REPORT
              </button>
            </div>

            {/* Decorative side block */}
            <div className="hidden md:flex shrink-0 w-48 h-48 bg-background/60 rounded-[2rem] border-2 border-border shadow-inner items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform">
              <div className={`scale-[3] opacity-40 ${newsOfTheDay.textColor}`}>
                <Sparkles size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* News Archive Grid */}
        <div className="max-w-6xl mx-auto">
          <h3 className="font-mono font-bold text-xl mb-6 text-foreground/80 flex items-center gap-2">
            <Newspaper size={18} /> Daily Archive
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {libraryNews.map((n) => (
              <div 
                key={n.id} 
                onClick={() => setActiveNews(n)}
                className={`bg-card rounded-[2rem] border-2 border-border p-8 hover:-translate-y-1 transition-all cursor-pointer shadow-sm hover:shadow-md group flex flex-col h-full`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`${n.color} text-black text-[10px] font-mono font-bold px-2 py-1 rounded w-fit uppercase`}>
                    {n.source}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-black font-mono">
                    <Calendar size={14} />
                    {n.date}
                  </div>
                </div>
                <h3 className="font-heading text-2xl font-bold mb-3 tracking-tight text-black group-hover:opacity-80 transition-opacity">{n.title}</h3>
                <p className="text-[15px] font-body text-black leading-relaxed flex-1 mb-8">{n.preview}</p>
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-black group-hover:opacity-80 transition-opacity flex items-center gap-1.5">
                   <Newspaper size={14} /> Read Full Article →
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Native Full-Screen Reader Modal Overlay */}
        {activeNews && (
           <div className="fixed inset-0 z-[100] flex animate-fade-in pointer-events-auto">
              {/* Blur backdrop overlay */}
              <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setActiveNews(null)}></div>
              
              {/* Reader Container */}
              <div className="relative z-10 w-full h-full md:h-[90vh] md:w-[800px] md:max-w-[95vw] md:m-auto flex flex-col bg-card border-x md:border-4 border-border md:rounded-[3rem] shadow-2xl overflow-hidden animate-scale-in">
                 
                 {/* Reader Toolbar */}
                 <div className={`p-4 md:p-6 border-b border-border/50 flex justify-between items-center shrink-0 ${activeNews.color}`}>
                    <span className={`text-[11px] font-mono font-bold uppercase tracking-widest bg-background/50 px-3 py-1.5 rounded-full shadow-sm ${activeNews.textColor}`}>
                       {activeNews.source} • {activeNews.date}
                    </span>
                    <button 
                      onClick={() => setActiveNews(null)}
                      className="w-10 h-10 bg-background/50 hover:bg-background rounded-full flex items-center justify-center transition-colors shadow-sm"
                    >
                      <X size={20} className={activeNews.textColor} />
                    </button>
                 </div>

                 {/* Reader Content Area (Scrollable) */}
                 <div className="flex-1 overflow-y-auto px-6 py-10 md:p-16 hide-scrollbar relative">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground !leading-tight mb-8 border-b-4 border-border pb-6">
                       {activeNews.title}
                    </h1>

                    <div className="space-y-6 pb-12">
                       {activeNews.full_article.map((paragraph, idx) => (
                         <p key={idx} className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed md:leading-[1.8] first-letter:text-5xl first-letter:font-heading first-letter:mr-1 first-letter:float-left first-letter:text-primary">
                           {paragraph}
                         </p>
                       ))}
                    </div>

                    <div className="mt-12 flex justify-center pb-12">
                       <button 
                         onClick={() => setActiveNews(null)}
                         className="font-mono font-bold uppercase tracking-widest text-sm text-foreground/50 hover:text-foreground border border-border/50 hover:border-border px-8 py-3 rounded-full transition-all"
                       >
                         End of Article (Close)
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

export default News;
