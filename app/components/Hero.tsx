"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React renders `muted` as a DOM property, but mobile autoplay policies
    // read the *attribute* — without this the phone waits for a tap.
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.muted = true;
    video.defaultMuted = true;

    const tryPlay = () => {
      const attempt = video.play();
      if (attempt) attempt.catch(() => undefined);
    };

    const onPlaying = () => setPlaying(true);
    const onStalled = () => setPlaying(false);

    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onStalled);

    tryPlay();

    // Low Power Mode and a few Android builds only release autoplay after the
    // tab is foregrounded or the reader touches the page. Retry on both.
    const retry = () => {
      if (video.paused) tryPlay();
    };
    document.addEventListener("visibilitychange", retry);
    window.addEventListener("touchstart", retry, { passive: true });
    window.addEventListener("scroll", retry, { passive: true });

    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onStalled);
      document.removeEventListener("visibilitychange", retry);
      window.removeEventListener("touchstart", retry);
      window.removeEventListener("scroll", retry);
    };
  }, []);

  return (
    <section
      id="top"
      className="grain relative flex h-[100svh] min-h-[560px] items-end overflow-hidden bg-ink"
    >
      {/* Poster underlay. It carries the Ken Burns drift while the video is
          not running, so a blocked autoplay still gives a moving hero rather
          than a dead frame. */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-cover bg-[62%_center] bg-no-repeat ${
          playing ? "" : "animate-kenburns"
        }`}
        style={{ backgroundImage: "url(/images/hero-poster.jpg)" }}
      />

      <video
        ref={videoRef}
        className={`animate-kenburns absolute inset-0 h-full w-full object-cover object-[62%_center] transition-opacity duration-[1200ms] ${
          playing ? "opacity-100" : "opacity-0"
        }`}
        src="/video/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        tabIndex={-1}
        disablePictureInPicture
      />

      {/* Scrims — darkest at the bottom, where the copy sits. Mobile needs a
          heavier foot because the text block is taller relative to the frame. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10 sm:from-ink/90 sm:via-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/10 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-14 sm:pb-20 lg:px-10 lg:pb-24">
        <div className="max-w-3xl">
          <p
            className="eyebrow text-gold-pale opacity-0"
            style={{ animation: "fadeUp 1s var(--ease-luxe) 0.3s forwards" }}
          >
            Porto Alegre · desde 1989
          </p>

          <h1
            className="mt-5 font-display text-[clamp(2.6rem,11vw,6.4rem)] leading-[0.98] font-light text-ivory opacity-0 sm:mt-6"
            style={{ animation: "fadeUp 1.1s var(--ease-luxe) 0.45s forwards" }}
          >
            Uma loja repleta
            <br />
            de <em className="font-normal italic text-gold-pale">desejos</em>
          </h1>

          <p
            className="mt-5 max-w-lg text-[14px] leading-relaxed font-light text-ivory/80 sm:mt-7 sm:text-[15px]"
            style={{ animation: "fadeUp 1.1s var(--ease-luxe) 0.65s forwards", opacity: 0 }}
          >
            Jóias, iluminação e decoração em um só endereço. Mais de 14.000
            itens e atendimento personalizado, do primeiro contato ao pós-venda.
          </p>

          <div
            className="mt-8 flex flex-col gap-3 opacity-0 sm:mt-10 sm:flex-row sm:items-center sm:gap-4"
            style={{ animation: "fadeUp 1.1s var(--ease-luxe) 0.85s forwards" }}
          >
            <Link
              href="/joias"
              className="btn-fill w-full bg-ivory px-9 py-4 text-ink hover:text-ivory sm:w-auto"
            >
              <span className="bg-gold" />
              <span>Ver as jóias</span>
            </Link>
            <Link
              href="#linhas"
              className="inline-flex items-center justify-center gap-3 border border-ivory/30 px-9 py-4 text-[12px] tracking-[0.22em] text-ivory uppercase transition-colors duration-500 hover:border-gold-pale hover:text-gold-pale sm:border-0 sm:px-2"
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
