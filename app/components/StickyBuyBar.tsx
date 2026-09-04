"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

/**
 * On a phone the buy buttons scroll away behind the description. This keeps
 * them one thumb-reach from the bottom, and only appears once the reader has
 * moved past the in-page pair so the two never compete.
 */
export default function StickyBuyBar({
  id,
  name,
  reference,
  image,
  whatsappHref,
}: {
  id: string;
  name: string;
  reference?: string;
  image: string;
  whatsappHref: string;
}) {
  const { add } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const anchor = document.getElementById("acoes-produto");
    if (!anchor) return;

    // A position check rather than IntersectionObserver: IO only fires when the
    // ratio *crosses* a threshold, so an anchor jump or a restored scroll
    // position would leave the bar stale.
    let frame = 0;
    const update = () => {
      frame = 0;
      const show = anchor.getBoundingClientRect().bottom < 0;
      setVisible(show);
      document.body.dataset.buybar = show ? "on" : "off";
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      delete document.body.dataset.buybar;
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-ivory/97 px-4 py-3 backdrop-blur-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() =>
            add({ id, name, ref: reference, image, href: `/produto/${id}` })
          }
          aria-label="Adicionar ao cesto"
          className="flex h-12 w-12 shrink-0 items-center justify-center border border-clay text-ink transition-colors active:border-gold active:text-gold"
        >
          <BagIcon />
        </button>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-1 items-center justify-center gap-2.5 bg-[#25D366] text-[12px] tracking-[0.16em] text-white uppercase"
        >
          <WhatsAppGlyph />
          Comprar pelo WhatsApp
        </a>
      </div>
    </div>
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

function WhatsAppGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.03 2.6.12.16 1.77 2.71 4.3 3.8.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
