import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { VERTICAL_LIST, countOf } from "../data/catalog";

export default function Verticals() {
  return (
    <section id="linhas" className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <Reveal className="flex flex-col items-center text-center">
          <p className="eyebrow text-gold">Três linhas, uma casa</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.06] font-light">
            Tudo o que a sua casa e o seu
            <em className="italic text-gold"> estilo</em> pedem
          </h2>
          <div className="rule mt-8 w-24" />
        </Reveal>

        <div className="mt-16 grid gap-5 lg:grid-cols-3 lg:gap-7">
          {VERTICAL_LIST.map((vertical, i) => (
            <Reveal key={vertical.slug} delay={i * 130}>
              <Link href={`/${vertical.slug}`} className="group block h-full">
                {/* Square on phones so all three stay scannable without a
                    marathon scroll; full portrait once they sit side by side. */}
                <div className="relative aspect-square overflow-hidden bg-cream lg:aspect-4/5">
                  <Image
                    src={vertical.cover}
                    alt={vertical.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  {/* Heavy foot on the scrim: the pieces are bright, the caption is not. */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink from-30% via-ink/55 via-58% to-transparent to-82%" />

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 lg:p-9">
                    <p className="text-[10px] tracking-[0.3em] text-gold-pale uppercase">
                      {vertical.tagline}
                    </p>
                    <h3 className="mt-2.5 font-display text-[30px] leading-none font-light text-ivory sm:text-[34px] lg:text-[40px]">
                      {vertical.label}
                    </h3>

                    <p className="mt-3 max-w-xs text-[12.5px] leading-relaxed font-light text-ivory/75 sm:mt-4 sm:text-[13px]">
                      {vertical.blurb}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-3 text-[11px] tracking-[0.22em] text-ivory uppercase sm:mt-6">
                      <span className="link-underline">
                        {countOf(vertical.slug)} peças
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
