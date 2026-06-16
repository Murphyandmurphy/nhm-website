import { Container } from "./Container";

type SectionProps = {
  tone?: "cream" | "white" | "paper" | "ink" | "blue";
  id?: string;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

/** Section — full-width tonal band wrapping a Container. */
export function Section({ tone = "cream", id, className = "", children, style }: SectionProps) {
  return (
    <section id={id} className={`section section--${tone} ${className}`.trim()} style={style}>
      <Container>{children}</Container>
    </section>
  );
}
