import React from "react";

/**
 * Parses a markdown-lite string into React nodes:
 *   *text*  → <em>   (rendered blue italic inside headings via CSS)
 *   **text** → <strong>
 * Editors type these in plain Studio text fields.
 */
export function parseInline(text: string): React.ReactNode[] {
  if (!text) return [];
  const nodes: React.ReactNode[] = [];
  const re = /(\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[2] !== undefined) nodes.push(<strong key={key++}>{m[2]}</strong>);
    else nodes.push(<em key={key++}>{m[3]}</em>);
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

type RichTextProps = { text?: string; className?: string; style?: React.CSSProperties };

/** RichText — multi-paragraph body. Blank lines separate <p> elements. */
export function RichText({ text, className, style }: RichTextProps) {
  if (!text) return null;
  const paras = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <div className={className} style={style}>
      {paras.map((p, i) => (
        <p key={i}>{parseInline(p)}</p>
      ))}
    </div>
  );
}

type RichHeadingProps = {
  text?: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
};

/** RichHeading — single heading line with inline emphasis. */
export function RichHeading({ text, as = "h2", className, style }: RichHeadingProps) {
  const Tag = as as React.ElementType;
  if (!text) return null;
  return (
    <Tag className={className} style={style}>
      {parseInline(text)}
    </Tag>
  );
}
