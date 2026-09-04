import Image from "next/image";
import Link from "next/link";
import type { Category } from "../data/catalog";

export default function CategoryCard({
  category,
  eager = false,
}: {
  category: Category;
  eager?: boolean;
}) {
  const label = category.label.includes("·")
    ? category.label.split("·").pop()!.trim()
    : category.label;

  return (
    <Link
      href={`/${category.vertical}/${category.slug}`}
      className="group block"
    >
      <div className="relative aspect-4/5 overflow-hidden bg-cream">
        <Image
          src={category.cover}
          alt={label}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={eager}
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/30 to-transparent transition-opacity duration-700 group-hover:from-ink" />

        <div className="absolute inset-x-0 bottom-0 p-5 lg:p-6">
          <h3 className="font-display text-[22px] leading-tight font-light text-ivory lg:text-[26px]">
            {label}
          </h3>
          <p className="mt-2 text-[10px] tracking-[0.26em] text-gold-pale uppercase">
            {category.count} {category.count === 1 ? "peça" : "peças"}
          </p>
        </div>
      </div>
    </Link>
  );
}
