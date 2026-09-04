"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { SITE, whatsappLink } from "../data/site";

export default function CartDrawer() {
  const { items, count, open, setOpen, setQty, remove, clear } = useCart();

  // The legacy shop closes every sale on WhatsApp, so the basket does too.
  const checkout = whatsappLink(
    [
      "Olá! Vim pelo site da Raasch e gostaria de um orçamento para:",
      "",
      ...items.map(
        (item, i) =>
          `${i + 1}. ${item.name}${item.ref ? ` — ref. ${item.ref}` : ""}${
            item.qty > 1 ? ` (${item.qty} un.)` : ""
          }`,
      ),
      "",
      "Podem me ajudar?",
    ].join("\n"),
  );

  return (
    <div
      className={`fixed inset-0 z-70 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-ink/45 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-label="Meu cesto"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-sand px-6 py-5">
          <div>
            <p className="eyebrow text-gold">Meu cesto</p>
            <p className="mt-1 text-[13px] text-muted">
              {count === 0
                ? "Nenhuma peça ainda"
                : `${count} ${count === 1 ? "peça selecionada" : "peças selecionadas"}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar cesto"
            className="text-3xl leading-none text-muted transition-colors hover:text-ink"
          >
            ×
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-10 text-center">
            <p className="font-display text-2xl leading-snug font-light text-ink-soft">
              Seu cesto está vazio.
            </p>
            <p className="text-[13px] leading-relaxed text-muted">
              Navegue pelo catálogo e junte aqui as peças que quiser orçar. Nós
              respondemos pelo WhatsApp com preço e disponibilidade.
            </p>
            <Link
              href="/joias"
              onClick={() => setOpen(false)}
              className="btn-fill bg-ink px-8 py-4 text-ivory hover:text-ink"
            >
              <span className="bg-gold-pale" />
              <span>Ver o catálogo</span>
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-sand/70 overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="relative h-24 w-20 shrink-0 overflow-hidden bg-cream"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-[17px] leading-snug transition-colors hover:text-gold"
                    >
                      {item.name}
                    </Link>
                    {item.ref && (
                      <p className="mt-1 text-[10px] tracking-[0.18em] text-muted uppercase">
                        Ref. {item.ref}
                      </p>
                    )}

                    <div className="mt-auto flex items-center gap-4 pt-3">
                      <div className="flex items-center border border-sand">
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty - 1)}
                          aria-label={`Diminuir ${item.name}`}
                          className="px-2.5 py-1 text-muted transition-colors hover:text-gold"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center text-[13px]">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(item.id, item.qty + 1)}
                          aria-label={`Aumentar ${item.name}`}
                          className="px-2.5 py-1 text-muted transition-colors hover:text-gold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="link-underline text-[11px] tracking-[0.16em] text-muted uppercase transition-colors hover:text-garnet"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-sand px-6 py-6">
              <p className="text-[12px] leading-relaxed text-muted">
                Os valores da Raasch variam com o ouro, as pedras e o acabamento.
                Enviamos o orçamento completo pelo WhatsApp{" "}
                {SITE.whatsapp.label}.
              </p>
              <a
                href={checkout}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-3 bg-[#25D366] px-6 py-4 text-[12px] tracking-[0.2em] text-white uppercase transition-opacity duration-500 hover:opacity-90"
              >
                <WhatsAppGlyph />
                Pedir orçamento
              </a>
              <button
                type="button"
                onClick={clear}
                className="mt-4 w-full text-center text-[11px] tracking-[0.18em] text-muted uppercase transition-colors hover:text-garnet"
              >
                Esvaziar cesto
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

function WhatsAppGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.03 2.6.12.16 1.77 2.71 4.3 3.8.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
