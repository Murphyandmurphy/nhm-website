import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageValue } from "@/app/types";

export type BrandItem = { name?: string; logo?: SanityImageValue } | string;

type LogoStripProps = { brands: BrandItem[] };

const logoBlendStyle = {
  mixBlendMode: "multiply" as const,
  filter: "grayscale(1)",
  backgroundColor: "transparent",
};

function normalize(b: BrandItem): { name: string; logo?: SanityImageValue } {
  if (typeof b === "string") return { name: b };
  return { name: b.name || "", logo: b.logo };
}

/**
 * LogoStrip — single-tone brand logos on the section background.
 * Each item shows its uploaded logo (greyscaled + softened), or falls back
 * to the brand name set in Larken if no logo image has been added yet.
 */
export function LogoStrip({ brands }: LogoStripProps) {
  return (
    <div className="logostrip">
      {brands.map((raw, i) => {
        const b = normalize(raw);
        const hasLogo = !!(b.logo && b.logo.asset && b.logo.asset._ref);
        return (
          <div className="logochip" key={(b.name || "brand") + i}>
            {hasLogo ? (
              <img
                src={urlFor(b.logo as never).height(320).dpr(2).fit("max").auto("format").url()}
                alt={b.name || ""}
                className="logochip__img"
                style={logoBlendStyle}
              />
            ) : (
              <span className="logochip__text">{b.name}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
