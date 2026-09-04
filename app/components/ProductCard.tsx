"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";

/**
 * Deliberately narrower than `Product`: this is a client component, so every
 * field listed here is serialised into the RSC payload once per card. The
 * technical description alone would multiply a 24-card grid several times over.
 */
export type CardProduct = {
  id: string;
  name: string;
  ref?: string;
  categoryLabel: string;
  images: string[];
};

type Props = {
  product: CardProduct;
  /** Index within its grid, used only to stagger image priority. */
  eager?: boolean;
};

export default function ProductCard({ product, eager = false }: Props) {
  const { add } = useCart();
  const [hovered, setHovered] = useState(false);
  const href = `/produto/${product.id}`;

  const cover = product.images[0];
  const alternate = product.images[1];

  const addToCart = () =>
    add({
      id: product.id,
      name: product.name,
      ref: product.ref,
      image: cover,
      href,
    });

  return (
    <article
      className="group flex h-full flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-cream">
        <Link href={href} className="absolute inset-0" aria-label={product.name}>
          <Image
            src={cover}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={eager}
            className={`object-cover transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] ${
              alternate && hovered ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* Second photo cross-fades in on hover, when the product has one */}
          {alternate && (
            <Image
              src={alternate}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </Link>

        {/* Quick-add bar rises from the bottom edge on hover. Hidden below lg
            because a touch device never fires hover — those get the button
            under the name instead. */}
        <div className="absolute inset-x-0 bottom-0 hidden translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 lg:block">
          <button
            type="button"
            onClick={addToCart}
            className="w-full bg-ink/92 py-3.5 text-[11px] tracking-[0.24em] text-ivory uppercase backdrop-blur-sm transition-colors duration-400 hover:bg-gold"
          >
            Adicionar ao cesto
          </button>
        </div>
      </div>

      <div className="mt-3.5 flex flex-1 flex-col lg:mt-4">
        <Link href={href}>
          <h3 className="font-display text-[17px] leading-snug font-normal transition-colors duration-500 group-hover:text-gold sm:text-[19px]">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 truncate text-[10px] tracking-[0.16em] text-muted uppercase sm:text-[11px]">
          {product.ref ? `Ref. ${product.ref}` : product.categoryLabel}
        </p>

        {/* Touch-friendly equivalent of the hover bar */}
        <button
          type="button"
          onClick={addToCart}
          className="mt-auto flex w-full items-center justify-center gap-2 border border-sand py-2.5 text-[10px] tracking-[0.2em] text-ink-soft uppercase transition-colors active:border-gold active:text-gold lg:hidden"
        >
          <span aria-hidden className="text-[13px] leading-none">
            +
          </span>
          Cesto
        </button>
      </div>
    </article>
  );
}
