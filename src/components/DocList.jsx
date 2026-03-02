import { useSearchParams } from "react-router-dom";
import { useDocs } from "../context/DocumentsContext";
import { useAdmin } from "../context/AdminContext";
import { Link } from "react-router-dom";
import { MESES } from "../data";

export default function DocList({ tipo, titulo }) {
  const { docs, removeDoc } = useDocs();
  const { isAdmin } = useAdmin();
  const [searchParams] = useSearchParams();

  const mesFiltro =
    searchParams.get("mes") !== null
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

  items = [...items].sort(
    (a, b) => new Date(b.fechaISO || 0) - new Date(a.fechaISO || 0)
  );

  const agrupados = {};
  if (mesFiltro === null) {
    items.forEach((doc) => {
      if (!agrupados[doc.anio]) agrupados[doc.anio] = [];
      agrupados[doc.anio].push(doc);
    });
  }

  const mesLabel =
    mesFiltro !== null
      ? ` — ${MESES[mesFiltro]}${anioFiltro ? " " + anioFiltro : ""}`
      : "";

  return (
    <div>
      <div className="bg-white border border-gray-200 border-l-4 border-l-[#1a3a6c] px-4 py-2.5 mb-4 text-lg font-bold text-[#1a3a6c] flex items-center justify-between flex-wrap gap-2">
        <span>
          {titulo}
          {mesLabel}
        </span>
        {isAdmin && (
          <Link
            to="/admin/subir"
            className="text-sm font-normal bg-[#1a3a6c] text-white px-3 py-1 hover:bg-[#0d2550] no-underline"
          >
            + Subir documento
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white border border-gray-200 p-8 text-center text-gray-400 text-sm">
          No hay publicaciones.
        </div>
      ) : mesFiltro === null ? (
        Object.keys(agrupados)
          .sort((a, b) => b - a)
          .map((anio) => (
            <div key={anio} className="mb-6">
              <h2 className="text-sm font-bold text-gray-500 mb-3">Año {anio}</h2>
              <div className="space-y-3">
                {agrupados[anio].map((d) => (
                  <Card key={d.id} d={d} isAdmin={isAdmin} removeDoc={removeDoc} />
                ))}
              </div>
            </div>
          ))
      ) : (
        <div className="space-y-3">
          {items.map((d) => (
            <Card key={d.id} d={d} isAdmin={isAdmin} removeDoc={removeDoc} />
          ))}
        </div>
      )}
    </div>
  );
}

function Card({ d, isAdmin, removeDoc }) {
  // Descarga directa de Drive
  const driveIdMatch = d.url.match(/\/d\/(.*?)\//);
  const driveId = driveIdMatch ? driveIdMatch[1] : null;
  const downloadUrl = driveId
    ? `https://drive.google.com/uc?export=download&id=${driveId}`
    : d.url;

  return (
    <div className="bg-white border border-gray-200 p-4 flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 font-semibold rounded-sm">
            PDF
          </span>
          <span className="bg-blue-50 text-[#1a3a6c] text-xs px-2 py-0.5 rounded-sm">{d.tipo}</span>
          <span className="text-xs text-gray-400">{d.fechaCorta}</span>
        </div>
        <h3 className="text-sm font-semibold text-[#1a3a6c] mb-0.5">{d.titulo}</h3>
        {d.descripcion && <p className="text-xs text-gray-500">{d.descripcion}</p>}
        <p className="text-xs text-gray-400 mt-1">{d.nombreArchivo}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <a
          href={d.url}
          target="_blank"
          rel="noreferrer"
          className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 hover:bg-gray-200 no-underline"
        >
          Ver
        </a>
        <a
          href={downloadUrl}
          className="bg-[#1a3a6c] text-white text-xs px-3 py-1.5 hover:bg-[#0d2550] no-underline"
        >
          Descargar
        </a>
        {isAdmin && (
          <button
            onClick={() => removeDoc(d.id)}
            className="text-red-600 text-xs hover:underline"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}