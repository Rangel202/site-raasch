import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "../components/PageHead";
import ProductGrid from "../components/ProductGrid";
import Reveal from "../components/Reveal";
import SearchField from "../components/SearchField";
import { VERTICAL_LIST, search } from "../data/catalog";

export const metadata: Metadata = {
  title: "Buscar no catálogo",
  description:
    "Busque entre as peças de jóias, iluminação e decoração do catálogo Raasch.",
};

const SUGGESTIONS = [
  "anel",
  "aliança",
  "brinco",
  "lustre",
  "pendente",
  "arandela",
  "poltrona",
  "espelho",
  "vaso",
];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();
  const results = query ? search(query, 96) : [];

  return (
    <>
      <PageHead
        eyebrow="Catálogo completo"
        title={
          query ? (
            <>
              Resultados para
              <em className="italic text-gold"> “{query}”</em>
            </>
          ) : (
            <>
              O que você procura?
            </>
          )
        }
        intro={
          query
            ? `${results.length} ${results.length === 1 ? "peça encontrada" : "peças encontradas"} entre jóias, iluminação e decoração.`
            : "Busque por nome da peça, categoria ou referência — em todo o catálogo da casa."
        }
        trail={[{ label: "Busca" }]}
      />

      <section className="bg-ivory py-14 lg:py-16">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
          <SearchField initial={query} />

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-[11px] tracking-[0.2em] text-muted uppercase">
              Sugestões
            </span>
            {SUGGESTIONS.map((term) => (
              <Link
                key={term}
                href={`/busca?q=${encodeURIComponent(term)}`}
                className="border border-sand px-3.5 py-1.5 text-[12px] font-light text-ink-soft transition-colors duration-400 hover:border-gold hover:text-gold"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
          {query && results.length === 0 && (
            <Reveal className="border-t border-sand py-20 text-center">
              <p className="font-display text-[26px] leading-snug font-light text-ink-soft">
                Não encontramos nada para “{query}”.
              </p>
              <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed font-light text-muted">
                Tente um termo mais curto, ou navegue pelas nossas três linhas.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {VERTICAL_LIST.map((vertical) => (
                  <Link
                    key={vertical.slug}
                    href={`/${vertical.slug}`}
                    className="btn-fill border border-clay px-7 py-3.5 text-ink hover:text-ivory"
                  >
                    <span className="bg-gold" />
                    <span>{vertical.label}</span>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}

          {results.length > 0 && <ProductGrid products={results} />}

          {!query && (
            <div className="grid gap-5 border-t border-sand pt-14 lg:grid-cols-3 lg:gap-7">
              {VERTICAL_LIST.map((vertical, i) => (
                <Reveal key={vertical.slug} delay={i * 110}>
                  <Link
                    href={`/${vertical.slug}`}
                    className="group flex h-full flex-col justify-between border border-sand bg-cream/30 p-8 transition-colors duration-700 hover:border-gold"
                  >
                    <div>
                      <p className="eyebrow text-gold">{vertical.tagline}</p>
                      <h2 className="mt-4 font-display text-[28px] leading-tight font-light">
                        {vertical.label}
                      </h2>
                      <p className="mt-4 text-[13px] leading-relaxed font-light text-ink-soft">
                        {vertical.blurb}
                      </p>
                    </div>
                    <span className="mt-8 inline-flex items-center gap-3 text-[11px] tracking-[0.2em] text-ink-soft uppercase transition-colors group-hover:text-gold">
                      <span className="link-underline">Explorar</span>
                      <span
                        aria-hidden
                        className="transition-transform duration-500 group-hover:translate-x-1.5"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
