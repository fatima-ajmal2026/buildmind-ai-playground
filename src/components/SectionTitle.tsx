const SectionTitle = ({ emoji, title, subtitle }: { emoji: string; title: string; subtitle?: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-heading">
      {title} {emoji}
    </h2>
    {subtitle && <p className="text-muted-foreground mt-2 max-w-xl mx-auto">{subtitle}</p>}
  </div>
);

export default SectionTitle;
