import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ImagePlaceholder } from "./layout/ImagePlaceholder";
import type { IconName } from "./ui/Icon";

type SanityImageValue = { asset?: { _ref?: string }; alt?: string } | null | undefined;

type Fallback = {
  label: string;
  sublabel?: string;
  icon?: IconName;
  tone?: "default" | "ink" | "cream";
};

type SanityImageProps = {
  image: SanityImageValue;
  alt?: string;
  fallback: Fallback;
  style?: React.CSSProperties;
};

/**
 * SanityImage — renders a Sanity image when one is set, otherwise falls back
 * to the styled <ImagePlaceholder> so the layout is never empty.
 */
export function SanityImage({ image, alt, fallback, style }: SanityImageProps) {
  if (!image?.asset?._ref) {
    return <ImagePlaceholder {...fallback} style={style} />;
  }
  const src = urlFor(image as never)
    .width(1200)
    .fit("max")
    .auto("format")
    .url();
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "var(--radius-xl)",
        ...style,
      }}
    >
      <Image
        src={src}
        alt={alt || ""}
        fill
        style={{ objectFit: "cover" }}
        sizes="(max-width: 900px) 100vw, 50vw"
      />
    </div>
  );
}
