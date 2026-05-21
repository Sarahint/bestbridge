import type { landingContent } from "@/lib/landing-content";

type TestimonialsContent = typeof landingContent.home.testimonials;

export function Testimonials({ content }: { content: TestimonialsContent }) {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bb-section bg-bg-soft"
    >
      <div className="bb-container">
        <div className="max-w-[720px] mx-auto text-center mb-10">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 id="testimonials-heading">{content.heading}</h2>
          <p className="text-muted text-[1rem] mb-0">{content.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.items.map((t) => (
            <figure
              key={t.quote}
              className="bg-white rounded-2xl p-6 shadow-sm border border-border flex flex-col"
            >
              <blockquote className="text-ink text-[0.97rem] leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="w-10 h-10 rounded-full bg-brand text-white font-bold text-sm flex items-center justify-center shrink-0"
                >
                  {t.initials}
                </span>
                <span className="text-[0.9rem]">
                  <span className="block font-semibold text-ink">
                    {t.author}
                  </span>
                  <span className="block text-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
