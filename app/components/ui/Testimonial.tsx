import { Icon } from "./Icon";

type TestimonialProps = {
  quote: React.ReactNode;
  name: React.ReactNode;
  role?: React.ReactNode;
  tone?: "default" | "onblue";
  showMark?: boolean;
  className?: string;
};

/** Testimonial — bold Larken-set client quote with attribution. */
export function Testimonial({
  quote,
  name,
  role,
  tone = "default",
  showMark = true,
  className = "",
}: TestimonialProps) {
  const toneClass = tone === "onblue" ? "nhm-tst--onblue" : "";
  return (
    <figure className={`nhm-tst ${toneClass} ${className}`.trim()} style={{ margin: 0 }}>
      {showMark ? <Icon name="Quote" size={36} className="nhm-tst__mark" /> : null}
      <p className="nhm-tst__quote">{quote}</p>
      <figcaption className="nhm-tst__by">
        <span className="nhm-tst__name">{name}</span>
        {role ? <span className="nhm-tst__role">{role}</span> : null}
      </figcaption>
    </figure>
  );
}
