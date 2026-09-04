import Image from "next/image";
import Link from "next/link";
import ProductGrid from "./ProductGrid";
import Reveal from "./Reveal";
import { categoriesOf, countOf, highlights } from "../data/catalog";

/** Alianças first — it is both the largest category and the one people arrive
 *  already intending to buy. "Projetos Realizados" is a portfolio, not a shelf. */
const ORDER = [
  "aliancas",
  "aneis",
  "brincos",
  "gargantilhas",
  "pulseiras",
  "colares",
  "pingentes",
  "braceletes",
];

export default function JoiasSpotlight() {
  const all = categoriesOf("joias");
  const rail = ORDER.map((slug) => all.find((c) => c.slug === slug)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c),
  );
  const pieces = highlights("joias", 6);
  const total = countOf("joias");

  return (
    <section id="joias" className="bg-ivory py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <Reveal>
          <p className="eyebrow text-gold">A nossa especialidade</p>
          <h2 className="mt-4 max-w-2xl font-display display-1 font-light">
            Jóias que valem
            <em className="italic text-gold"> o dia inteiro</em>
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed font-light text-ink-soft">
            Ouro, diamantes, pérolas e pedras naturais. {total} peças no
            catálogo, escolhidas uma a uma desde 1989 — e um atendimento que
            responde no WhatsApp com preço, prazo e disponibilidade.
          </p>
        </Reveal>

        {/* Category rail. Horizontal scroll is the native mobile gesture; on
            desktop the same list settles into a grid. */}
        <Reveal delay={120} className="mt-10 sm:mt-12">
          <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto px-5 pb-1 lg:mx-0 lg:grid lg:grid-cols-8 lg:gap-4 lg:overflow-visible lg:px-0">
            {rail.map((category, i) => {
              const label = category.label.includes("·")
                ? category.label.split("·").pop()!.trim()
                : category.label;
              return (
                <li
                  key={category.slug}
                  className="w-[132px] shrink-0 snap-start sm:w-[160px] lg:w-auto"
                >
                  <Link href={`/joias/${category.slug}`} className="group block">
                    <div className="relative aspect-square overflow-hidden bg-cream">
                      <Image
                        src={category.cover}
                        alt={label}
                        fill
                        sizes="(max-width: 1024px) 160px, 12vw"
                        priority={i < 4}
                        className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                      />
                    </div>
                    <p className="mt-3 font-display text-[17px] leading-tight font-normal transition-colors duration-500 group-hover:text-gold">
                      {label}
                    </p>
                    <p className="mt-0.5 text-[10px] tracking-[0.2em] text-muted uppercase">
                      {category.count} peças
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={160} className="mt-14 sm:mt-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h3 className="font-display display-3 font-light">
              Peças em destaque
            </h3>
            <Link
              href="/joias"
              className="link-underline shrink-0 text-[11px] tracking-[0.2em] text-ink-soft uppercase transition-colors hover:text-gold"
            >
              Ver todas
            </Link>
          </div>
          <ProductGrid products={pieces} columns={3} />
        </Reveal>

        <Reveal delay={200} className="mt-12 flex justify-center">
          <Link
            href="/joias"
            className="btn-fill w-full bg-ink px-10 py-4 text-ivory hover:text-ink sm:w-auto"
          >
            <span className="bg-gold" />
            <span>Ver as {total} jóias</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
