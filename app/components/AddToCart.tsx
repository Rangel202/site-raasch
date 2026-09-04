"use client";

import { useCart } from "./CartProvider";

export default function AddToCart({
  id,
  name,
  reference,
  image,
}: {
  id: string;
  name: string;
  reference?: string;
  image: string;
}) {
  const { add } = useCart();

  return (
    <button
      type="button"
      onClick={() => add({ id, name, ref: reference, image, href: `/produto/${id}` })}
      className="btn-fill w-full bg-ink px-8 py-4 text-ivory hover:text-ink"
    >
      <span className="bg-gold-pale" />
      <span>Adicionar ao cesto</span>
    </button>
  );
}
