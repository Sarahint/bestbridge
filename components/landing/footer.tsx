import Link from "next/link";
import Image from "next/image";
import { landingContent } from "@/lib/landing-content";

const { footer } = landingContent;

export function Footer() {
  return (
    <footer className="bg-brand-dark text-[#b8c9dd] pt-16 pb-6 text-[0.94rem]">
      <div className="bb-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10">
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <Image
                src="/assets/logo.jpg"
                alt="BestBridge logo"
                width={40}
                height={40}
                className="h-10 w-auto bg-white px-1.5 py-1 rounded-md"
              />
              <span className="text-white font-bold text-[1.1rem]">
                BestBridge Consultancy
              </span>
            </div>
            <p className="text-[#aabbd0] max-w-xs mb-0">
              {footer.brand.description}
            </p>
          </div>

          <div>
            <h4 className="text-white text-[0.98rem] mb-3.5">Company</h4>
            <ul className="space-y-2 list-none p-0 m-0">
              {footer.companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[#d9e6f3] hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[0.98rem] mb-3.5">Services</h4>
            <ul className="space-y-2 list-none p-0 m-0">
              {footer.serviceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-[#d9e6f3] hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-[0.98rem] mb-3.5">Get in touch</h4>
            <ul className="space-y-2 list-none p-0 m-0">
              <li>
                <a
                  href={`mailto:${footer.contact.email}`}
                  className="text-[#d9e6f3] hover:text-white"
                >
                  {footer.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${footer.contact.phone.replace(/\s/g, "")}`}
                  className="text-[#d9e6f3] hover:text-white"
                >
                  {footer.contact.phone}
                </a>
              </li>
              <li>{footer.contact.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-5 border-t border-white/10 flex flex-wrap justify-between gap-3 text-[0.86rem] text-[#9eb1c8]">
          <span>
            &copy; {new Date().getFullYear()} BestBridge Consultancy. All rights
            reserved.
          </span>
          <span>{footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
