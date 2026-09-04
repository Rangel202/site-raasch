"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { GENERAL_WHATSAPP, SITE } from "../data/site";

export type NavVertical = {
  slug: string;
  label: string;
  tagline: string;
  total: number;
  groups: {
    key: string;
    label: string;
    items: { label: string; href: string; count: number }[];
  }[];
};

const STATIC_LINKS = [
  { label: "Empresa", href: "/empresa" },
  { label: "Revista Digital", href: "/revista-digital" },
  { label: "Contato", href: "/contato" },
];

export default function HeaderClient({ nav }: { nav: NavVertical[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { count, setOpen: setCartOpen } = useCart();

  // The bar only floats over artwork on the home hero; elsewhere it starts solid.
  const overHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openVertical, setOpenVertical] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const solid = scrolled || !overHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navigating anywhere dismisses every open panel. Adjusting during render is
  // the sanctioned pattern here — an effect would cost a second paint.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenuOpen(false);
    setOpenVertical(null);
    setSearchOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSearchOpen(false);
      setOpenVertical(null);
      setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // A short grace period keeps the panel open while the pointer crosses the gap.
  const hoverOpen = (slug: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenVertical(slug);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenVertical(null), 160);
  };

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const term = query.trim();
    if (!term) return;
    setSearchOpen(false);
    router.push(`/busca?q=${encodeURIComponent(term)}`);
  };

  const tone = solid ? "text-ink" : "text-ivory";

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50" onMouseLeave={hoverClose}>
        {/* Announcement bar — retracts as soon as the page scrolls */}
        <div
          className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <p className="bg-ink px-4 py-2.5 text-center text-[9px] tracking-[0.2em] text-gold-pale uppercase sm:text-[11px] sm:tracking-[0.28em]">
            Desde 1989 em Porto Alegre · Orçamento pelo WhatsApp
          </p>
        </div>

        <header
          className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            solid
              ? "border-b border-sand/70 bg-ivory/95 py-3 backdrop-blur-md"
              : "border-b border-transparent bg-gradient-to-b from-ink/55 to-transparent py-5"
          }`}
        >
          <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 sm:gap-6 sm:px-5 lg:px-10">
            {/* Left: catalogue verticals */}
            <nav className="hidden flex-1 items-center gap-8 xl:flex">
              {nav.map((vertical) => (
                <div
                  key={vertical.slug}
                  onMouseEnter={() => hoverOpen(vertical.slug)}
                >
                  <Link
                    href={`/${vertical.slug}`}
                    className={`link-underline text-[12px] tracking-[0.2em] uppercase transition-colors duration-500 ${tone} hover:text-gold ${
                      pathname.startsWith(`/${vertical.slug}`) ? "text-gold" : ""
                    }`}
                  >
                    {vertical.label}
                  </Link>
                </div>
              ))}
              <Link
                href="/empresa"
                className={`link-underline text-[12px] tracking-[0.2em] uppercase transition-colors duration-500 ${tone} hover:text-gold`}
              >
                Empresa
              </Link>
            </nav>

            {/* Mobile: drawer toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className={`flex flex-col gap-[5px] xl:hidden ${tone}`}
            >
              <span className="block h-px w-6 bg-current" />
              <span className="block h-px w-6 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </button>

            {/* Centre: the logotype */}
            <Link
              href="/"
              aria-label="Raasch — página inicial"
              className="flex flex-1 justify-center"
            >
              <Image
                src="/logo-wordmark.png"
                alt="Raasch"
                width={1762}
                height={342}
                priority
                className={`h-[21px] w-auto transition-all duration-700 sm:h-[26px] lg:h-[30px] ${
                  solid ? "" : "brightness-125 drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
                }`}
              />
            </Link>

            {/* Right: utilities */}
            <div className="flex flex-1 items-center justify-end gap-4 sm:gap-5">
              <Link
                href="/revista-digital"
                className={`link-underline hidden text-[12px] tracking-[0.2em] uppercase transition-colors duration-500 lg:block ${tone} hover:text-gold`}
              >
                Revista
              </Link>
              <button
                type="button"
                onClick={() => setSearchOpen((v) => !v)}
                aria-label="Buscar no catálogo"
                aria-expanded={searchOpen}
                className={`transition-colors duration-500 hover:text-gold ${tone}`}
              >
                <SearchIcon />
              </button>
              <a
                href={SITE.instagram[0].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${SITE.instagram[0].handle}`}
                className={`transition-colors duration-500 hover:text-gold ${tone}`}
              >
                <InstagramIcon />
              </a>
              <a
                href={GENERAL_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar no WhatsApp"
                className={`hidden transition-colors duration-500 hover:text-gold sm:block ${tone}`}
              >
                <WhatsAppIcon />
              </a>
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label={`Meu cesto — ${count} ${count === 1 ? "item" : "itens"}`}
                className={`relative transition-colors duration-500 hover:text-gold ${tone}`}
              >
                <BagIcon />
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-medium text-ivory">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search field slides down under the bar */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              searchOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <form
              onSubmit={submitSearch}
              className="mx-auto flex max-w-3xl items-center gap-3 px-5 pt-4 pb-1 lg:px-10"
            >
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por anel, lustre, poltrona, referência…"
                className={`min-w-0 flex-1 border-b bg-transparent px-1 py-2.5 text-[15px] font-light outline-none placeholder:text-muted/70 ${
                  solid
                    ? "border-clay/70 text-ink focus:border-gold"
                    : "border-ivory/40 text-ivory focus:border-gold-pale"
                }`}
              />
              <button
                type="submit"
                className={`text-[11px] tracking-[0.22em] uppercase transition-colors hover:text-gold ${tone}`}
              >
                Buscar
              </button>
            </form>
          </div>
        </header>

        {/* Mega panel for the hovered vertical */}
        {nav.map((vertical) => (
          <div
            key={vertical.slug}
            onMouseEnter={() => hoverOpen(vertical.slug)}
            className={`absolute inset-x-0 hidden origin-top border-b border-sand bg-ivory/98 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] xl:block ${
              openVertical === vertical.slug
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-3 opacity-0"
            }`}
          >
            <div className="mx-auto max-w-[1500px] px-10 py-10">
              <div className="flex items-baseline justify-between border-b border-sand/70 pb-5">
                <div>
                  <p className="eyebrow text-gold">{vertical.tagline}</p>
                  <h2 className="mt-2 font-display text-3xl font-light">
                    {vertical.label}
                  </h2>
                </div>
                <Link
                  href={`/${vertical.slug}`}
                  className="link-underline text-[11px] tracking-[0.2em] text-ink-soft uppercase hover:text-gold"
                >
                  Ver as {vertical.total} peças →
                </Link>
              </div>

              <div className="mt-7 grid gap-8 lg:grid-cols-4">
                {vertical.groups.map((group) => (
                  <div key={group.key || "flat"}>
                    {group.label && (
                      <h3 className="mb-4 text-[10px] tracking-[0.28em] text-gold uppercase">
                        {group.label}
                      </h3>
                    )}
                    <ul
                      className={`flex flex-col gap-2.5 ${
                        group.label ? "" : "lg:columns-1"
                      }`}
                    >
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="group flex items-baseline gap-2 text-[13px] font-light text-ink-soft transition-colors duration-300 hover:text-gold"
                          >
                            <span className="link-underline">{item.label}</span>
                            <span className="text-[10px] text-muted/70">
                              {item.count}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-60 xl:hidden ${menuOpen ? "" : "pointer-events-none"}`}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-ink/45 backdrop-blur-sm transition-opacity duration-500 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-ivory transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-sand px-7 py-6">
            <Image
              src="/logo-wordmark.png"
              alt="Raasch"
              width={1762}
              height={342}
              className="h-5 w-auto"
            />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              className="text-3xl leading-none text-muted"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col px-7 py-7">
            {nav.map((vertical) => (
              <details key={vertical.slug} className="border-b border-sand/70 py-4">
                <summary className="flex cursor-pointer items-center justify-between font-display text-2xl font-light marker:content-none">
                  {vertical.label}
                  <span className="text-[11px] tracking-[0.2em] text-muted uppercase">
                    {vertical.total}
                  </span>
                </summary>
                <div className="mt-4 flex flex-col gap-4 pb-2">
                  <Link
                    href={`/${vertical.slug}`}
                    className="text-[12px] tracking-[0.18em] text-gold uppercase"
                  >
                    Ver tudo em {vertical.label}
                  </Link>
                  {vertical.groups.map((group) => (
                    <div key={group.key || "flat"}>
                      {group.label && (
                        <p className="mb-2 text-[10px] tracking-[0.26em] text-muted uppercase">
                          {group.label}
                        </p>
                      )}
                      <ul className="flex flex-col gap-2">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="text-[14px] font-light text-ink-soft"
                            >
                              {item.label}
                              <span className="ml-2 text-[10px] text-muted/70">
                                {item.count}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            ))}

            {STATIC_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-sand/70 py-5 font-display text-2xl font-light"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mx-7 mb-8 flex flex-col gap-3">
            <a
              href={GENERAL_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] px-6 py-4 text-[11px] tracking-[0.2em] text-white uppercase"
            >
              <WhatsAppIcon />
              Falar no WhatsApp
            </a>
            {SITE.instagram.map((account) => (
              <a
                key={account.handle}
                href={account.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 border border-sand px-6 py-3.5 text-[11px] tracking-[0.2em] text-ink-soft uppercase"
              >
                <InstagramIcon />
                {account.handle}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="m16.5 16.5 4 4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.6 7.5h14.8l-1.1 12.1a1.6 1.6 0 0 1-1.6 1.4H7.3a1.6 1.6 0 0 1-1.6-1.4L4.6 7.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M8.8 10V6.6a3.2 3.2 0 0 1 6.4 0V10"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.03 2.6.12.16 1.77 2.71 4.3 3.8.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
