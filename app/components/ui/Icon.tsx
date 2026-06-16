import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";

export type IconName = keyof typeof LucideIcons;

type IconProps = {
  name: IconName;
  size?: number;
  stroke?: number;
  color?: string;
} & Omit<LucideProps, "ref" | "size" | "color" | "stroke">;

/**
 * Icon — thin wrapper over lucide-react. `name` is a PascalCase icon name,
 * e.g. "ArrowRight", "Compass". Mirrors the design-system Icon API.
 */
export function Icon({ name, size = 20, stroke = 1.75, color = "currentColor", ...rest }: IconProps) {
  const Cmp = LucideIcons[name] as React.ComponentType<LucideProps> | undefined;
  if (!Cmp) return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" />;
  return <Cmp size={size} strokeWidth={stroke} color={color} aria-hidden="true" {...rest} />;
}
