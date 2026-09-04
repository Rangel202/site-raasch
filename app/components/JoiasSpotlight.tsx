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
    <section id="joias" className="bg-ivory pt-16 pb-16 sm:pt-20 lg:pt-28 lg:pb-24">
      {/* Heading sits against a hairline rule with the count as a counterweight —
          a different rhythm from the centred blocks further down the page. */}
      <Reveal className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <div className="flex items-end justify-between gap-6 border-b border-sand pb-6">
          <h2 className="font-display display-1 font-light">
            A coleção
          </h2>
          <p className="shrink-0 pb-1 text-right text-[11px] leading-tight tracking-[0.2em] text-muted uppercase">
            {total}
            <br />
            peças
          </p>
        </div>
      </Reveal>

      {/* Category rail. Horizontal scroll is the native mobile gesture; on
          desktop the same list settles into a grid. */}
      <Reveal delay={100} className="mt-8 lg:mt-10">
        <ul className="no-scrollbar mx-auto flex max-w-[1500px] snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto px-5 pb-1 lg:grid lg:grid-cols-8 lg:gap-4 lg:overflow-visible lg:scroll-pl-0 lg:px-10">
          {rail.map((category, i) => {
            const label = category.label.includes("·")
              ? category.label.split("·").pop()!.trim()
              : category.label;
            return (
              <li
                key={category.slug}
                className="w-[128px] shrink-0 snap-start sm:w-[150px] lg:w-auto"
              >
                <Link href={`/joias/${category.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden bg-cream">
                    <Image
                      src={category.cover}
                      alt={label}
                      fill
                      sizes="(max-width: 1024px) 150px, 12vw"
                      priority={i < 4}
                      className="object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                    />
                  </div>
                  <p className="mt-3 font-display text-[16px] leading-tight font-normal transition-colors duration-500 group-hover:text-gold">
                    {label}
                  </p>
                  <p className="mt-0.5 text-[10px] tracking-[0.18em] text-muted uppercase">
                    {category.count}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Reveal>

      <div className="mx-auto mt-14 max-w-[1500px] px-5 sm:mt-16 lg:px-10">
        <Reveal delay={140}>
          <ProductGrid products={pieces} columns={3} />
        </Reveal>

        <Reveal delay={180} className="mt-12 flex justify-center">
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
