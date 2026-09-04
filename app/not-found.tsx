import Link from "next/link";
import { VERTICAL_LIST } from "./data/catalog";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ivory pt-[128px] pb-24">
      <div className="mx-auto max-w-2xl px-5 text-center lg:px-10">
        <p className="foil font-display text-[76px] leading-none font-normal">
          404
        </p>
        <h1 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] leading-tight font-light">
          Esta página não existe
        </h1>
        <p className="mx-auto mt-5 max-w-md leading-relaxed font-light text-ink-soft">
          A peça pode ter saído do catálogo ou o endereço está incorreto. Comece
          por uma das nossas linhas.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {VERTICAL_LIST.map((vertical) => (
            <Link
              key={vertical.slug}
              href={`/${vertical.slug}`}
              className="btn-fill border border-clay px-7 py-3.5 text-ink hover:text-ivory"
            >
              <span className="bg-gold" />
              <span>{vertical.label}</span>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="link-underline mt-10 inline-block text-[12px] tracking-[0.2em] text-muted uppercase hover:text-gold"
        >
          Voltar para a home
        </Link>
      </div>
    </section>
  );
}
