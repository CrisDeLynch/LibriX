import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { cliente } from "../../conexionApi";
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import TablaSuscripciones from "./TablaSuscripciones";
import TarjetaSuscripcion from "./TarjetaSuscripcion";
import Loading from "../../components/Loading";
import Volver from "../../components/Volver";

export default function SuscripcionesAdmin() {
  const [suscripciones, setSuscripciones] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuscripciones();
  }, []);

  const fetchSuscripciones = async () => {
    setLoading(true);
    const { data, error } = await cliente
      .from("suscripcion")
      .select("id, estado, plan, fecha_inicio, fecha_fin, usuario_id, usuario (nombre, email)");
    if (!error && data) setSuscripciones(data);
    setLoading(false);
  };

  const filtradas = suscripciones.filter(
    (s) =>
      (s.usuario?.nombre || "")
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      (s.usuario?.email || "")
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      (s.plan || "").toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-shrink-0">
            <Volver />
          </div>

          <h1 className="flex-1 text-center text-xl sm:text-2xl font-bold text-violet-700">
            Gestión de suscripciones
          </h1>

          <div className="w-10 sm:w-16" />
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 w-full md:w-1/3"
            >
              <input
                type="text"
                placeholder="Buscar por usuario, email o plan..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-300"
              />
              <FaSearch className="text-violet-400" />
            </form>
            <button
              onClick={fetchSuscripciones}
              className="flex items-center gap-2 bg-violet-100 text-violet-700 px-3 py-2 rounded shadow hover:bg-violet-200 transition"
            >
              <FaSyncAlt /> Recargar
            </button>
          </div>

          {loading ? (
            <Loading mensaje="Cargando suscripciones..." />
          ) : filtradas.length === 0 ? (
            <div className="text-fuchsia-600 py-8 text-center">
              No hay suscripciones que coincidan.
            </div>
          ) : (
            <>
              {/* Tabla para escritorio */}
              <div className="hidden md:block">
                <TablaSuscripciones suscripciones={filtradas} />
              </div>

              {/* Tarjetas para móvil */}
              <div className="md:hidden space-y-4">
                {filtradas.map((s) => (
                  <TarjetaSuscripcion key={s.id} suscripcion={s} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}