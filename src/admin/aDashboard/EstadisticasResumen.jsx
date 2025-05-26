export default function EstadisticasResumen({ totalLibros, totalUsuarios, totalSuscripciones, totalLecturas }) {
    const stats = [
      { label: "Libros", value: totalLibros },
      { label: "Usuarios", value: totalUsuarios },
      { label: "Suscripciones", value: totalSuscripciones },
      { label: "Lecturas", value: totalLecturas },
    ];
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map(s => (
          <div key={s.label} className="bg-white p-4 rounded-lg shadow text-center">
            <h3 className="text-gray-500 text-sm">{s.label}</h3>
            <p className="text-2xl font-bold text-violet-600">{s.value}</p>
          </div>
        ))}
      </div>
    );
  }
  