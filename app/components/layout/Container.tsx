type ContainerProps = {
  narrow?: boolean;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/** Container — max-width wrapper with brand gutters. */
export function Container({ narrow, className = "", children, style }: ContainerProps) {
  return (
    <div className={`container ${narrow ? "container--narrow" : ""} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
