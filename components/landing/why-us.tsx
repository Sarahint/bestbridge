import { Star, Zap, Scale, CheckCircle } from "lucide-react";
import type { landingContent } from "@/lib/landing-content";

type WhyUsContent =
  | typeof landingContent.home.whyUs
  | typeof landingContent.aboutPage.whyUs;

const iconMap = {
  star: Star,
  zap: Zap,
  scale: Scale,
  "check-circle": CheckCircle,
} as const;

export function WhyUs({
  content,
  soft = false,
}: {
  content: WhyUsContent;
  soft?: boolean;
}) {
  return (
    <section
      aria-labelledby="why-us-heading"
      className={`bb-section${soft ? " bg-bg-soft" : ""}`}
    >
      <div className="bb-container">
        <div className="max-w-[720px] mx-auto text-center mb-12">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 id="why-us-heading">{content.heading}</h2>
          <p className="text-muted text-[1.05rem]">{content.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {content.features.map((f) => {
            const Icon = iconMap[f.icon];
            return (
              <div key={f.heading} className="text-center px-4 py-7">
                <div className="w-16 h-16 mx-auto mb-4 bg-bg-band text-brand rounded-full flex items-center justify-center">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="text-ink mb-2">{f.heading}</h3>
                <p className="text-muted mb-0">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
