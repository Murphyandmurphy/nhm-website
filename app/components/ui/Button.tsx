import Link from "next/link";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "ink" | "onblue";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  className?: string;
  href?: string;
};

type ButtonProps = BaseProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof BaseProps
  >;

/** Button — pill-shaped action. Renders a Next <Link> when `href` is set. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  className = "",
  href,
  ...rest
}: ButtonProps) {
  const cls = `nhm-btn nhm-btn--${size} nhm-btn--${variant} ${className}`.trim();
  const iconSize = size === "sm" ? 16 : 18;

  const inner = (
    <>
      {icon ? <Icon name={icon} size={iconSize} /> : null}
      <span>{children}</span>
      {iconRight ? <Icon name={iconRight} size={iconSize} /> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}
