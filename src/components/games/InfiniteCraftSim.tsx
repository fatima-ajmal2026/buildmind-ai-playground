import { useState, useEffect } from "react";
import { Zap, Sparkles, Tag } from "lucide-react";

export type SemanticTag = 
  | 'hot' | 'cold' | 'fluid' | 'solid' | 'life' 
  | 'danger' | 'energy' | 'machine' | 'nature' 
  | 'space' | 'magic' | 'architecture' | 'food' 
  | 'concept';

type Element = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  tags: SemanticTag[];
};

// Initial starting elements
const startElements: Element[] = [
  { id: "water", name: "Water", emoji: "💧", color: "bg-blue-100 text-blue-900 border-blue-300", tags: ['fluid', 'nature', 'cold'] },
  { id: "fire", name: "Fire", emoji: "🔥", color: "bg-red-100 text-red-900 border-red-300", tags: ['hot', 'danger', 'energy'] },
  { id: "earth", name: "Earth", emoji: "🌍", color: "bg-green-100 text-green-900 border-green-300", tags: ['solid', 'nature'] },
  { id: "wind", name: "Wind", emoji: "💨", color: "bg-gray-100 text-gray-900 border-gray-300", tags: ['fluid', 'energy', 'nature'] },
];

// Crafting Recipes
const RECIPES: Record<string, Element> = {
  // Basic combinations
  "fire-water": { id: "steam", name: "Steam", emoji: "🌫️", color: "bg-gray-200 text-gray-700 border-gray-300", tags: ['fluid', 'hot'] },
  "earth-water": { id: "mud", name: "Mud", emoji: "🟫", color: "bg-amber-100 text-amber-900 border-amber-300", tags: ['solid', 'fluid', 'nature'] },
  "earth-fire": { id: "lava", name: "Lava", emoji: "🌋", color: "bg-orange-200 text-orange-900 border-orange-400", tags: ['solid', 'hot', 'danger'] },
  "fire-wind": { id: "smoke", name: "Smoke", emoji: "💨", color: "bg-stone-200 text-stone-800 border-stone-300", tags: ['fluid', 'hot'] },
  "earth-wind": { id: "dust", name: "Dust", emoji: "🌪️", color: "bg-yellow-50 text-yellow-900 border-yellow-200", tags: ['solid', 'fluid'] },
  "water-water": { id: "lake", name: "Lake", emoji: "🏞️", color: "bg-blue-300 text-blue-900 border-blue-400", tags: ['fluid', 'nature'] },
  "fire-fire": { id: "volcano", name: "Volcano", emoji: "🌋", color: "bg-red-300 text-red-900 border-red-500", tags: ['nature', 'hot', 'danger'] },
  "earth-earth": { id: "mountain", name: "Mountain", emoji: "⛰️", color: "bg-slate-300 text-slate-800 border-slate-400", tags: ['solid', 'nature'] },
  "wind-wind": { id: "tornado", name: "Tornado", emoji: "🌪️", color: "bg-gray-300 text-gray-900 border-gray-400", tags: ['fluid', 'danger', 'energy'] },
  
  // Advanced combinations
  "lake-water": { id: "ocean", name: "Ocean", emoji: "🌊", color: "bg-blue-400 text-blue-900 border-blue-500", tags: ['fluid', 'nature'] },
  "dust-water": { id: "mud", name: "Mud", emoji: "🟫", color: "bg-amber-100 text-amber-900 border-amber-300", tags: ['solid', 'fluid'] },
  "mountain-smoke": { id: "volcano", name: "Volcano", emoji: "🌋", color: "bg-red-300 text-red-900 border-red-500", tags: ['nature', 'hot', 'danger'] },
  "ocean-wind": { id: "storm", name: "Storm", emoji: "⛈️", color: "bg-indigo-200 text-indigo-900 border-indigo-400", tags: ['danger', 'energy', 'fluid'] },
  "dust-wind": { id: "sandstorm", name: "Sandstorm", emoji: "🌫️", color: "bg-orange-100 text-orange-800 border-orange-300", tags: ['danger', 'fluid', 'solid'] },
  "fire-mud": { id: "brick", name: "Brick", emoji: "🧱", color: "bg-red-200 text-red-900 border-red-400", tags: ['solid', 'architecture'] },
  "brick-brick": { id: "wall", name: "Wall", emoji: "🚧", color: "bg-stone-300 text-stone-900 border-stone-400", tags: ['solid', 'architecture'] },
  "wall-wall": { id: "house", name: "House", emoji: "🏠", color: "bg-yellow-100 text-yellow-900 border-yellow-300", tags: ['architecture'] },
  "house-house": { id: "village", name: "Village", emoji: "🏘️", color: "bg-green-200 text-green-900 border-green-400", tags: ['architecture', 'life'] },
  "village-village": { id: "city", name: "City", emoji: "🏙️", color: "bg-slate-200 text-slate-900 border-slate-300", tags: ['architecture', 'machine'] },
  "fire-sandstorm": { id: "glass", name: "Glass", emoji: "🪟", color: "bg-cyan-100 text-cyan-800 border-cyan-300", tags: ['solid', 'architecture', 'hot'] },
  "glass-water": { id: "aquarium", name: "Aquarium", emoji: "🐟", color: "bg-blue-100 text-blue-800 border-blue-300", tags: ['fluid', 'life', 'architecture'] },
  "lightning-water": { id: "life", name: "Life", emoji: "🌱", color: "bg-green-300 text-green-900 border-green-500", tags: ['life', 'nature'] },
  "storm-storm": { id: "lightning", name: "Lightning", emoji: "⚡", color: "bg-yellow-300 text-yellow-900 border-yellow-500", tags: ['energy', 'danger', 'hot'] },
  
  // Fun combos
  "earth-life": { id: "human", name: "Human", emoji: "🧑", color: "bg-pink-100 text-pink-900 border-pink-300", tags: ['life', 'concept'] },
  "house-human": { id: "family", name: "Family", emoji: "👨‍👩‍👧", color: "bg-orange-100 text-orange-900 border-orange-300", tags: ['life', 'concept'] },
  "human-lightning": { id: "wizard", name: "Wizard", emoji: "🧙", color: "bg-purple-200 text-purple-900 border-purple-400", tags: ['life', 'magic', 'energy'] },
  "human-human": { id: "love", name: "Love", emoji: "❤️", color: "bg-red-100 text-red-600 border-red-400", tags: ['concept', 'life', 'hot'] },
  "city-human": { id: "robot", name: "Robot", emoji: "🤖", color: "bg-gray-200 text-gray-800 border-gray-400", tags: ['machine', 'energy', 'architecture'] },
  "lightning-robot": { id: "ai", name: "Artificial Intelligence", emoji: "🧠", color: "bg-primary/20 text-primary border-primary", tags: ['machine', 'magic', 'concept', 'energy'] },
};

