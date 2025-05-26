import { useState } from "react";
import { cliente } from "../../conexionApi";
import { toast } from "react-hot-toast";

export default function ModalEditarAutor({ autor, onClose, onUpdate }) {
  if (!autor) return null;

  const [nombre, setNombre] = useState(autor.nombre || "");
  const [nacionalidad, setNacionalidad] = useState(autor.nacionalidad || "");
  const [fecha_nacimiento, setFechaNacimiento] = useState(autor.fecha_nacimiento || "");
  const [fecha_fallecimiento, setFechaFallecimiento] = useState(autor.fecha_fallecimiento || "");
  const [biografia, setBiografia] = useState(autor.biografia || "");
  const [loading, setLoading] = useState(false);

  const updateAutor = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await cliente
      .from("autor")
      .update({
        nombre,
        nacionalidad,
        fecha_nacimiento,
        fecha_fallecimiento: fecha_fallecimiento || null,
        biografia,
      })
      .eq("id", autor.id);

    setLoading(false);
    if (!error) {
      toast.success("Autor actualizado correctamente.");
      onUpdate && onUpdate();
      onClose && onClose();
    } else {
      toast.error("No se pudo actualizar el autor.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-red-600 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-6 text-center text-violet-700">
          Editar Autor
        </h2>

        <form onSubmit={updateAutor} className="space-y-4">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre completo"
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
          <input
            type="text"
            value={nacionalidad}
            onChange={(e) => setNacionalidad(e.target.value)}
            placeholder="Nacionalidad"
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
          <input
            type="date"
            value={fecha_nacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
          <input
            type="date"
            value={fecha_fallecimiento}
            onChange={(e) => setFechaFallecimiento(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
          <textarea
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
            placeholder="Biografía"
            rows="4"
            required
            className="w-full border border-gray-300 p-3 rounded resize-none focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
