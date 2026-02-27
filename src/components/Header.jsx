import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function Header() {
  const { isAdmin, logout } = useAdmin();

  return (
    <header
  className="relative bg-cover bg-center border-b-4 border-[#1a3a6c]"
  style={{ backgroundImage: "url('/bem.jpeg')" }}
>
  <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative max-w-6xl mx-auto px-4 py-6 
                  flex flex-col md:flex-row 
                  items-center md:items-center 
                  justify-between 
                  gap-4 text-white text-center md:text-right">

    {/* Espacio por si agregás logo */}
    <Link to="/" className="flex items-center gap-4 no-underline">
      {/* Logo opcional */}
    </Link>

    <div className="text-xs sm:text-sm leading-5 sm:leading-6">
      <strong className="block text-sm sm:text-base">
        Int. Eulogio Martinez 149
      </strong>

      <span className="block">
        San Carlos Minas — Córdoba, Argentina
      </span>

      <span className="block">
        Tel:{" "}
        <a href="tel:3542491876" className="hover:underline">
          3542 49-1876
        </a>{" "}
        | Cel:{" "}
        <a href="tel:3542461785" className="hover:underline">
          3542 46-1785
        </a>
      </span>

      <span className="block">
        <a
          href="mailto:municipalidadsancarlosminas@gmail.com"
          className="hover:underline break-all"
        >
          municipalidadsancarlosminas@gmail.com
        </a>
      </span>

      <span className="block">
        Atención: Lunes a Viernes 08:00 a 13:00 hs
      </span>
    </div>
  </div>
</header>
  );
}