// Distinct fallback items tagged for the Semantic Engine
const secretElements: Element[] = [
  { id: "alien", name: "Alien", emoji: "👽", color: "bg-emerald-100 text-emerald-900 border-emerald-300", tags: ['life', 'space', 'danger'] },
  { id: "dinosaur", name: "Dinosaur", emoji: "🦖", color: "bg-green-200 text-green-900 border-green-400", tags: ['life', 'nature', 'danger'] },
  { id: "laser", name: "Laser", emoji: "🔫", color: "bg-red-200 text-red-900 border-red-500", tags: ['energy', 'machine', 'danger'] },
  { id: "pizza", name: "Pizza", emoji: "🍕", color: "bg-orange-100 text-orange-900 border-orange-300", tags: ['food', 'hot'] },
  { id: "icecream", name: "Ice Cream", emoji: "🍦", color: "bg-pink-100 text-pink-900 border-pink-300", tags: ['food', 'cold'] },
  { id: "ghost", name: "Ghost", emoji: "👻", color: "bg-gray-100 text-gray-800 border-gray-300", tags: ['magic', 'life'] },
  { id: "dragon", name: "Dragon", emoji: "🐉", color: "bg-red-100 text-red-900 border-red-400", tags: ['magic', 'danger', 'hot', 'life'] },
  { id: "unicorn", name: "Unicorn", emoji: "🦄", color: "bg-pink-100 text-pink-900 border-pink-300", tags: ['magic', 'life', 'nature'] },
  { id: "ninja", name: "Ninja", emoji: "🥷", color: "bg-stone-300 text-stone-900 border-stone-500", tags: ['life', 'danger'] },
  { id: "pirate", name: "Pirate", emoji: "🏴‍☠️", color: "bg-slate-200 text-slate-900 border-slate-500", tags: ['life', 'fluid', 'danger'] },
  { id: "spaceship", name: "Spaceship", emoji: "🚀", color: "bg-indigo-100 text-indigo-900 border-indigo-300", tags: ['space', 'machine', 'energy', 'architecture'] },
  { id: "blackhole", name: "Black Hole", emoji: "🕳️", color: "bg-purple-300 text-purple-900 border-purple-500", tags: ['space', 'danger', 'energy', 'magic'] },
  { id: "magic", name: "Magic", emoji: "✨", color: "bg-yellow-200 text-yellow-900 border-yellow-400", tags: ['magic', 'energy'] },
  { id: "time", name: "Time", emoji: "⏳", color: "bg-amber-100 text-amber-900 border-amber-300", tags: ['concept', 'magic'] },
  { id: "zombie", name: "Zombie", emoji: "🧟", color: "bg-lime-200 text-lime-900 border-lime-500", tags: ['life', 'danger', 'cold'] },
  { id: "treasure", name: "Treasure", emoji: "💎", color: "bg-cyan-200 text-cyan-900 border-cyan-400", tags: ['solid', 'magic'] },
  { id: "computer", name: "Computer", emoji: "💻", color: "bg-blue-200 text-blue-900 border-blue-400", tags: ['machine', 'energy', 'architecture'] },
  { id: "vampire", name: "Vampire", emoji: "🧛", color: "bg-red-200 text-red-900 border-red-500", tags: ['life', 'magic', 'danger'] },
  { id: "superhero", name: "Superhero", emoji: "🦸", color: "bg-primary/20 text-primary border-primary", tags: ['life', 'energy', 'magic'] },
  { id: "monster", name: "Monster", emoji: "👾", color: "bg-violet-200 text-violet-900 border-violet-400", tags: ['danger', 'life', 'magic'] },
  { id: "ufo", name: "UFO", emoji: "🛸", color: "bg-stone-200 text-stone-800 border-stone-400", tags: ['space', 'machine', 'danger'] },
  { id: "internet", name: "The Internet", emoji: "🌐", color: "bg-sky-200 text-sky-900 border-sky-400", tags: ['machine', 'concept', 'energy'] },
  { id: "music", name: "Music", emoji: "🎵", color: "bg-rose-200 text-rose-900 border-rose-400", tags: ['concept'] },
  { id: "sun", name: "The Sun", emoji: "☀️", color: "bg-yellow-300 text-yellow-900 border-yellow-500", tags: ['space', 'hot', 'energy'] },
  { id: "moon", name: "The Moon", emoji: "🌙", color: "bg-slate-100 text-slate-800 border-slate-300", tags: ['space', 'cold'] },
  { id: "star", name: "Star", emoji: "⭐", color: "bg-yellow-200 text-yellow-800 border-yellow-400", tags: ['space', 'energy', 'hot'] },
  { id: "cloud", name: "Cloud", emoji: "☁️", color: "bg-gray-100 text-gray-600 border-gray-300", tags: ['fluid', 'nature'] },
  { id: "snow", name: "Snow", emoji: "❄️", color: "bg-cyan-50 text-cyan-800 border-cyan-200", tags: ['cold', 'fluid', 'nature'] },
  { id: "ice", name: "Ice", emoji: "🧊", color: "bg-sky-100 text-sky-800 border-sky-300", tags: ['cold', 'solid', 'fluid'] },
  { id: "tree", name: "Tree", emoji: "🌳", color: "bg-green-200 text-green-900 border-green-500", tags: ['life', 'nature', 'solid'] },
  { id: "bug", name: "Bug", emoji: "🐛", color: "bg-lime-100 text-lime-900 border-lime-300", tags: ['life', 'nature'] },
  { id: "bird", name: "Bird", emoji: "🐦", color: "bg-blue-100 text-blue-800 border-blue-400", tags: ['life', 'nature', 'fluid'] }, // Fluid (flies in air)
  { id: "car", name: "Car", emoji: "🚗", color: "bg-red-100 text-red-800 border-red-300", tags: ['machine', 'solid', 'architecture'] },
  { id: "airplane", name: "Airplane", emoji: "✈️", color: "bg-sky-100 text-sky-800 border-sky-300", tags: ['machine', 'fluid', 'architecture'] },
];

