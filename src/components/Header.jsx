import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function Header() {
  const { isAdmin, logout } = useAdmin();

  return (
    <header
  className="relative bg-cover bg-center border-b-4 border-[#1a3a6c]"
  style={{ backgroundImage: "url('/bem.jpeg')" }}
>
  {/* Overlay oscuro opcional para que se lea mejor */}
  <div className="absolute inset-0 bg-black/40"></div>

  <div className="relative max-w-6xl mx-auto px-4 py-6 flex items-center justify-between flex-wrap gap-4 text-white">
    
    <Link to="/" className="flex items-center gap-4 no-underline">
      
    </Link>

    <div className="flex flex-col items-end gap-2 text-right">
      <div className="text-xs leading-6">
        <strong>Int. Eulogio Martinez 149</strong><br />
        San Carlos Minas — Córdoba, Argentina<br />
        Tel:{" "}
        <a href="tel:3542491876" className="hover:underline">
          3542 49-1876
        </a>{" "}
        | Cel:{" "}
        <a href="tel:3542461785" className="hover:underline">
          3542 46-1785
        </a>
        <br />
        <a href="mailto:municipalidadsancarlosminas@gmail.com" className="hover:underline">
          municipalidadsancarlosminas@gmail.com
        </a>
        <br />
        Atención: Lunes a Viernes 08:00 a 13:00 hs
      </div>

      
    </div>
  </div>
</header>
  );
}
