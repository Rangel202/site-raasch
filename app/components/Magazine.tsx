import Image from "next/image";
import Reveal from "./Reveal";
import { MAGAZINES } from "../data/site";

export default function Magazine() {
  return (
    <section className="grain relative overflow-hidden bg-ink py-24 text-ivory lg:py-32">
      <Image
        src="/images/editorial-lustre.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />

      <div className="relative z-10 mx-auto grid max-w-[1500px] items-center gap-14 px-5 lg:grid-cols-2 lg:px-10">
        <Reveal>
          <p className="eyebrow text-gold-pale">Conheça a nossa</p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.05] font-light">
            Revista
            <br />
            <em className="italic text-gold-pale">Digital</em>
          </h2>
          <p className="mt-7 max-w-md leading-relaxed font-light text-ivory/75">
            Uma edição com dicas, histórias sobre joias, indicações e, claro,
            os nossos melhores produtos. Leia direto no seu navegador.
          </p>
        </Reveal>

        <Reveal delay={140} className="flex flex-col gap-4">
          {MAGAZINES.map((magazine) => (
            <a
              key={magazine.edition}
              href={magazine.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 border border-ivory/15 px-7 py-7 transition-colors duration-500 hover:border-gold-pale/60 hover:bg-ivory/5"
            >
              <div>
                <p className="text-[10px] tracking-[0.28em] text-gold-pale uppercase">
                  Edição
                </p>
                <p className="mt-2 font-display text-[26px] leading-none font-light lg:text-[30px]">
                  {magazine.edition}
                </p>
              </div>
              <span className="flex items-center gap-3 text-[11px] tracking-[0.2em] text-ivory/70 uppercase transition-colors group-hover:text-gold-pale">
                Conferir
                <span
                  aria-hidden
                  className="transition-transform duration-500 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
