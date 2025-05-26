import { useEffect, useState } from "react";
import { cliente } from "../conexionApi";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { RingLoader } from "react-spinners";
import Volver from "../components/Volver";

const Novedades = () => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cliente
      .from("libro")
      .select("*")
      .order("id", { ascending: false })
      .limit(12)
      .then(({ data }) => {
        setLibros(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10 min-h-[70vh]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-center gap-4 mb-8">
          <div className="w-full sm:w-auto">
            <Volver label="Volver" />
          </div>
          <div className="w-full text-center sm:flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-violet-800 drop-shadow-lg pb-1 relative">
              <span className="relative z-10">Novedades Destacadas</span>
              <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-fuchsia-200 to-indigo-200 rounded-full opacity-60 z-0" />
            </h1>
            <p className="text-fuchsia-700 text-sm sm:text-base font-semibold mt-2">
              Descubre los libros más recientes que acaban de llegar a la
              biblioteca
            </p>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <RingLoader color="#a970ff" size={100} />
          </div>
        ) : libros.length === 0 ? (
          <div className="text-center text-gray-500">
            No hay novedades disponibles en este momento.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7">
            {libros.map((libro) => (
              <BookCard
                key={libro.id}
                {...libro}
                portadaUrl={libro.portada_url}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Novedades;
