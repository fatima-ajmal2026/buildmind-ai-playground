import { useState } from "react";
import { Navigation, Play, RotateCcw } from "lucide-react";

const GRID_SIZE = 6;
type Point = { x: number, y: number };

const PathRobot = () => {
  const [walls, setWalls] = useState<Set<string>>(new Set());
  const [path, setPath] = useState<string[]>([]);
  const start: Point = { x: 0, y: 0 };
  const goal: Point = { x: GRID_SIZE - 1, y: GRID_SIZE - 1 };

  const toggleWall = (x: number, y: number) => {
    if ((x === start.x && y === start.y) || (x === goal.x && y === goal.y)) return;
    const newWalls = new Set(walls);
    const key = `${x},${y}`;
    if (newWalls.has(key)) newWalls.delete(key);
    else newWalls.add(key);
    setWalls(newWalls);
    setPath([]);
  };

  const findPath = () => {
    const queue: { point: Point, p: string[] }[] = [{ point: start, p: [`${start.x},${start.y}`] }];
    const visited = new Set([`${start.x},${start.y}`]);
    const isWall = (x: number, y: number) => walls.has(`${x},${y}`);

    while (queue.length > 0) {
      const { point, p } = queue.shift()!;
      if (point.x === goal.x && point.y === goal.y) {
        setPath(p);
        return;
      }
      
      const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      for (const [dx, dy] of dirs) {
        const nx = point.x + dx;
        const ny = point.y + dy;
        const key = `${nx},${ny}`;
        if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE && !visited.has(key) && !isWall(nx, ny)) {
          visited.add(key);
          queue.push({ point: { x: nx, y: ny }, p: [...p, key] });
        }
      }
    }
    // No path found
    setPath(["no-path"]);
  };

  return (
    <div className="w-full h-full flex flex-col p-8 bg-lavender/10 items-center justify-center">
      <h2 className="text-4xl font-heading font-bold text-lavender-foreground mb-4">Pathfinding Visualizer</h2>
      <p className="font-body text-xl text-muted-foreground mb-8 text-center max-w-xl">
        Click the grid to place obstacle walls. Then, watch the AI algorithm automatically calculate the shortest possible route!
      </p>

      <div className="grid border-4 border-border bg-card rounded-2xl overflow-hidden mb-8 shadow-inner" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const key = `${x},${y}`;
          const isStart = x === start.x && y === start.y;
          const isGoal = x === goal.x && y === goal.y;
          const isWall = walls.has(key);
          const isPath = path.includes(key);

          return (
            <div 
              key={key} 
              onClick={() => toggleWall(x, y)}
              className={`w-16 h-16 border border-border/50 flex items-center justify-center cursor-pointer transition-colors
                ${isStart ? "bg-green-400" : ""}
                ${isGoal ? "bg-red-400" : ""}
                ${isWall ? "bg-slate-800" : ""}
                ${isPath && !isStart && !isGoal ? "bg-lavender animate-pulse" : ""}
                ${!isWall && !isStart && !isGoal && !isPath ? "hover:bg-muted" : ""}
              `}
            >
              {isStart && <Navigation size={24} className="text-white" />}
            </div>
          );
        })}
      </div>

      <div className="flex gap-4">
        <button onClick={findPath} className="bg-lavender text-lavender-foreground px-8 py-4 rounded-full font-bold text-xl hover:-translate-y-1 transition-all flex items-center gap-2">
           <Play fill="currentColor" /> Compute Route
        </button>
        <button onClick={() => { setWalls(new Set()); setPath([]); }} className="bg-muted text-muted-foreground px-8 py-4 rounded-full font-bold text-xl hover:-translate-y-1 transition-all flex items-center gap-2">
           <RotateCcw /> Reset Walls
        </button>
      </div>

      {path[0] === "no-path" && (
        <p className="mt-4 font-mono text-destructive font-bold text-lg animate-pulse">NO PATH AVAILABLE!</p>
      )}
    </div>
  );
};

export default PathRobot;
