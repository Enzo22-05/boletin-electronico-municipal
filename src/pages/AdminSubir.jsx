import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { useDocs } from "../context/DocumentsContext";
import { TIPOS_DOCUMENTO } from "../data";

export default function AdminSubir() {
  const { isAdmin } = useAdmin();
  const { addDoc } = useDocs();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState(TIPOS_DOCUMENTO[0]);
  const [linkDrive, setLinkDrive] = useState("");
  const [fechaPublicacion, setFechaPublicacion] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isAdmin) {
    return (
      <div className="bg-white border border-gray-200 p-8 text-center text-gray-500 text-sm">
        Acceso restringido.{" "}
        <Link to="/admin/login" className="text-[#1a3a6c] hover:underline">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setError("El título es obligatorio.");
      return;
    }
    if (!linkDrive.trim()) {
      setError("El link de Google Drive es obligatorio.");
      return;
    }
    if (!fechaPublicacion) {
      setError("Seleccioná una fecha de publicación.");
      return;
    }

    setLoading(true);

    const fechaObj = new Date(fechaPublicacion + "T00:00:00");

    addDoc({
      id: Date.now(),
      titulo,
      descripcion,
      tipo,
      url: linkDrive, // link de Google Drive (preview)
      nombreArchivo: titulo,
      fecha: fechaObj.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      fechaCorta: fechaObj.toLocaleDateString("es-AR"),
      mes: fechaObj.getMonth(),
      anio: fechaObj.getFullYear(),
      fechaISO: fechaObj.toISOString(),
    });

    setLoading(false);
    setSuccess(true);
    setTitulo("");
    setDescripcion("");
    setTipo(TIPOS_DOCUMENTO[0]);
    setLinkDrive("");
    setFechaPublicacion("");
    setError("");
  };

  return (
    <div>
      <div className="bg-white border border-gray-200 border-l-4 border-l-[#1a3a6c] px-4 py-2.5 mb-4 text-lg font-bold text-[#1a3a6c] flex items-center justify-between">
        <span>Panel de Administración</span>
        <Link
          to="/"
          className="text-sm font-normal text-gray-500 hover:text-[#1a3a6c] no-underline"
        >
          ← Volver al inicio
        </Link>
      </div>

      <div className="bg-white border border-gray-200 p-6 mb-6">
        <h3 className="text-sm font-bold text-[#1a3a6c] mb-4 pb-2 border-b border-gray-100 uppercase tracking-wide">
          Subir nuevo documento
        </h3>

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 flex justify-between items-center">
            <span>Documento publicado correctamente.</span>
            <button
              onClick={() => setSuccess(false)}
              className="text-green-600 hover:text-green-800 cursor-pointer bg-transparent border-none text-lg leading-none"
            >
              &times;
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Tipo de documento <span className="text-red-500">*</span>
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6c] bg-white"
              >
                {TIPOS_DOCUMENTO.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Título <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder={`Ej: ${tipo} N° 123/2026`}
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6c]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Fecha de publicación <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={fechaPublicacion}
              onChange={(e) => setFechaPublicacion(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6c]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Link de Google Drive <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={linkDrive}
              onChange={(e) => setLinkDrive(e.target.value)}
              placeholder="Ej: https://drive.google.com/file/d/ID_DEL_PDF/preview"
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6c]"
            />
          </div>

          {descripcion && (
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Descripción <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={2}
                placeholder="Breve descripción del contenido..."
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6c] resize-none"
              />
            </div>
          )}

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#1a3a6c] text-white text-sm px-6 py-2 hover:bg-[#0d2550] transition-colors cursor-pointer border-none disabled:opacity-50"
          >
            {loading ? "Publicando..." : "Publicar documento"}
          </button>
        </form>
      </div>
    </div>
  );
}