function Tag({ label }) {
  return (
    <span className="bg-blue-50 text-[#1a3a6c] text-xs px-2 py-0.5 rounded-sm">
      {label}
    </span>
  );
}

export default function BoletinCard({ boletin }) {
  return (
    <div className="bg-white border border-gray-200 p-4 mb-4">
      <p className="text-xs text-gray-400 mb-1">{boletin.fecha}</p>
      <h2 className="text-base font-semibold mb-2">
        <a href="#" className="text-[#1a3a6c] hover:underline">
          Boletín Electrónico Municipal N° {boletin.numero} &mdash; {boletin.fechaCorta}
        </a>
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-3">{boletin.resumen}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {boletin.tags.map((t) => (
          <Tag key={t} label={t} />
        ))}
      </div>
      <a
        href="#"
        className="inline-block bg-[#1a3a6c] text-white text-xs px-4 py-1.5 hover:bg-[#0d2550] transition-colors"
      >
        Ver boletín completo
      </a>
    </div>
  );
}
