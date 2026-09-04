import Image from "next/image";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";
import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  trail: Crumb[];
  /** Optional wide photograph behind the title. */
  image?: string;
};

/**
 * Shared masthead for every inner page. The top padding clears the fixed
 * header plus its announcement strip.
 */
export default function PageHead({ eyebrow, title, intro, trail, image }: Props) {
  if (image) {
    return (
      <section className="grain relative overflow-hidden bg-ink pt-[132px] pb-16 lg:pt-[150px] lg:pb-20">
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/35" />

        <div className="relative z-10 mx-auto max-w-[1500px] px-5 lg:px-10">
          <div className="text-ivory/60">
            <Breadcrumbs trail={trail} />
          </div>
          <p className="eyebrow mt-8 text-gold-pale">{eyebrow}</p>
          <h1 className="mt-4 max-w-3xl font-display display-1 font-light text-ivory">
            {title}
          </h1>
          {intro && (
            <p className="mt-6 max-w-xl leading-relaxed font-light text-ivory/75">
              {intro}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-sand bg-ivory pt-[128px] pb-14 lg:pt-[146px] lg:pb-16">
      <Reveal className="mx-auto max-w-[1500px] px-5 lg:px-10">
        <Breadcrumbs trail={trail} />
        <p className="eyebrow mt-8 text-gold">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display display-1 font-light">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-xl leading-relaxed font-light text-ink-soft">
            {intro}
          </p>
        )}
      </Reveal>
    </section>
  );
}
