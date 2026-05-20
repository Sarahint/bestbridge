import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { BookingForm } from "./booking-form";
import type { landingContent } from "@/lib/landing-content";

type ContactPageContent = typeof landingContent.contactPage;

const iconMap = {
  mail: Mail,
  phone: Phone,
  "map-pin": MapPin,
  clock: Clock,
} as const;

export function ContactSection({ content }: { content: ContactPageContent }) {
  const { aside } = content;

  return (
    <section aria-labelledby="contact-info-heading" className="bb-section">
      <div className="bb-container grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-14 items-start">
        <aside>
          <span className="eyebrow">{aside.eyebrow}</span>
          <h2 id="contact-info-heading" className="text-brand-dark">
            {aside.heading}
          </h2>
          <p className="text-body">{aside.description}</p>

          <div className="mt-2 space-y-6">
            {aside.items.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={item.heading} className="flex gap-4 items-start">
                  <div className="shrink-0 w-11 h-11 rounded-[10px] bg-bg-band text-brand flex items-center justify-center">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-ink text-[1rem]">
                      {item.heading}
                    </h4>
                    {"href" in item && item.href ? (
                      <a
                        href={item.href}
                        className="text-muted hover:text-brand"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-muted mb-0">{item.value}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-7 rounded-[16px] overflow-hidden aspect-[4/3] relative shadow-brand-md bg-gradient-to-br from-brand-light to-brand">
            <Image
              src={aside.photo.src}
              alt={aside.photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark/50"
              aria-hidden="true"
            />
          </div>
        </aside>

        <BookingForm content={content.form} />
      </div>
    </section>
  );
}
