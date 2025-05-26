import { useEffect, useState } from "react";
import { cliente } from "../conexionApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { Link } from "react-router";
import Volver from "../components/Volver";

const LibrosFavoritos = () => {
  const [usuario, setUsuario] = useState(null);
  const [librosFavoritos, setLibrosFavoritos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
  }, []);

  useEffect(() => {
    const cargarFavoritos = async () => {
      if (!usuario) return;

      const { data, error } = await cliente
        .from("favorito")
        .select("libro(id, titulo, portada_url)")
        .eq("usuario_id", usuario.id);

      if (!error && data) {
        setLibrosFavoritos(data.map((f) => f.libro));
      }

      setCargando(false);
    };

    cargarFavoritos();
  }, [usuario]);

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading mensaje="Cargando favoritos..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-violet-50 via-white to-white text-gray-800">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-8 mb-20 min-h-[50vh]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12 gap-4 sm:gap-0">
          <div className="sm:w-auto w-fit">
            <Volver />
          </div>
          <h1 className="text-3xl font-bold text-purple-700 text-center sm:text-left ">
            Mis libros favoritos
          </h1>
          <div className="w-12" />
        </div>

        {librosFavoritos.length === 0 ? (
          <p className="text-center text-gray-500 mt-5">
            Aún no has añadido ningún libro a favoritos.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-10 mt-12 pl-1">
            {librosFavoritos.map((libro) => (
              <Link
                key={libro.id}
                to={`/libros/${libro.id}`}
                className="block group"
              >
                <div className="w-full aspect-[2/3] overflow-hidden rounded-xl shadow-sm group-hover:shadow-md transition">
                  <img
                    src={libro.portada_url}
                    alt={libro.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LibrosFavoritos;
