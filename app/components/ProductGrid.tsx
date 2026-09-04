import type { Product } from "../data/catalog";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function ProductGrid({
  products,
  columns = 4,
}: {
  products: Product[];
  columns?: 3 | 4;
}) {
  const grid =
    columns === 3
      ? "grid-cols-2 lg:grid-cols-3"
      : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <div className={`grid gap-x-4 gap-y-11 lg:gap-x-7 lg:gap-y-14 ${grid}`}>
      {products.map((product, i) => (
        <Reveal key={product.id} delay={(i % columns) * 90} as="div" className="h-full">
          <ProductCard
            // Only the fields the card renders cross into the client payload.
            product={{
              id: product.id,
              name: product.name,
              ref: product.ref,
              categoryLabel: product.categoryLabel,
              images: product.images.slice(0, 2),
            }}
            eager={i < columns}
          />
        </Reveal>
      ))}
    </div>
  );
}
