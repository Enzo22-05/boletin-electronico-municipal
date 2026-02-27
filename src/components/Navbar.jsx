import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../data";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[#1a3a6c]">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">

        {/* Botón hamburguesa */}
        <button
          className="md:hidden text-white py-3"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Links */}
        <ul
          className={`flex-col md:flex md:flex-row w-full md:w-auto ${
            open ? "flex" : "hidden"
          } md:flex`}
        >
          {NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block text-white text-sm px-4 py-3 transition-colors ${
                    isActive ? "bg-[#0d2550]" : "hover:bg-[#0d2550]"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}