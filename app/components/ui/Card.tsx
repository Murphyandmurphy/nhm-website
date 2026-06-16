type CardProps = {
  children: React.ReactNode;
  surface?: "white" | "cream" | "blue" | "ink";
  raised?: boolean;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/** Card — the brand's content container. White on cream by default. */
export function Card({
  children,
  surface = "white",
  raised = false,
  interactive = false,
  className = "",
  style,
}: CardProps) {
  const surfClass =
    surface === "cream" ? "nhm-card--cream" : surface === "blue" ? "nhm-card--blue" : surface === "ink" ? "nhm-card--ink" : "";
  const cls = [
    "nhm-card",
    raised ? "nhm-card--raised" : "nhm-card--flat",
    surfClass,
    interactive ? "nhm-card--interactive" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} style={style}>
      {children}
    </div>
  );
}
