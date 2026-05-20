import Image from "next/image";
import type { landingContent } from "@/lib/landing-content";

type TeamContent = typeof landingContent.aboutPage.team;

export function AboutTeam({ content }: { content: TeamContent }) {
  return (
    <section aria-labelledby="team-heading" className="bb-section">
      <div className="bb-container">
        <div className="max-w-[720px] mx-auto text-center mb-12">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 id="team-heading">{content.heading}</h2>
          <p className="text-muted text-[1.05rem]">{content.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.cards.map((card) => (
            <article
              key={card.heading}
              className="bg-white rounded-[16px] border border-line overflow-hidden shadow-brand-sm transition-all duration-[180ms] hover:-translate-y-[3px] hover:shadow-brand-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-bg-band">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 pb-7">
                <p className="text-[0.82rem] uppercase tracking-[0.12em] text-brand font-semibold mb-2">
                  {card.role}
                </p>
                <h3 className="mb-2">{card.heading}</h3>
                <p className="text-muted text-[0.96rem] mb-0">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
