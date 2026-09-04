import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPage from "../../components/CategoryPage";
import { categoriesOf, findCategory } from "../../data/catalog";

const VERTICAL = "joias" as const;

export function generateStaticParams() {
  return categoriesOf(VERTICAL).map((category) => ({
    slug: category.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategory(VERTICAL, slug.join("/"));
  if (!category) return { title: "Jóias" };
  return {
    title: `${category.label} — Jóias`,
    description: `${category.count} peças em ${category.label.toLowerCase()} no catálogo da Raasch.`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ pagina?: string }>;
}) {
  const { slug } = await params;
  const { pagina } = await searchParams;

  const categorySlug = slug.join("/");
  if (!findCategory(VERTICAL, categorySlug)) notFound();

  return (
    <CategoryPage
      vertical={VERTICAL}
      categorySlug={categorySlug}
      page={Number(pagina) || 1}
    />
  );
}
