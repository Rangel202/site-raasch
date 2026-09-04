import Link from "next/link";

type Props = {
  page: number;
  totalPages: number;
  /** Base path without the query string, e.g. "/joias/aneis". */
  basePath: string;
  /** Extra query params to preserve, already encoded. */
  extraQuery?: string;
};

export default function Pagination({
  page,
  totalPages,
  basePath,
  extraQuery,
}: Props) {
  if (totalPages <= 1) return null;

  const href = (target: number) => {
    const params = [extraQuery, target > 1 ? `pagina=${target}` : ""].filter(
      Boolean,
    );
    return params.length ? `${basePath}?${params.join("&")}` : basePath;
  };

  // Always show first, last, current and its neighbours; elide the rest.
  const numbers = new Set<number>([1, totalPages, page - 1, page, page + 1]);
  const visible = [...numbers]
    .filter((n) => n >= 1 && n <= totalPages)
    .sort((a, b) => a - b);

  const box =
    "flex h-10 min-w-10 items-center justify-center border px-3 text-[12px] transition-colors duration-400";

  return (
    <nav
      aria-label="Paginação do catálogo"
      className="mt-16 flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 && (
        <Link
          href={href(page - 1)}
          className={`${box} border-sand text-ink-soft hover:border-gold hover:text-gold`}
          rel="prev"
        >
          ← Anterior
        </Link>
      )}

      {visible.map((number, i) => (
        <span key={number} className="flex items-center gap-2">
          {i > 0 && number - visible[i - 1] > 1 && (
            <span className="px-1 text-[12px] text-muted">…</span>
          )}
          {number === page ? (
            <span
              aria-current="page"
              className={`${box} border-gold bg-gold text-ivory`}
            >
              {number}
            </span>
          ) : (
            <Link
              href={href(number)}
              className={`${box} border-sand text-ink-soft hover:border-gold hover:text-gold`}
            >
              {number}
            </Link>
          )}
        </span>
      ))}

      {page < totalPages && (
        <Link
          href={href(page + 1)}
          className={`${box} border-sand text-ink-soft hover:border-gold hover:text-gold`}
          rel="next"
        >
          Próxima →
        </Link>
      )}
    </nav>
  );
}
