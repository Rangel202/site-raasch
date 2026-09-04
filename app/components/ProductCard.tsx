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
  const [added, setAdded] = useState(false);
  const href = `/produto/${product.id}`;

  const cover = product.images[0];
  const alternate = product.images[1];

  const addToCart = () => {
    add({
      id: product.id,
      name: product.name,
      ref: product.ref,
      image: cover,
      href,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article
      className="group flex h-full flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-4/5 overflow-hidden bg-cream">
        <Link href={href} className="absolute inset-0" aria-label={product.name}>
          <Image
            src={cover}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={eager}
            className={`object-cover transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${
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
              className={`object-cover transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${
                hovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </Link>

        {/* A quiet disc instead of a full-width bar: less chrome over the piece,
            and it stays visible on touch, where hover never fires. */}
        <button
          type="button"
          onClick={addToCart}
          aria-label={`Adicionar ${product.name} ao cesto`}
          className={`absolute right-2.5 bottom-2.5 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:right-3 lg:bottom-3 lg:h-11 lg:w-11 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 ${
            added
              ? "bg-gold text-ivory"
              : "bg-ivory/90 text-ink hover:bg-gold hover:text-ivory"
          }`}
        >
          {added ? <CheckIcon /> : <PlusIcon />}
        </button>
      </div>

      <div className="mt-3.5 flex flex-1 flex-col lg:mt-4">
        <Link href={href}>
          <h3 className="font-display text-[17px] leading-snug font-normal transition-colors duration-500 group-hover:text-gold sm:text-[19px]">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 truncate text-[10px] tracking-[0.16em] text-muted uppercase sm:text-[11px]">
          {product.ref ? `Ref. ${product.ref}` : product.categoryLabel}
        </p>
      </div>
    </article>
  );
}

function PlusIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden>
      <path
        d="m5 12.5 4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
