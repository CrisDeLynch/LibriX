import { useState, useEffect } from "react";
import { FaCreditCard, FaCheck, FaTimes, FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const TarjetaForm = ({ formData, setFormData, guardarCambios }) => {
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);
  const [respaldo, setRespaldo] = useState({});
  const anioActual = new Date().getFullYear();
  const meses = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const anios = Array.from({ length: 12 }, (_, i) => (anioActual + i).toString());

  useEffect(() => {
    if (mostrarTarjeta) {
      setRespaldo({ ...formData });

      setFormData((prev) => ({
        ...prev,
        tarjeta: "",
        cvc: "",
      }));
    }
  }, [mostrarTarjeta]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateTarjeta = (e) => {
    e.preventDefault();
    const { tarjeta, cvc, mes, anio } = formData;

    if (!tarjeta.trim()) {
      toast.error("El número de tarjeta es obligatorio.");
      return;
    }

    if (!/^\d{16}$/.test(tarjeta)) {
      toast.error("El número de tarjeta debe tener 16 dígitos.");
      return;
    }

    if (!mes || !anio) {
      toast.error("Debes seleccionar el mes y año de vencimiento.");
      return;
    }

    const mesActual = new Date().getMonth() + 1;
    const anioActual = new Date().getFullYear();
    const mesSeleccionado = parseInt(mes, 10);
    const anioSeleccionado = parseInt(anio, 10);

    if (
      anioSeleccionado < anioActual ||
      (anioSeleccionado === anioActual && mesSeleccionado < mesActual)
    ) {
      toast.error("La tarjeta ya está vencida.");
      return;
    }

    if (!cvc.trim()) {
      toast.error("El código CVC es obligatorio.");
      return;
    }

    if (!/^\d{3}$/.test(cvc)) {
      toast.error("El código CVC debe tener 3 dígitos.");
      return;
    }

    const tarjetaOculta = tarjeta.replace(/\d(?=\d{4})/g, "*");
    const cvcOculto = "*".repeat(cvc.length);

    setFormData((prev) => ({
      ...prev,
      tarjeta: tarjetaOculta,
      cvc: cvcOculto,
      fecha_tarjeta: `${anio}-${mes}-01`,
    }));

    guardarCambios();
    setMostrarTarjeta(false);
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl p-10 border w-full max-w-5xl min-h-[200px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-fuchsia-800 flex items-center gap-2">
          <FaCreditCard className="text-fuchsia-400" />
          Tarjeta de crédito
        </h2>
        {!mostrarTarjeta && (
          <button
            onClick={() => setMostrarTarjeta(true)}
            className="inline-flex items-center gap-2 bg-fuchsia-100 text-fuchsia-800 px-4 py-2 rounded-full shadow hover:bg-fuchsia-200 transition font-semibold"
          >
            <FaRegEdit /> Editar tarjeta
          </button>
        )}
      </div>

      {!mostrarTarjeta ? (
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-lg font-mono">
            <FaCreditCard className="text-fuchsia-400" />
            <span className="tracking-widest">
              **** **** **** {formData.tarjeta?.slice(-4) || "----"}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Vencimiento:{" "}
            <span className="font-semibold">
              {formData.mes && formData.anio
                ? `${formData.mes}/${formData.anio.slice(-2)}`
                : "MM/AA"}
            </span>
          </p>
        </div>
      ) : (
        <form onSubmit={updateTarjeta} className="space-y-6 animate-fade-in-down">
          <div className="bg-yellow-50 text-yellow-800 px-4 py-3 rounded-lg text-sm border border-yellow-300 mb-2">
            Por seguridad, vuelve a introducir la tarjeta completa y su CVC.
          </div>

          <div>
            <label htmlFor="tarjeta" className="block text-sm font-medium text-gray-700 mb-1">
              Número de tarjeta
            </label>
            <input
              id="tarjeta"
              name="tarjeta"
              value={formData.tarjeta || ""}
              onChange={handleInputChange}
              placeholder="•••• •••• •••• ••••"
              maxLength={16}
              pattern="\d*"
              inputMode="numeric"
              className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-fuchsia-400 bg-white"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="mes" className="block text-sm font-medium text-gray-700 mb-1">
                Mes
              </label>
              <select
                id="mes"
                name="mes"
                value={formData.mes || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border-2 rounded-xl focus:ring-2 focus:ring-fuchsia-400"
              >
                <option value="">MM</option>
                {meses.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="anio" className="block text-sm font-medium text-gray-700 mb-1">
                Año
              </label>
              <select
                id="anio"
                name="anio"
                value={formData.anio || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border-2 rounded-xl focus:ring-2 focus:ring-fuchsia-400"
              >
                <option value="">AA</option>
                {anios.map((a) => (
                  <option key={a} value={a}>{a.slice(-2)}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                CVC
              </label>
              <input
                id="cvc"
                name="cvc"
                type="password"
                value={formData.cvc || ""}
                onChange={handleInputChange}
                placeholder="•••"
                maxLength={3}
                pattern="\d*"
                inputMode="numeric"
                className="w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-fuchsia-400"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 shadow font-bold transition"
            >
              <FaCheck /> Guardar
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData(respaldo);
                setMostrarTarjeta(false);
              }}
              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-300 shadow transition font-semibold"
            >
              <FaTimes /> Cancelar
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default TarjetaForm;
