import { useEffect, useState } from "react";
import { cliente } from "../conexionApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InfoUsuario from "../components/cPerfil/InfoUsuario";
import TarjetaForm from "../components/cPerfil/TarjetaForm";
import CambioPassword from "../components/cPerfil/CambioPassword";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import AvatarIniciales from "../components/AvatarIniciales";

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    tarjeta: "",
    fecha_tarjeta: "",
    cvc: "",
    mes: "",
    anio: "",
  });

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
      if (!usuarioGuardado) return setLoading(false);

      setUsuario(usuarioGuardado);
      setFormData((prev) => ({
        ...prev,
        nombre: usuarioGuardado.nombre,
        email: usuarioGuardado.email,
      }));

      try {
        const { data: datosUsuario } = await cliente
          .from("usuario")
          .select("tarjeta, fecha_tarjeta, cvc, apellidos, fecha_registro")
          .eq("id", usuarioGuardado.id)
          .single();

        if (datosUsuario) {
          const date = new Date(datosUsuario.fecha_tarjeta);
          const mes = (date.getMonth() + 1).toString().padStart(2, "0");
          const anio = date.getFullYear().toString();

          setFormData((prev) => ({
            ...prev,
            tarjeta: datosUsuario.tarjeta || "",
            fecha_tarjeta: datosUsuario.fecha_tarjeta || "",
            cvc: datosUsuario.cvc || "",
            mes,
            anio,
            apellidos: datosUsuario.apellidos || "",
            fecha_registro: datosUsuario.fecha_registro || "",
          }));
        }

        const { data: suscripcionData } = await cliente
          .from("suscripcion")
          .select("estado, fecha_fin")
          .eq("usuario_id", usuarioGuardado.id)
          .order("fecha_fin", { ascending: false })
          .limit(1)
          .single();

        if (suscripcionData) {
          setUsuario((prev) => ({
            ...prev,
            suscripcion_estado: suscripcionData.estado,
            suscripcion_fecha: suscripcionData.fecha_fin,
          }));
        }
      } catch (error) {
        toast.error("Error al cargar datos del usuario.");
        console.error(error);
      }

      setLoading(false);
    };

    cargarDatosUsuario();
  }, []);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const guardarCambios = async () => {
    if (!usuario) return;

    const { nombre, email, tarjeta, cvc, mes, anio, fecha_tarjeta } = formData;
    const nuevaFechaVencimiento =
      mes && anio ? `${anio}-${mes}-01` : fecha_tarjeta;

    const tarjetaOculta = tarjeta?.replace(/\d(?=\d{4})/g, "*");
    const cvcOculto = "*".repeat(cvc?.length || 0);

    setGuardando(true);

    const { error } = await cliente
      .from("usuario")
      .update({
        nombre,
        email,
        tarjeta: tarjetaOculta,
        fecha_tarjeta: nuevaFechaVencimiento,
        cvc: cvcOculto,
      })
      .eq("id", usuario.id);

    if (!error) {
      const actualizado = {
        ...usuario,
        ...formData,
        tarjeta: tarjetaOculta,
        cvc: cvcOculto,
        fecha_tarjeta: nuevaFechaVencimiento,
      };
      localStorage.setItem("usuario", JSON.stringify(actualizado));
      setUsuario(actualizado);
      setEditando(false);
      toast.success("Cambios guardados correctamente.");
    } else {
      toast.error("Error al guardar los datos.");
    }

    setGuardando(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading mensaje="Cargando perfil..." />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen bg-gradient-to-b from-violet-50 via-white to-white text-gray-800">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-12 space-y-10">
        <section className="bg-white rounded-2xl shadow-md p-6 border flex items-center gap-4">
          <AvatarIniciales
            nombre={formData.nombre}
            apellidos={formData.apellidos}
            tamaño="lg"
          />
          <div>
            <h1 className="text-2xl font-bold text-fuchsia-700">
              {formData.nombre} {formData.apellidos}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Miembro desde{" "}
              <span className="font-medium text-gray-800">
                {formData.fecha_registro
                  ? new Date(formData.fecha_registro).toLocaleDateString(
                      "es-ES",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "fecha desconocida"}
              </span>
            </p>
          </div>
        </section>

        <InfoUsuario
          formData={formData}
          setFormData={setFormData}
          usuario={usuario}
          editando={editando}
          guardando={guardando}
          setEditando={setEditando}
          handleInputChange={inputChange}
          guardarCambios={guardarCambios}
        />
        <TarjetaForm
          formData={formData}
          setFormData={setFormData}
          guardarCambios={guardarCambios}
        />
        <CambioPassword />
      </main>
      <Footer />
    </div>
  );
};

export default PerfilUsuario;
