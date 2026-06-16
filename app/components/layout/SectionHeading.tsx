import { Badge } from "../ui/Badge";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  center?: boolean;
  align?: React.CSSProperties["textAlign"];
};

/** SectionHeading — eyebrow + Larken title + optional lead. */
export function SectionHeading({ eyebrow, title, lead, center, align }: SectionHeadingProps) {
  return (
    <div className={`shead ${center ? "shead--center" : ""}`.trim()} style={align ? { textAlign: align } : undefined}>
      {eyebrow ? <Badge variant="eyebrow">{eyebrow}</Badge> : null}
      <h2 className="shead__title">{title}</h2>
      {lead ? <p className="shead__lead">{lead}</p> : null}
    </div>
  );
}
