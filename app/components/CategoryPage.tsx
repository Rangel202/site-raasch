import Link from "next/link";
import { notFound } from "next/navigation";
import PageHead from "./PageHead";
import Pagination from "./Pagination";
import ProductGrid from "./ProductGrid";
import Reveal from "./Reveal";
import {
  VERTICALS,
  categoriesOf,
  findCategory,
  productsOf,
  type Vertical,
} from "../data/catalog";

const PER_PAGE = 24;

export default function CategoryPage({
  vertical,
  categorySlug,
  page,
}: {
  vertical: Vertical;
  categorySlug: string;
  page: number;
}) {
  const category = findCategory(vertical, categorySlug);
  if (!category) notFound();

  const meta = VERTICALS[vertical];
  const products = productsOf(vertical, categorySlug);
  const totalPages = Math.max(1, Math.ceil(products.length / PER_PAGE));
  const current = Math.min(Math.max(1, page), totalPages);
  const slice = products.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  // Sibling categories keep browsing going without a trip back up the tree.
  const group = categorySlug.includes("/") ? categorySlug.split("/")[0] : null;
  const siblings = categoriesOf(vertical).filter((c) =>
    group ? c.slug.startsWith(`${group}/`) : !c.slug.includes("/"),
  );

  const label = category.label.includes("·")
    ? category.label.split("·").pop()!.trim()
    : category.label;

  return (
    <>
      <PageHead
        eyebrow={meta.label}
        title={label}
        intro={`${products.length} ${products.length === 1 ? "peça disponível" : "peças disponíveis"} nesta categoria. Fale com a gente pelo WhatsApp para preço, prazo e disponibilidade.`}
        trail={[
          { label: meta.label, href: `/${vertical}` },
          ...(group
            ? [
                {
                  label: group
                    .split("_")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")
                    .replace("Moveis", "Móveis"),
                },
              ]
            : []),
          { label },
        ]}
      />

      {siblings.length > 1 && (
        <div className="border-b border-sand bg-ivory">
          <div className="no-scrollbar mx-auto flex max-w-[1500px] gap-3 overflow-x-auto px-5 py-4 lg:px-10">
            {siblings.map((sibling) => {
              const siblingLabel = sibling.label.includes("·")
                ? sibling.label.split("·").pop()!.trim()
                : sibling.label;
              const active = sibling.slug === categorySlug;
              return (
                <Link
                  key={sibling.slug}
                  href={`/${vertical}/${sibling.slug}`}
                  className={`shrink-0 border px-4 py-3 text-[11px] tracking-[0.16em] whitespace-nowrap uppercase transition-colors duration-400 ${
                    active
                      ? "border-gold bg-gold text-ivory"
                      : "border-sand text-ink-soft hover:border-gold hover:text-gold"
                  }`}
                >
                  {siblingLabel}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <section className="bg-ivory py-16 lg:py-20">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
          {slice.length === 0 ? (
            <Reveal className="py-20 text-center">
              <p className="font-display text-2xl font-light text-ink-soft">
                Nenhuma peça nesta página.
              </p>
              <Link
                href={`/${vertical}`}
                className="link-underline mt-6 inline-block text-[12px] tracking-[0.2em] text-gold uppercase"
              >
                Voltar para {meta.label}
              </Link>
            </Reveal>
          ) : (
            <>
              <ProductGrid products={slice} />
              <Pagination
                page={current}
                totalPages={totalPages}
                basePath={`/${vertical}/${categorySlug}`}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
