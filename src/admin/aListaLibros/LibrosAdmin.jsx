import { useState, useEffect } from "react";
import { cliente } from "../../conexionApi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import ModalEditarLibro from "./ModalEditarLibro";
import ModalEliminarConfirmacion from "../../components/cAdmin/ModalEliminarConformacion";
import Paginacion from "../aListaLibros/Paginacion";
import Volver from "../../components/Volver";
import Loading from "../../components/Loading";
import TablaLibros from "./TablaLibros";

export default function LibrosAdmin() {
  const [libros, setLibros] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [libroEditando, setLibroEditando] = useState(null);
  const [libroAEliminar, setLibroAEliminar] = useState(null);
  const [cargandoEliminar, setCargandoEliminar] = useState(false);
  const [loading, setLoading] = useState(true);

  const LIBROS_POR_PAGINA = 8;

  useEffect(() => {
    fetchLibros();
  }, [pagina]);

  const fetchLibros = async () => {
    setLoading(true);
    const { data, count, error } = await cliente
      .from("libro")
      .select("id, titulo, genero,descripcion, autor_id, autor(nombre)", {
        count: "exact",
      })
      .order("titulo", { ascending: true })
      .range((pagina - 1) * LIBROS_POR_PAGINA, pagina * LIBROS_POR_PAGINA - 1);

    if (!error) {
      setLibros(data || []);
      setTotalPaginas(Math.ceil((count || 0) / LIBROS_POR_PAGINA));
    } else {
      toast.error("Error al cargar libros.");
    }
    setLoading(false);
  };

  const confirmarEliminarLibro = async () => {
    if (!libroAEliminar) return;
    setCargandoEliminar(true);
    const { error } = await cliente
      .from("libro")
      .delete()
      .eq("id", libroAEliminar.id);
    if (!error) {
      toast.success("Libro eliminado.");
      fetchLibros();
    } else {
      toast.error("No se pudo eliminar.");
    }
    setCargandoEliminar(false);
    setLibroAEliminar(null);
  };

  const abrirModalEdicion = (libro) => {
    setLibroEditando(libro);
    setMostrarModal(true);
    document.body.classList.add("overflow-hidden");
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setLibroEditando(null);
    document.body.classList.remove("overflow-hidden");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6">
        {loading && <Loading mensaje="Cargando libros..." />}

        {!loading && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex-shrink-0">
                <Volver />
              </div>
              <h1 className="flex-1 text-center text-xl sm:text-2xl font-bold text-violet-700">
                Listado de libros
              </h1>
              <div className="w-10 sm:w-16" />
            </div>

            <TablaLibros
              libros={libros}
              onEditar={abrirModalEdicion}
              onEliminar={setLibroAEliminar}
            />

            <Paginacion
              paginaActual={pagina}
              totalPaginas={totalPaginas}
              onAnterior={() => setPagina(pagina - 1)}
              onSiguiente={() => setPagina(pagina + 1)}
            />
          </>
        )}
      </main>

      <Footer />

      {/* MODAL EDITAR */}
      {mostrarModal && libroEditando && (
        <ModalEditarLibro
          libro={libroEditando}
          onClose={cerrarModal}
          onUpdate={fetchLibros}
        />
      )}

      {/* MODAL ELIMINAR */}
      {libroAEliminar && (
        <ModalEliminarConfirmacion
          entidad={`el libro "${libroAEliminar.titulo}"`}
          onCancelar={() => setLibroAEliminar(null)}
          onConfirmar={confirmarEliminarLibro}
          cargando={cargandoEliminar}
        />
      )}
    </div>
  );
}