const getRecipe = (id1: string, id2: string) => {
  return RECIPES[`${id1}-${id2}`] || RECIPES[`${id2}-${id1}`] || null;
};

const getSecret = (id: string) => secretElements.find(s => s.id === id);

const InfiniteCraftSim = () => {
  const [inventory, setInventory] = useState<Element[]>(startElements);
  const [workbench, setWorkbench] = useState<(Element | null)[]>([null, null]);
  const [discovery, setDiscovery] = useState<Element | null>(null);

  const addToWorkbench = (element: Element) => {
    // If workbench is already full (either combining or finished), clear it first
    if (workbench[0] && workbench[1]) {
      setWorkbench([element, null]);
      setDiscovery(null);
      return;
    }

    if (!workbench[0]) {
      setWorkbench([element, workbench[1]]);
    } else if (!workbench[1]) {
      setWorkbench([workbench[0], element]);
    }
  };

  const removeFromWorkbench = (index: number) => {
    const newBench = [...workbench];
    newBench[index] = null;
    setWorkbench(newBench);
    setDiscovery(null);
  };

  // The Semantic Engine replaces random math hashing with pure logic!
  const generateSemanticCombo = (el1: Element, el2: Element): Element => {
    // 1. If mixing identical objects, upgrade them to 'Super' and 'Mega' logic
    if (el1.id === el2.id && !el1.name.includes("Super")) {
       return {
         id: `super-${el1.id}`,
         name: `Super ${el1.name}`,
         emoji: `✨${el1.emoji}`,
         color: "bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300 shadow-[0_0_15px_rgba(232,121,249,0.5)]",
         tags: [...el1.tags, 'magic', 'energy']
       };
    }

    if (el1.id === el2.id) {
       return {
         id: `mega-${el1.id}`,
         name: `Mega ${el1.name.replace('Super ', '')}`,
         emoji: `🌟${el1.emoji}`,
         color: "bg-purple-200 text-purple-900 border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.8)]",
         tags: [...el1.tags, 'magic', 'energy', 'danger']
       };
    }

    // 2. Synthesize tags from both combined items
    const allTagSet = new Set([...(el1.tags || []), ...(el2.tags || [])]);
    const tags = Array.from(allTagSet);

    // Helper to evaluate semantic overlaps
    const has = (t1: SemanticTag, t2?: SemanticTag) => {
      if (t2) return allTagSet.has(t1) && allTagSet.has(t2);
      return allTagSet.has(t1);
    };

    // 3. SEMANTIC RESOLUTION RULES (Matching abstract combinations to secrets)
    
    // Space & Sci-Fi
    if (has('space', 'danger')) return getSecret('blackhole')!;
    if (has('space', 'life')) return getSecret('alien')!;
    if (has('space', 'machine')) return getSecret('spaceship') || getSecret('ufo')!;
    if (has('space', 'hot')) return getSecret('sun') || getSecret('star')!;
    if (has('space', 'cold')) return getSecret('moon')!;

    // Fantasy & Magic
    if (has('magic', 'danger')) return getSecret('dragon')!;
    if (has('magic', 'life')) return getSecret('unicorn') || getSecret('wizard')!;
    if (has('magic', 'solid')) return getSecret('treasure')!;
    if (has('magic') && (has('architecture') || has('fluid'))) return getSecret('portal')!;
    if (has('life', 'danger') && has('cold')) return getSecret('zombie')!;
    if (has('life', 'danger') && has('hot')) return getSecret('vampire')!;

    // Modern / Tech
    if (has('machine', 'concept')) return getSecret('internet')!;
    if (has('machine', 'energy')) return getSecret('computer') || getSecret('laser')!;
    if (has('machine') && has('fluid')) return getSecret('airplane')!; // Airplane travels in fluid (air)
    if (has('machine') && has('solid')) return getSecret('car')!;

    // Nature & Life
    if (has('nature', 'danger')) return getSecret('dinosaur')!;
    if (has('life', 'danger')) return getSecret('monster') || getSecret('bug')!;
    if (has('cold', 'fluid')) return getSecret('snow') || getSecret('ice')!;
    if (has('nature', 'solid')) return getSecret('tree')!;

    // Food
    if (has('food', 'hot')) return getSecret('pizza')!;
    if (has('food', 'cold')) return getSecret('icecream')!;

    // 4. Default Fail/Fallback (if tags are too abstract or don't match rules)
    // We deterministically sort their tags to generate a consistent hash index
    const sortedTags = tags.sort();
    const hashString = sortedTags.join("");
    let hash = 0;
    for (let i = 0; i < hashString.length; i++) hash = ((hash << 5) - hash) + hashString.charCodeAt(i);
    const index = Math.abs(hash) % secretElements.length;
    return secretElements[index];
  };

  useEffect(() => {
    if (workbench[0] && workbench[1]) {
      let result = getRecipe(workbench[0].id, workbench[1].id);
      
      // If no hardcoded combination exists, we run it through the Semantic Engine!
      if (!result) {
        result = generateSemanticCombo(workbench[0], workbench[1]);
      }

      setDiscovery(result);
      if (!inventory.find(i => i.id === result!.id)) {
        setInventory(prev => [result!, ...prev]); // Add new items to top of inventory
      }

      // Automatically clear the workbench after 1.5 seconds so they can keep crafting
      const timer = setTimeout(() => {
        clearWorkbench();
      }, 1500);

      return () => clearTimeout(timer);
    } else {
      setDiscovery(null);
    }
  }, [workbench, inventory]);

  const clearWorkbench = () => {
    setWorkbench([null, null]);
    setDiscovery(null);
  };

  return (
    <div className="flex flex-col h-full w-full bg-background relative selection:bg-primary/20 p-4 md:p-8">
      <div className="text-center space-y-2 mb-8 mt-6 md:mt-0">
        <h2 className="text-3xl font-heading font-bold text-foreground flex items-center justify-center gap-2">
          <Zap className="text-sunshine" /> AI Crafting Array
        </h2>
        <p className="text-muted-foreground font-body max-w-xl mx-auto">
          Driven by a real <strong>Semantic Tag Engine!</strong> Combine elements logically by their traits (e.g. Mixing 'Life' with 'Space' yields...)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 flex-1 w-full max-w-5xl mx-auto">
        
        {/* Crafting Area (Left) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="bg-card border-2 border-border border-dashed rounded-[2rem] p-8 flex flex-col items-center justify-center min-h-[300px] shadow-sm relative">
            <div className="text-xs font-mono font-bold text-muted-foreground uppercase absolute top-4 mb-4 tracking-widest">Workbench</div>
            
            <div className="flex items-center justify-center gap-4 w-full mt-4">
              {/* Slot 1 */}
              <div 
                onClick={() => workbench[0] && removeFromWorkbench(0)}
                className={`w-28 h-28 rounded-2xl flex flex-col items-center justify-center border-4 transition-all group ${
                  workbench[0] ? `cursor-pointer hover:scale-95 ${workbench[0].color}` : 'border-border border-dashed bg-background'
                }`}
              >
                {workbench[0] ? (
                  <>
                    <span className="text-4xl leading-tight text-center">{workbench[0].emoji}</span>
                    <span className="text-xs font-bold mt-2 text-center px-1 truncate w-full">{workbench[0].name}</span>
                    {/* Visual debug of semantic tags for the user! */}
                    <div className="flex gap-1 absolute -top-3 px-2 pb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">
                       {(workbench[0].tags || []).slice(0, 2).map((t, i) => (
                         <span key={i} className="text-[9px] bg-background border px-1 rounded-sm shadow-sm"><Tag size={8} className="inline mr-[2px]"/>{t}</span>
                       ))}
                    </div>
                  </>
                ) : (
                  <span className="text-muted-foreground/30 text-4xl">+</span>
                )}
              </div>

              <div className="text-muted-foreground font-bold text-xl">+</div>

              {/* Slot 2 */}
              <div 
                onClick={() => workbench[1] && removeFromWorkbench(1)}
                className={`w-28 h-28 rounded-2xl flex flex-col items-center justify-center border-4 transition-all group ${
                  workbench[1] ? `cursor-pointer hover:scale-95 ${workbench[1].color}` : 'border-border border-dashed bg-background'
                }`}
              >
                {workbench[1] ? (
                  <>
                    <span className="text-4xl leading-tight text-center">{workbench[1].emoji}</span>
                    <span className="text-xs font-bold mt-2 text-center px-1 truncate w-full">{workbench[1].name}</span>
                    <div className="flex gap-1 absolute -top-3 px-2 pb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">
                       {(workbench[1].tags || []).slice(0, 2).map((t, i) => (
                         <span key={i} className="text-[9px] bg-background border px-1 rounded-sm shadow-sm"><Tag size={8} className="inline mr-[2px]"/>{t}</span>
                       ))}
                    </div>
                  </>
                ) : (
                  <span className="text-muted-foreground/30 text-4xl">+</span>
                )}
              </div>
            </div>

            {/* Equals / Result */}
            <div className="mt-6 flex flex-col items-center w-full min-h-[120px]">
              <div className="text-muted-foreground font-bold text-xl mb-4">=</div>
              {discovery ? (
                <div className={`w-full py-4 px-6 rounded-2xl border-4 text-center animate-bounce-soft shadow-lg relative group ${discovery.color}`}>
                  <div className="text-3xl mb-1 truncate">{discovery.emoji}</div>
                  <div className="font-bold text-lg truncate px-2">{discovery.name}</div>
                  {discovery.id === "ai" && <div className="text-xs font-bold uppercase tracking-widest mt-1"><Sparkles size={12} className="inline"/> YOU WON! <Sparkles size={12} className="inline"/></div>}
                  {/* Result tags hint */}
                  <div className="absolute -top-3 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     {(discovery.tags || []).slice(0, 2).map((t, i) => (
                         <span key={i} className="text-[9px] bg-background border px-1 rounded-sm shadow-sm"><Tag size={8} className="inline mr-[2px]"/>{t}</span>
                     ))}
                  </div>
                </div>
              ) : (
                <div className="w-full py-4 px-6 rounded-2xl border-4 border-border border-dashed text-center bg-muted/30 opacity-50">
                  <div className="text-xl text-muted-foreground/50 font-bold">?</div>
                </div>
              )}
            </div>

            <button 
              onClick={clearWorkbench}
              disabled={!workbench[0] && !workbench[1]}
              className="mt-6 text-sm font-mono font-bold text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:hover:text-muted-foreground"
            >
              CLEAR WORKBENCH
            </button>
          </div>
        </div>

        {/* Inventory Array (Right) */}
        <div className="md:col-span-7 flex flex-col h-[500px]">
          <div className="bg-card border border-border rounded-[2rem] p-6 shadow-sm flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-4 border-b border-border pb-4 shrink-0">
               <h3 className="font-mono font-bold text-foreground">Inventory</h3>
               <span className="text-xs font-bold bg-muted text-muted-foreground px-3 py-1 rounded-full">{inventory.length} Discovered</span>
            </div>
            
            <div className="flex flex-wrap gap-2 overflow-y-auto content-start flex-1 pr-2 pb-4 scrollbar-thin scrollbar-thumb-border">
              {inventory.map((item) => (
                <button
                  key={item.id}
                  onClick={() => addToWorkbench(item)}
                  className={`px-3 py-2 rounded-xl border-2 font-bold font-body text-sm flex items-center gap-2 hover:-translate-y-1 hover:shadow-md transition-all active:scale-95 group relative ${item.color} max-w-full`}
                  title={item.tags?.join(", ")}
                >
                  <span className="text-lg shrink-0">{item.emoji}</span>
                  <span className="truncate">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InfiniteCraftSim;
