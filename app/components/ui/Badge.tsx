import { Icon, type IconName } from "./Icon";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "blue" | "cream" | "ink" | "outline" | "eyebrow";
  icon?: IconName;
  className?: string;
};

/** Badge — small label / eyebrow. The "eyebrow" variant opens most sections. */
export function Badge({ children, variant = "blue", icon, className = "" }: BadgeProps) {
  return (
    <span className={`nhm-badge nhm-badge--${variant} ${className}`.trim()}>
      {icon ? <Icon name={icon} size={14} /> : null}
      {children}
    </span>
  );
}
