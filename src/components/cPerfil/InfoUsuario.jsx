import { useEffect, useState } from "react";
import { FaUserEdit, FaCheck } from "react-icons/fa";
import { Link } from "react-router";
import { toast } from "react-toastify";

const InfoUsuario = ({
  formData,
  setFormData,
  usuario,
  guardando,
  handleInputChange,
  guardarCambios,
}) => {
  const [respaldo, setRespaldo] = useState({});

  useEffect(() => {
    if (usuario) {
      setRespaldo({
        nombre: usuario.nombre,
        email: usuario.email,
      });
    }
  }, [usuario]);

  const updateInfoUser = () => {
    const nombreValido = formData.nombre?.trim();
    const emailValido = formData.email?.trim();

    if (!nombreValido) {
      toast.warning("El nombre no puede estar vacío.");
      setFormData((prev) => ({ ...prev, nombre: respaldo.nombre }));
      return;
    }
  
    if (!emailValido) {
      toast.warning("El correo electrónico no puede estar vacío.");
      setFormData((prev) => ({ ...prev, email: respaldo.email }));
      return;
    }

    if (!emailValido.endsWith("@gmail.com")) {
      toast.warning("Solo se permiten correos de Gmail.");
      setFormData((prev) => ({ ...prev, email: respaldo.email }));
      return;
    }

    guardarCambios();
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl p-8 border w-2xl mx-auto transition-all duration-200">
      <h2 className="text-2xl font-bold border-b pb-4 mb-7 text-fuchsia-800 flex items-center gap-2">
        <FaUserEdit className="text-fuchsia-400" /> Perfil de usuario
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        {usuario?.suscripcion_estado && (
          <span className={`inline-flex items-center text-xs font-semibold px-4 py-1 rounded-full
            ${usuario.suscripcion_estado === "activa"
              ? "bg-green-100 text-green-700"
              : usuario.suscripcion_estado === "expirada"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-200 text-gray-600"
            }`}>
            Suscripción: {usuario.suscripcion_estado.charAt(0).toUpperCase() + usuario.suscripcion_estado.slice(1)}
            {usuario.suscripcion_fecha && (
              <span className="ml-2 text-gray-500">
                {usuario.suscripcion_estado === "activa"
                  ? `(vence: ${new Date(usuario.suscripcion_fecha).toLocaleDateString()})`
                  : ""}
              </span>
            )}
            {usuario.suscripcion_estado === "expirada" && (
              <Link to="/suscripcion/renovar" className="ml-4 bg-gradient-to-r from-yellow-400 to-fuchsia-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow hover:scale-105 transition-all">
                Renovar
              </Link>
            )}
            {usuario.suscripcion_estado === "activa" && (
              <Link to="/suscripcion/cancelar" className="ml-4 bg-gradient-to-r from-yellow-400 to-fuchsia-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow hover:scale-105 transition-all">
                Cancelar
              </Link>
            )}
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div className="flex-1 space-y-4 w-full">
          <label className="block text-sm font-semibold text-gray-600">Nombre</label>
          <input
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            maxLength={50}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-fuchsia-400 outline-none transition"
          />

          <label className="block text-sm font-semibold text-gray-600">Correo electrónico</label>
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
