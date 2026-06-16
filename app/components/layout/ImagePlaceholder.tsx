import { Icon, type IconName } from "../ui/Icon";

type ImagePlaceholderProps = {
  label: string;
  sublabel?: string;
  icon?: IconName;
  tone?: "default" | "ink" | "cream";
  style?: React.CSSProperties;
  className?: string;
};

/**
 * ImagePlaceholder — styled stand-in for a photo/illustration the client
 * will supply. Swap for next/image when real artwork is available.
 */
export function ImagePlaceholder({
  label,
  sublabel,
  icon = "Image",
  tone = "default",
  style,
  className = "",
}: ImagePlaceholderProps) {
  const toneClass = tone === "ink" ? "imgph--ink" : tone === "cream" ? "imgph--cream" : "";
  return (
    <div className={`imgph ${toneClass} ${className}`.trim()} style={style}>
      <div className="imgph__label">
        <Icon name={icon} size={30} stroke={1.4} className="imgph__icon" />
        <span>{label}</span>
        {sublabel ? <span style={{ opacity: 0.7, fontSize: "0.74rem" }}>{sublabel}</span> : null}
      </div>
    </div>
  );
}
