import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate("/admin/subir");
    } else {
      setError("Contraseña incorrecta.");
      setPassword("");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <div className="bg-white border border-gray-200">
        <div className="bg-[#1a3a6c] text-white px-5 py-3 text-sm font-bold uppercase tracking-wide">
          Acceso Administrador
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6c]"
              autoFocus
            />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#1a3a6c] text-white text-sm py-2 hover:bg-[#0d2550] transition-colors cursor-pointer border-none"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
