"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { GENERAL_WHATSAPP } from "../data/site";

/**
 * Thumb-reach navigation. A phone visitor should never have to travel back to
 * the top of the page to browse, search or open the basket — the four things
 * they actually do live here instead.
 */
export default function MobileNav() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const [hidden, setHidden] = useState(false);

  // Yield to the product page's buy bar rather than stacking two bars.
  useEffect(() => {
    const check = () => setHidden(document.body.dataset.buybar === "on");
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-buybar"],
    });
    return () => observer.disconnect();
  }, []);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const item =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[9px] tracking-[0.14em] uppercase transition-colors duration-300";

  return (
    <nav
      aria-label="Navegação rápida"
      className={`fixed inset-x-0 bottom-0 z-45 border-t border-sand/80 bg-ivory/97 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-stretch">
        <Link
          href="/"
          className={`${item} ${active("/") ? "text-gold" : "text-muted"}`}
        >
          <HomeIcon />
          Início
        </Link>

        <Link
          href="/joias"
          className={`${item} ${active("/joias") ? "text-gold" : "text-muted"}`}
        >
          <GemIcon />
          Jóias
        </Link>

        <Link
          href="/busca"
          className={`${item} ${active("/busca") ? "text-gold" : "text-muted"}`}
        >
          <SearchIcon />
          Buscar
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className={`${item} relative text-muted`}
        >
          <span className="relative">
            <BagIcon />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-medium text-ivory">
                {count}
              </span>
            )}
          </span>
          Cesto
        </button>

        <a
          href={GENERAL_WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className={`${item} text-[#128C4A]`}
        >
          <WhatsAppIcon />
          Falar
        </a>
      </div>
    </nav>
  );
}

const stroke = { stroke: "currentColor", strokeWidth: 1.4, fill: "none" } as const;

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M4 10.6 12 4l8 6.6V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.4Z"
        {...stroke}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GemIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path d="M6 3h12l3 5.5-9 12.5L3 8.5 6 3Z" {...stroke} strokeLinejoin="round" />
      <path d="M3 8.5h18M9 3l3 18M15 3l-3 18" {...stroke} />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <circle cx="11" cy="11" r="7" {...stroke} />
      <path d="m16.5 16.5 4 4" {...stroke} strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M4.6 7.5h14.8l-1.1 12.1a1.6 1.6 0 0 1-1.6 1.4H7.3a1.6 1.6 0 0 1-1.6-1.4L4.6 7.5Z"
        {...stroke}
        strokeLinejoin="round"
      />
      <path d="M8.8 10V6.6a3.2 3.2 0 0 1 6.4 0V10" {...stroke} strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.03 2.6.12.16 1.77 2.71 4.3 3.8.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
