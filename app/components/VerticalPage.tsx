import Link from "next/link";
import CategoryCard from "./CategoryCard";
import PageHead from "./PageHead";
import ProductGrid from "./ProductGrid";
import Reveal from "./Reveal";
import {
  VERTICALS,
  categoryGroupsOf,
  countOf,
  highlights,
  type Vertical,
} from "../data/catalog";

export default function VerticalPage({ vertical }: { vertical: Vertical }) {
  const meta = VERTICALS[vertical];
  const groups = categoryGroupsOf(vertical);
  const total = countOf(vertical);

  return (
    <>
      <PageHead
        eyebrow={meta.tagline}
        title={meta.label}
        intro={meta.blurb}
        trail={[{ label: meta.label }]}
        image={meta.cover}
      />

      <section className="bg-ivory py-20 lg:py-24">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-gold">Por categoria</p>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,2.8rem)] leading-tight font-light">
                Escolha por onde começar
              </h2>
            </div>
            <p className="text-[12px] tracking-[0.2em] text-muted uppercase">
              {total} peças no catálogo
            </p>
          </Reveal>

          {groups.map((group, gi) => (
            <div key={group.key || "flat"} className="mt-14">
              {group.label && (
                <Reveal className="mb-7 flex items-center gap-5">
                  <h3 className="text-[11px] tracking-[0.28em] text-gold uppercase">
                    {group.label}
                  </h3>
                  <span className="rule flex-1" />
                </Reveal>
              )}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                {group.items.map((category, i) => (
                  <Reveal key={category.slug} delay={(i % 4) * 90}>
                    <CategoryCard category={category} eager={gi === 0 && i < 4} />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-sand bg-cream/40 py-20 lg:py-28">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-gold">Destaques</p>
              <h2 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,2.8rem)] leading-tight font-light">
                Uma amostra de {meta.label.toLowerCase()}
              </h2>
            </div>
            <Link
              href="/busca"
              className="link-underline self-start text-[12px] tracking-[0.22em] text-ink-soft uppercase transition-colors hover:text-gold md:self-auto"
            >
              Buscar no catálogo
            </Link>
          </Reveal>

          <div className="mt-14">
            <ProductGrid products={highlights(vertical, 8)} />
          </div>
        </div>
      </section>
    </>
  );
}
