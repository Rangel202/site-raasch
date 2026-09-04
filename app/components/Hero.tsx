"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Some browsers block autoplay until the element is explicitly muted.
    video.muted = true;
    const attempt = video.play();
    if (attempt) attempt.catch(() => undefined);

    if (video.readyState >= 3) setReady(true);
  }, []);

  return (
    <section
      id="top"
      className="grain relative flex h-[100svh] min-h-[640px] items-end overflow-hidden bg-ink"
    >
      {/* Poster underlay avoids a black flash before the first frame decodes.
          It must stay *behind* the video, so it comes first in the DOM. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-[62%_center] bg-no-repeat"
        style={{ backgroundImage: "url(/images/hero-poster.jpg)" }}
      />

      <video
        ref={videoRef}
        className={`animate-kenburns absolute inset-0 h-full w-full object-cover object-[62%_center] transition-opacity duration-[1400ms] ${
          ready ? "opacity-100" : "opacity-0"
        }`}
        src="/video/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setReady(true)}
      />

      {/* Scrims — darkest at bottom-left, where the copy sits */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/15 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-16 lg:px-10 lg:pb-24">
        <div className="max-w-3xl">
          <p
            className="eyebrow text-gold-pale opacity-0"
            style={{ animation: "fadeUp 1s var(--ease-luxe) 0.3s forwards" }}
          >
            Porto Alegre · desde 1989
          </p>

          <h1
            className="mt-6 font-display text-[clamp(2.8rem,7.4vw,6.4rem)] leading-[0.98] font-light text-ivory opacity-0"
            style={{ animation: "fadeUp 1.1s var(--ease-luxe) 0.45s forwards" }}
          >
            Uma loja repleta
            <br />
            de <em className="font-normal italic text-gold-pale">desejos</em>
          </h1>

          <p
            className="mt-7 max-w-lg text-[15px] leading-relaxed font-light text-ivory/80 opacity-0"
            style={{ animation: "fadeUp 1.1s var(--ease-luxe) 0.65s forwards" }}
          >
            Jóias, iluminação e decoração reunidas em um só endereço. Mais de
            14.000 itens selecionados junto a 126 fornecedores, com atendimento
            personalizado do primeiro contato ao pós-venda.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-4 opacity-0"
            style={{ animation: "fadeUp 1.1s var(--ease-luxe) 0.85s forwards" }}
          >
            <Link
              href="/joias"
              className="btn-fill bg-ivory px-9 py-4 text-ink hover:text-ivory"
            >
              <span className="bg-gold" />
              <span>Ver as jóias</span>
            </Link>
            <Link
              href="#linhas"
              className="link-underline inline-flex items-center gap-3 px-2 py-4 text-[12px] tracking-[0.22em] text-ivory uppercase transition-colors duration-500 hover:text-gold-pale"
            >
              Nossas três linhas
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
        <span className="text-[10px] tracking-[0.3em] text-ivory/50 uppercase">
          Role
        </span>
        <span className="animate-drift block h-12 w-px bg-gradient-to-b from-ivory/60 to-transparent" />
      </div>
    </section>
  );
}
