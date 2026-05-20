"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { landingContent } from "@/lib/landing-content";

const { nav } = landingContent;

export function Header() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    [
      "px-3.5 py-2 rounded-lg text-[0.96rem] font-medium transition-colors",
      pathname === href
        ? "text-brand bg-bg-band"
        : "text-ink hover:bg-bg-soft hover:text-brand",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-[10px] backdrop-saturate-[140%] border-b border-line">
      <div className="bb-container flex items-center justify-between py-3.5 gap-6">
        <Link
          href="/"
          aria-label="BestBridge Consultancy home"
          className="flex items-center gap-3 font-bold text-ink hover:text-ink"
        >
          <Image
            src="/assets/logo.jpg"
            alt="BestBridge Consultancy logo"
            width={44}
            height={44}
            className="h-11 w-auto"
          />
          <span className="flex flex-col leading-[1.05] text-[0.95rem]">
            BestBridge
            <small className="text-muted font-medium text-[0.72rem] tracking-[0.04em] uppercase">
              Consultancy
            </small>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1.5">
          {nav.links.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
            </Link>
          ))}
          <Button asChild className="ml-2">
            <Link href={nav.cta.href}>{nav.cta.label}</Link>
          </Button>
        </nav>

        {/* Mobile nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden border-line"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1 mt-4">
              {nav.links.map(({ href, label }) => (
                <Link key={href} href={href} className={linkClass(href)}>
                  {label}
                </Link>
              ))}
              <Button asChild className="mt-3">
                <Link href={nav.cta.href}>{nav.cta.label}</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
