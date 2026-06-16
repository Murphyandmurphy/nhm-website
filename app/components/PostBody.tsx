import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    h3: ({ children }) => <h3 className="shead__title" style={{ marginTop: "1.5rem" }}>{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: "3px solid var(--blue-300)",
          paddingLeft: "1.25rem",
          margin: "1.5rem 0",
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          color: "var(--ink-900)",
        }}
      >
        {children}
      </blockquote>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      const src = urlFor(value).width(1400).fit("max").auto("format").url();
      return (
        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", margin: "2rem 0", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
          <Image src={src} alt={value.alt || ""} fill style={{ objectFit: "cover" }} sizes="(max-width: 760px) 100vw, 760px" />
        </div>
      );
    },
  },
};

export function PostBody({ value }: { value: unknown }) {
  if (!value) return null;
  return (
    <div className="prose">
      <PortableText value={value as never} components={components} />
    </div>
  );
}
