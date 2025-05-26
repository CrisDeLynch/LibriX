import { useEffect, useState } from "react";
import { cliente } from "../conexionApi";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { RingLoader } from "react-spinners";
import Volver from "../components/Volver";

const Recomendados = () => {
  const [recomendados, setRecomendados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      setLoading(false);
      setRecomendados([]);
      return;
    }

    const librosRecomendados = async () => {
      const { data: lecturas } = await cliente
        .from("lectura_usuario")
        .select("libro_id")
        .eq("usuario_id", usuario.id);

      if (!lecturas?.length) {
        setRecomendados([]);
        setLoading(false);
        return;
      }

      const ids = lecturas.map((l) => l.libro_id);
      const { data: generosData } = await cliente
        .from("libro")
        .select("genero")
        .in("id", ids);

      const generos = [...new Set(generosData.map((g) => g.genero))];
      const { data } = await cliente
        .from("libro")
        .select("*")
        .in("genero", generos)
        .limit(12);

      setRecomendados(data || []);
      setLoading(false);
    };

    librosRecomendados();
  }, []);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10 min-h-[70vh]">
        <div className="flex items-center justify-center gap-4 mb-8 relative">
          <div className="flex-shrink-0 mr-2">
            <Volver label="Volver" />
          </div>
          <div className="flex flex-col items-center flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-violet-800 drop-shadow-lg pb-1 relative">
              <span className="relative z-10">Lecturas Recomendadas</span>
              <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-fuchsia-200 to-indigo-200 rounded-full opacity-60 z-0" />
            </h1>
            <p className="text-fuchsia-700 text-base font-semibold mt-1">
              Selección personalizada de libros para ti según tus intereses y hábitos de lectura.
            </p>
          </div>
          <div className="flex-shrink-0 mr-2" style={{ width: "92px" }} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <RingLoader color="#a970ff" size={100} />
          </div>
        ) : recomendados.length === 0 ? (
          <div className="text-center text-gray-500">
            No hay recomendaciones disponibles.
            <br />
            Lee algunos libros para obtener sugerencias personalizadas.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7">
            {recomendados.map((libro) => (
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

export default Recomendados;
