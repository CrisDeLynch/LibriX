import { useEffect, useState } from "react";
import { cliente } from "../conexionApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LibroCard from "../components/cCatalogo/LibroCard";
import BuscadorLibros from "../components/cCatalogo/BuscadorLibros";
import Loading from "../components/Loading";

const Catalogo = () => {
  const [libros, setLibros] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [loading, setLoading] = useState(true);

  const letrasPorPagina = 5;

  useEffect(() => {
    const cargarLibros = async () => {
      setLoading(true);
      const { data, error } = await cliente
        .from("libro")
        .select("id, titulo, portada_url, genero , autor:autor_id (nombre)");
      if (!error && data) setLibros(data);
      setLoading(false);
    };
    cargarLibros();
  }, []);

  const librosFiltrados = libros
    .filter((l) => l.titulo.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) => a.titulo.localeCompare(b.titulo));

  const librosPorLetra = librosFiltrados.reduce((acc, libro) => {
    const letra = libro.titulo[0]?.toUpperCase() || "#";
    acc[letra] = acc[letra] || [];
    acc[letra].push(libro);
    return acc;
  }, {});

  const letras = [];
  for (const letra in librosPorLetra) {
    letras.push(letra);
  }
  const letrasOrdenadas = letras.sort();
  const totalPaginas = Math.ceil(letrasOrdenadas.length / letrasPorPagina);
  const letrasPaginadas = letrasOrdenadas.slice(
    (paginaActual - 1) * letrasPorPagina,
    paginaActual * letrasPorPagina
  );

  const irAPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-violet-50 via-white to-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-10 w-full">
        {loading ? (
          <Loading mensaje="Cargando catálogo..." />
        ) : (
          <>
            <div className="mb-10 flex justify-start">
              <div className="w-full max-w-xxl">
                <BuscadorLibros busqueda={busqueda} setBusqueda={setBusqueda} />
              </div>
            </div>

            {librosFiltrados.length === 0 ? (
              <div className="text-center text-gray-500 mt-16 text-lg">
                No se encontraron resultados para{" "}
                <span className="font-semibold">"{busqueda}"</span>
              </div>
            ) : (
              <div className="space-y-20">
                {(busqueda.trim() ? letrasOrdenadas : letrasPaginadas).map(
                  (letra) => (
                    <section key={letra} id={letra}>
                      <h2 className="text-2xl sm:text-3xl font-bold text-violet-700 mb-6 border-b-2 border-violet-300 pb-2 uppercase tracking-wider">
                        {letra}
                      </h2>
                      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {librosPorLetra[letra].map((libro) => (
                          <LibroCard key={libro.id} libro={libro} />
                        ))}
                      </div>
                    </section>
                  )
                )}
              </div>
            )}

            {letrasOrdenadas.length > letrasPorPagina && !busqueda.trim() && (
              <div className="flex justify-center items-center gap-6 mt-16">
                <button
                  onClick={() => irAPagina(Math.max(paginaActual - 1, 1))}
                  disabled={paginaActual === 1}
                  className="px-5 py-2 bg-violet-500 text-white rounded-full disabled:opacity-40 hover:bg-violet-600 transition-all"
                >
                  Anterior
                </button>
                <span className="text-sm text-violet-700 font-semibold">
                  Página {paginaActual} de {totalPaginas}
                </span>
                <button
                  onClick={() =>
                    irAPagina(Math.min(paginaActual + 1, totalPaginas))
                  }
                  disabled={paginaActual === totalPaginas}
                  className="px-5 py-2 bg-violet-500 text-white rounded-full disabled:opacity-40 hover:bg-violet-600 transition-all"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <div className="h-20" />
      <Footer />
    </div>
  );
};

export default Catalogo;
