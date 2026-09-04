/** Everything on this page comes from the live raasch.com.br institutional data. */

export const SITE = {
  name: "Raasch",
  legalName: "Raasch Joias",
  tagline: "Uma loja repleta de desejos",
  since: 1989,
  address: {
    street: "Av. Loureiro da Silva, 2001 — sala 909",
    district: "Cidade Baixa",
    city: "Porto Alegre",
    state: "RS",
    building: "Edifício Edel Trade Center",
  },
  phone: { label: "(51) 3209.0420", href: "tel:+555132090420" },
  whatsapp: { label: "(51) 98604.5348", number: "555186045348" },
  email: "contato@raasch.com.br",
  instagram: [
    { handle: "@raasch_joias", href: "https://www.instagram.com/raasch_joias/" },
    { handle: "@raasch.decor", href: "https://www.instagram.com/raasch.decor" },
  ],
  hours: "Segunda a sexta, das 9h às 18h",
} as const;

export const MAPS_QUERY = encodeURIComponent(
  "Av. Loureiro da Silva, 2001, Cidade Baixa, Porto Alegre - RS",
);

/** Milestones taken verbatim from the legacy "Empresa" page. */
export const TIMELINE = [
  {
    year: "1989",
    title: "O começo",
    text: "Em 22 de novembro de 1989 nascia a Raasch Joias, em Porto Alegre.",
  },
  {
    year: "1992",
    title: "Sede própria",
    text: "Adquirimos nossa sede própria na capital gaúcha, no Edifício Edel Trade Center, com segurança, conforto e agilidade nas transações comerciais.",
  },
  {
    year: "2006",
    title: "Iluminação e cristais",
    text: "Iniciamos a comercialização de produtos gerais de iluminação e, em seguida, de objetos de cristais finos e baterias de cristais importadas.",
  },
  {
    year: "2009",
    title: "Mobiliário",
    text: "Começamos a vender mobiliário para jardins e piscinas, e também móveis internos para residências, escritórios e empresas.",
  },
  {
    year: "Hoje",
    title: "126 fornecedores",
    text: "Mais de 14.000 itens em catálogo, várias fábricas parceiras e uma carteira de clientes que cresce a cada ano.",
  },
];

export const FACTS = [
  { value: "1989", label: "Fundada em Porto Alegre" },
  { value: "126", label: "Fornecedores parceiros" },
  { value: "14 mil", label: "Itens em catálogo" },
  { value: "3", label: "Linhas: jóias, iluminação e decoração" },
];

export const MARQUEE = [
  "Desde 1989 em Porto Alegre",
  "Jóias · Iluminação · Decoração",
  "126 fornecedores parceiros",
  "Mais de 14.000 itens",
  "Atendimento personalizado",
  "Entrega para todo o Brasil",
  "Pós-venda eficiente",
];

export const MAGAZINES = [
  {
    edition: "Dezembro / 2023",
    href: "https://www.raasch.com.br/arquivos/revista-dezembro-2023.pdf",
  },
  {
    edition: "Junho / 2022",
    href: "https://www.raasch.com.br/arquivos/revista-junho-2022.pdf",
  },
];

const WHATSAPP_BASE = `https://wa.me/${SITE.whatsapp.number}`;

export function whatsappLink(message: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export function productWhatsapp(name: string, ref?: string) {
  const reference = ref ? ` (referência ${ref})` : "";
  return whatsappLink(
    `Olá! Vim pelo site da Raasch e gostaria de saber mais sobre: ${name}${reference}.`,
  );
}

export const GENERAL_WHATSAPP = whatsappLink(
  "Olá! Estou entrando em contato através do site da Raasch.",
);
