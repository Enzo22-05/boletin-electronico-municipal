import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { MESES } from "../data";
import docsData from "../docs.json";

export default function DocList({ tipo, titulo }) {
  const { isAdmin } = useAdmin();
  const [docs, setDocs] = useState([]);
  const [searchParams] = useSearchParams();
  const [openYears, setOpenYears] = useState({}); // <-- control de pestañas

  useEffect(() => {
    setDocs(docsData);
  }, []);

  const mesFiltro = searchParams.get("mes")
    ? parseInt(searchParams.get("mes"))
    : null;

  const anioFiltro = searchParams.get("anio")
    ? parseInt(searchParams.get("anio"))
    : null;

  let items = tipo ? docs.filter((d) => d.tipo === tipo) : docs;

  if (mesFiltro !== null) {
    items = items.filter(
      (d) => d.mes === mesFiltro && (!anioFiltro || d.anio === anioFiltro)
    );
  }

  items = [...items].sort((a, b) => new Date(b.fechaISO) - new Date(a.fechaISO));

  const agrupados = {};
  if (mesFiltro === null) {
    items.forEach((doc) => {
      if (!agrupados[doc.anio]) agrupados[doc.anio] = [];
      agrupados[doc.anio].push(doc);
    });
  }

  const toggleYear = (anio) => {
    setOpenYears((prev) => ({
      ...prev,
      [anio]: !prev[anio],
    }));
  };

  const mesLabel =
    mesFiltro !== null ? ` — ${MESES[mesFiltro]}${anioFiltro ? " " + anioFiltro : ""}` : "";

  return (
    <div>
      <div className="bg-white border border-gray-200 border-l-4 border-l-[#1a3a6c] px-4 py-2.5 mb-4 text-lg font-bold text-[#1a3a6c] flex items-center justify-between flex-wrap gap-2">
        <span>
          {titulo}
          {mesLabel}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-gray-200 p-8 text-center text-gray-400 text-sm">
          No hay publicaciones.
        </div>
      ) : mesFiltro === null ? (
        Object.keys(agrupados)
          .sort((a, b) => b - a)
          .map((anio) => (
            <div key={anio} className="mb-4 border border-gray-200 bg-white">
              
              {/* Pestaña del año */}
              <button
                onClick={() => toggleYear(anio)}
                className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 font-semibold text-[#1a3a6c] flex justify-between"
              >
                <span>Año {anio}</span>
                <span>{openYears[anio] ? "−" : "+"}</span>
              </button>

              {/* Contenido */}
              {openYears[anio] && (
                <div className="p-3 space-y-3">
                  {agrupados[anio].map((d) => (
                    <Card key={d.id} d={d} isAdmin={isAdmin} />
                  ))}
                </div>
              )}
            </div>
          ))
      ) : (
        <div className="space-y-3">
          {items.map((d) => (
            <Card key={d.id} d={d} isAdmin={isAdmin} />
          ))}
        </div>
      )}
    </div>
  );
}

function Card({ d, isAdmin }) {
  const driveIdMatch = d.url.match(/\/d\/(.*?)\//);
  const driveId = driveIdMatch ? driveIdMatch[1] : null;

  const downloadUrl = driveId
    ? `https://drive.google.com/uc?export=download&id=${driveId}`
    : d.url;

  return (
    <div className="border border-gray-200 p-4 flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 font-semibold rounded-sm">
            PDF
          </span>

          <span className="bg-blue-50 text-[#1a3a6c] text-xs px-2 py-0.5 rounded-sm">
            {d.tipo}
          </span>

          <span className="text-xs text-gray-400">{d.fechaCorta}</span>
        </div>

        <h3 className="text-sm font-semibold text-[#1a3a6c]">{d.titulo}</h3>

        {d.descripcion && (
          <p className="text-xs text-gray-500">{d.descripcion}</p>
        )}

        <p className="text-xs text-gray-400 mt-1">{d.nombreArchivo}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <a
          href={d.url}
          target="_blank"
          rel="noreferrer"
          className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 hover:bg-gray-200"
        >
          Ver
        </a>

        <a
          href={downloadUrl}
          className="bg-[#1a3a6c] text-white text-xs px-3 py-1.5 hover:bg-[#0d2550]"
        >
          Descargar
        </a>

        {isAdmin && (
          <button
            onClick={() =>
              alert("Para eliminar debes editar docs.json manualmente")
            }
            className="text-red-600 text-xs hover:underline"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}