import type { Metadata } from "next";
import PageHead from "../components/PageHead";
import Reveal from "../components/Reveal";
import { MAGAZINES } from "../data/site";

export const metadata: Metadata = {
  title: "Revista Digital",
  description:
    "Uma edição com dicas, histórias sobre joias, indicações e os melhores produtos da Raasch. Leia as edições disponíveis.",
};

export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Conheça a nossa"
        title={
          <>
            Revista
            <em className="italic text-gold-pale"> Digital</em>
          </>
        }
        intro="Uma edição com dicas, histórias sobre joias, indicações. E, claro, os nossos melhores produtos."
        trail={[{ label: "Revista Digital" }]}
        image="/images/editorial-lustre.jpg"
      />

      <section className="bg-ivory py-20 lg:py-28">
        <div className="mx-auto max-w-[1100px] px-5 lg:px-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {MAGAZINES.map((magazine, i) => (
              <Reveal key={magazine.edition} delay={i * 120}>
                <a
                  href={magazine.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between border border-sand bg-cream/40 p-9 transition-colors duration-700 hover:border-gold lg:p-11"
                >
                  <div>
                    <span className="flex h-12 w-12 items-center justify-center border border-clay/70 text-gold transition-colors duration-500 group-hover:border-gold">
                      <BookGlyph />
                    </span>
                    <p className="eyebrow mt-8 text-gold">Edição</p>
                    <h2 className="mt-3 font-display text-[30px] leading-tight font-light lg:text-[36px]">
                      {magazine.edition}
                    </h2>
                  </div>

                  <span className="mt-12 inline-flex items-center gap-3 text-[11px] tracking-[0.22em] text-ink-soft uppercase transition-colors duration-500 group-hover:text-gold">
                    <span className="link-underline">Conferir agora</span>
                    <span
                      aria-hidden
                      className="transition-transform duration-500 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 border-t border-sand pt-10">
            <p className="max-w-2xl leading-relaxed font-light text-ink-soft">
              As edições abrem em PDF, direto no seu navegador. Quer receber as
              próximas em primeira mão? Chame a gente no WhatsApp e entramos em
              contato a cada nova edição.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function BookGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 4.5h6a2.5 2.5 0 0 1 2 1 2.5 2.5 0 0 1 2-1h6v14h-6a2.5 2.5 0 0 0-2 1 2.5 2.5 0 0 0-2-1H4v-14Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M12 5.5v14" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
