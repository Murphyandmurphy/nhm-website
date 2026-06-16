import { Button } from "../ui/Button";

type CTABlockProps = {
  title: React.ReactNode;
  body: React.ReactNode;
  ctaLabel?: string;
  href?: string;
  tone?: "blue" | "ink";
};

/** CTABlock — full-width blue (or ink) call-to-action panel. */
export function CTABlock({ title, body, ctaLabel = "Get in touch", href = "/contact", tone = "blue" }: CTABlockProps) {
  const surface: React.CSSProperties =
    tone === "ink"
      ? { background: "var(--ink-900)", color: "#fff" }
      : { background: "var(--blue-500)", color: "#fff", boxShadow: "var(--shadow-lg)" };
  return (
    <div className="ctablock" style={surface}>
      <h2 className="ctablock__title">{title}</h2>
      <p className="ctablock__body" style={{ color: tone === "ink" ? "var(--cream-300)" : "var(--blue-100)" }}>
        {body}
      </p>
      <Button variant="onblue" size="lg" iconRight="ArrowRight" href={href}>
        {ctaLabel}
      </Button>
    </div>
  );
}
