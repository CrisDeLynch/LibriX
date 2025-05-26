import { FaRegCreditCard, FaRegCalendarAlt, FaKey } from "react-icons/fa";
import { toast } from "react-toastify";

const RegisterStep3 = ({ formData, handleChange, onNext, onBack }) => {
  const nextClick = () => {
    if (
      !formData.tarjeta.trim() ||
      !formData.fechaTarjeta.trim() ||
      !formData.cvc.trim()
    ) {
      toast.error("Rellena todos los campos de pago.");
      return;
    }

    if (!/^\d{16}$/.test(formData.tarjeta)) {
      toast.error("Introduce un número de tarjeta válido (16 dígitos).");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(formData.fechaTarjeta)) {
      toast.error("Formato inválido en la fecha. Usa MM/YYYY.");
      return;
    }

    const [mes, anio] = formData.fechaTarjeta.split("/").map(Number);
    const hoy = new Date();
    const fechaIngresada = new Date(anio, mes - 1);

    if (fechaIngresada < new Date(hoy.getFullYear(), hoy.getMonth(), 1)) {
      toast.error("La fecha no puede ser anterior al mes actual.");
      return;
    }

    if (!/^\d{3}$/.test(formData.cvc)) {
      toast.error("El CVC debe tener 3 dígitos.");
      return;
    }

    onNext();
  };

  return (
    <div>
      {/* Número de Tarjeta */}
      <div className="mb-4">
        <label className="block text-base font-semibold text-fuchsia-700 dark:text-fuchsia-200 mb-2">
          Número de Tarjeta
        </label>
        <div className="relative">
          <FaRegCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-fuchsia-400 text-lg pointer-events-none" />
          <input
            type="text"
            name="tarjeta"
            maxLength={16}
            value={formData.tarjeta}
            onChange={(e) => {
              if (/^\d{0,16}$/.test(e.target.value)) handleChange(e);
            }}
            autoComplete="cc-number"
            required
            inputMode="numeric"
            className="w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-white/80 dark:bg-fuchsia-900/20 dark:text-white shadow-md outline-none focus:ring-2 focus:ring-fuchsia-400 border-fuchsia-200 transition-all duration-200"
            placeholder="1234 5678 9012 3456"
          />
        </div>
      </div>

      {/* Fecha de Expiración */}
      <div className="mb-4">
        <label className="block text-base font-semibold text-fuchsia-700 dark:text-fuchsia-200 mb-2">
          Fecha de Expiración (MM/YYYY)
        </label>
        <div className="relative">
          <FaRegCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-fuchsia-400 text-lg pointer-events-none" />
          <input
            type="text"
            name="fechaTarjeta"
            value={formData.fechaTarjeta}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,2}(\/\d{0,4})?$/.test(value)) {
                handleChange(e);
              }
            }}
            maxLength={7}
            placeholder="MM/YYYY"
            autoComplete="cc-exp"
            inputMode="numeric"
            required
            className="w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-white/80 dark:bg-fuchsia-900/20 dark:text-white shadow-md outline-none focus:ring-2 focus:ring-fuchsia-400 border-fuchsia-200 transition-all duration-200"
          />
        </div>
      </div>

      {/* CVC */}
      <div className="mb-1">
        <label className="block text-base font-semibold text-fuchsia-700 dark:text-fuchsia-200 mb-2">
          CVC
        </label>
        <div className="relative">
          <FaKey className="absolute left-3 top-1/2 -translate-y-1/2 text-fuchsia-400 text-lg pointer-events-none" />
          <input
            type="text"
            name="cvc"
            maxLength={3}
            value={formData.cvc}
            onChange={(e) => {
              if (/^\d{0,3}$/.test(e.target.value)) handleChange(e);
            }}
            autoComplete="cc-csc"
            required
            inputMode="numeric"
            className="w-full pl-10 pr-4 py-3 border-2 rounded-xl bg-white/80 dark:bg-fuchsia-900/20 dark:text-white shadow-md outline-none focus:ring-2 focus:ring-fuchsia-400 border-fuchsia-200 transition-all duration-200"
            placeholder="123"
          />
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
          className="flex-1 bg-gradient-to-r from-fuchsia-600 to-pink-400 text-white py-3 rounded-xl shadow-xl font-bold text-base hover:scale-105 active:scale-95 transition-all duration-150"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default RegisterStep3;
