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
    const onPause = () => setPlaying(false);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);

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
      video.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", retry);
      window.removeEventListener("touchstart", retry);
      window.removeEventListener("scroll", retry);
    };
  }, []);

  return (
    <section
      id="top"
      className="grain relative flex h-[100svh] min-h-[540px] flex-col justify-end overflow-hidden bg-ink"
    >
      {/* Poster underlay carries the drift while the video is not running, so a
          blocked autoplay still gives a moving hero rather than a dead frame. */}
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

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/25 sm:via-transparent sm:to-ink/35" />

      <div className="relative z-10 w-full px-5 pb-24 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p
              className="text-[10px] tracking-[0.42em] text-gold-pale uppercase opacity-0 sm:text-[11px]"
              style={{ animation: "fadeUp 1s var(--ease-luxe) 0.25s forwards" }}
            >
              Joalheria · Porto Alegre · 1989
            </p>

            <h1
              className="mt-6 font-display text-[clamp(3rem,13vw,7rem)] leading-[0.92] font-light text-ivory opacity-0"
              style={{ animation: "fadeUp 1.1s var(--ease-luxe) 0.4s forwards" }}
            >
              O ouro
              <br />
              tem memória
            </h1>
          </div>

          <div
            className="flex shrink-0 flex-col gap-4 opacity-0 lg:items-end"
            style={{ animation: "fadeUp 1.1s var(--ease-luxe) 0.7s forwards" }}
          >
            <p className="max-w-xs text-[14px] leading-relaxed font-light text-ivory/75">
              Alianças, anéis e brincos escolhidos peça a peça há trinta e seis
              anos.
            </p>
            <Link
              href="/joias"
              className="btn-fill w-full bg-ivory px-10 py-4 text-ink hover:text-ivory lg:w-auto"
            >
              <span className="bg-gold" />
              <span>Ver a coleção</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop-only scroll cue: on phones the bottom bar owns that strip. */}
      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 opacity-0 lg:block"
        style={{ animation: "fadeUp 1s var(--ease-luxe) 1.1s forwards" }}
      >
        <span className="animate-drift block h-8 w-px bg-gradient-to-b from-transparent via-ivory/50 to-transparent lg:h-12" />
      </div>
    </section>
  );
}
