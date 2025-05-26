import { useState, useEffect } from "react";
import { cliente } from "../../conexionApi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { toast, Toaster } from "react-hot-toast";
import Paginacion from "../aListaLibros/Paginacion";
import Volver from "../../components/Volver";
import Loading from "../../components/Loading";
import ModalEditarAutor from "./ModalEditarAutor";
import ModalEliminarConfirmacion from "../../components/cAdmin/ModalEliminarConformacion";
import TablaAutores from "./TablaAutores";

export default function AutoresAdmin() {
  const [autores, setAutores] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [autorEditando, setAutorEditando] = useState(null);
  const [autorAEliminar, setAutorAEliminar] = useState(null);
  const [mostrandoEliminar, setMostrandoEliminar] = useState(false);
  const [cargandoEliminar, setCargandoEliminar] = useState(false);

  const AUTORES_POR_PAGINA = 8;

  useEffect(() => {
    fetchAutores();
  }, [pagina]);

  const fetchAutores = async () => {
    setLoading(true);
    const { data, count, error } = await cliente
      .from("autor")
      .select("*", { count: "exact" })
      .order("nombre", { ascending: true })
      .range(
        (pagina - 1) * AUTORES_POR_PAGINA,
        pagina * AUTORES_POR_PAGINA - 1
      );

    if (!error) {
      setAutores(data || []);
      setTotalPaginas(Math.ceil((count || 0) / AUTORES_POR_PAGINA));
    } else {
      toast.error("Error al cargar autores.");
    }
    setLoading(false);
  };

  const abrirModalEdicion = (autor) => {
    setAutorEditando(autor);
    setMostrarModal(true);
    document.body.classList.add("overflow-hidden");
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setAutorEditando(null);
    document.body.classList.remove("overflow-hidden");
  };

  const confirmarEliminar = async () => {
    setCargandoEliminar(true);
    const { error } = await cliente
      .from("autor")
      .delete()
      .eq("id", autorAEliminar.id);
    setCargandoEliminar(false);
    setMostrandoEliminar(false);
    setAutorAEliminar(null);

    if (!error) {
      toast.success("Autor eliminado.");
      fetchAutores();
    } else {
      toast.error("No se pudo eliminar.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Toaster />
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto p-4 sm:p-6">
        {loading && <Loading mensaje="Cargando autores..." />}

        {!loading && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex-shrink-0">
                <Volver />
              </div>
              <h1 className="flex-1 text-center text-xl sm:text-2xl font-bold text-violet-700">
                Listado de autores
              </h1>
              <div className="w-10 sm:w-16" />
            </div>

            <TablaAutores
              autores={autores}
              onEditar={abrirModalEdicion}
              onEliminar={(autor) => {
                setAutorAEliminar(autor);
                setMostrandoEliminar(true);
              }}
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

      {mostrarModal && autorEditando && (
        <ModalEditarAutor
          autor={autorEditando}
          onClose={cerrarModal}
          onUpdate={fetchAutores}
        />
      )}

      {mostrandoEliminar && autorAEliminar && (
        <ModalEliminarConfirmacion
          entidad={autorAEliminar.nombre}
          onCancelar={() => setMostrandoEliminar(false)}
          onConfirmar={confirmarEliminar}
          cargando={cargandoEliminar}
        />
      )}
    </div>
  );
}
