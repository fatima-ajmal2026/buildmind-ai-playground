import { useState } from "react";
import Layout from "@/components/Layout";
import { VideoIcon, Star, Search } from "lucide-react";

// Expanded massive list of Real YouTube video IDs about AI and technology for kids
const videoList = [
  { id: 'ttIOdAdQaUE', title: "What is Artificial Intelligence?" },
  { id: 'G6de8L7cVvM', title: "AI Explained For Kids" },
  { id: 'kQPC4_DsJ8I', title: "Machine Learning Basics" },
  { id: 'WL1Lugc7tK0', title: "How do Robots Think?" },
  { id: 'TrNza0x5keI', title: "Coding & AI for children" },
  { id: '6yN3fC2M03o', title: "The Future of AI" },
  { id: 'DRVOT8gvp9s', title: "Neural Networks for Kids" },
  { id: 'wGon_4obERs', title: "What is ChatGPT?" },
  { id: 'pZYZxJkuQk8', title: "AI Generation Explained" },
  { id: 'SHIy_Xkwajw', title: "Can Computers be Smart?" },
  { id: 'YJZUK2bCmvE', title: "Robots in the Real World" },
  { id: 'FwC8Ghm4o_g', title: "How AI sees pictures" },
  { id: 'w6V246FE_oI', title: "Voice Assistants Explained" },
  { id: '2Nn1be_lo9k', title: "AI music and art" },
  { id: '-J3YJxNnzDc', title: "Safe AI usage" },

  // Newly scraped and added videos
  { id: "gMicQCf3UXE", title: "Robot Science Basics" },
  { id: "JcXKbUIebrU", title: "Smart Computers Explained" },
  { id: "cpgvRFNAyks", title: "Electric Fields & Brains" },
  { id: "hH5NRej39PY", title: "What is AI?" },
  { id: "b0KaGBOU4Ys", title: "How Algorithms Work" },
  { id: "BHg5ciNf9Ik", title: "AI Roads & Infrastructure" },
  { id: "3ypKmAdi4bg", title: "Five Things to Know About AI" },
  { id: "ennrjl80av8", title: "Machine Learning Math" },
  { id: "3QVcgTaMC28", title: "Easy AI Explanation for Kids" },
  { id: "3NL7elWz_k4", title: "AI Humanity & History" },
  { id: "fa8k8IQ1_X0", title: "Artificial Intelligence Song" },
  { id: "iUcf8LvgsBE", title: "AI Deep Dive for kids" },
  { id: "UWeDo09UveM", title: "The Teacherless Classroom" },
  { id: "MHFCVbUcwIE", title: "AI in Schools" },
  { id: "JMLsHI8aV0g", title: "Theodore Zanto AI Project" },
  { id: "y5Twae7jr5Q", title: "How Computers Work" },
  { id: "Wchru8alhaE", title: "Computer Programming Language" },
  { id: "qOzMy8gOwXQ", title: "Intro to Computers for Kids" },
  { id: "RmbFJq2jADY", title: "Coding Blocks" },
  { id: "P2Fc0Aj_u58", title: "A Computer Brain" },
  { id: "mCq8-xTH7jA", title: "Logic Gates" },
  { id: "_j4Lj-BT00g", title: "Before you Code: Hardware" },
  { id: "97i2BAUw5Xc", title: "Internet Overview" },
  { id: "USCBCmwMCDA", title: "The Binary Number System" },
  { id: "DKGZlaPlVLY", title: "3 Main Things a Computer Does" },
  
  // Internet and Infrastructure
  { id: "OAx_6-wdslM", title: "How the Internet Works" },
  { id: "5o8CwafCxnU", title: "IP Addresses Explained" },
  { id: "ZghMPWGXexs", title: "Packets & Routing" },
  { id: "kBXQZMmiA4s", title: "Encryption and Security" }
];

const Videos = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate days since the Unix Epoch to mathematically rotate the Video of the Day every 24 hours
  const dayIndex = Math.floor(new Date().getTime() / (1000 * 3600 * 24));
  const videoOfTheDayIndex = dayIndex % videoList.length;
  
  const videoOfTheDay = videoList[videoOfTheDayIndex];
  
  // The rest of the videos go in the gallery below, filtered by search
  const moreVideos = videoList
    .filter((_, i) => i !== videoOfTheDayIndex)
    .filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto mb-12 flex flex-col gap-2">
          <span className="text-black font-mono font-bold tracking-widest text-sm uppercase flex items-center gap-2">
            <VideoIcon size={16} /> Video Zone
          </span>
          <h1 className="text-4xl md:text-5xl font-mono font-bold tracking-tight mb-2">Fun AI Videos</h1>
          <p className="text-lg text-black font-body">Watch amazing, real educational videos about Artificial Intelligence! A new featured video updates automatically every day.</p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Video of the Day Hero Section */}
          <div className="bg-card border-2 border-primary/20 rounded-[3rem] p-6 md:p-8 shadow-xl relative mt-8">
            <div className="absolute -top-6 left-8 bg-primary text-primary-foreground font-heading font-bold px-6 py-2 rounded-full flex items-center gap-2 shadow-lg animate-bounce-soft">
               <Star size={18} /> Video of the Day
            </div>
            
            <div className="grid grid-cols-1 space-y-4">
              <div className="aspect-video w-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black shadow-inner border-4 border-background">
                <iframe 
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoOfTheDay.id}?rel=0`}
                  title={videoOfTheDay.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground indent-2">
                {videoOfTheDay.title}
              </h2>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto -mt-4">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a video topic..." 
              className="w-full bg-card border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/20 rounded-full pl-12 pr-6 py-4 text-lg outline-none transition-all shadow-sm font-body"
            />
          </div>

          {/* More Videos Grid */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <h3 className="text-2xl font-heading font-bold tracking-tight text-muted-foreground">More AI Fun</h3>
              <div className="h-px flex-1 bg-border/60"></div>
            </div>
            
            {moreVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {moreVideos.map((v) => (
                  <div key={v.id} className="bg-card rounded-3xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50 group flex flex-col">
                    <div className="aspect-video bg-black relative m-2 border-2 border-background rounded-2xl overflow-hidden">
                      <iframe 
                        className="w-full h-full relative z-10"
                        src={`https://www.youtube.com/embed/${v.id}?rel=0`}
                        title={v.title}
                        allow="encrypted-media; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-4 pt-2">
                      <h4 className="font-heading font-bold text-lg leading-tight group-hover:text-primary transition-colors">{v.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-[2rem] border-2 border-dashed border-border flex flex-col items-center">
                 <span className="text-4xl mb-4">🔍</span>
                 <p className="text-muted-foreground font-bold font-mono">No videos found matching "{searchQuery}"</p>
              </div>
            )}
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default Videos;
