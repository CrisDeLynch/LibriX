import { useEffect, useState } from "react";
import { FaUserEdit, FaCheck } from "react-icons/fa";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { cliente } from "../../conexionApi";

const InfoUsuario = ({
  formData,
  setFormData,
  usuario,
  guardando,
  handleInputChange,
  guardarCambios,
}) => {
  const [respaldo, setRespaldo] = useState({});
  const [suscripcion, setSuscripcion] = useState(null);

  useEffect(() => {
    if (usuario) {
      setRespaldo({
        nombre: usuario.nombre,
        apellidos: usuario.apellidos,
        usuario: usuario.usuario,
        email: usuario.email,
      });
    }
  }, [usuario]);

  useEffect(() => {
    const obtenerSuscripcion = async () => {
      if (!usuario?.id) return;

      const { data, error } = await cliente
        .from("suscripcion")
        .select("id, estado, fecha_fin")
        .eq("usuario_id", usuario.id)
        .order("fecha_fin", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data && !error) {
        setSuscripcion(data);
      }
    };

    obtenerSuscripcion();
  }, [usuario]);

  useEffect(() => {
    const actualizarEstadoSuscripcion = async () => {
      if (!suscripcion?.id || !suscripcion?.fecha_fin || !suscripcion?.estado)
        return;

      const hoy = new Date();
      const fechaFin = new Date(suscripcion.fecha_fin);

      if (fechaFin < hoy && suscripcion.estado === "activa") {
        const { error } = await cliente
          .from("suscripcion")
          .update({ estado: "expirada" })
          .eq("id", suscripcion.id);

        if (!error) {
          toast.info("Tu suscripción ha expirado ya.");
          setSuscripcion((prev) => ({ ...prev, estado: "expirada" }));
        }
      }

      if (fechaFin >= hoy && suscripcion.estado === "expirada") {
        const { error } = await cliente
          .from("suscripcion")
          .update({ estado: "activa" })
          .eq("id", suscripcion.id);

        if (!error) {
          toast.success("Tu suscripción ha sido reactivada.");
          setSuscripcion((prev) => ({ ...prev, estado: "activa" }));
        }
      }
    };
    actualizarEstadoSuscripcion();
  }, [suscripcion]);

  const updateInfoUser = async () => {
    const nombreValido = formData.nombre?.trim();
    const apellidosValido = formData.apellidos?.trim();
    const emailValido = formData.email?.trim();
    const usuarioValido = formData.usuario?.trim();

    if (!nombreValido) {
      toast.warning("El nombre no puede estar vacío.");
      setFormData((prev) => ({ ...prev, nombre: respaldo.nombre }));
      return;
    }

    if (!apellidosValido) {
      toast.warning("Los apellidos no pueden estar vacíos.");
      setFormData((prev) => ({ ...prev, apellidos: respaldo.apellidos }));
      return;
    }

    if (!emailValido) {
      toast.warning("El correo electrónico no puede estar vacío.");
      setFormData((prev) => ({ ...prev, email: respaldo.email }));
      return;
    }

    if (!usuarioValido) {
      toast.warning("El nombre de usuario no puede estar vacío.");
      setFormData((prev) => ({ ...prev, usuario: respaldo.usuario }));
      return;
    }

    if (usuarioValido !== usuario.usuario) {
      const { data: existente } = await cliente
        .from("usuario")
        .select("id")
        .eq("usuario", usuarioValido)
        .neq("id", usuario.id)
        .maybeSingle();

      if (existente) {
        toast.error("El nombre de usuario ya está en uso.");
        setFormData((prev) => ({ ...prev, usuario: respaldo.usuario }));
        return;
      }
    }

    guardarCambios();
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl p-8 border w-2xl mx-auto transition-all duration-200">
      <h2 className="text-2xl font-bold border-b pb-4 mb-7 text-fuchsia-800 flex items-center gap-2">
        <FaUserEdit className="text-fuchsia-400" /> Perfil de usuario
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        {(() => {
          const hoy = new Date();
          const fechaFin = suscripcion?.fecha_fin
            ? new Date(suscripcion.fecha_fin)
            : null;
          const activa = fechaFin && fechaFin >= hoy;

          return (
            <div
              className={`flex flex-wrap items-center text-xs font-semibold px-4 py-1 rounded-full
      ${
        activa
          ? "bg-green-100 text-green-700"
          : suscripcion
          ? "bg-yellow-100 text-yellow-700"
          : ""
      }`}
            >
              <span>
                Suscripción: {activa ? "Activa" : "Expirada"}
                {fechaFin && (
                  <span className="ml-2 text-gray-500 font-normal">
                    ({activa ? "vence" : "venció"}:{" "}
                    {fechaFin.toLocaleDateString()})
                  </span>
                )}
              </span>

              {activa && (
                <Link
                  to="/suscripcion/cancelar"
                  className="ml-4 bg-gradient-to-r from-yellow-400 to-fuchsia-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow hover:scale-105 transition-all"
                >
                  Cancelar
                </Link>
              )}
              {!activa && (
                <Link
                  to="/suscripcion/renovar"
                  className="ml-4 bg-gradient-to-r from-yellow-400 to-fuchsia-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow hover:scale-105 transition-all"
                >
                  {suscripcion ? "Renovar" : "Suscribirse"}
                </Link>
              )}
            </div>
          );
        })()}
      </div>

      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div className="flex-1 space-y-4 w-full">
          <div className="flex flex-col gap-6 mb-6 sm:flex-row sm:gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Nombre
              </label>
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                maxLength={50}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-fuchsia-400 outline-none transition"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Apellidos
              </label>
              <input
                name="apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
                maxLength={100}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-fuchsia-400 outline-none transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 mb-6 sm:flex-row sm:gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Correo electrónico
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                maxLength={100}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-fuchsia-400 outline-none transition"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Nombre de usuario
              </label>
              <input
                name="usuario"
                type="text"
                value={formData.usuario}
                onChange={handleInputChange}
                maxLength={50}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-fuchsia-400 outline-none transition"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 flex justify-end">
        <button
          onClick={updateInfoUser}
          disabled={guardando}
          className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 shadow font-bold transition"
        >
          <FaCheck />
          {guardando ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </section>
  );
};

export default InfoUsuario;
