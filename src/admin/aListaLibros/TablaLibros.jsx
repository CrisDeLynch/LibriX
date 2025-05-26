import { Edit, Trash2 } from "lucide-react";

export default function TablaLibros({ libros, onEditar, onEliminar }) {
  return (
    <>
      {/* Vista de escritorio */}
      <div className="hidden sm:block overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-violet-100 text-violet-900 uppercase text-xs sm:text-sm">
            <tr>
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-left">Autor</th>
              <th className="p-3 text-left">Género</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libro) => (
              <tr key={libro.id} className="border-t hover:bg-violet-50">
                <td className="p-3 break-words">{libro.titulo}</td>
                <td className="p-3 break-words">{libro.autor?.nombre}</td>
                <td className="p-3 break-words">
                  {libro.genero || <span className="text-gray-400">-</span>}
                </td>
                <td className="p-3 text-center">
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                    <button
                      onClick={() => onEditar(libro)}
                      className="flex items-center gap-1 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs sm:text-sm transition"
                    >
                      <Edit size={16} /> Editar
                    </button>
                    <button
                      onClick={() => onEliminar(libro)}
                      className="flex items-center gap-1 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs sm:text-sm transition"
                    >
                      <Trash2 size={16} /> Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista móvil */}
      <div className="sm:hidden flex flex-col gap-4">
        {libros.map((libro) => (
          <div
            key={libro.id}
            className="bg-gradient-to-br from-violet-50 to-white rounded-2xl shadow-md p-5 border border-violet-100"
          >
            <div className="mb-3">
              <h2 className="text-lg font-semibold text-violet-800">
                {libro.titulo}
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Autor:</strong> {libro.autor?.nombre || "Desconocido"}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Género:</strong>{" "}
                {libro.genero || <span className="text-gray-400">-</span>}
              </p>
            </div>

            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => onEditar(libro)}
                className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-sm shadow-sm transition"
              >
                <Edit size={18} /> Editar
              </button>
              <button
                onClick={() => onEliminar(libro)}
                className="flex items-center gap-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-sm shadow-sm transition"
              >
                <Trash2 size={18} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
