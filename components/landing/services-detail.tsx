import Image from "next/image";
import type { ServiceBlock } from "@/lib/landing-content";

export function ServicesDetail({
  blocks,
}: {
  blocks: readonly ServiceBlock[];
}) {
  return (
    <div>
      {blocks.map((block, idx) => (
        <section
          key={block.id}
          id={block.id}
          aria-labelledby={`service-${block.id}-heading`}
          className={`bb-section border-b border-line last:border-b-0${
            idx % 2 !== 0 ? " bg-bg-soft" : ""
          }`}
        >
          <div
            className={`bb-container grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 items-start${
              idx % 2 !== 0 ? " md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="relative rounded-[16px] overflow-hidden aspect-[4/3] shadow-brand-md bg-gradient-to-br from-brand-light to-brand group">
              <Image
                src={block.image.src}
                alt={block.image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 40vw"
                {...(block.image.src.startsWith("http")
                  ? { unoptimized: true }
                  : {})}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-brand/18 to-brand-dark/28"
                aria-hidden="true"
              />
            </div>

            <div>
              <span className="eyebrow">{block.eyebrow}</span>
              <h2
                id={`service-${block.id}-heading`}
                className="text-brand-dark"
              >
                {block.heading}
              </h2>
              <p className="text-body">{block.description}</p>

              {block.groups.map((group) => (
                <div key={group.heading}>
                  <h4 className="mt-6 mb-2 text-ink text-[1.05rem]">
                    {group.heading}
                  </h4>
                  <ul className="space-y-2 p-0 m-0 list-none">
                    {group.items.map((item, i) => (
                      <li
                        key={i}
                        className="relative pl-[26px] text-body before:absolute before:left-0 before:top-[0.55em] before:w-3.5 before:h-3.5 before:rounded-[4px] before:bg-brand-light before:opacity-90 after:absolute after:left-[3px] after:top-[0.8em] after:w-2 after:h-1 after:border-l-2 after:border-b-2 after:border-white after:-rotate-45"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
