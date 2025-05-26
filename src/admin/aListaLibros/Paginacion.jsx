export default function Paginacion({ paginaActual, totalPaginas, onAnterior, onSiguiente }) {
    return (
      <div className="w-full py-6 flex items-center justify-center gap-6 mt-6">
        <button
          onClick={onAnterior}
          disabled={paginaActual === 1}
          className="px-4 py-2 bg-violet-200 hover:bg-violet-300 text-violet-900 rounded disabled:opacity-50 transition"
        >
          Anterior
        </button>
        <span className="text-violet-700 font-semibold">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={onSiguiente}
          disabled={paginaActual === totalPaginas}
          className="px-4 py-2 bg-violet-200 hover:bg-violet-300 text-violet-900 rounded disabled:opacity-50 transition"
        >
          Siguiente
        </button>
      </div>
    );
  }
  