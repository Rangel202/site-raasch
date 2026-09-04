"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row lg:gap-6">
      {images.length > 1 && (
        <ul className="no-scrollbar flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
          {images.map((image, i) => (
            <li key={image}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ver foto ${i + 1} de ${name}`}
                aria-current={i === active}
                className={`relative block h-20 w-20 shrink-0 overflow-hidden border transition-colors duration-400 lg:h-24 lg:w-24 ${
                  i === active
                    ? "border-gold"
                    : "border-sand hover:border-clay"
                }`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="relative aspect-square flex-1 overflow-hidden bg-cream">
        <Image
          key={current}
          src={current}
          alt={name}
          fill
          priority
          quality={90}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
