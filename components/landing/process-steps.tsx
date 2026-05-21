import type { landingContent } from "@/lib/landing-content";

type ProcessStepsContent = typeof landingContent.servicesPage.processSteps;

export function ProcessSteps({ content }: { content: ProcessStepsContent }) {
  return (
    <section
      aria-labelledby="process-heading"
      className="bb-section bg-bg-soft"
    >
      <div className="bb-container">
        <div className="max-w-[720px] mx-auto text-center mb-12">
          <span className="eyebrow">{content.eyebrow}</span>
          <h2 id="process-heading">{content.heading}</h2>
          <p className="text-muted text-[1.05rem] mb-0">
            {content.description}
          </p>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 list-none p-0 m-0">
          {content.steps.map((step) => (
            <li
              key={step.number}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm flex flex-col"
            >
              <span
                aria-hidden="true"
                className="text-brand-light font-extrabold text-2xl leading-none mb-3"
              >
                {step.number}
              </span>
              <h3 className="text-ink text-[1.05rem] mb-2">{step.title}</h3>
              <p className="text-muted text-[0.92rem] leading-relaxed mb-0">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
