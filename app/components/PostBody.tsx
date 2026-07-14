import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="postbody__h2" style={{ marginTop: "2.25rem" }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="postbody__h3" style={{ marginTop: "1.75rem" }}>
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="postbody__h4" style={{ marginTop: "1.5rem" }}>
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="postbody__h5" style={{ marginTop: "1.25rem" }}>
        {children}
      </h5>
    ),
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
