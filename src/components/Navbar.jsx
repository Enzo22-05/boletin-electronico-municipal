import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "../data";

export default function Navbar() {
  return (
    <nav className="bg-[#1a3a6c]">
      <ul className="max-w-6xl mx-auto px-4 flex flex-wrap">
        {NAV_LINKS.map(({ label, path }) => (
          <li key={path}>
            <NavLink
              to={path}
              end={path === "/"}
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
    </nav>
  );
}
