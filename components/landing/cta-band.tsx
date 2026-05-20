import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CtaBandContent {
  heading: string;
  description: string;
  cta: { label: string; href: string };
}

export function CtaBand({ content }: { content: CtaBandContent }) {
  return (
    <section
      aria-labelledby="cta-band-heading"
      className="bg-gradient-to-br from-brand to-brand-dark text-white text-center py-[clamp(48px,7vw,84px)]"
    >
      <div className="bb-container">
        <h2 id="cta-band-heading" className="!text-white mb-3">
          {content.heading}
        </h2>
        <p className="text-[#cfdef0] max-w-[580px] mx-auto mb-6 text-[1.05rem]">
          {content.description}
        </p>
        <Button
          asChild
          className="bg-white !text-brand hover:bg-bg-soft text-base px-8 py-4 h-auto"
        >
          <Link href={content.cta.href}>{content.cta.label}</Link>
        </Button>
      </div>
    </section>
  );
}
