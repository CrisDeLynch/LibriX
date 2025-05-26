export default function ModalEliminarConfirmacion({
    entidad = "elemento",
    onConfirmar,
    onCancelar,
    cargando = false,
  }) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
          <h2 className="text-lg font-bold text-rose-600 mb-4">
            ¿Eliminar {entidad}?
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onCancelar}
              className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
              disabled={cargando}
            >
              Cancelar
            </button>
            <button
              onClick={onConfirmar}
              className="px-4 py-2 rounded bg-rose-600 text-white hover:bg-rose-700"
              disabled={cargando}
            >
              {cargando ? "Eliminando..." : "Eliminar"}
            </button>
          </div>
        </div>
      </div>
    );
  }
  