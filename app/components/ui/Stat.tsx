type StatProps = {
  value: React.ReactNode;
  label: React.ReactNode;
  tone?: "default" | "ink" | "onblue";
  className?: string;
};

/** Stat — big editorial number with a short label (proof bars). */
export function Stat({ value, label, tone = "default", className = "" }: StatProps) {
  const toneClass = tone === "ink" ? "nhm-stat--ink" : tone === "onblue" ? "nhm-stat--onblue" : "";
  return (
    <div className={`nhm-stat ${toneClass} ${className}`.trim()}>
      <span className="nhm-stat__num">{value}</span>
      <span className="nhm-stat__label">{label}</span>
    </div>
  );
}
