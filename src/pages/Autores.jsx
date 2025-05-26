import { useEffect, useState } from "react";
import { cliente } from "../conexionApi";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Volver from "../components/Volver";

const Autores = () => {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const autores = async () => {
      setLoading(true);
      const { data, error } = await cliente
        .from("autor")
        .select("*")
        .order("nombre", { ascending: true });
      if (!error && data) setAutores(data);
      setLoading(false);
    };

    autores();
  }, []);

  return (
    <div className="min-h-screen bg-violet-50 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex-shrink-0">
            <Volver />
          </div>
          {/* <h1 className="flex-1 text-center text-3xl font-bold text-violet-700">
            Autores
          </h1> */}
          <div className="w-10 sm:w-16" />
        </div>
        {loading ? (
          <Loading mensaje="Cargando autores..." />
        ) : autores.length === 0 ? (
          <div className="text-center text-gray-500">
            No se encontraron autores.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {autores.map((autor) => (
              <Link
                to={`/libros/autor/${autor.id}`}
                key={autor.id}
                className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center text-center border border-violet-100 hover:shadow-lg hover:scale-[1.02] transition"
              >
                <img
                  src={autor.foto_url || "/autor-placeholder.png"}
                  alt={autor.nombre}
                  className="w-28 h-28 object-cover rounded-full mb-4 border border-violet-200"
                />
                <h3 className="text-lg font-semibold text-violet-800">
                  {autor.nombre}
                </h3>
                {autor.biografia && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {autor.biografia}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Autores;
