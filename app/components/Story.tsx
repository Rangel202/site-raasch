import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import { FACTS } from "../data/site";

export default function Story() {
  return (
    <section className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1500px] items-center gap-14 px-5 lg:grid-cols-2 lg:gap-24 lg:px-10">
        <Reveal className="relative">
          <div className="relative aspect-4/5 overflow-hidden">
            <Image
              src="/images/editorial-raasch.jpg"
              alt="Brinco e anel da Raasch em ouro com pedras"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[68%_center]"
            />
          </div>
          {/* Offset frame line, a quiet editorial detail */}
          <div
            aria-hidden
            className="absolute -right-4 -bottom-4 h-full w-full border border-clay/60 lg:-right-6 lg:-bottom-6"
          />
        </Reveal>

        <Reveal delay={140}>
          <p className="eyebrow text-gold">A empresa</p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.06] font-light">
            Trinta e seis anos
            <br />
            <em className="italic text-gold">de confiança</em>
          </h2>

          <p className="mt-8 max-w-lg leading-relaxed font-light text-ink-soft">
            Em 22 de novembro de 1989 nascia a Raasch Joias. Plantamos e colhemos
            vários frutos, que nos levaram, em 1992, à nossa sede própria no
            Edifício Edel Trade Center, na capital gaúcha.
          </p>
          <p className="mt-5 max-w-lg leading-relaxed font-light text-ink-soft">
            De lá para cá somamos iluminação, cristais finos e mobiliário ao
            catálogo. O contato direto com o cliente, o atendimento cordial e um
            pós-venda eficiente são o que nos fazem ser lembrados.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-sand pt-10 sm:grid-cols-4">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <p className="foil font-display text-[34px] leading-none font-normal lg:text-[40px]">
                  {fact.value}
                </p>
                <p className="mt-3 text-[11px] leading-relaxed text-muted">
                  {fact.label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/empresa"
            className="group mt-12 inline-flex items-center gap-4 text-[12px] tracking-[0.22em] text-ink uppercase"
          >
            <span className="link-underline">Conheça a nossa história</span>
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1.5"
            >
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
