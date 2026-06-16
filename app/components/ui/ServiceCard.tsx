import Link from "next/link";
import { Icon, type IconName } from "./Icon";

type ServiceCardProps = {
  icon?: IconName;
  number?: string;
  title: React.ReactNode;
  children: React.ReactNode;
  ctaLabel?: string;
  href?: string;
  className?: string;
};

/** ServiceCard — one of the three "How I can help" overviews. */
export function ServiceCard({
  icon,
  number,
  title,
  children,
  ctaLabel = "Find out more",
  href = "#",
  className = "",
}: ServiceCardProps) {
  return (
    <div className={`nhm-service ${className}`.trim()}>
      {icon ? (
        <div className="nhm-service__icon">
          <Icon name={icon} size={26} stroke={1.6} />
        </div>
      ) : null}
      {number ? <div className="nhm-service__num">{number}</div> : null}
      <h3 className="nhm-service__title">{title}</h3>
      <p className="nhm-service__body">{children}</p>
      <Link className="nhm-service__cta" href={href}>
        {ctaLabel}
        <Icon name="ArrowRight" size={17} />
      </Link>
    </div>
  );
}
