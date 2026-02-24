export default function Contacto() {
  return (
    <div>
      <div className="bg-white border border-gray-200 border-l-4 border-l-[#1a3a6c] px-4 py-2.5 mb-4 text-lg font-bold text-[#1a3a6c]">
        Contacto
      </div>
      <div className="bg-white border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold text-[#1a3a6c] uppercase tracking-wide mb-4 pb-2 border-b border-gray-200">
              Datos de contacto
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-3">
                <span className="text-[#1a3a6c] font-semibold w-24 shrink-0">Dirección</span>
                <span>Int. Eulogio Martinez 149, San Carlos Minas, Córdoba</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#1a3a6c] font-semibold w-24 shrink-0">Teléfono</span>
                <a href="tel:3542491876" className="text-[#1a3a6c] hover:underline">3542 49-1876</a>
              </li>
              <li className="flex gap-3">
                <span className="text-[#1a3a6c] font-semibold w-24 shrink-0">Celular</span>
                <a href="tel:3542461785" className="text-[#1a3a6c] hover:underline">3542 46-1785</a>
              </li>
              <li className="flex gap-3">
                <span className="text-[#1a3a6c] font-semibold w-24 shrink-0">Email</span>
                <a href="mailto:municipalidadsancarlosminas@gmail.com" className="text-[#1a3a6c] hover:underline break-all">
                  municipalidadsancarlosminas@gmail.com
                </a>
              </li>
              <li className="flex gap-3">
                <span className="text-[#1a3a6c] font-semibold w-24 shrink-0">Horarios</span>
                <span>Lunes a Viernes, 08:00 a 13:00 hs</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#1a3a6c] uppercase tracking-wide mb-4 pb-2 border-b border-gray-200">
              Enviar un mensaje
            </h3>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Nombre completo</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6c]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6c]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Mensaje</label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#1a3a6c] resize-none"
                />
              </div>
              <button
                type="submit"
                className="bg-[#1a3a6c] text-white text-sm px-5 py-2 hover:bg-[#0d2550] transition-colors cursor-pointer border-none"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
