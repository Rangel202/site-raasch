import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { findProduct } from "../data/catalog";
import { productWhatsapp } from "../data/site";

/**
 * One piece, given room. Both candidates are shot on transparency, which is
 * why they can sit on the dark ground without a visible photo edge.
 */
const PIECE_ID = "303";

export default function FeaturedPiece() {
  const piece = findProduct(PIECE_ID);
  if (!piece) return null;

  const spec = (piece.description ?? []).slice(0, 3);

  return (
    <section className="grain relative overflow-hidden bg-ink text-ivory">
      <div className="mx-auto grid max-w-[1500px] items-center gap-0 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-square w-full lg:aspect-[4/5]">
            <Image
              src={piece.images[0]}
              alt={piece.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={90}
              className="animate-drift object-contain p-10 sm:p-16 lg:p-20"
            />
            {/* Warm halo behind the stone */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(182,135,60,0.32),transparent_62%)]"
            />
          </div>
        </Reveal>

        <Reveal
          delay={140}
          className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-16 lg:py-24"
        >
          <p className="text-[10px] tracking-[0.42em] text-gold-pale uppercase">
            A peça do mês
          </p>

          <h2 className="mt-6 font-display text-[clamp(2.2rem,7vw,3.8rem)] leading-[1.02] font-light">
            {piece.name}
          </h2>

          {piece.ref && (
            <p className="mt-4 text-[11px] tracking-[0.24em] text-ivory/45 uppercase">
              Ref. {piece.ref}
            </p>
          )}

          {spec.length > 0 && (
            <ul className="mt-9 flex flex-col gap-3 border-t border-ivory/12 pt-8">
              {spec.map((line, i) => (
                <li
                  key={`${i}-${line}`}
                  className="flex gap-4 text-[14px] leading-relaxed font-light text-ivory/70"
                >
                  <span aria-hidden className="mt-2 h-px w-5 shrink-0 bg-gold" />
                  {line}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={productWhatsapp(piece.name, piece.ref)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] px-8 py-4 text-[12px] tracking-[0.2em] text-white uppercase transition-opacity duration-500 hover:opacity-90"
            >
              <WhatsAppGlyph />
              Quero esta peça
            </a>
            <Link
              href={`/produto/${piece.id}`}
              className="flex items-center justify-center border border-ivory/25 px-8 py-4 text-[12px] tracking-[0.2em] text-ivory uppercase transition-colors duration-500 hover:border-gold-pale hover:text-gold-pale"
            >
              Ver detalhes
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhatsAppGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.03 2.6.12.16 1.77 2.71 4.3 3.8.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
