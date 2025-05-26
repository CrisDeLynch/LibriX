import Estrellas from "./Estrellas";

const ComentarioCard = ({
  comentario,
  usuarioActual,
  onEdit,
  onDelete,
  editando,
  comentarioEditado,
  setComentarioEditado,
  guardarEdicion,
}) => {
  const avatar = (
    <div className="bg-purple-600 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg">
      {comentario.nombre_usuario.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow border flex gap-4 items-start">
      {avatar}
      <div className="w-full">
        <div className="flex justify-between items-center mb-1">
          <span className="text-purple-700 font-semibold">
            {comentario.nombre_usuario}
          </span>
          <span className="text-sm text-gray-400">
            {new Date(
              new Date(comentario.fecha).getTime() + 2 * 60 * 60 * 1000
            ).toLocaleString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <Estrellas valor={comentario.estrellas} />
        {editando === comentario.id ? (
          <>
            <textarea
              value={comentarioEditado}
              onChange={(e) => setComentarioEditado(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-2"
            />
            <button
              onClick={guardarEdicion}
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
            >
              Guardar
            </button>
          </>
        ) : (
          <p className="text-gray-700 mt-1">{comentario.comentario}</p>
        )}
        {usuarioActual === comentario.nombre_usuario && (
          <div className="mt-2 space-x-2 text-sm">
            <button
              onClick={() => onEdit(comentario)}
              className="text-indigo-600 hover:underline"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(comentario.id)}
              className="text-red-500 hover:underline"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComentarioCard;
