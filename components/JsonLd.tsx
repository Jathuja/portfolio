/**
 * JsonLd — Server Component
 *
 * Renders a <script type="application/ld+json"> tag for structured data.
 * Always used server-side; never needs "use client".
 *
 * Usage:
 *   import { JsonLd } from "@/components/JsonLd";
 *   <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", ... }} />
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // dangerouslySetInnerHTML is safe here: we control all input,
      // and structured data does not include user-supplied strings.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0),
      }}
    />
  );
}
