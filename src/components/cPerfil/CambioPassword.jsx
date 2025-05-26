import { useEffect, useState } from "react";
import { cliente } from "../../conexionApi";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import bcrypt from "bcryptjs";

const etiquetas = {
  actual: "Contraseña actual",
  nueva: "Nueva contraseña",
  confirmar: "Confirmar nueva contraseña",
};

const CambioPassword = () => {
  const [mostrarPassword, setMostrarPassword] = useState({
    actual: false,
    nueva: false,
    confirmar: false,
  });
  const [contrasenaGuardada, setContrasenaGuardada] = useState("");
  const [datos, setDatos] = useState({ actual: "", nueva: "", confirmar: "" });
  const [loading, setLoading] = useState(false);

  // Carga el hash de la contraseña del usuario
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario?.id) return;

    cliente
      .from("usuario")
      .select("contrasena")
      .eq("id", usuario.id)
      .single()
      .then(({ data, error }) => {
        if (!error && data?.contrasena) {
          setContrasenaGuardada(data.contrasena);
        } else {
          toast.error("No se pudo cargar tu contraseña actual.");
        }
      });
  }, []);

  const updateCampo = (e) => {
    setDatos((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const showPassword = (campo) => {
    setMostrarPassword((prev) => ({
      ...prev,
      [campo]: !prev[campo],
    }));
  };

  const validarFormulario = () => {
    const { actual, nueva, confirmar } = datos;
    if (!actual || !nueva || !confirmar) {
      toast.error("Debes rellenar todos los campos.");
      return false;
    }
    if (nueva.length < 6) {
      toast.error("La nueva contraseña debe tener al menos 6 caracteres.");
      return false;
    }
    if (nueva !== confirmar) {
      toast.error("Las nuevas contraseñas no coinciden.");
      return false;
    }
    if (!bcrypt.compareSync(actual, contrasenaGuardada)) {
      toast.error("La contraseña actual no es correcta.");
      return false;
    }
    if (nueva === actual) {
      toast.error("La nueva contraseña no puede ser igual a la actual.");
      return false;
    }
    return true;
  };

  const cambiarPassword = async () => {
    if (!validarFormulario()) return;
    setLoading(true);
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario?.id) return;
      const hash = bcrypt.hashSync(datos.nueva, 10);

      const { error } = await cliente
        .from("usuario")
        .update({ contrasena: hash })
        .eq("id", usuario.id);

      if (!error) {
        setDatos({ actual: "", nueva: "", confirmar: "" });
        toast.success("¡Contraseña actualizada correctamente!");
      } else {
        toast.error("Error al actualizar la contraseña.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl p-8 md:px-12 border w-lg mx-auto">
      <h2 className="text-2xl font-bold border-b pb-5 mb-7 text-fuchsia-800">
        Cambiar contraseña
      </h2>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          cambiarPassword();
        }}
      >
        {["actual", "nueva", "confirmar"].map((campo) => (
          <div key={campo} className="relative">
            <input
              name={campo}
              type={mostrarPassword[campo] ? "text" : "password"}
              value={datos[campo]}
              onChange={updateCampo}
              placeholder={etiquetas[campo]}
              minLength={campo !== "actual" ? 6 : undefined}
              maxLength={campo !== "actual" ? 25 : undefined}
              className="w-full px-4 py-3 pr-12 border-2 rounded-xl focus:ring-2 focus:ring-fuchsia-400 outline-none bg-white/80 transition-all text-base"
              autoComplete={campo === "actual" ? "current-password" : "new-password"}
              disabled={loading}
              aria-label={etiquetas[campo]}
            />
            <button
              type="button"
              aria-label={
                mostrarPassword[campo] ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              onClick={() => showPassword(campo)}
              className="absolute inset-y-0 right-3 flex items-center text-fuchsia-400 hover:text-fuchsia-700"
              tabIndex={0}
            >
              {mostrarPassword[campo] ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-2xl font-bold text-lg shadow bg-gradient-to-r from-yellow-400 to-fuchsia-400 text-white hover:scale-105 active:scale-95 transition-all duration-150 ${
            loading ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          {loading ? "Actualizando..." : "Confirmar cambio"}
        </button>
      </form>
    </section>
  );
};

export default CambioPassword;
