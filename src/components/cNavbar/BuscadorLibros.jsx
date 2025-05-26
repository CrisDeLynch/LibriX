import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import { cliente } from "../../conexionApi";

const BuscadorLibros = ({ className = "", onItemClick }) => {
  const [query, setQuery] = useState("");
  const [libros, setLibros] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const busquedaLibros = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setLibros([]);
      setShowResults(false);
      return;
    }
    setLoading(true);

    const { data, error } = await cliente
    .from("libro")
    .select(`
      id,
      titulo,
      portada_url,
      autor:autor_id (
        nombre
      )
    `)
    .ilike("titulo", `%${value}%`)
    .limit(7);

    setLibros(!error && data ? data : []);
    setShowResults(true);
    setLoading(false);
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <input
        type="text"
        value={query}
        onChange={busquedaLibros}
        onFocus={() => query.length > 1 && setShowResults(true)}
        placeholder="Buscar libros..."
        className="w-full pl-10 pr-3 py-2 rounded-full border-none bg-white/70 text-violet-800 placeholder-fuchsia-400 focus:bg-white focus:outline-none shadow focus:ring-2 focus:ring-fuchsia-300 text-base transition"
      />
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-fuchsia-400" />
      {showResults && (
        <ul className="absolute left-0 right-0 top-12 bg-white rounded-xl border border-fuchsia-100 shadow-custom max-h-64 overflow-y-auto z-50">
          {loading ? (
            <li className="p-3 text-fuchsia-700 text-center">Buscando...</li>
          ) : libros.length > 0 ? (
            libros.map((libro) => (
              <li
                key={libro.id}
                className="flex items-center gap-3 p-3 hover:bg-fuchsia-50 cursor-pointer transition"
                onClick={() => {
                  setQuery("");
                  setShowResults(false);
                  if (onItemClick) onItemClick();
                  navigate(`/libros/${libro.id}`);
                }}
              >
                <img
                  src={libro.portada_url}
                  alt={libro.titulo}
                  className="w-8 h-12 object-cover rounded"
                />
                <div>
                  <p className="font-semibold text-sm text-fuchsia-900">{libro.titulo}</p>
                  <p className="text-xs text-fuchsia-700">{libro.autor?.nombre}</p>
                </div>
              </li>
            ))
          ) : (
            <li className="p-3 text-fuchsia-700 text-center">Sin resultados</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default BuscadorLibros;
