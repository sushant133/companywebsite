import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Headings are edited in the admin dashboard as a single string, so the part
 * that gets the brand gradient is marked inline with `[[double brackets]]`.
 * A literal newline becomes a line break, which is what the multi-line
 * headings on the about page need.
 */
export function RichHeading({
  text,
  className,
  highlightClassName = "text-gradient-brand",
}: {
  text: string;
  className?: string;
  highlightClassName?: string;
}) {
  return <span className={className}>{renderRichText(text, highlightClassName)}</span>;
}

export function renderRichText(text: string, highlightClassName = "text-gradient-brand") {
  const parts = String(text ?? "").split(/(\[\[[^\]]*\]\])/g);

  return parts.flatMap((part, partIndex) => {
    const highlighted = part.startsWith("[[") && part.endsWith("]]");
    const value = highlighted ? part.slice(2, -2) : part;

    // Newlines inside either kind of run become <br />.
    const lines = value.split("\n");
    return lines.flatMap((line, lineIndex) => {
      const nodes: React.ReactNode[] = [];
      if (lineIndex > 0) {
        nodes.push(<br key={`br-${partIndex}-${lineIndex}`} />);
      }
      if (line) {
        nodes.push(
          highlighted ? (
            <span key={`h-${partIndex}-${lineIndex}`} className={cn(highlightClassName)}>
              {line}
            </span>
          ) : (
            <React.Fragment key={`t-${partIndex}-${lineIndex}`}>{line}</React.Fragment>
          ),
        );
      }
      return nodes;
    });
  });
}

/** Strips the markers, for places that need the plain string (metadata, alt). */
export function plainText(text: string) {
  return String(text ?? "").replace(/\[\[|\]\]/g, "").replace(/\n/g, " ");
}
