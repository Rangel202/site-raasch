import productsJson from "./products.json";
import categoriesJson from "./categories.json";

export type Vertical = "joias" | "iluminacao" | "decoracao";

export type Product = {
  id: string;
  slug: string;
  vertical: Vertical;
  /** Category path as it exists in the catalogue, e.g. "aneis" or "cristais/vasos". */
  category: string;
  categoryLabel: string;
  name: string;
  ref?: string;
  description?: string[];
  images: string[];
};

export type Category = {
  vertical: Vertical;
  slug: string;
  label: string;
  count: number;
  cover: string;
};

export const PRODUCTS = productsJson as Product[];

/** Empty categories exist upstream; they would render as dead ends here. */
export const CATEGORIES = (categoriesJson as Category[]).filter((c) => c.count > 0);

export const VERTICALS: Record<
  Vertical,
  { slug: Vertical; label: string; tagline: string; blurb: string; cover: string }
> = {
  joias: {
    slug: "joias",
    label: "Jóias",
    tagline: "Para o seu gosto",
    blurb:
      "Ouro, diamantes e pedras naturais. Alianças, anéis, brincos e colares selecionados peça a peça desde 1989.",
    cover: "/images/card-joias.jpg",
  },
  iluminacao: {
    slug: "iluminacao",
    label: "Iluminação",
    tagline: "Para o que você precisa",
    blurb:
      "Lustres de cristal, pendentes, arandelas e luminárias técnicas. Mais de 126 fornecedores em um só lugar.",
    cover: "/images/card-iluminacao.jpg",
  },
  decoracao: {
    slug: "decoracao",
    label: "Decoração",
    tagline: "Para a sua casa",
    blurb:
      "Cristais finos, esculturas, espelhos e mobiliário interno e externo para residências, escritórios e empresas.",
    cover: "/images/card-decoracao.jpg",
  },
};

export const VERTICAL_LIST = [
  VERTICALS.joias,
  VERTICALS.iluminacao,
  VERTICALS.decoracao,
];

export function isVertical(value: string): value is Vertical {
  return value === "joias" || value === "iluminacao" || value === "decoracao";
}

export function categoriesOf(vertical: Vertical): Category[] {
  return CATEGORIES.filter((c) => c.vertical === vertical);
}

/**
 * Categories grouped by the prefix the legacy site used in its dropdowns
 * ("cristais", "moveis_internos", …). Flat categories land under an empty key.
 */
export function categoryGroupsOf(vertical: Vertical) {
  const groups = new Map<string, Category[]>();
  for (const category of categoriesOf(vertical)) {
    const group = category.slug.includes("/") ? category.slug.split("/")[0] : "";
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group)!.push(category);
  }
  return [...groups.entries()]
    .map(([key, items]) => ({
      key,
      label: key ? prettifyGroup(key) : "",
      items: items.sort((a, b) => a.label.localeCompare(b.label, "pt-BR")),
    }))
    .sort((a, b) => a.key.localeCompare(b.key));
}

function prettifyGroup(key: string) {
  return key
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .replace("Moveis", "Móveis");
}

export function findCategory(vertical: Vertical, slug: string) {
  return CATEGORIES.find((c) => c.vertical === vertical && c.slug === slug);
}

export function productsOf(vertical: Vertical, categorySlug?: string) {
  return PRODUCTS.filter(
    (p) => p.vertical === vertical && (!categorySlug || p.category === categorySlug),
  );
}

export function findProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

export function countOf(vertical: Vertical) {
  return PRODUCTS.filter((p) => p.vertical === vertical).length;
}

/**
 * Deterministic pick so the home page stays stable between renders — a random
 * shuffle would make every request a fresh HTML payload.
 */
export function highlights(vertical: Vertical, take: number, offset = 0) {
  const pool = PRODUCTS.filter((p) => p.vertical === vertical && p.images.length > 1);
  const step = Math.max(1, Math.floor(pool.length / take));
  const picked: Product[] = [];
  for (let i = 0; picked.length < take && i < pool.length; i++) {
    const item = pool[(offset + i * step) % pool.length];
    if (!picked.includes(item)) picked.push(item);
  }
  return picked;
}

export const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

/**
 * Portuguese plurals would otherwise split obvious matches: "cristais" never
 * contains "cristal", "anéis" never contains "anel". Folding both sides of the
 * comparison to a rough singular fixes the cases this catalogue actually hits.
 */
function singularize(word: string) {
  if (word.length <= 3) return word;
  if (word.endsWith("ais")) return `${word.slice(0, -3)}al`;
  if (word.endsWith("eis")) return `${word.slice(0, -3)}el`;
  if (word.endsWith("ois")) return `${word.slice(0, -3)}ol`;
  if (word.endsWith("oes") || word.endsWith("aes")) return `${word.slice(0, -3)}ao`;
  if (word.endsWith("ns")) return `${word.slice(0, -2)}m`;
  if (word.endsWith("res") || word.endsWith("ses") || word.endsWith("zes")) {
    return word.slice(0, -2);
  }
  if (word.endsWith("s")) return word.slice(0, -1);
  return word;
}

const fold = (value: string) =>
  normalize(value).split(/[^a-z0-9]+/).filter(Boolean).map(singularize).join(" ");

/** Built once per process — the catalogue is static data. */
const HAYSTACKS = new WeakMap<Product, string>();
function haystackOf(product: Product) {
  let value = HAYSTACKS.get(product);
  if (value === undefined) {
    // Materials ("ouro amarelo 18k", "zircônias") only ever appear in the
    // description, so a search for them has to reach in there.
    value = [
      fold(product.name),
      fold(product.categoryLabel),
      normalize(product.ref ?? ""),
      fold((product.description ?? []).slice(0, 6).join(" ")),
    ].join(" ");
    HAYSTACKS.set(product, value);
  }
  return value;
}

export function search(query: string, limit = 60) {
  const terms = fold(query).split(" ").filter(Boolean);
  if (!terms.length) return [];

  const hits = PRODUCTS.filter((product) => {
    const haystack = haystackOf(product);
    return terms.every((term) => haystack.includes(term));
  });

  // Surface names that open with the query before incidental matches.
  const lead = terms[0];
  hits.sort((a, b) => {
    const aStarts = fold(a.name).startsWith(lead) ? 0 : 1;
    const bStarts = fold(b.name).startsWith(lead) ? 0 : 1;
    return aStarts - bStarts;
  });

  return hits.slice(0, limit);
}
