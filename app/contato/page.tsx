import type { Metadata } from "next";
import Contact from "../components/Contact";
import Instagram from "../components/Instagram";
import PageHead from "../components/PageHead";
import StoreMap from "../components/StoreMap";
import { SITE } from "../data/site";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com a Raasch: ${SITE.phone.label}, WhatsApp ${SITE.whatsapp.label}, ${SITE.email}. ${SITE.address.street}, ${SITE.address.district} — Porto Alegre / RS.`,
};

export default function Page() {
  return (
    <>
      <PageHead
        eyebrow="Fale conosco"
        title={
          <>
            Venha até a loja ou
            <em className="italic text-gold"> chame no WhatsApp</em>
          </>
        }
        intro="Atendimento personalizado do primeiro contato ao pós-venda. Estamos na Cidade Baixa, em Porto Alegre, com estacionamento e segurança."
        trail={[{ label: "Contato" }]}
      />

      <Contact />

      <StoreMap />

      <Instagram />
    </>
  );
}
