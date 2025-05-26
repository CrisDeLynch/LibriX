import { FaRegEnvelope, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";
import { cliente } from "../../conexionApi"; 

const RegisterStep2 = ({ formData, handleChange, onNext, onBack }) => {
  const [touched, setTouched] = useState({});
  const [emailError, setEmailError] = useState("");
  const [checkingEmail, setCheckingEmail] = useState(false);

  const nextClick = async () => {
    const email = formData.email.trim().toLowerCase();
  
    if (!email || !formData.subscripcion) {
      toast.error("Completa los campos para continuar.");
      return;
    }
  
    const formatoEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoEmailValido.test(email)) {
      toast.error("Introduce un correo electrónico válido.");
      return;
    }
  
    setCheckingEmail(true);
    const { data, error } = await cliente
      .from("usuario")
      .select("email")
      .eq("email", email);
    setCheckingEmail(false);
  
    if (error) {
      setEmailError("Error consultando el correo.");
      toast.error("Error consultando el correo.");
      return;
    }
  
    if (data && data.length > 0) {
      setEmailError("Este correo ya está registrado.");
      return;
    }
  
    setEmailError("");
    onNext();
  };
  
  const emailBlur = async () => {
    setTouched((t) => ({ ...t, email: true }));

    const email = formData.email.trim().toLowerCase();
    setCheckingEmail(true);
    try {
      const { data, error } = await cliente
        .from("usuario")
        .select("email")
        .eq("email", email);

      if (error) {
        setEmailError("Error consultando el correo.");
      } else if (data && data.length > 0) {
        setEmailError("Este correo ya está registrado.");
      } else {
        setEmailError("");
      }
    } finally {
      setCheckingEmail(false);
    }
  };

  return (
    <div>
      {/* Email */}
      <div className="mb-5">
        <label className="block text-base font-semibold text-fuchsia-700 dark:text-fuchsia-200 mb-2">
          Email
        </label>
        <div className="relative">
        <FaRegEnvelope className="absolute left-3 top-8 -translate-y-1/2 text-fuchsia-400 text-base pointer-events-none" />
        <input
            type="text"
            name="email"
            value={formData.email}
            onChange={(e) => {
              handleChange(e);
              setEmailError(""); 
            }}
            onBlur={emailBlur}
            
            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-white/80 dark:bg-fuchsia-900/20 dark:text-white shadow-md transition-all duration-200 outline-none focus:ring-2 focus:ring-fuchsia-400
              ${
                touched.email && emailError
                  ? "border-pink-400 focus:ring-pink-300"
                  : "border-fuchsia-200"
              }`}
            placeholder="ejemplo@gmail.com"
            autoComplete="email"
          />
          <div className="flex justify-between items-center mt-1 min-h-[1.25rem]">
            <span className="text-xs text-gray-400">{(formData.email || "").length}/50</span>
            {checkingEmail && (
              <span className="text-xs text-fuchsia-400 ml-2">Comprobando...</span>
            )}
            {!checkingEmail && emailError && (
              <span className="text-xs text-pink-600 ml-2">{emailError}</span>
            )}
          </div>
        </div>
      </div>

      {/* Plan de suscripción */}
      <div className="mb-1">
        <label className="block text-base font-semibold text-fuchsia-700 dark:text-fuchsia-200 mb-2">
          Plan de Suscripción
        </label>
        <div className="relative">
          <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-fuchsia-400 text-lg pointer-events-none" />
          <select
            name="subscripcion"
            value={formData.subscripcion}
            onChange={handleChange}
            
            className="w-full pl-10 pr-3 py-3 border-2 rounded-xl bg-white/80 dark:bg-fuchsia-900/20 dark:text-white shadow-md transition-all duration-200 outline-none focus:ring-2 focus:ring-fuchsia-400 border-fuchsia-200"
          >
            <option value="">Selecciona un plan...</option>
            <option value="mensual">Mensual - 30 días</option>
            <option value="anual">Anual - 12 meses</option>
          </select>
        </div>
        <div className="flex gap-2 mt-2 ml-2">
          <span
            className={`inline-block px-3 py-1 text-xs rounded-2xl font-semibold ${
              formData.subscripcion === "mensual"
                ? "bg-fuchsia-100 text-fuchsia-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Mensual
          </span>
          <span
            className={`inline-block px-3 py-1 text-xs rounded-2xl font-semibold ${
              formData.subscripcion === "anual"
                ? "bg-fuchsia-100 text-fuchsia-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Anual
          </span>
        </div>
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-7">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-white border-2 border-fuchsia-300 text-fuchsia-700 py-3 rounded-xl shadow-sm font-semibold text-base hover:bg-fuchsia-50 hover:scale-105 active:scale-95 transition-all duration-150"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={nextClick}
          className={`flex-1 bg-gradient-to-r from-fuchsia-600 to-pink-400 text-white py-3 rounded-xl shadow-xl font-bold text-base hover:scale-105 active:scale-95 transition-all duration-150
            ${emailError ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default RegisterStep2;
