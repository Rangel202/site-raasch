"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchField({ initial = "" }: { initial?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(initial);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const term = query.trim();
    router.push(term ? `/busca?q=${encodeURIComponent(term)}` : "/busca");
  };

  return (
    <form onSubmit={onSubmit} className="flex max-w-2xl items-center gap-4">
      <label htmlFor="catalog-search" className="sr-only">
        Buscar no catálogo
      </label>
      <input
        id="catalog-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Anel, lustre, poltrona, referência…"
        className="min-w-0 flex-1 border-b border-clay/70 bg-transparent px-1 py-3 text-[16px] font-light outline-none placeholder:text-muted/70 focus:border-gold"
      />
      <button
        type="submit"
        className="btn-fill bg-ink px-7 py-3.5 text-ivory hover:text-ink"
      >
        <span className="bg-gold-pale" />
        <span>Buscar</span>
      </button>
    </form>
  );
}
