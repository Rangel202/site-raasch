import { MARQUEE } from "../data/site";

export default function Marquee() {
  return (
    <div className="border-y border-sand bg-cream py-5">
      <div className="flex overflow-hidden">
        {/* Two identical tracks so the loop reads as continuous */}
        {[0, 1].map((track) => (
          <ul
            key={track}
            aria-hidden={track === 1}
            className="animate-marquee flex shrink-0 items-center gap-14 pr-14"
          >
            {MARQUEE.map((item) => (
              <li
                key={item}
                className="flex shrink-0 items-center gap-14 text-[11px] tracking-[0.3em] whitespace-nowrap text-ink-soft uppercase"
              >
                {item}
                <span className="h-1 w-1 rotate-45 bg-gold" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
