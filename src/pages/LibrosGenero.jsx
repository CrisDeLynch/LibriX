import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { cliente } from "../conexionApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { RingLoader } from "react-spinners";

const LibrosGenero = () => {
  const { genero } = useParams();
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const librosPorGenero = async () => {
      const { data, error } = await cliente
        .from("libro")
        .select("id, titulo, portada_url")
        .eq("genero", genero);

      if (error) {
        console.error("Error obteniendo libros por género:", error);
      } else {
        setLibros(data);
      }
      setLoading(false);
    };

    librosPorGenero();
  }, [genero]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-violet-50 via-white to-white text-gray-800">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-xl sm:text-2xl font-semibold text-violet-700 mb-7 text-center">
          Resultados del género
          <span className="ml-2 px-3 py-0.5 rounded-full bg-fuchsia-200 text-fuchsia-800 font-bold text-sm shadow capitalize">
            {genero}
          </span>
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <RingLoader color="#8B5CF6" size={100} />
          </div>
        ) : libros.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {libros.map((libro) => (
              <Link
                to={`/libros/${libro.id}`}
                key={libro.id}
                className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={libro.portada_url}
                  alt={libro.titulo}
                  className="w-full h-full max-h-[400px] object-contain bg-white transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center px-4">
                  <h3 className="text-white font-bold text-lg sm:text-xl mb-3">
                    {libro.titulo}
                  </h3>
                  <span className="bg-white text-violet-700 font-medium text-sm px-3 py-1 rounded">
                    Ver detalles
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-10">
            No hay libros disponibles en este género.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LibrosGenero;
