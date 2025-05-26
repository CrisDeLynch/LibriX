const BuscadorLibros = ({ busqueda, setBusqueda, mostrarLetras, setMostrarLetras }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Buscar libro..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full sm:w-1/2 px-4 py-2 border border-violet-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
      />
    </div>
  );
};

export default BuscadorLibros;
