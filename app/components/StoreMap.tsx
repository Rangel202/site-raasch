import { MAPS_QUERY, SITE } from "../data/site";

/**
 * Embedded map of the Cidade Baixa store. Uses the keyless `output=embed`
 * form so it needs no Google Cloud project to work.
 */
export default function StoreMap({ height = "h-[380px] lg:h-[460px]" }) {
  return (
    <section className="relative border-t border-sand bg-ivory">
      <iframe
        title={`Mapa da loja Raasch — ${SITE.address.street}`}
        src={`https://www.google.com/maps?q=${MAPS_QUERY}&z=16&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={`w-full ${height} grayscale-[30%] transition-all duration-700 hover:grayscale-0`}
      />

      {/* Address card floating over the map on wider screens */}
      <div className="pointer-events-none absolute inset-0 hidden items-center lg:flex">
        <div className="mx-auto w-full max-w-[1500px] px-10">
          <div className="pointer-events-auto max-w-sm bg-ivory/95 p-8 shadow-xl shadow-ink/10 backdrop-blur-sm">
            <p className="eyebrow text-gold">Nossa loja</p>
            <p className="mt-4 font-display text-[26px] leading-tight font-light">
              {SITE.address.district}
              <br />
              {SITE.address.city} / {SITE.address.state}
            </p>
            <p className="mt-4 text-[13px] leading-relaxed font-light text-ink-soft">
              {SITE.address.street}
              <br />
              {SITE.address.building}
            </p>
            <p className="mt-4 text-[12px] text-muted">{SITE.hours}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-3 text-[11px] tracking-[0.22em] text-ink uppercase"
            >
              <span className="link-underline">Como chegar</span>
              <span
                aria-hidden
                className="transition-transform duration-500 group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
