import { VERTICAL_LIST, categoryGroupsOf, countOf } from "../data/catalog";
import HeaderClient, { type NavVertical } from "./HeaderClient";

/**
 * Server shell: the catalogue JSON is large, so the menu is reduced to labels
 * and hrefs here and only that crosses into the client bundle.
 */
export default function Header() {
  const nav: NavVertical[] = VERTICAL_LIST.map((vertical) => ({
    slug: vertical.slug,
    label: vertical.label,
    tagline: vertical.tagline,
    total: countOf(vertical.slug),
    groups: categoryGroupsOf(vertical.slug).map((group) => ({
      key: group.key,
      label: group.label,
      items: group.items.map((category) => ({
        label: category.label.includes("·")
          ? category.label.split("·").pop()!.trim()
          : category.label,
        href: `/${vertical.slug}/${category.slug}`,
        count: category.count,
      })),
    })),
  }));

  return <HeaderClient nav={nav} />;
}
