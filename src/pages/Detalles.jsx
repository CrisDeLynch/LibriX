import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { cliente } from "../conexionApi";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ComentariosLibro from "../components/libroDetalles/ComentariosLibro";
import Loading from "../components/Loading";
import Volver from "../components/Volver";
import TarjetaAutor from "../components/libroDetalles/TarjetaAutor";
import BotonFavorito from "../components/libroDetalles/BotonFavorito";

const Detalles = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [autor, setAutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comentarios, setComentarios] = useState([]);
  const [enviado, setEnviado] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioGuardado) {
      setUsuarioActual(usuarioGuardado);
    }
  }, []);

  useEffect(() => {
    const book = async () => {
      setLoading(true);
      const { data, error } = await cliente
        .from("libro")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) {
        setBook(data);

        if (data.autor_id) {
          const { data: autorData } = await cliente
            .from("autor")
            .select("*")
            .eq("id", data.autor_id)
            .maybeSingle();

          if (autorData) setAutor(autorData);
        }
      }

      setLoading(false);
    };

    book();
  }, [id]);

  useEffect(() => {
    const comentarios = async () => {
      const { data, error } = await cliente
        .from("comentario")
        .select("*")
        .eq("libro_id", id)
        .order("fecha", { ascending: false });

      if (!error) setComentarios(data);
    };

    comentarios();
  }, [id, enviado]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading mensaje="Cargando libro..." />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-fuchsia-600 font-bold text-lg">
        Libro no encontrado
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-violet-50 via-white to-white">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 sm:p-8">
        <div className="mb-6">
          <div className="flex justify-start sm:justify-start md:justify-start lg:justify-start">
            <Volver />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <img
            src={book.portada_url}
            alt={`Portada de ${book.titulo}`}
            className="w-full max-w-xs rounded-xl shadow-md object-cover mx-auto"
          />
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-3xl font-bold text-purple-700">
                {book.titulo}
              </h2>
              {usuarioActual && (
                <BotonFavorito usuarioId={usuarioActual.id} libroId={book.id} />
              )}
            </div>

            <h3 className="text-lg text-gray-700 font-medium">
              {autor.nombre}
            </h3>
            <p className="text-gray-600 leading-relaxed">{book.descripcion}</p>
            <Link
              to={`/lectura/${id}`}
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-sm shadow transition"
            >
              Leer ahora
            </Link>
          </div>
        </div>

        {autor && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-violet-700 mb-4 ml-12">
              Sobre el autor
            </h3>
            <TarjetaAutor autor={autor} />
          </div>
        )}
      </div>

      {/* Comentarios */}
      <ComentariosLibro libroId={id} />

      <Footer />
    </div>
  );
};

export default Detalles;
