import Link from "next/link";
import { FileCheck, Users, Scale } from "lucide-react";
import type { landingContent } from "@/lib/landing-content";

type ServicesOverviewContent = typeof landingContent.home.servicesOverview;
type ServiceCard = ServicesOverviewContent["cards"][number];

const iconMap = {
  "file-check": FileCheck,
  users: Users,
  scale: Scale,
} as const;

function ServiceCard({ card }: { card: ServiceCard }) {
  const Icon = iconMap[card.icon];
  return (
    <article className="bg-white border border-line rounded-[16px] p-7 transition-all duration-[180ms] hover:-translate-y-[3px] hover:shadow-brand-md hover:border-[#cfd9e8]">
      <div className="w-[52px] h-[52px] rounded-[12px] bg-gradient-to-br from-brand-light to-brand flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-white" aria-hidden="true" />
      </div>
      <h3 className="mb-2.5">{card.heading}</h3>
      <p className="text-muted text-[0.98rem] mb-3.5">{card.description}</p>
      <Link href={card.href} className="font-semibold text-brand group">
        Learn more{" "}
        <span className="inline-block transition-[margin] duration-150 group-hover:ml-1">
          →
        </span>
      </Link>
    </article>
  );
}

export function ServicesOverview({
  content,
}: {
  content: ServicesOverviewContent;
}) {
  return (
    <section
      aria-labelledby="services-overview-heading"
      className="bb-section bg-bg-soft"
    >
      <div className="bb-container">
        <div className="max-w-[720px] mx-auto text-center mb-12">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 id="services-overview-heading">{content.heading}</h2>
          <p className="text-muted text-[1.05rem]">{content.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.cards.map((card) => (
            <ServiceCard key={card.heading} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
