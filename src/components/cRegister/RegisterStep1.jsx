import { useState } from "react";
import { toast } from "react-toastify";

const MAX_NOMBRE = 40;
const MAX_APELLIDOS = 60;

const RegisterStep1 = ({ formData, handleChange, onNext }) => {
  const [touched, setTouched] = useState({ nombre: false, apellidos: false });

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validate = () => {
    if (!(formData.nombre || "").trim() || !(formData.apellidos || "").trim()) {
      toast.error("Rellena ambos campos para continuar.", {
        hideProgressBar: false,
        style: {
          borderRadius: "12px",
          fontWeight: "bold",
        }
      });
      return false;
    }
    return true;
  };

  const nextPage = () => {
    setTouched({ nombre: true, apellidos: true });
    if (validate()) {
      onNext();
    }
  };

  return (
    <div>
    
      <div className="mb-3">
        <label className="block text-base font-semibold text-fuchsia-700 dark:text-fuchsia-200 mb-2">
          Nombre
        </label>
        <input
          type="text"
          name="nombre"
          maxLength={MAX_NOMBRE}
          value={formData.nombre || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          className={`w-full px-4 py-3 border-2 rounded-xl bg-white/80 dark:bg-fuchsia-900/20 dark:text-white shadow-md transition-all duration-200 outline-none focus:ring-2 focus:ring-fuchsia-400
            ${touched.nombre && !(formData.nombre || "").trim() ? "border-pink-400 focus:ring-pink-300" : "border-fuchsia-200"}
          `}
          placeholder="Introduce tu nombre..."
        />
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-400">
            {(formData.nombre || "").length}/{MAX_NOMBRE}
          </span>
        </div>
      </div>
      <div className="mb-0">
        <label className="block text-base font-semibold text-fuchsia-700 dark:text-fuchsia-200 mb-2">
          Apellidos
        </label>
        <input
          type="text"
          name="apellidos"
          maxLength={MAX_APELLIDOS}
          value={formData.apellidos || ""}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          className={`w-full px-4 py-3 border-2 rounded-xl bg-white/80 dark:bg-fuchsia-900/20 dark:text-white shadow-md transition-all duration-200 outline-none focus:ring-2 focus:ring-fuchsia-400
            ${touched.apellidos && !(formData.apellidos || "").trim() ? "border-pink-400 focus:ring-pink-300" : "border-fuchsia-200"}
          `}
          placeholder="Introduce tus apellidos..."
        />
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-400">
            {(formData.apellidos || "").length}/{MAX_APELLIDOS}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={nextPage}
        className="mt-6 w-full bg-gradient-to-r from-fuchsia-600 to-pink-400 shadow-xl text-white font-bold py-3 rounded-2xl text-lg hover:scale-105 active:scale-95 transition-all duration-150"
      >
        Siguiente
      </button>
    </div>
  );
};

export default RegisterStep1;
