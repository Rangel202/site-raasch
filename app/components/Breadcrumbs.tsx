import Link from "next/link";

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Você está aqui">
      <ol className="-my-1.5 flex flex-wrap items-center gap-x-3 gap-y-0 py-1.5 text-[11px] tracking-[0.16em] text-muted uppercase [&_a]:inline-block [&_a]:py-1.5">
        <li>
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
        </li>
        {trail.map((crumb) => (
          <li key={crumb.label} className="flex items-center gap-3">
            <span aria-hidden className="text-clay">
              /
            </span>
            {crumb.href ? (
              <Link href={crumb.href} className="transition-colors hover:text-gold">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-ink-soft">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
