import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function Header() {
  const { isAdmin, logout } = useAdmin();

  return (
    <header className="bg-white border-b-4 border-[#1a3a6c] py-3">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between flex-wrap gap-4">
        <Link to="/" className="flex items-center gap-4 no-underline">
          <img src="/logo-municipalidad.png" alt="Municipalidad San Carlos Minas" className="h-20 w-auto" />
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-[#1a3a6c] leading-tight">
              Boletín Electrónico Municipal
            </span>
            <span className="text-sm text-gray-500">Municipalidad de San Carlos Minas</span>
          </div>
        </Link>

        <div className="flex flex-col items-end gap-2">
          <div className="text-xs text-gray-600 leading-7 text-right">
            <strong>Int. Eulogio Martinez 149</strong><br />
            San Carlos Minas &mdash; Córdoba, Argentina<br />
            Tel:{" "}
            <a href="tel:3542491876" className="text-[#1a3a6c] hover:underline">3542 49-1876</a>
            {" "}&nbsp;|&nbsp;{" "}
            Cel:{" "}
            <a href="tel:3542461785" className="text-[#1a3a6c] hover:underline">3542 46-1785</a>
            <br />
            <a href="mailto:municipalidadsancarlosminas@gmail.com" className="text-[#1a3a6c] hover:underline">
              municipalidadsancarlosminas@gmail.com
            </a>
            <br />
            Atención: Lunes a Viernes 08:00 a 13:00 hs
          </div>

          {isAdmin ? (
            <div className="flex items-center gap-3">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-semibold">
                Sesión admin activa
              </span>
              <button
                onClick={logout}
                className="text-xs text-red-600 hover:underline cursor-pointer bg-transparent border-none"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link
              to="/admin/login"
              className="text-xs text-gray-400 hover:text-[#1a3a6c] transition-colors"
              title="Acceso administrador"
            >
              🔒 Administrador
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
