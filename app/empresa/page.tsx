import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHead from "../components/PageHead";
import Reveal from "../components/Reveal";
import { FACTS, TIMELINE } from "../data/site";

export const metadata: Metadata = {
  title: "A empresa",
  description:
    "Fundada em 22 de novembro de 1989 em Porto Alegre, a Raasch reúne jóias, iluminação e decoração com 126 fornecedores e mais de 14.000 itens.",
};

export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Desde 1989"
        title={
          <>
            Uma história feita de
            <em className="italic text-gold-pale"> confiança</em>
          </>
        }
        intro="Trinta e seis anos atendendo Porto Alegre com jóias, iluminação e decoração — sempre com contato direto, atendimento cordial e pós-venda eficiente."
        trail={[{ label: "A empresa" }]}
        image="/images/editorial-raasch.jpg"
      />

      <section className="bg-ivory py-14 sm:py-18 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-14 px-5 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:px-10">
          <Reveal className="relative">
            <div className="relative aspect-4/5 overflow-hidden">
              <Image
                src="/images/editorial-joias.jpg"
                alt="Peças da Raasch"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden
              className="absolute -right-4 -bottom-4 h-full w-full border border-clay/60 lg:-right-6 lg:-bottom-6"
            />
          </Reveal>

          <Reveal delay={140}>
            <p className="eyebrow text-gold">Quem somos</p>
            <h2 className="mt-5 font-display display-2 font-light">
              A sede está à altura dos nossos produtos
            </h2>

            <div className="mt-8 flex flex-col gap-5 leading-relaxed font-light text-ink-soft">
              <p>
                Em 22 de novembro de 1989 nascia a Raasch Joias. Plantamos e
                colhemos vários frutos, os quais fizeram com que em 1992
                adquiríssemos nossa sede própria na capital gaúcha, no Edifício
                Edel Trade Center, onde investimos na segurança, no conforto e na
                agilidade de nossas transações comerciais.
              </p>
              <p>
                Uma equipe cordial e simpática de funcionários, excelente
                localização, segurança e estacionamento fazem parte da nossa
                estrutura.
              </p>
              <p>
                No ano de 2006 iniciamos a comercialização de produtos gerais de
                iluminação e, em seguida, também a venda de objetos de cristais
                finos e baterias de cristais importadas. Com a excelente
                receptividade dos nossos clientes, ampliamos fornecedores e
                variedade — hoje são 126 fornecedores neste ramo e mais de 14.000
                itens.
              </p>
              <p>
                Em 2009 iniciamos a comercialização de mobiliário para jardins e
                piscinas e também de todos os móveis internos para residências,
                escritórios e empresas. Mais uma vez tivemos a certeza de estarmos
                no caminho certo, e hoje contamos com várias fábricas parceiras.
              </p>
              <p>
                O contato direto com nossos clientes, o atendimento cordial e um
                pós-vendas eficiente fazem com que sejamos lembrados pela
                preferência dos mesmos.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-sand bg-cream/50 py-14 sm:py-18 lg:py-24">
        <div className="mx-auto max-w-[1500px] px-5 lg:px-10">
          <Reveal className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            {FACTS.map((fact) => (
              <div key={fact.label}>
                <p className="foil font-display text-[40px] leading-none font-normal lg:text-[52px]">
                  {fact.value}
                </p>
                <p className="mt-4 text-[12px] leading-relaxed text-muted">
                  {fact.label}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-14 sm:py-18 lg:py-28">
        <div className="mx-auto max-w-[1100px] px-5 lg:px-10">
          <Reveal className="text-center">
            <p className="eyebrow text-gold">Linha do tempo</p>
            <h2 className="mt-5 font-display display-2 font-light">
              Como chegamos até aqui
            </h2>
            <div className="rule mx-auto mt-8 w-24" />
          </Reveal>

          <ol className="mt-16 flex flex-col">
            {TIMELINE.map((entry, i) => (
              <Reveal key={entry.year} delay={i * 100} as="li">
                <div className="grid gap-4 border-t border-sand py-9 sm:grid-cols-[160px_1fr] sm:gap-10">
                  <p className="foil font-display text-[32px] leading-none font-normal sm:text-[38px]">
                    {entry.year}
                  </p>
                  <div>
                    <h3 className="font-display text-[24px] leading-tight font-light">
                      {entry.title}
                    </h3>
                    <p className="mt-3 max-w-xl leading-relaxed font-light text-ink-soft">
                      {entry.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-16 flex flex-wrap justify-center gap-4">
            <Link
              href="/joias"
              className="btn-fill bg-ink px-9 py-4 text-ivory hover:text-ink"
            >
              <span className="bg-gold-pale" />
              <span>Ver o catálogo</span>
            </Link>
            <Link
              href="/contato"
              className="btn-fill border border-clay px-9 py-4 text-ink hover:text-ivory"
            >
              <span className="bg-gold" />
              <span>Falar com a equipe</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
