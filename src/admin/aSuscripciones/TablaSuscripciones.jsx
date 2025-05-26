export default function TablaSuscripciones({ suscripciones }) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-violet-50">
              <th className="px-3 py-2 border">Usuario</th>
              <th className="px-3 py-2 border">Email</th>
              <th className="px-3 py-2 border">Plan</th>
              <th className="px-3 py-2 border">Estado</th>
              <th className="px-3 py-2 border">Inicio</th>
              <th className="px-3 py-2 border">Fin</th>
            </tr>
          </thead>
          <tbody>
            {suscripciones.map(s => (
              <tr key={s.id} className="hover:bg-violet-50">
                <td className="px-3 py-2 border">{s.usuario?.nombre || "-"}</td>
                <td className="px-3 py-2 border">{s.usuario?.email || "-"}</td>
                <td className="px-3 py-2 border">{s.plan}</td>
                <td className="px-3 py-2 border">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    s.estado === "activa"
                      ? "bg-green-100 text-green-700"
                      : s.estado === "cancelada"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {s.estado}
                  </span>
                </td>
                <td className="px-3 py-2 border">
                  {s.fecha_inicio ? new Date(s.fecha_inicio).toLocaleDateString() : "-"}
                </td>
                <td className="px-3 py-2 border">
                  {s.fecha_fin ? new Date(s.fecha_fin).toLocaleDateString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  