"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Phone: a full-bleed swipeable film strip — the native way to look at a piece,
 * with no chrome between the reader and the photograph.
 * Desktop: a thumbnail rail beside a large still.
 */
export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [index, setIndex] = useState(0);
  const strip = useRef<HTMLDivElement>(null);

  // Track the swiped slide without fighting the browser's own momentum.
  useEffect(() => {
    const el = strip.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const width = el.clientWidth || 1;
        setIndex(Math.round(el.scrollLeft / width));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goTo = useCallback((i: number) => {
    const el = strip.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Phone */}
      <div className="min-w-0 lg:hidden">
        <div className="relative -mx-5 w-[calc(100%+2.5rem)]">
          <div
            ref={strip}
            className="no-scrollbar flex w-full snap-x snap-mandatory overflow-x-auto"
          >
            {images.map((image, i) => (
              <div
                key={image}
                className="relative aspect-square w-full shrink-0 snap-center bg-cream"
              >
                <Image
                  src={image}
                  alt={i === 0 ? name : `${name} — foto ${i + 1}`}
                  fill
                  priority={i === 0}
                  quality={90}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <span className="absolute right-4 bottom-4 rounded-full bg-ink/70 px-3 py-1 text-[11px] tracking-wider text-ivory backdrop-blur-sm">
              {index + 1}/{images.length}
            </span>
          )}
        </div>

        {images.length > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {images.map((image, i) => (
              <button
                key={image}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === index}
                className="group px-1.5 py-3"
              >
                <span
                  className={`block h-px transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    i === index ? "w-8 bg-gold" : "w-4 bg-clay"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden gap-6 lg:flex">
        {images.length > 1 && (
          <ul className="flex flex-col gap-3">
            {images.map((image, i) => (
              <li key={image}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ver foto ${i + 1} de ${name}`}
                  aria-current={i === index}
                  className={`relative block h-24 w-24 overflow-hidden border transition-colors duration-400 ${
                    i === index ? "border-gold" : "border-sand hover:border-clay"
                  }`}
                >
                  <Image src={image} alt="" fill sizes="96px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="relative aspect-square flex-1 overflow-hidden bg-cream">
          <Image
            key={images[index]}
            src={images[index]}
            alt={name}
            fill
            priority
            quality={90}
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
}
