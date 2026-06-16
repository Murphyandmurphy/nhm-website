import { Icon, type IconName } from "./Icon";

type FeatureItemProps = {
  icon: IconName;
  title: React.ReactNode;
  children: React.ReactNode;
  layout?: "row" | "stack";
  className?: string;
};

/** FeatureItem — icon + heading + body. Used for "My approach" principles. */
export function FeatureItem({ icon, title, children, layout = "row", className = "" }: FeatureItemProps) {
  const layoutClass = layout === "stack" ? "nhm-feat--center" : "";
  return (
    <div className={`nhm-feat ${layoutClass} ${className}`.trim()}>
      <div className="nhm-feat__icon">
        <Icon name={icon} size={23} stroke={1.6} />
      </div>
      <div>
        <h4 className="nhm-feat__title">{title}</h4>
        <p className="nhm-feat__body">{children}</p>
      </div>
    </div>
  );
}
