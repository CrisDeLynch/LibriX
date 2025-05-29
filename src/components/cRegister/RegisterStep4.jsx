import { useState } from "react";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { cliente } from "../../conexionApi";

const MIN_PASSWORD = 6;
const MAX_PASSWORD = 25;
const MAX_USER = 20;

const RegisterStep4 = ({ formData, handleChange, onBack }) => {
  const [checking, setChecking] = useState(false);
  const [userError, setUserError] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [touched, setTouched] = useState({ usuario: false, contrasena: false });
  const [focusedPassword, setFocusedPassword] = useState(false);

  const userBlur = async () => {
    setTouched((t) => ({ ...t, usuario: true }));
    if (!formData.usuario || formData.usuario.length < 3) return;
    setChecking(true);
    try {
      const { data, error } = await cliente
        .from("usuario")
        .select("usuario")
        .eq("usuario", formData.usuario);

      setUserError(
        error
          ? "Error consultando usuario."
          : data?.length
          ? "Ese nombre de usuario ya está en uso."
          : ""
      );
    } finally {
      setChecking(false);
    }
  };

  const requisitos = {
    longitud: formData.contrasena?.length >= MIN_PASSWORD,
    especial: /[^a-zA-Z0-9]/.test(formData.contrasena),
    numero: /\d/.test(formData.contrasena),
    mayuscula: /[A-Z]/.test(formData.contrasena),
  };

  const puedeEnviar =
    formData.usuario?.length >= 3 &&
    requisitos.longitud &&
    requisitos.especial &&
    requisitos.numero &&
    requisitos.mayuscula &&
    !userError;

  const inputBase =
    "w-full py-3 pl-10 pr-12 border-2 rounded-xl bg-white/80 dark:bg-fuchsia-900/20 dark:text-white shadow-md outline-none focus:ring-2 focus:ring-fuchsia-400 transition-all duration-200 border-fuchsia-200";

  return (
    <div>
      {/* Usuario */}
      <div className="mb-4">
        <label className="block text-base font-semibold text-fuchsia-700 dark:text-fuchsia-200 mb-2">
          Nombre de Usuario
        </label>
        <div className="relative">
          <FaUserAlt className="absolute left-3 top-8 -translate-y-1/2 text-fuchsia-400" />
          <input
            type="text"
            name="usuario"
            maxLength={MAX_USER}
            autoComplete="username"
            value={formData.usuario}
            onChange={(e) => {
              handleChange(e);
              setUserError("");
            }}
            onBlur={userBlur}
            required
            className={`${inputBase} ${
              touched.usuario && (userError || !formData.usuario)
                ? "border-pink-400 focus:ring-pink-300"
                : ""
            }`}
            placeholder="Elige tu usuario"
          />
          <div className="flex justify-between items-center mt-1 text-xs min-h-[1.25rem]">
            <span className="text-gray-400">
              {(formData.usuario || "").length}/{MAX_USER}
            </span>
            {checking && (
              <span className="text-fuchsia-400 ml-2">Comprobando...</span>
            )}
            {!checking && userError && (
              <span className="text-pink-600 ml-2">{userError}</span>
            )}
          </div>
        </div>
      </div>

      {/* Contraseña */}
      <div className="mb-2">
        <label className="block text-base font-semibold text-fuchsia-700 dark:text-fuchsia-200 mb-2">
          Contraseña
        </label>
        <div className="relative">
          <FaLock className="absolute left-3 top-8 -translate-y-1/2 text-fuchsia-400" />
          <input
            type={mostrarContrasena ? "text" : "password"}
            name="contrasena"
            value={formData.contrasena}
            autoComplete="new-password"
            maxLength={MAX_PASSWORD}
            onChange={(e) => {
              handleChange(e);
              setTouched((t) => ({ ...t, contrasena: true }));
            }}
            onFocus={() => setFocusedPassword(true)}
            onBlur={() => setFocusedPassword(false)}
            required
            className={`${inputBase} ${
              touched.contrasena && !puedeEnviar
                ? "border-pink-400 focus:ring-pink-300"
                : ""
            }`}
            placeholder="Crea una contraseña"
          />
             <div className="flex justify-between items-center mt-1 text-xs min-h-[1.25rem]">
             <span className="text-gray-400">
              {(formData.contrasena || "").length}/{MAX_PASSWORD}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMostrarContrasena((p) => !p)}
            className="absolute right-3 top-8 -translate-y-1/2 text-fuchsia-400 hover:text-fuchsia-600"
            tabIndex={-1}
          >
            {mostrarContrasena ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {focusedPassword && (
          <ul className="text-sm text-gray-700 mt-3 space-y-1 ml-1">
            <li className="flex items-center gap-2">
              {requisitos.longitud && <FaCheck />} Mínimo 6 caracteres
            </li>
            <li className="flex items-center gap-2">
              {requisitos.numero && <FaCheck />} Al menos un número
            </li>
            <li className="flex items-center gap-2">
              {requisitos.mayuscula && <FaCheck />} Al menos una mayúscula
            </li>
            <li className="flex items-center gap-2">
              {requisitos.especial && <FaCheck />} Al menos un carácter especial
            </li>
          </ul>
        )}
      </div>

      {/* Botones */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-7">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 bg-white border-2 border-fuchsia-300 text-fuchsia-700 py-3 rounded-xl shadow-sm font-semibold hover:bg-fuchsia-50 hover:scale-105 active:scale-95 transition-all"
        >
          Anterior
        </button>
        <button
          type="submit"
          disabled={!puedeEnviar}
          onClick={(e) => !puedeEnviar && e.preventDefault()}
          className={`flex-1 bg-gradient-to-r from-fuchsia-600 to-green-500 text-white py-3 rounded-xl shadow-xl font-bold hover:scale-105 active:scale-95 transition-all ${
            !puedeEnviar ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default RegisterStep4;
