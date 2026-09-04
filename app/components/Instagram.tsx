import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { highlights } from "../data/catalog";
import { SITE } from "../data/site";

/**
 * Instagram has no public feed without an API token, so this showcases real
 * catalogue photography and points at the profile. The gallery is labelled as
 * the catalogue — it never claims to be the account's posts.
 */
export default function Instagram() {
  const [main, secondary] = SITE.instagram;
  const pieces = highlights("joias", 6, 11);

  return (
    <section className="grain relative overflow-hidden bg-ink py-16 text-ivory sm:py-20 lg:py-28">
      <div className="relative z-10 mx-auto max-w-[1500px] px-5 lg:px-10">
        <Reveal className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-gold-pale">
            <InstagramGlyph size={26} />
          </span>

          <p className="eyebrow mt-7 text-gold-pale">Siga a Raasch</p>

          <a
            href={main.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 font-display text-[clamp(1.9rem,7vw,4.4rem)] leading-none font-light transition-colors duration-500 hover:text-gold-pale"
          >
            <span className="link-underline">{main.handle}</span>
          </a>

          <p className="mx-auto mt-7 max-w-lg leading-relaxed font-light text-ivory/70">
            Lançamentos, peças exclusivas e os bastidores da joalheria. É por lá
            que mostramos primeiro o que chega na loja.
          </p>

          <a
            href={main.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fill mt-9 bg-gold px-10 py-4 text-ivory hover:text-ink"
          >
            <span className="bg-gold-pale" />
            <span className="flex items-center gap-3">
              <InstagramGlyph size={16} />
              Seguir no Instagram
            </span>
          </a>
        </Reveal>

        {/* Real catalogue photography, explicitly labelled as such */}
        <Reveal delay={140} className="mt-12 sm:mt-16">
          <div className="grid grid-cols-3 gap-2.5 lg:grid-cols-6 lg:gap-4">
            {pieces.map((piece) => (
              <Link
                key={piece.id}
                href={`/produto/${piece.id}`}
                className="group relative aspect-square overflow-hidden bg-ink-soft/40"
              >
                <Image
                  src={piece.images[0]}
                  alt={piece.name}
                  fill
                  sizes="(max-width: 1024px) 33vw, 16vw"
                  className="object-cover opacity-85 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:opacity-100"
                />
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
              </Link>
            ))}
          </div>

          <p className="mt-5 text-center text-[11px] tracking-[0.22em] text-ivory/45 uppercase">
            Peças do nosso catálogo · toque para ver
          </p>
        </Reveal>

        <Reveal
          delay={220}
          className="mt-12 border-t border-ivory/12 pt-9 text-center sm:mt-14 sm:pt-10"
        >
          <p className="text-[13px] font-light text-ivory/60">
            Decoração e iluminação têm perfil próprio:
          </p>
          <a
            href={secondary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 inline-flex items-center gap-3 font-display text-[26px] leading-none font-light transition-colors duration-500 hover:text-gold-pale lg:text-[30px]"
          >
            <InstagramGlyph size={20} />
            <span className="link-underline">{secondary.handle}</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function InstagramGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}
