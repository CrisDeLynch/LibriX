import { useEffect, useState } from "react";
import { cliente } from "../conexionApi";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Volver from "../components/Volver";

const Generos = () => {
  const [generos, setGeneros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generos = async () => {
      setLoading(true);
      const { data, error } = await cliente.from("libro").select("genero");

      if (!error && data) {
        const unicos = [...new Set(data.map((libro) => libro.genero))];
        setGeneros(unicos.filter(Boolean));
      }
      setLoading(false);
    };

    generos();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-violet-50 via-white to-white">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-8 mb-20">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-12">
          <Volver />
          <div className="w-12 " />
        </div>

        {/* Contenido */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <Loading mensaje="Cargando géneros..." />
          </div>
        ) : generos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 animate-fade-in mb-20">
            {generos.map((genero, index) => (
              <Link
                key={index}
                to={`/libros/genero/${genero}`}
                className="w-full h-32 flex items-center justify-center bg-white text-violet-700 border-2 border-violet-200 rounded-2xl shadow-md hover:bg-violet-600 hover:shadow-xl transition-all duration-300 font-semibold text-lg text-center p-4"
              >
                {genero}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No hay géneros disponibles.
          </p>
        )}
      </main>

      {/* Footer separado */}
      <div className="mt-20">
        <Footer />
      </div>

      {/* Animaciones */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.8s ease-out both;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Generos;
