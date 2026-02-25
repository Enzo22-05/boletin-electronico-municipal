import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function TopBar() {
  const { isAdmin, logout } = useAdmin();

  return (
    <div className="bg-[#1a3a6c] text-white text-xs py-1.5">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center flex-wrap gap-2">

        <span>
          <a
            href="mailto:municipalidadsancarlosminas@gmail.com"
            className="text-blue-200 hover:underline"
          >
            municipalidadsancarlosminas@gmail.com
          </a>
          <span className="mx-2">|</span>
          Lun a Vie 08:00 a 13:00 hs
        </span>

        <div className="flex items-center gap-4">

          {/* REDES */}
          <a
            href="https://www.instagram.com/munisancarlosminas?igsh=MTFrOTBtMWZuaGQyNg=="
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-white hover:text-pink-300 transition-colors no-underline"
          >
            <span>Instagram</span>
          </a>

          <a
            href="https://www.facebook.com/share/1AxDUkMTGV/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-white hover:text-blue-300 transition-colors no-underline"
          >
            <span>Facebook</span>
          </a>

          {isAdmin ? (
  <button
    onClick={logout}
    className="text-white/70 hover:text-red-300 transition"
    title="Cerrar sesión"
  >
    ⎋
  </button>
) : (
  <Link
    to="/admin/login"
    className="text-white/70 hover:text-white transition"
    title="Acceso administrador"
  >
    🔒
  </Link>
)}
        </div>

      </div>
    </div>
  );
}