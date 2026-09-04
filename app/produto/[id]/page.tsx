import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "../../components/AddToCart";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProductGallery from "../../components/ProductGallery";
import ProductGrid from "../../components/ProductGrid";
import Reveal from "../../components/Reveal";
import { PRODUCTS, VERTICALS, findProduct, productsOf } from "../../data/catalog";
import { SITE, productWhatsapp } from "../../data/site";

/** Pre-render the whole catalogue — it is static data, not a live feed. */
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) return { title: "Produto não encontrado" };

  return {
    title: product.name,
    description: `${product.name}${product.ref ? ` — referência ${product.ref}` : ""}. ${product.categoryLabel} no catálogo da Raasch, Porto Alegre.`,
    openGraph: {
      title: `${product.name} · Raasch`,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) notFound();

  const meta = VERTICALS[product.vertical];
  const related = productsOf(product.vertical, product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const label = product.categoryLabel.includes("·")
    ? product.categoryLabel.split("·").pop()!.trim()
    : product.categoryLabel;

  return (
    <>
      <section className="bg-ivory pt-[128px] pb-16 lg:pt-[146px] lg:pb-24">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
          <Breadcrumbs
            trail={[
              { label: meta.label, href: `/${product.vertical}` },
              { label, href: `/${product.vertical}/${product.category}` },
              { label: product.name },
            ]}
          />

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <ProductGallery images={product.images} name={product.name} />

            <div className="lg:pt-4">
              <p className="eyebrow text-gold">{label}</p>
              <h1 className="mt-4 font-display display-2 font-light">
                {product.name}
              </h1>

              {product.ref && (
                <p className="mt-4 text-[12px] tracking-[0.2em] text-muted uppercase">
                  Referência {product.ref}
                </p>
              )}

              <div className="rule mt-8 w-full" />

              {product.description?.length ? (
                <div className="mt-8">
                  <h2 className="text-[11px] tracking-[0.28em] text-gold uppercase">
                    Informações do produto
                  </h2>
                  <ul className="mt-5 flex flex-col gap-2">
                    {product.description.map((line, i) => (
                      <li
                        key={`${i}-${line}`}
                        className="text-[14px] leading-relaxed font-light text-ink-soft"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-8 leading-relaxed font-light text-ink-soft">
                  Fale com a nossa equipe para receber medidas, acabamentos
                  disponíveis e o valor atualizado desta peça.
                </p>
              )}

              <div className="mt-10 flex flex-col gap-3">
                <a
                  href={productWhatsapp(product.name, product.ref)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#25D366] px-8 py-4 text-[12px] tracking-[0.2em] text-white uppercase transition-opacity duration-500 hover:opacity-90"
                >
                  <WhatsAppGlyph />
                  Comprar pelo WhatsApp
                </a>

                <AddToCart
                  id={product.id}
                  name={product.name}
                  reference={product.ref}
                  image={product.images[0]}
                />
              </div>

              <dl className="mt-10 grid gap-5 border-t border-sand pt-8 text-[13px] sm:grid-cols-2">
                <div>
                  <dt className="text-[10px] tracking-[0.26em] text-gold uppercase">
                    Atendimento
                  </dt>
                  <dd className="mt-2 font-light text-ink-soft">
                    {SITE.phone.label} · {SITE.hours}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] tracking-[0.26em] text-gold uppercase">
                    Loja física
                  </dt>
                  <dd className="mt-2 font-light text-ink-soft">
                    {SITE.address.district}, {SITE.address.city} / {SITE.address.state}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-sand bg-cream/40 py-14 sm:py-18 lg:py-24">
          <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
            <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-gold">Você também pode gostar</p>
                <h2 className="mt-4 font-display display-3 font-light">
                  Mais em {label.toLowerCase()}
                </h2>
              </div>
              <Link
                href={`/${product.vertical}/${product.category}`}
                className="self-start border border-sand px-5 py-3 text-[11px] tracking-[0.2em] text-ink-soft uppercase transition-colors hover:border-gold hover:text-gold md:border-0 md:px-0 md:py-0 md:text-[12px] md:tracking-[0.22em] md:link-underline sm:self-auto"
              >
                Ver a categoria
              </Link>
            </Reveal>

            <div className="mt-12">
              <ProductGrid products={related} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function WhatsAppGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.03 2.6.12.16 1.77 2.71 4.3 3.8.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
