/**
 * Renders schema.org JSON-LD into the document.
 * Server-rendered <script> with dangerouslySetInnerHTML is the canonical
 * pattern for structured data in Next.js (see https://nextjs.org/docs/app/guides/json-ld).
 */
export function JsonLd({
  id,
  data,
}: {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any> | Record<string, any>[];
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // JSON.stringify safely escapes < > & — no XSS risk from schema data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
