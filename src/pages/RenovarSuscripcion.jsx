import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { cliente } from "../conexionApi";

const PLANES = [
  {
    nombre: "Mensual",
    precio: 9.99,
    descripcion: "Acceso ilimitado por 1 mes",
    id: "mensual",
    meses: 1,
  },
  {
    nombre: "Anual",
    precio: 99.99,
    descripcion: "Ahorra 20% y accede por 12 meses",
    id: "anual",
    meses: 12,
  },
];

const RenovarSuscripcion = () => {
  const [usuario, setUsuario] = useState(null);
  const [planSeleccionado, setPlanSeleccionado] = useState(PLANES[0].id);
  const [confirmado, setConfirmado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [estado, setEstado] = useState(null); 
  const [fechaFin, setFechaFin] = useState(null);
  const [idSuscripcion, setIdSuscripcion] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(usuarioGuardado);

    if (usuarioGuardado?.id) {
      cliente
        .from("suscripcion")
        .select("id, estado, fecha_fin")
        .eq("usuario_id", usuarioGuardado.id)
        .order("fecha_fin", { ascending: false })
        .limit(1)
        .single()
        .then(({ data, error }) => {
          if (!error && data) {
            setEstado(data.estado);
            setFechaFin(data.fecha_fin);
            setIdSuscripcion(data.id);
          } else {
            setEstado("expirada");
          }
        });
    }
  }, []);

  const suscripcionExpirada = estado !== "activa";
  const renovarSuscripcion = async () => {
    if (!usuario) return;
    setLoading(true);

    const plan = PLANES.find((p) => p.id === planSeleccionado);
    const fechaInicio = new Date();
    let nuevaFechaFin = new Date();
    nuevaFechaFin.setMonth(nuevaFechaFin.getMonth() + plan.meses);

    let resultado;
    if (idSuscripcion) {
      resultado = await cliente
        .from("suscripcion")
        .update({
          estado: "activa",
          fecha_inicio: fechaInicio.toISOString(),
          fecha_fin: nuevaFechaFin.toISOString(),
          plan: plan.id,
        })
        .eq("id", idSuscripcion);
    } else {
      resultado = await cliente
        .from("suscripcion")
        .insert([
          {
            usuario_id: usuario.id,
            estado: "activa",
            fecha_inicio: fechaInicio.toISOString(),
            fecha_fin: nuevaFechaFin.toISOString(),
            plan: plan.id,
          },
        ]);
    }

    const { error } = resultado;

    if (!error) {
      const actualizado = {
        ...usuario,
        suscripcion_estado: "activa",
        suscripcion_fecha: nuevaFechaFin.toISOString(),
      };
      localStorage.setItem("usuario", JSON.stringify(actualizado));

      setConfirmado(true);
      setEstado("activa");
      setFechaFin(nuevaFechaFin.toISOString());

      setTimeout(() => navigate("/usuario/perfil"), 2200);
    }
    setLoading(false);
  };

  if (usuario == null || estado == null) {
    return (
      <>
        <Navbar />
        <main className="min-h-[70vh] bg-gray-50 flex flex-col items-center justify-center px-4">
          <section className="flex flex-col items-center justify-center min-h-[350px] bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl border mt-12 transition-all">
            <FaSpinner className="animate-spin text-fuchsia-600 text-4xl mb-4" />
            <span className="text-fuchsia-700 text-lg font-semibold">Cargando datos de suscripción...</span>
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
        <section className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl border mt-12 transition-all mb-5">
          <h2 className="text-2xl font-bold mb-4 text-fuchsia-700 flex items-center gap-2">
            {suscripcionExpirada ? (
              <FaExclamationTriangle className="text-yellow-500" />
            ) : (
              <FaCheckCircle className="text-green-500" />
            )}
            {suscripcionExpirada ? "Renovar suscripción" : "Tu suscripción"}
          </h2>

          <div className="mb-4 text-gray-700">
            {suscripcionExpirada ? (
              <p>
                <b>Tu suscripción ha expirado.</b>
                <br />
                Renueva para seguir disfrutando de Librix.
              </p>
            ) : (
              <p>
                Tu suscripción está activa hasta:{" "}
                <span className="font-semibold">
                  {fechaFin
                    ? new Date(fechaFin).toLocaleDateString()
                    : "Desconocida"}
                </span>
              </p>
            )}
          </div>

          <div className="mb-7">
            <h3 className="font-semibold mb-2 text-fuchsia-700">
              Selecciona tu plan:
            </h3>
            <div className="flex gap-4 flex-col sm:flex-row">
              {PLANES.map((plan) => (
                <label
                  key={plan.id}
                  className={`flex-1 border rounded-2xl px-6 py-5 cursor-pointer transition-all text-center
                  ${
                    planSeleccionado === plan.id
                      ? "bg-gradient-to-r from-fuchsia-400 to-indigo-400 text-white shadow"
                      : "bg-gray-50 hover:bg-fuchsia-100 border-fuchsia-100"
                  }
                  `}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={plan.id}
                    checked={planSeleccionado === plan.id}
                    onChange={() => setPlanSeleccionado(plan.id)}
                    className="hidden"
                  />
                  <div>
                    <span className="text-lg font-bold">{plan.nombre}</span>
                    <div className="text-2xl font-extrabold mt-2">
                      {plan.precio}€
                      <span className="text-base font-normal">
                        {plan.id === "mensual" ? "/mes" : "/año"}
                      </span>
                    </div>
                    <span className="mt-2 block text-sm">
                      {plan.descripcion}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {suscripcionExpirada && (
            <button
              onClick={renovarSuscripcion}
              disabled={loading}
              className="w-full py-3 rounded-2xl font-bold text-lg shadow bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white hover:scale-105 active:scale-95 transition-all duration-150 mt-4 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && <FaSpinner className="animate-spin mr-2" />}
              {loading ? "Renovando..." : "Renovar suscripción"}
            </button>
          )}

          {confirmado && (
            <div className="mt-6 text-center text-green-700 font-semibold animate-fade-in-down">
              ¡Suscripción renovada correctamente!
            </div>
          )}

          <div className="mt-8 text-center">
            <Link to="/usuario/perfil" className="text-fuchsia-600 hover:underline">
              Cancelar y volver al perfil
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RenovarSuscripcion;
