import { Edit, Trash2 } from "lucide-react";

export default function TablaAutores({ autores, onEditar, onEliminar }) {
  return (
    <>
      <div className="hidden sm:block overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-violet-100 text-violet-900 uppercase text-xs sm:text-sm">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Nacionalidad</th>
              <th className="p-3 text-left">Nacimiento</th>
              <th className="p-3 text-left">Fallecimiento</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {autores.map((autor) => (
              <tr key={autor.id} className="border-t hover:bg-violet-50">
                <td className="p-3 break-words">{autor.nombre}</td>
                <td className="p-3 break-words">{autor.nacionalidad}</td>
                <td className="p-3">
                  {autor.fecha_nacimiento
                    ? new Date(autor.fecha_nacimiento).toLocaleDateString("es-ES")
                    : "-"}
                </td>
                <td className="p-3">
                  {autor.fecha_fallecimiento
                    ? new Date(autor.fecha_fallecimiento).toLocaleDateString("es-ES")
                    : "-"}
                </td>
                <td className="p-3 text-center">
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                    <button
                      onClick={() => onEditar(autor)}
                      className="flex items-center gap-1 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded text-xs sm:text-sm transition"
                    >
                      <Edit size={16} /> Editar
                    </button>
                    <button
                      onClick={() => onEliminar(autor)}
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

      <div className="sm:hidden flex flex-col gap-4">
        {autores.map((autor) => (
          <div key={autor.id} className="bg-gradient-to-br from-violet-50 to-white rounded-2xl shadow-md p-5 border border-violet-100">
            <h2 className="text-lg font-semibold text-violet-800">{autor.nombre}</h2>
            <p className="text-sm text-gray-600"><strong>Nacionalidad:</strong> {autor.nacionalidad}</p>
            <p className="text-sm text-gray-600">
              <strong>Nacimiento:</strong> {autor.fecha_nacimiento
                ? new Date(autor.fecha_nacimiento).toLocaleDateString("es-ES")
                : "-"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Fallecimiento:</strong> {autor.fecha_fallecimiento
                ? new Date(autor.fecha_fallecimiento).toLocaleDateString("es-ES")
                : "-"}
            </p>
            <div className="mt-3 flex justify-end gap-3">
              <button
                onClick={() => onEditar(autor)}
                className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-full text-sm shadow-sm transition"
              >
                <Edit size={18} /> Editar
              </button>
              <button
                onClick={() => onEliminar(autor)}
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
