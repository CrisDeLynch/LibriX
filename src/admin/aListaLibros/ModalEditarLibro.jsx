import { useState, useEffect } from "react";
import { cliente } from "../../conexionApi";
import { toast } from "react-toastify";

export default function ModalEditarLibro({ libro, onClose, onUpdate }) {
  if (!libro) return null;

  const [titulo, setTitulo] = useState("");
  const [autorId, setAutorId] = useState("");
  const [genero, setGenero] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [autores, setAutores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar datos del libro
  useEffect(() => {
    if (libro) {
      setTitulo(libro.titulo || "");
      setAutorId(libro.autor_id || libro.autor?.id || "");
      setGenero(libro.genero || "");
      setDescripcion(libro.descripcion || "");
    }
  }, [libro]);

  // Cargar autores y géneros únicos ordenados
  useEffect(() => {
    const cargarDatos = async () => {
      const { data: autoresData } = await cliente
        .from("autor")
        .select("id, nombre");
      const { data: generosData } = await cliente
        .from("libro")
        .select("genero");

      if (autoresData) {
        const ordenados = [...autoresData].sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
        setAutores(ordenados);
      }

      if (generosData) {
        const unicos = [
          ...new Set(generosData.map((g) => g.genero).filter(Boolean)),
        ].sort((a, b) => a.localeCompare(b));
        setGeneros(unicos);
      }
    };
    cargarDatos();
  }, []);

  const updateLibro = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await cliente
      .from("libro")
      .update({ titulo, autor_id: autorId, genero, descripcion })
      .eq("id", libro.id);

    setLoading(false);
    if (!error) {
      toast.success("Libro actualizado correctamente.");
      onUpdate && onUpdate();
      onClose && onClose();
    } else {
      toast.error("No se pudo actualizar el libro.");
    }
  };

  return (
  <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
    <div className="bg-white w-full max-w-sm sm:max-w-md p-6 rounded-2xl shadow-xl relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-400 hover:text-red-600 text-2xl"
        aria-label="Cerrar"
      >
        &times;
      </button>

      <h2 className="text-xl font-semibold mb-6 text-center text-amber-600">
        Editar Libro
      </h2>

      <form onSubmit={updateLibro} className="space-y-4">
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          placeholder="Título"
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
        />

        <select
          value={autorId}
          onChange={(e) => setAutorId(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
        >
          <option value="">Selecciona un autor</option>
          {autores.map((autor) => (
            <option key={autor.id} value={autor.id}>
              {autor.nombre}
            </option>
          ))}
        </select>

        <select
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-amber-300"
        >
          <option value="">Selecciona un género</option>
          {generos.map((g, idx) => (
            <option key={idx} value={g}>
              {g}
            </option>
          ))}
        </select>

        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          placeholder="Descripción"
          className="w-full border border-gray-300 p-3 rounded resize-none h-32 focus:outline-none focus:ring-2 focus:ring-amber-300"
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
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded"
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
