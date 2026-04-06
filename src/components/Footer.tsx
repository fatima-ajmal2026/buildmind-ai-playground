import { useState, useEffect } from "react";
import { Brain, Heart, ArrowRight, MessageSquare, Send, ShieldCheck, User } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import initialComments from "../data/comments.json";

const Footer = () => {
  const { toast } = useToast();
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  
  // Comment States
  const [comments, setComments] = useState(initialComments);
  const [newAuthor, setNewAuthor] = useState("");
  const [newMessage, setNewMessage] = useState("");
  
  // Admin Mode States
  const [logoClicks, setLogoClicks] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [replyTarget, setReplyTarget] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    // 1. Initial Local State
    if (localStorage.getItem('real_has_liked')) {
      setHasLiked(true);
    }

    const storedComments = localStorage.getItem('playground_guestbook');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }

    // 2. Real-Time Global Likes (CounterAPI.dev)
    const syncLikes = async () => {
      try {
        const res = await fetch("https://api.counterapi.dev/v1/buildmind-ai-playground/site-likes");
        const data = await res.json();
        if (data.count !== undefined) setLikes(data.count);
      } catch (e) {
        console.error("Likes sync failed", e);
      }
    };

    syncLikes();
    const interval = setInterval(syncLikes, 30000); // Sync every 30s
    return () => clearInterval(interval);
  }, []);

  const saveComments = (updatedComments: typeof comments) => {
    setComments(updatedComments);
    localStorage.setItem('playground_guestbook', JSON.stringify(updatedComments));
  };

  const handleLike = async () => {
    try {
      if (!hasLiked) {
        setHasLiked(true);
        localStorage.setItem('real_has_liked', 'true');
        const res = await fetch("https://api.counterapi.dev/v1/buildmind-ai-playground/site-likes/up");
        const data = await res.json();
        if (data.count !== undefined) setLikes(data.count);
      } else {
        setHasLiked(false);
        localStorage.removeItem('real_has_liked');
        const res = await fetch("https://api.counterapi.dev/v1/buildmind-ai-playground/site-likes/down");
        const data = await res.json();
        if (data.count !== undefined) setLikes(data.count);
      }
    } catch (e) {
      console.error("Like action failed", e);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newMessage) return;

    const newComment = {
      id: Date.now().toString(),
      author: newAuthor,
      text: newMessage,
      date: new Date().toLocaleDateString(),
      isOwner: false
    };

    saveComments([newComment, ...comments]);
    setNewAuthor("");
    setNewMessage("");
    toast({
      title: "Thought Received! 🚀",
      description: "Thanks for sharing your idea with us!",
    });
  };

  const handleAdminReply = (commentId: string) => {
    if (!replyText) return;
    const updated = comments.map(c => 
      c.id === commentId ? { ...c, reply: replyText } : c
    );
    saveComments(updated);
    setReplyTarget(null);
    setReplyText("");
    toast({
      title: "Reply Sent!",
      description: "Your official owner reply is now active.",
    });
  };

  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    if (newCount === 3) {
      const pw = prompt("Identity Check: What is the secret admin code?");
      if (pw === "123") {
        setIsAdmin(true);
        toast({ title: "Welcome back, Fatima!", description: "Owner Reply Mode is now ENABLED." });
      }
      setLogoClicks(0);
    } else {
      setLogoClicks(newCount);
      // Reset clicks after 2 seconds
      setTimeout(() => setLogoClicks(0), 2000);
    }
  };

  return (
    <footer className="bg-background border-t border-border mt-20 text-foreground relative">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Left Side */}
          <div className="flex flex-col items-start">
            <div 
              className="flex items-center gap-3 mb-6 group cursor-pointer"
              onClick={handleLogoClick}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                <Brain className="text-secondary-foreground" size={26} />
              </div>
              <span className="text-2xl font-mono font-bold tracking-tight">Building Minds</span>
            </div>
            <p className="text-lg opacity-80 leading-relaxed mb-8 max-w-sm">
              Helping kids learn about AI while having super safe, creative fun! Exploring the awesome future of computers together.
            </p>
            
            {/* Interactive Footer Actions */}
            <div className="flex flex-wrap items-center gap-3">
               <button 
                 onClick={handleLike}
                 className={`flex items-center gap-2 px-6 py-3 rounded-2xl border-2 transition-all shadow-sm font-mono font-bold cursor-pointer hover:-translate-y-0.5 active:scale-95 ${
                   hasLiked 
                     ? "bg-red-50 text-red-500 border-red-200 hover:bg-background hover:border-red-300" 
                     : "bg-card border-border hover:border-red-300 hover:text-red-500"
                 }`}
               >
                 <Heart className={hasLiked ? "fill-red-500 animate-pulse" : ""} size={18} />
                 {hasLiked ? "Liked!" : "Leave a Like"}
               </button>

               <div className="bg-muted/50 px-4 py-3 rounded-2xl flex items-center gap-2 border border-border">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground mr-1">Total Likes:</span>
                  <span className="text-foreground font-bold font-mono text-base">{likes}</span>
               </div>

               <Sheet>
                 <SheetTrigger asChild>
                   <button className="flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-border bg-card hover:border-primary hover:text-primary transition-all shadow-sm font-mono font-bold cursor-pointer hover:-translate-y-0.5 active:scale-95">
                     <MessageSquare size={18} />
                     Leave a Thought
                   </button>
                 </SheetTrigger>
                 <SheetContent side="right" className="w-full sm:max-w-md bg-background border-l border-border p-0 overflow-hidden flex flex-col">
                   <div className="p-6 border-b border-border bg-primary/5">
                     <SheetHeader>
                       <SheetTitle className="text-2xl font-mono font-bold flex items-center gap-2">
                         <MessageSquare className="text-primary" />
                         Guestbook
                       </SheetTitle>
                       <p className="text-sm text-muted-foreground font-mono">Share your big ideas about the future of AI!</p>
                     </SheetHeader>
                   </div>

                   {/* Scrollable Comments Area */}
                   <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-background custom-scrollbar">
                     {comments.map((comment) => (
                       <div key={comment.id} className={`group relative rounded-2xl border p-4 transition-all ${comment.isOwner ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'}`}>
                         <div className="flex justify-between items-start mb-2">
                           <div className="flex items-center gap-2">
                             {comment.isOwner ? <ShieldCheck className="text-primary w-4 h-4" /> : <User className="text-muted-foreground w-4 h-4" />}
                             <span className="font-bold font-mono text-sm">{comment.author}</span>
                           </div>
                           <span className="text-[10px] font-mono opacity-50">{comment.date}</span>
                         </div>
                         <p className="text-sm leading-relaxed mb-3">{comment.text}</p>
                         
                         {/* Replies */}
                         {comment.reply && (
                           <div className="mt-3 pl-4 border-l-2 border-primary/30 py-1 italic text-sm text-muted-foreground bg-primary/5 rounded-r-lg">
                             <span className="font-bold text-primary block text-[10px] uppercase mb-1">Fatima's Official Reply:</span>
                             "{comment.reply}"
                           </div>
                         )}

                         {/* Admin Reply Action */}
                         {isAdmin && !comment.reply && !comment.isOwner && (
                           <div className="mt-2">
                             {replyTarget === comment.id ? (
                               <div className="flex flex-col gap-2 p-2 bg-primary/5 rounded-lg border border-primary/20">
                                 <textarea 
                                   className="w-full text-xs p-2 rounded bg-background border border-border focus:outline-none" 
                                   placeholder="Type your official reply..."
                                   value={replyText}
                                   onChange={(e) => setReplyText(e.target.value)}
                                 />
                                 <div className="flex gap-2">
                                   <button 
                                     onClick={() => handleAdminReply(comment.id)}
                                     className="bg-primary text-secondary-foreground px-3 py-1 rounded text-[10px] font-bold"
                                   >Send Reply</button>
                                   <button 
                                     onClick={() => setReplyTarget(null)}
                                     className="bg-muted px-3 py-1 rounded text-[10px]"
                                   >Cancel</button>
                                 </div>
                               </div>
                             ) : (
                               <button 
                                 onClick={() => setReplyTarget(comment.id)}
                                 className="text-primary text-[10px] font-bold border-b border-primary/50 hover:border-primary transition-all"
                               >↩ REPLY AS OWNER</button>
                             )}
                           </div>
                         )}
                       </div>
                     ))}
                   </div>

                   {/* Add Comment Form */}
                   <div className="p-6 border-t border-border bg-card">
                     <form onSubmit={handleAddComment} className="flex flex-col gap-3">
                       <input 
                         placeholder="Your Name (e.g. Robot Explorer)" 
                         className="w-full px-4 py-2 rounded-xl bg-background border border-border font-mono text-sm focus:ring-1 focus:ring-primary"
                         value={newAuthor}
                         onChange={(e) => setNewAuthor(e.target.value)}
                       />
                       <div className="relative">
                         <textarea 
                           placeholder="What are you thinking? Keep it fun!" 
                           className="w-full px-4 py-3 rounded-xl bg-background border border-border font-mono text-sm focus:ring-1 focus:ring-primary min-h-[100px] resize-none"
                           value={newMessage}
                           onChange={(e) => setNewMessage(e.target.value)}
                         />
                         <button 
                           type="submit"
                           className="absolute bottom-3 right-3 w-10 h-10 bg-primary text-secondary-foreground rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
                         >
                           <Send size={18} />
                         </button>
                       </div>
                     </form>
                   </div>
                 </SheetContent>
               </Sheet>
            </div>
          </div>

          {/* Right Side - Newsletter form */}
          <div className="flex justify-start md:justify-end">
            <div className="bg-card border border-border p-8 rounded-3xl w-full max-w-md shadow-sm">
              <h4 className="font-heading text-xl font-bold mb-2">Join the Smart Club</h4>
              <p className="text-sm text-muted-foreground mb-6">Get the coolest new robot jokes and playground updates sent right to your inbox.</p>
              <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="CURRENTLY PENDING..." 
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-mono text-sm"
                />
                <button className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  SUBSCRIBE <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-mono text-muted-foreground">
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
          <p className="flex items-center gap-1">
            Built with <Heart size={14} className="text-coral fill-coral" /> by Fatima Ajmal
          </p>
          <p>© {new Date().getFullYear()} Building Minds. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
