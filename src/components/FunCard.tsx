import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface FunCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: "primary" | "secondary" | "sunshine" | "mint" | "coral" | "lavender";
  badge?: string;
  link?: string;
}

const colorMap = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  sunshine: "bg-sunshine text-sunshine-foreground",
  mint: "bg-mint text-mint-foreground",
  coral: "bg-coral text-coral-foreground",
  lavender: "bg-lavender text-lavender-foreground",
};

const borderColorMap = {
  primary: "hover:border-primary",
  secondary: "hover:border-secondary",
  sunshine: "hover:border-sunshine",
  mint: "hover:border-mint",
  coral: "hover:border-coral",
  lavender: "hover:border-lavender",
};

const FunCard = ({ icon, title, description, color, badge, link }: FunCardProps) => {
  const CardContent = (
    <div className={`h-full bg-card rounded-3xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300 ease-out cursor-pointer hover:-translate-y-1 ${borderColorMap[color]} group relative overflow-hidden flex flex-col`}>
      <div className="flex justify-between items-start mb-6">
        {badge ? (
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-border bg-background text-muted-foreground uppercase tracking-wider">
            {badge}
          </span>
        ) : <div />}
        <div className={`w-12 h-12 rounded-2xl ${colorMap[color]} flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
      </div>
      <h3 className="font-heading text-xl font-bold mb-2 tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{description}</p>
    </div>
  );

  return link ? (
    <Link to={link || '#'} className="block h-full no-underline">
      {CardContent}
    </Link>
  ) : (
    CardContent
  );
};

export default FunCard;
