import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { cliente } from "../conexionApi";
import Navbar from "../components/Navbar";
import { Book, User, Clock, BarChart2, Trash } from "lucide-react";
import Volver from "../components/Volver";
import Loading from "../components/Loading";
import { Link } from "react-router";

const LecturasUsuario = () => {
  const [lecturas, setLecturas] = useState([]);
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lecturas = async () => {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      const usuario_id = usuario ? usuario.id : 1;

      const { data, error } = await cliente
        .from("lectura_usuario")
        .select("libro_id, ultima_lectura")
        .order("ultima_lectura", { ascending: false })
        .eq("usuario_id", usuario_id);

      if (error) {
        console.error("Error cargando las lecturas:", error);
      } else {
        setLecturas(data);
      }

      setLoading(false);
    };

    lecturas();
  }, []);

  useEffect(() => {
    const libros = async () => {
      const { data, error } = await cliente.from("libro").select(`
          id,
          titulo,
          portada_url,
          autor:autor_id (
            nombre
          )
        `);

      if (error) {
        console.error("Error cargando los libros:", error);
      } else {
        setLibros(data);
      }
    };

    libros();
  }, []);

  const dejarDeLeer = async (libro_id) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const usuario_id = usuario ? usuario.id : 1;

    const { error } = await cliente
      .from("lectura_usuario")
      .delete()
      .eq("usuario_id", usuario_id)
      .eq("libro_id", libro_id);

    if (error) {
      console.error("Error eliminando la lectura:", error);
    } else {
      setLecturas(lecturas.filter((lectura) => lectura.libro_id !== libro_id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading mensaje="Cargando lecturas..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-violet-50 via-white to-white">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="relative flex items-center justify-center mb-6 min-h-[40px]">
            <div className="absolute left-0">
              <Volver />
            </div>
            <h1 className="text-3xl font-bold text-purple-700 ml-10 ">
              Mis lecturas
            </h1>
          </div>

          {lecturas.length === 0 ? (
            <p className="text-center text-gray-500">
              No has comenzado a leer ningún libro.
            </p>
          ) : (
            <ul className="grid md:grid-cols-2 gap-6">
              {lecturas.map((lectura) => {
                const libro = libros.find(
                  (libro) => libro.id === lectura.libro_id
                );
                if (!libro) return null;

                return (
                  <li
                    key={lectura.libro_id}
                    className="bg-white shadow-md rounded-2xl p-4 grid gap-4 xl:grid-cols-[auto_1fr_auto] items-center"
                  >
                    <div className="flex-shrink-0 mx-auto xl:mx-0">
                      <img
                        src={libro.portada_url || "/placeholder.svg"}
                        alt={libro.titulo}
                        className="w-24 h-36 object-cover rounded-xl"
                      />
                    </div>

                    <div className="flex flex-row justify-between items-start gap-4 xl:block w-full">
                      <div className="min-w-0 space-y-2 text-left break-words flex-1">
                        <h3 className="text-xl font-semibold text-purple-700">
                          {libro.titulo}
                        </h3>
                        <p className="text-gray-600 flex items-center gap-2">
                          <User size={16} /> {libro.autor?.nombre}
                        </p>
                      
                        <p className="text-gray-600 flex items-center gap-2">
                          <Clock size={16} /> Última lectura:{" "}
                          {new Date(
                            lectura.ultima_lectura
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2 whitespace-nowrap">
                        <Link
                          to={`/lectura/${lectura.libro_id}`}
                          className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                        >
                          <Book size={16} /> Continuar
                        </Link>
                        <button
                          onClick={() => dejarDeLeer(lectura.libro_id)}
                          className="inline-flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition"
                        >
                          <Trash size={18} /> Dejar
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>

      <Footer className="mt-12 sm:mt-16" />
    </div>
  );
};

export default LecturasUsuario;
