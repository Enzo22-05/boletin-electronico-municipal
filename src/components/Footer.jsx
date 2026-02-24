export default function Footer() {
  return (
    <>
      <div className="bg-[#1a3a6c] text-blue-200 py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap gap-8">
          <div className="flex-1 min-w-48">
            <h4 className="text-white text-xs font-bold uppercase tracking-wide mb-3 pb-1.5 border-b border-blue-800">
              Boletín Electrónico Municipal
            </h4>
            <ul className="space-y-1 text-xs">
              {[
                { label: "Inicio", path: "/" },
                { label: "Ordenanzas", path: "/ordenanzas" },
                { label: "Decretos", path: "/decretos" },
                { label: "Resoluciones", path: "/resoluciones" },
                { label: "Licitaciones", path: "/licitaciones" },
                { label: "Contacto", path: "/contacto" },
              ].map(({ label, path }) => (
                <li key={label}>
                  <a href={path} className="hover:text-white hover:underline transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 min-w-48">
            <h4 className="text-white text-xs font-bold uppercase tracking-wide mb-3 pb-1.5 border-b border-blue-800">
              Información
            </h4>
            <ul className="space-y-1 text-xs">
              {["¿Cómo publicar?","Aranceles y tarifas","Normativa vigente","Preguntas frecuentes","Accesibilidad"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white hover:underline transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 min-w-48">
            <h4 className="text-white text-xs font-bold uppercase tracking-wide mb-3 pb-1.5 border-b border-blue-800">
              Contacto
            </h4>
            <p className="text-xs leading-7">
              <strong className="text-white">Int. Eulogio Martinez 149</strong><br />
              San Carlos Minas &mdash; Córdoba, Argentina<br />
              Tel:{" "}
              <a href="tel:3542491876" className="hover:text-white hover:underline">3542 49-1876</a><br />
              Cel:{" "}
              <a href="tel:3542461785" className="hover:text-white hover:underline">3542 46-1785</a><br />
              <a href="mailto:municipalidadsancarlosminas@gmail.com" className="hover:text-white hover:underline">
                municipalidadsancarlosminas@gmail.com
              </a><br />
              Atención: Lunes a Viernes 08:00 a 13:00 hs
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#0d2550] py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo-municipalidad.png" alt="Municipalidad San Carlos Minas" className="h-12 w-auto" />
            <span className="text-xs text-blue-200 leading-5">
              <strong className="text-white block">Boletín Electrónico Municipal</strong>
              Municipalidad de San Carlos Minas<br />
              Córdoba, Argentina
            </span>
          </div>
          <p className="text-xs text-blue-900/60 text-[#556]">
            &copy; 2026 Municipalidad de San Carlos Minas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </>
  );
}
