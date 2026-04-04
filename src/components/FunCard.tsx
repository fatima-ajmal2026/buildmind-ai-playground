import { ReactNode } from "react";

interface FunCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: "primary" | "secondary" | "sunshine" | "mint" | "coral" | "lavender";
}

const colorMap = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  sunshine: "bg-sunshine/10 text-sunshine-foreground",
  mint: "bg-mint/10 text-mint",
  coral: "bg-coral/10 text-coral",
  lavender: "bg-lavender/10 text-lavender",
};

const borderColorMap = {
  primary: "hover:border-primary/30",
  secondary: "hover:border-secondary/30",
  sunshine: "hover:border-sunshine/30",
  mint: "hover:border-mint/30",
  coral: "hover:border-coral/30",
  lavender: "hover:border-lavender/30",
};

const FunCard = ({ icon, title, description, color }: FunCardProps) => (
  <div className={`bg-card rounded-2xl border border-border p-6 card-hover cursor-pointer ${borderColorMap[color]}`}>
    <div className={`w-14 h-14 rounded-xl ${colorMap[color]} flex items-center justify-center mb-4 text-2xl`}>
      {icon}
    </div>
    <h3 className="font-heading text-lg mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
  </div>
);

export default FunCard;
