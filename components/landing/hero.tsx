import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { landingContent } from "@/lib/landing-content";

type HeroContent = typeof landingContent.home.hero;

export function Hero({ content }: { content: HeroContent }) {
  return (
    <section aria-labelledby="hero-heading" className="hero-bg bb-hero overflow-hidden">
      <div className="bb-container grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
        <div>
          <span className="eyebrow">{content.eyebrow}</span>
          <h1
            id="hero-heading"
            className="text-[clamp(2.3rem,4.8vw,3.8rem)] leading-[1.08] mb-4"
          >
            Your <span className="text-brand">trusted bridge</span> for HR,
            Visa &amp; Legal in Thailand
          </h1>
          <p className="text-[1.12rem] text-body max-w-[540px] mb-7">
            {content.lede}
          </p>
          <div className="flex gap-3 flex-wrap mb-9">
            <Button asChild size="lg">
              <Link href={content.primaryCta.href}>{content.primaryCta.label}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={content.secondaryCta.href}>{content.secondaryCta.label}</Link>
            </Button>
          </div>
          <div className="flex gap-7 flex-wrap text-muted text-[0.92rem]">
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <strong className="text-ink block text-[1.35rem]">
                  {stat.value}
                </strong>
                {stat.label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-[4/5] rounded-[28px] shadow-brand-lg overflow-hidden bg-gradient-to-br from-brand to-brand-dark max-w-[420px] lg:max-w-none mx-auto w-full">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 420px, 40vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-brand-dark/5 to-brand-dark/55"
            aria-hidden="true"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-white/[0.96] backdrop-blur-[6px] p-5 rounded-[14px] shadow-brand-lg">
            <div className="w-9 h-9 bg-brand-light rounded-[10px] flex items-center justify-center mb-3">
              <CheckCircle2 className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <h4 className="mb-1.5 text-brand-dark">{content.card.heading}</h4>
            <p className="text-muted text-[0.92rem] mb-0">
              {content.card.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
