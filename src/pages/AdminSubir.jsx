import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { useDocs } from "../context/DocumentsContext";
import { TIPOS_DOCUMENTO } from "../data";

export default function AdminSubir() {
  const { isAdmin } = useAdmin();
  const { docs, addDoc, removeDoc } = useDocs();

  const fileRef = useRef(null);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState(TIPOS_DOCUMENTO[0]);
  const [archivo, setArchivo] = useState(null);
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

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.type !== "application/pdf") { setError("Solo se permiten archivos PDF."); return; }
    setArchivo(f);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim()) { setError("El título es obligatorio."); return; }
    if (!archivo) { setError("Seleccioná un archivo PDF."); return; }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const now = new Date();
      addDoc({
        id: Date.now(),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        tipo,
        nombreArchivo: archivo.name,
        url: ev.target.result,
        fecha: now.toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" }),
        fechaCorta: now.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }),
        mes: now.getMonth(),
        anio: now.getFullYear(),
      });
      setLoading(false);
      setSuccess(true);
      setTitulo("");
      setDescripcion("");
      setTipo(TIPOS_DOCUMENTO[0]);
      setArchivo(null);
      if (fileRef.current) fileRef.current.value = "";
    };
    reader.readAsDataURL(archivo);
  };

  return (
    <div>
      <div className="bg-white border border-gray-200 border-l-4 border-l-[#1a3a6c] px-4 py-2.5 mb-4 text-lg font-bold text-[#1a3a6c] flex items-center justify-between">
        <span>Panel de Administración</span>
        <Link to="/" className="text-sm font-normal text-gray-500 hover:text-[#1a3a6c] no-underline">
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
            <button onClick={() => setSuccess(false)} className="text-green-600 hover:text-green-800 cursor-pointer bg-transparent border-none text-lg leading-none">&times;</button>
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
                  <option key={t} value={t}>{t}</option>
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
                onChange={(e) => { setTitulo(e.target.value); setError(""); }}
                placeholder={`Ej: ${tipo} N° 123/2026`}
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6c]"
              />
            </div>
          </div>

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

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Archivo PDF <span className="text-red-500">*</span>
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:border-[#1a3a6c] transition-colors p-5 text-center cursor-pointer"
            >
              {archivo ? (
                <p className="text-sm text-[#1a3a6c] font-semibold">{archivo.name}</p>
              ) : (
                <>
                  <p className="text-sm text-gray-400">Hacé clic para seleccionar un PDF</p>
                  <p className="text-xs text-gray-300 mt-0.5">Solo archivos .pdf</p>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="application/pdf" onChange={handleFile} className="hidden" />
          </div>

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

      {docs.length > 0 && (
        <div className="bg-white border border-gray-200">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-wide">
            Documentos publicados ({docs.length})
          </div>
          <ul className="divide-y divide-gray-100">
            {docs.map((d) => (
              <li key={d.id} className="flex items-center justify-between px-4 py-3 gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="bg-blue-50 text-[#1a3a6c] text-xs px-2 py-0.5 rounded-sm">{d.tipo}</span>
                    <span className="text-xs text-gray-400">{d.fechaCorta}</span>
                  </div>
                  <p className="text-sm font-semibold text-[#1a3a6c] truncate">{d.titulo}</p>
                  <p className="text-xs text-gray-400">{d.nombreArchivo}</p>
                </div>
                <button
                  onClick={() => removeDoc(d.id)}
                  className="text-xs text-red-500 hover:text-red-700 cursor-pointer bg-transparent border border-red-200 hover:border-red-400 px-2 py-1 transition-colors shrink-0"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
