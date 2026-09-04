import Image from "next/image";
import Link from "next/link";
import { VERTICAL_LIST, categoriesOf } from "../data/catalog";
import { GENERAL_WHATSAPP, SITE } from "../data/site";

const INSTITUTIONAL = [
  { label: "A empresa", href: "/empresa" },
  { label: "Revista Digital", href: "/revista-digital" },
  { label: "Contato", href: "/contato" },
  { label: "Buscar no catálogo", href: "/busca" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="mx-auto max-w-[1500px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-x-8 gap-y-11 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/logo-full.png"
              alt="Raasch"
              width={1762}
              height={1096}
              className="h-24 w-auto"
            />
            <p className="mt-7 max-w-xs text-[13px] leading-relaxed font-light text-ivory/60">
              Jóias, iluminação e decoração em Porto Alegre desde 1989. Uma loja
              repleta de desejos.
            </p>

            <div className="mt-8 flex gap-5">
              {SITE.instagram.map((account) => (
                <a
                  key={account.handle}
                  href={account.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-[11px] tracking-[0.16em] text-ivory/70 uppercase transition-colors hover:text-gold-pale"
                >
                  {account.handle}
                </a>
              ))}
            </div>
          </div>

          {VERTICAL_LIST.map((vertical) => (
            <div key={vertical.slug}>
              <h3 className="text-[11px] tracking-[0.28em] text-gold-pale uppercase">
                {vertical.label}
              </h3>
              <ul className="mt-5 flex flex-col gap-0.5 sm:mt-6 sm:gap-1">
                {categoriesOf(vertical.slug)
                  .slice(0, 7)
                  .map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/${vertical.slug}/${category.slug}`}
                        className="link-underline inline-block py-1.5 text-[13px] font-light text-ivory/65 transition-colors duration-500 hover:text-ivory"
                      >
                        {category.label.includes("·")
                          ? category.label.split("·").pop()!.trim()
                          : category.label}
                      </Link>
                    </li>
                  ))}
                <li>
                  <Link
                    href={`/${vertical.slug}`}
                    className="link-underline inline-block py-1.5 text-[13px] font-light text-gold-pale/90 transition-colors duration-500 hover:text-gold-pale"
                  >
                    Ver tudo →
                  </Link>
                </li>
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-[11px] tracking-[0.28em] text-gold-pale uppercase">
              Institucional
            </h3>
            <ul className="mt-5 flex flex-col gap-0.5 sm:mt-6 sm:gap-1">
              {INSTITUTIONAL.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline inline-block py-1.5 text-[13px] font-light text-ivory/65 transition-colors duration-500 hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <address className="mt-8 text-[13px] leading-relaxed font-light text-ivory/60 not-italic">
              {SITE.address.street}
              <br />
              {SITE.address.district}
              <br />
              {SITE.address.city} / {SITE.address.state}
            </address>

            <div className="mt-6 flex flex-col gap-2 text-[13px] font-light">
              <a
                href={SITE.phone.href}
                className="link-underline text-ivory/65 hover:text-ivory"
              >
                {SITE.phone.label}
              </a>
              <a
                href={GENERAL_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-ivory/65 hover:text-ivory"
              >
                WhatsApp {SITE.whatsapp.label}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="link-underline text-ivory/65 hover:text-ivory"
              >
                {SITE.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/12 pt-8 text-[11px] text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName} · Porto Alegre / RS
          </p>
          <p className="tracking-[0.14em] uppercase">
            Desde 22 de novembro de 1989
          </p>
        </div>
      </div>
    </footer>
  );
}
