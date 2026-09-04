import Link from "next/link";
import ProductGrid from "./ProductGrid";
import Reveal from "./Reveal";
import { highlights } from "../data/catalog";

export default function Highlights() {
  // A fixed mix so the home always leads with jewellery, its flagship line.
  const selection = [
    ...highlights("joias", 4),
    ...highlights("iluminacao", 2, 3),
    ...highlights("decoracao", 2, 7),
  ];

  return (
    <section className="bg-cream/40 py-16 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-gold">Seleção da casa</p>
            <h2 className="mt-5 max-w-xl font-display display-1 font-light">
              Peças que saem
              <em className="italic text-gold"> do comum</em>
            </h2>
          </div>
          <Link
            href="/busca"
            className="self-start border border-sand px-5 py-3 text-[11px] tracking-[0.2em] text-ink-soft uppercase transition-colors hover:border-gold hover:text-gold md:border-0 md:px-0 md:py-0 md:text-[12px] md:tracking-[0.22em] md:link-underline md:self-auto"
          >
            Buscar no catálogo completo
          </Link>
        </Reveal>

        <div className="mt-16">
          <ProductGrid products={selection} />
        </div>
      </div>
    </section>
  );
}
