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
    <section className="bg-cream/40 py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-gold">Seleção da casa</p>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.06] font-light">
              Peças que saem
              <em className="italic text-gold"> do comum</em>
            </h2>
          </div>
          <Link
            href="/busca"
            className="link-underline self-start text-[12px] tracking-[0.22em] text-ink-soft uppercase transition-colors hover:text-gold md:self-auto"
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
