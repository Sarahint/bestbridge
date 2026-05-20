import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { landingContent } from "@/lib/landing-content";

type MissionContent = typeof landingContent.aboutPage.mission;

export function AboutMission({ content }: { content: MissionContent }) {
  return (
    <section aria-labelledby="mission-heading" className="bb-section">
      <div className="bb-container grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <div className="relative rounded-[16px] overflow-hidden aspect-[5/4] shadow-brand-lg bg-gradient-to-br from-brand-light to-brand">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-brand/10 to-brand-dark/18"
            aria-hidden="true"
          />
        </div>
        <div>
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 id="mission-heading">{content.heading}</h2>
          {content.paragraphs.map((p, i) => (
            <p key={i} className="text-body">
              {p}
            </p>
          ))}
          <Button asChild className="mt-2">
            <Link href={content.cta.href}>{content.cta.label}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
