import type { landingContent } from "@/lib/landing-content";

type IntroContent = typeof landingContent.home.intro;

export function IntroSection({ content }: { content: IntroContent }) {
  return (
    <section aria-labelledby="intro-heading" className="bb-section">
      <div className="bb-container max-w-[720px] mx-auto text-center">
        <span className="eyebrow">{content.eyebrow}</span>
        <h2 id="intro-heading">{content.heading}</h2>
        <p className="text-muted text-[1.05rem] mb-0">{content.description}</p>
      </div>
    </section>
  );
}
