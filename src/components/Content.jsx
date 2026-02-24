import { useState } from "react";
import { BOLETINES } from "../data";
import BoletinCard from "./BoletinCard";

const ITEMS_PER_PAGE = 3;

export default function Content({ search, category }) {
  const [page, setPage] = useState(1);

  const filtered = BOLETINES.filter((b) => {
    const matchSearch =
      !search ||
      b.resumen.toLowerCase().includes(search.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = !category || b.tags.includes(category);
    return matchSearch && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <main className="flex-1 min-w-0">
      <div className="bg-white border border-gray-200 border-l-4 border-l-[#1a3a6c] px-4 py-2.5 mb-4 text-lg font-bold text-[#1a3a6c]">
        Boletín Oficial &mdash; Publicaciones
        {category && (
          <span className="text-sm font-normal text-gray-500 ml-2">— {category}</span>
        )}
      </div>

      {paginated.length === 0 ? (
        <div className="bg-white border border-gray-200 p-6 text-center text-gray-500 text-sm">
          No se encontraron resultados.
        </div>
      ) : (
        paginated.map((b) => <BoletinCard key={b.id} boletin={b} />)
      )}

      {totalPages > 1 && (
        <div className="flex gap-1 mt-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1.5 border text-sm transition-colors cursor-pointer ${
                p === page
                  ? "bg-[#1a3a6c] text-white border-[#1a3a6c]"
                  : "bg-white text-[#1a3a6c] border-gray-200 hover:bg-[#1a3a6c] hover:text-white hover:border-[#1a3a6c]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </main>
  );
}
