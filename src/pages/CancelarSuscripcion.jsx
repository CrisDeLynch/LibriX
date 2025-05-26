import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { cliente } from "../conexionApi";

const CancelarSuscripcion = () => {
  const [usuario, setUsuario] = useState(null);
  const [suscripcion, setSuscripcion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelando, setCancelando] = useState(false);
  const [cancelada, setCancelada] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(usuarioGuardado);

    if (usuarioGuardado?.id) {
      cliente
        .from("suscripcion")
        .select("id, estado, fecha_fin, plan")
        .eq("usuario_id", usuarioGuardado.id)
        .order("fecha_fin", { ascending: false })
        .limit(1)
        .single()
        .then(({ data, error }) => {
          if (!error && data) {
            setSuscripcion(data);
          }
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const cancelarSuscripcion = async () => {
    if (!usuario || !suscripcion?.id) return;
    setCancelando(true);
  
    const { error } = await cliente
      .from("suscripcion")
      .update({
        estado: "expirada",
        fecha_inicio: null, 
        fecha_fin: null,   
      })
      .eq("id", suscripcion.id);
  
    if (!error) {
      setCancelada(true);
      setTimeout(() => navigate("/usuario/perfil"), 2500);
    }
    setCancelando(false);
  };
  

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-[70vh] bg-gray-50 flex flex-col items-center justify-center px-4">
          <section className="flex flex-col items-center justify-center min-h-[350px] bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl border mt-12 transition-all">
            <FaSpinner className="animate-spin text-fuchsia-600 text-4xl mb-4" />
            <span className="text-fuchsia-700 text-lg font-semibold">Cargando ...</span>
          </section>
        </main>
        <Footer />
      </>
    );
  }
  if (!suscripcion || suscripcion.estado !== "activa") {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] flex flex-col items-center justify-center px-4">
          <section className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl border mt-12 text-center">
            <FaExclamationTriangle className="text-yellow-500 text-3xl mb-2 mx-auto" />
            <h2 className="text-xl font-bold mb-2 text-fuchsia-700">No tienes una suscripción activa</h2>
            <p className="mb-6 text-gray-700">
              Si tu suscripción ya está cancelada o expirada, puedes renovarla cuando quieras.
            </p>
            <Link
              to="/usuario/perfil"
              className="inline-block text-fuchsia-600 hover:underline"
            >
              Volver al perfil
            </Link>
          </section>
        </main>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-gray-50 flex flex-col items-center justify-center px-4">
        <section className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl border mt-12 transition-all">
          <FaExclamationTriangle className="text-yellow-500 text-3xl mb-3 mx-auto" />
          <h2 className="text-2xl font-bold mb-4 text-fuchsia-700 text-center">
            Cancelar suscripción
          </h2>
          {!cancelada ? (
            <>
              <div className="mb-5 text-gray-700 text-center">
                <p className="mb-1">
                  Tu suscripción <span className="font-bold text-fuchsia-600">{suscripcion.plan}</span> está activa hasta{" "}
                  <span className="font-semibold">
                    {suscripcion.fecha_fin
                      ? new Date(suscripcion.fecha_fin).toLocaleDateString()
                      : "desconocida"}
                  </span>.
                </p>
                <p className="mb-2">
                  Si la cancelas, tu acceso expirará inmediatamente y deberás renovarla para volver a usar todas las funciones premium.
                </p>
                <b className="text-red-600">
                  ¿Estás seguro de que quieres cancelar tu suscripción?
                </b>
              </div>

              <button
                onClick={cancelarSuscripcion}
                disabled={cancelando}
                className="w-full py-3 rounded-2xl font-bold text-lg shadow bg-gradient-to-r from-yellow-400 to-fuchsia-500 text-white hover:scale-105 active:scale-95 transition-all duration-150 mb-4 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {cancelando && <FaSpinner className="animate-spin mr-2" />}
                {cancelando ? "Cancelando..." : "Cancelar suscripción"}
              </button>
              <div className="mt-3 text-center">
                <Link to="/usuario/perfil" className="text-fuchsia-600 hover:underline">
                  Volver al perfil
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center mt-6">
              <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-3" />
              <p className="font-semibold text-green-700 mb-2">¡Suscripción cancelada correctamente!</p>
              <span className="text-gray-500">Redirigiendo al perfil...</span>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CancelarSuscripcion;
