import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { cliente } from "../conexionApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Volver from "../components/Volver";

export default function VistaAutor() {
  const { id } = useParams();
  const [autor, setAutor] = useState(null);
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAutorYObra = async () => {
      setLoading(true);
      const { data: datosAutor } = await cliente
        .from("autor")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      const { data: obras } = await cliente
        .from("libro")
        .select("id, titulo, portada_url")
        .eq("autor_id", id)
        .order("titulo", { ascending: true });

      setAutor(datosAutor);
      setLibros(obras || []);
      setLoading(false);
    };

    fetchAutorYObra();
  }, [id]);

  const formatFecha = (fecha) => {
    if (!fecha) return null;
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return <Loading mensaje="Cargando autor..." />;
  }

  if (!autor) {
    return (
      <p className="text-center text-fuchsia-600 font-bold mt-20">
        Autor no encontrado
      </p>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-6">
          <Volver />
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-start bg-white/90 rounded-2xl border border-violet-200 shadow-sm p-6">
          <img
            src={autor.foto_url}
            alt={autor.nombre}
            className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-xl border border-violet-100 shadow-sm"
          />
          <div className="flex-1 text-left space-y-2">
            <h1 className="text-2xl font-bold text-violet-800">
              {autor.nombre}
            </h1>
            <p className="text-sm text-gray-500">{autor.nacionalidad}</p>
            <p className="text-sm text-gray-500">
              {formatFecha(autor.fecha_nacimiento)}
              {autor.fecha_fallecimiento &&
                ` - ${formatFecha(autor.fecha_fallecimiento)}`}
            </p>
            <p className="text-sm text-gray-700 mt-2 leading-snug italic">
              {autor.biografia}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-violet-700 mb-4">
            Obras de {autor.nombre}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {libros.length === 0 && (
              <p className="col-span-full text-sm text-gray-500">
                No hay libros disponibles de este autor.
              </p>
            )}
            {libros.map((libro) => (
              <Link
                to={`/libros/${libro.id}`}
                key={libro.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 p-3 transition flex flex-col items-center"
              >
                <img
                  src={libro.portada_url}
                  alt={libro.titulo}
                  className="h-41 w-full object-cover rounded-lg mb-2"
                />
                <p className="text-sm font-medium text-center text-gray-800">
                  {libro.titulo}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
