import type { FaqItem } from "@/lib/landing-content";

/**
 * Accessible FAQ accordion using the native <details>/<summary> elements.
 *
 * No JavaScript required — works without hydration. Each <details> is also
 * crawlable by Googlebot and indexable in the AI Overviews / FAQPage rich
 * result. The matching FAQPage JSON-LD is emitted on the parent page.
 */
export function FaqSection({
  content,
  heading,
  eyebrow = "FAQ",
}: {
  content: ReadonlyArray<FaqItem>;
  heading: string;
  eyebrow?: string;
}) {
  return (
    <section aria-labelledby="faq-heading" className="bb-section">
      <div className="bb-container max-w-[820px] mx-auto">
        <div className="text-center mb-10">
          <span className="eyebrow">{eyebrow}</span>
          <h2 id="faq-heading">{heading}</h2>
        </div>
        <div className="space-y-3">
          {content.map((item, idx) => (
            <details
              key={item.question}
              className="group rounded-xl border border-border bg-white p-5 open:shadow-sm transition-shadow"
              {...(idx === 0 ? { open: true } : {})}
            >
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="text-[1.02rem] leading-snug">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 mt-1 text-brand transition-transform group-open:rotate-45 text-xl leading-none"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-muted text-[0.97rem] leading-relaxed mb-0">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
