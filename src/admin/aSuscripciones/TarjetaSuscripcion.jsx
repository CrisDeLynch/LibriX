export default function TarjetaSuscripcion({ suscripcion }) {
    const s = suscripcion;
    return (
      <div className="rounded-xl border p-4 shadow flex flex-col gap-2 bg-white">
        <div className="flex justify-between items-center">
          <span className="font-bold text-violet-700">{s.usuario?.nombre || "-"}</span>
          <span className={`px-2 py-1 rounded text-xs font-bold ${
            s.estado === "activa"
              ? "bg-green-100 text-green-700"
              : s.estado === "cancelada"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-600"
          }`}>
            {s.estado}
          </span>
        </div>
        <div className="text-sm text-gray-700 break-all">{s.usuario?.email || "-"}</div>
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          <span>Plan: <b>{s.plan}</b></span>
          <span>Inicio: {s.fecha_inicio ? new Date(s.fecha_inicio).toLocaleDateString() : "-"}</span>
          <span>Fin: {s.fecha_fin ? new Date(s.fecha_fin).toLocaleDateString() : "-"}</span>
        </div>
      </div>
    );
  }
  