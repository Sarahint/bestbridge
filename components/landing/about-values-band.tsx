import Image from "next/image";
import type { landingContent } from "@/lib/landing-content";

type ValuesBandContent = typeof landingContent.aboutPage.valuesBand;

export function AboutValuesBand({ content }: { content: ValuesBandContent }) {
  return (
    <section
      aria-labelledby="values-heading"
      className="relative min-h-[360px] flex items-center text-center text-white py-24"
    >
      <Image
        src={content.image.src}
        alt={content.image.alt}
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand/85 to-brand-dark/92"
        aria-hidden="true"
      />
      <div className="bb-container relative z-10 w-full">
        <div className="max-w-[720px] mx-auto">
          <span className="eyebrow !text-white">{content.eyebrow}</span>
          <h2 id="values-heading" className="!text-white mb-4">
            {content.heading}
          </h2>
          <p className="text-white/90 text-[1.05rem] mb-0">
            {content.description}
          </p>
        </div>
      </div>
    </section>
  );
}
