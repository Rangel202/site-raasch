import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { VERTICALS, countOf } from "../data/catalog";

/**
 * Jewellery leads the page in its own section, so lighting and decoration sit
 * here as the rest of the house — still substantial, deliberately quieter.
 */
const LINES = [VERTICALS.iluminacao, VERTICALS.decoracao];

export default function OtherLines() {
  return (
    <section id="linhas" className="bg-ivory py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <Reveal className="max-w-xl">
          <p className="eyebrow text-gold">A casa também faz</p>
          <h2 className="mt-4 font-display display-2 font-light">
            Iluminação e decoração,
            <em className="italic text-gold"> sob o mesmo teto</em>
          </h2>
          <p className="mt-5 leading-relaxed font-light text-ink-soft">
            Desde 2006 somamos lustres, cristais finos e mobiliário ao catálogo,
            com o mesmo atendimento das jóias.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6">
          {LINES.map((line, i) => (
            <Reveal key={line.slug} delay={i * 130}>
              <Link href={`/${line.slug}`} className="group block">
                <div className="relative aspect-[16/11] overflow-hidden bg-cream sm:aspect-4/5 lg:aspect-[16/10]">
                  <Image
                    src={line.cover}
                    alt={line.label}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink from-28% via-ink/50 via-58% to-transparent to-85%" />

                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                    <p className="text-[10px] tracking-[0.3em] text-gold-pale uppercase">
                      {line.tagline}
                    </p>
                    <h3 className="mt-2 font-display text-[28px] leading-none font-light text-ivory sm:text-[32px] lg:text-[36px]">
                      {line.label}
                    </h3>
                    <p className="mt-3 max-w-xs text-[12.5px] leading-relaxed font-light text-ivory/75">
                      {line.blurb}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-3 text-[11px] tracking-[0.22em] text-ivory uppercase">
                      <span className="link-underline">
                        {countOf(line.slug)} peças
                      </span>
                      <span
                        aria-hidden
                        className="transition-transform duration-500 group-hover:translate-x-1.5"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
