"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { MAPS_QUERY, SITE, whatsappLink } from "../data/site";

/**
 * The legacy site posted this form to a mailer we do not have here, so the
 * submission is handed to WhatsApp — the channel Raasch actually answers on.
 */
export default function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const link = whatsappLink(
      [
        `Olá! Meu nome é ${name || "—"}.`,
        message || "Gostaria de mais informações.",
        contact ? `Meu contato: ${contact}` : "",
        "(enviado pelo site da Raasch)",
      ]
        .filter(Boolean)
        .join("\n"),
    );
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const field =
    "w-full border border-clay/60 bg-ivory/70 px-5 py-3.5 text-[14px] font-light text-ink transition-colors duration-500 outline-none placeholder:text-muted/70 focus:border-gold";

  return (
    <section id="contato" className="bg-cream py-16 sm:py-20 lg:py-32">
      <div className="mx-auto grid max-w-[1500px] gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <Reveal>
          <p className="eyebrow text-gold">Fale conosco</p>
          <h2 className="mt-5 font-display display-1 font-light">
            Venha até a loja
          </h2>
          <p className="mt-7 max-w-md leading-relaxed font-light text-ink-soft">
            Uma equipe cordial, excelente localização, segurança e
            estacionamento. Venha até a loja ou fale com a gente agora mesmo.
          </p>

          <dl className="mt-10 flex flex-col gap-7 border-t border-sand pt-10">
            <div>
              <dt className="text-[10px] tracking-[0.28em] text-gold uppercase">
                Endereço
              </dt>
              <dd className="mt-2 leading-relaxed font-light text-ink-soft">
                {SITE.address.street}
                <br />
                {SITE.address.district} — {SITE.address.city} / {SITE.address.state}
                <br />
                <span className="text-[13px] text-muted">
                  {SITE.address.building}
                </span>
              </dd>
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              <div>
                <dt className="text-[10px] tracking-[0.28em] text-gold uppercase">
                  Telefone
                </dt>
                <dd className="mt-2">
                  <a
                    href={SITE.phone.href}
                    className="link-underline font-light text-ink-soft hover:text-gold"
                  >
                    {SITE.phone.label}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.28em] text-gold uppercase">
                  WhatsApp
                </dt>
                <dd className="mt-2">
                  <a
                    href={whatsappLink(
                      "Olá! Estou entrando em contato através do site da Raasch.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-light text-ink-soft hover:text-gold"
                  >
                    {SITE.whatsapp.label}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.28em] text-gold uppercase">
                  E-mail
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="link-underline font-light text-ink-soft hover:text-gold"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] tracking-[0.28em] text-gold uppercase">
                  Horário
                </dt>
                <dd className="mt-2 font-light text-ink-soft">{SITE.hours}</dd>
              </div>
            </div>
          </dl>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-4 text-[12px] tracking-[0.22em] text-ink uppercase"
          >
            <span className="link-underline">Ver no mapa</span>
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1.5"
            >
              →
            </span>
          </a>
        </Reveal>

        <Reveal delay={140}>
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4 border border-sand bg-ivory/60 p-8 lg:p-10"
          >
            <p className="eyebrow text-gold">Envie uma mensagem</p>

            <label className="sr-only" htmlFor="contact-name">
              Seu nome
            </label>
            <input
              id="contact-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome"
              required
              className={field}
            />

            <label className="sr-only" htmlFor="contact-channel">
              Telefone ou e-mail
            </label>
            <input
              id="contact-channel"
              value={contact}
              onChange={(event) => setContact(event.target.value)}
              placeholder="Telefone ou e-mail"
              className={field}
            />

            <label className="sr-only" htmlFor="contact-message">
              Mensagem
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Como podemos ajudar?"
              rows={5}
              required
              className={`${field} resize-none`}
            />

            <button
              type="submit"
              className="btn-fill mt-2 bg-ink px-8 py-4 text-ivory hover:text-ink"
            >
              <span className="bg-gold-pale" />
              <span>Enviar pelo WhatsApp</span>
            </button>

            <p className="text-[11px] leading-relaxed text-muted">
              Sua mensagem abre no WhatsApp {SITE.whatsapp.label} já preenchida —
              é só apertar enviar.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
