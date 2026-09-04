import Reveal from "./Reveal";
import { GENERAL_WHATSAPP, SITE } from "../data/site";

/**
 * Raasch closes every sale on WhatsApp. Spelling that out removes the main
 * hesitation a first-time visitor has — "there is no price, so how do I buy?"
 */
const STEPS = [
  {
    n: "01",
    title: "Escolha a peça",
    text: "Navegue pelo catálogo e junte no cesto o que quiser orçar. Cada peça tem a sua referência.",
  },
  {
    n: "02",
    title: "Chame no WhatsApp",
    text: "Um toque envia a sua seleção já preenchida. Sem cadastro, sem formulário longo.",
  },
  {
    n: "03",
    title: "Receba o orçamento",
    text: "Respondemos com preço, prazo e formas de pagamento. Entrega para todo o Brasil ou retirada na loja.",
  },
];

export default function HowToBuy() {
  return (
    <section className="border-y border-sand bg-cream/50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <Reveal className="max-w-xl">
          <p className="eyebrow text-gold">Como comprar</p>
          <h2 className="mt-4 font-display display-2 font-light">
            Simples como mandar
            <em className="italic text-gold"> uma mensagem</em>
          </h2>
        </Reveal>

        <ol className="mt-10 grid gap-5 sm:mt-12 lg:grid-cols-3 lg:gap-7">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 110} as="li">
              <div className="flex h-full gap-5 border border-sand bg-ivory/70 p-6 lg:flex-col lg:gap-6 lg:p-8">
                <p className="foil font-display text-[32px] leading-none font-normal lg:text-[40px]">
                  {step.n}
                </p>
                <div>
                  <h3 className="font-display text-[21px] leading-tight font-normal lg:text-[24px]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed font-light text-ink-soft">
                    {step.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200} className="mt-10 flex flex-col items-center gap-4">
          <a
            href={GENERAL_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-3 bg-[#25D366] px-10 py-4 text-[12px] tracking-[0.2em] text-white uppercase transition-opacity duration-500 hover:opacity-90 sm:w-auto"
          >
            <WhatsAppGlyph />
            Falar com a Raasch
          </a>
          <p className="text-center text-[12px] text-muted">
            {SITE.whatsapp.label} · {SITE.hours}
          </p>
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
