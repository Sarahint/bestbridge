interface PageHeadContent {
  eyebrow: string;
  heading: string;
  description: string;
}

export function PageHead({ content }: { content: PageHeadContent }) {
  return (
    <section className="bg-gradient-to-br from-brand to-brand-dark py-[clamp(60px,8vw,100px)] text-center">
      <div className="bb-container">
        <span className="eyebrow !text-brand-light">{content.eyebrow}</span>
        <h1 className="!text-white mb-3">{content.heading}</h1>
        <p className="text-[#d9e6f3] max-w-[640px] mx-auto text-[1.05rem] mb-0">
          {content.description}
        </p>
      </div>
    </section>
  );
}
