import { useNavigate, useSearchParams } from "react-router-dom";
import { MESES } from "../data";
import { useDocs } from "../context/DocumentsContext";


function Widget({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 mb-4">
      <div className="bg-[#1a3a6c] text-white px-3 py-2 text-xs font-bold uppercase tracking-wide">
        {title}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

const TIPO_PATH = {
  "Boletín Oficial": "/boletin-oficial",
  "Ordenanza": "/ordenanzas",
  "Decreto": "/decretos",
  "Resolución": "/resoluciones",
  "Licitación": "/licitaciones",
};

export default function Sidebar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { docs } = useDocs();

  const selectedMes = searchParams.get("mes") ? parseInt(searchParams.get("mes")) : null;
  const selectedAnio = searchParams.get("anio") ? parseInt(searchParams.get("anio")) : new Date().getFullYear();

  const aniosDisponibles = [...new Set(docs.map((d) => d.anio))].sort((a, b) => b - a);
  const anioActual = selectedAnio;

  const handleMes = (mesIdx) => {
    const params = new URLSearchParams(searchParams);
    if (selectedMes === mesIdx) {
      params.delete("mes");
    } else {
      params.set("mes", mesIdx);
      params.set("anio", anioActual);
    }
    setSearchParams(params);
  };

  const handleAnio = (anio) => {
    const params = new URLSearchParams(searchParams);
    params.set("anio", anio);
    if (selectedMes !== null) params.set("mes", selectedMes);
    setSearchParams(params);
  };

  const docsEnMes = (mesIdx) =>
    docs.filter((d) => d.mes === mesIdx && d.anio === anioActual).length;

  const CATEGORIAS_NAV = [
    { label: "Boletín Oficial", path: "/boletin-oficial" },
    { label: "Ordenanzas", path: "/ordenanzas" },
    { label: "Decretos", path: "/decretos" },
    { label: "Resoluciones", path: "/resoluciones" },
    { label: "Licitaciones", path: "/licitaciones" },
  ];

  const recientes = [...docs].slice(0, 5);

  return (
    <aside className="hidden md:block w-60 shrink-0">

      <Widget title="Calendario">
        <div className="flex items-center justify-between mb-2">
          <select
            value={anioActual}
            onChange={(e) => handleAnio(parseInt(e.target.value))}
            className="text-xs border border-gray-300 px-1 py-0.5 focus:outline-none focus:border-[#1a3a6c] text-[#1a3a6c] font-semibold"
          >
            {[new Date().getFullYear(), new Date().getFullYear() - 1, new Date().getFullYear() - 2, new Date().getFullYear() - 3,
             new Date().getFullYear() - 4, new Date().getFullYear() - 5, 
             new Date().getFullYear() - 6, new Date().getFullYear() - 7, 
             new Date().getFullYear() - 8, new Date().getFullYear() - 9, 
             new Date().getFullYear() - 10, new Date().getFullYear() - 11
            ].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {selectedMes !== null && (
            <button
              onClick={() => { const p = new URLSearchParams(searchParams); p.delete("mes"); setSearchParams(p); }}
              className="text-xs text-gray-400 hover:text-red-500 cursor-pointer bg-transparent border-none"
            >
              ✕ Limpiar
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-1">
          {MESES.map((mes, idx) => {
            const count = docsEnMes(idx);
            const isSelected = selectedMes === idx;
            return (
              <button
                key={mes}
                onClick={() => handleMes(idx)}
                className={`text-xs py-1.5 px-1 text-center rounded transition-colors cursor-pointer border relative ${
                  isSelected
                    ? "bg-[#1a3a6c] text-white border-[#1a3a6c] font-semibold"
                    : count > 0
                    ? "bg-blue-50 text-[#1a3a6c] border-blue-200 hover:bg-blue-100 font-semibold"
                    : "bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100"
                }`}
              >
                {mes.slice(0, 3)}
                {count > 0 && (
                  <span className={`block text-[10px] leading-none mt-0.5 ${isSelected ? "text-blue-200" : "text-blue-400"}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Widget>

      <Widget title="Categorías">
        <ul>
          {CATEGORIAS_NAV.map(({ label, path }) => (
            <li key={label} className="border-b border-gray-100 last:border-none py-1.5">
              <button
                onClick={() => navigate(path)}
                className="text-xs text-[#1a3a6c] hover:underline cursor-pointer bg-transparent border-none text-left w-full"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </Widget>

      {recientes.length > 0 && (
        <Widget title="Publicaciones recientes">
          <ul>
            {recientes.map((d) => (
              <li key={d.id} className="border-b border-gray-100 last:border-none py-1.5">
                <button
                  onClick={() => navigate(TIPO_PATH[d.tipo] || "/")}
                  className="text-xs text-[#1a3a6c] hover:underline cursor-pointer bg-transparent border-none text-left w-full truncate block"
                  title={d.titulo}
                >
                  {d.titulo}
                </button>
                <span className="text-[10px] text-gray-400">{d.tipo} &mdash; {d.fechaCorta}</span>
              </li>
            ))}
          </ul>
        </Widget>
      )}
      <img
  src="/bem2.jpeg"
  alt="Información municipal"
  className="w-full rounded-xl mb-6 shadow-md object-cover"
/>

    </aside>
  );
}
