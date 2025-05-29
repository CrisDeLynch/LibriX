import { useState } from "react";
import { useNavigate, Link } from "react-router";
import bcrypt from "bcryptjs";
import { cliente } from "../conexionApi";
import Volver from "../components/Volver";
import { toast } from "react-toastify";
import RegisterStep1 from "../components/cRegister/RegisterStep1";
import RegisterStep2 from "../components/cRegister/RegisterStep2";
import RegisterStep3 from "../components/cRegister/RegisterStep3";
import RegisterStep4 from "../components/cRegister/RegisterStep4";
import RegisterProgress from "../components/cRegister/RegisterProgress";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    contrasena: "",
    subscripcion: "",
    tarjeta: "",
    fechaTarjeta: "",
    cvc: "",
    usuario: "",
  });

  const formChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const previousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      email,
      contrasena,
      nombre,
      apellidos,
      subscripcion,
      tarjeta,
      fechaTarjeta,
      cvc,
      usuario,
    } = formData;

    const { data: existingEmail } = await cliente
    .from("usuario")
    .select("id")
    .eq("email", email);
  
  if (existingEmail.length > 0) return;
  
  const { data: existingUser } = await cliente
    .from("usuario")
    .select("id")
    .eq("usuario", usuario);
  
  if (existingUser.length > 0) return;

    const [mesStr, anioStr] = fechaTarjeta.split("/");
    const fechaTarjetaCompleta = `${anioStr}-${mesStr}-01`;

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const tarjetaOculta = tarjeta.replace(/\d(?=\d{4})/g, "*");
    const cvcOculto = "*".repeat(cvc.length);

    const { data: userData, error: insertError } = await cliente
      .from("usuario")
      .insert([
        {
          nombre,
          apellidos,
          email,
          contrasena: hashedPassword,
          subscripcion,
          tarjeta: tarjetaOculta,
          fecha_tarjeta: fechaTarjetaCompleta,
          cvc: cvcOculto,
          usuario,
        },
      ])
      .select("*")
      .single();

    if (insertError || !userData) {
      alert("Error al insertar los datos del usuario.");
      return;
    }

    const fechaInicio = new Date();
    const fechaFin =
      subscripcion === "mensual"
        ? new Date(new Date().setMonth(fechaInicio.getMonth() + 1))
        : new Date(new Date().setFullYear(fechaInicio.getFullYear() + 1));

    await cliente.from("suscripcion").insert([
      {
        usuario_id: userData.id,
        plan: subscripcion,
        estado: "activa",
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
      },
    ]);

    toast.success("Registro completado correctamente", {
          theme: "colored",
        });
    
    navigate("/libros");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-200 via-violet-100 to-violet-300 dark:from-zinc-900 dark:via-fuchsia-950 dark:to-zinc-900 flex flex-col items-center px-2 pb-10">
      
      <div className="absolute left-2 top-4 sm:left-4 sm:top-6 z-50">
        <Volver/>
      </div>
      <div className="w-full max-w-xl relative px-4 pt-6 mb-8">
      <div className="flex flex-col items-center justify-center">
        <img
          src="/Logo1.png"
          alt="Logo"
          className="h-14 object-contain scale-100 transition-transform duration-200"
          draggable={false}
        />
        <span className="mt-[-0.6rem] text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-purple-500 drop-shadow-md tracking-wide select-none text-center">
          LibriX
        </span>
      </div>
    </div>


      <div className="bg-white/90 dark:bg-zinc-800/90 rounded-3xl shadow-2xl px-5 py-7 md:px-10 md:py-10 w-full max-w-xl flex flex-col items-center border border-violet-100 dark:border-fuchsia-900/40">
        <RegisterProgress step={step} />

        <form onSubmit={handleSubmit} className="w-full space-y-5 mt-8">
          {step === 1 && (
            <RegisterStep1
              formData={formData}
              handleChange={formChange}
              onNext={nextStep}
            />
          )}
          {step === 2 && (
            <RegisterStep2
              formData={formData}
              handleChange={formChange}
              onNext={nextStep}
              onBack={previousStep}
            />
          )}
          {step === 3 && (
            <RegisterStep3
              formData={formData}
              handleChange={formChange}
              onNext={nextStep}
              onBack={previousStep}
            />
          )}
          {step === 4 && (
            <RegisterStep4
              formData={formData}
              handleChange={formChange}
              onBack={previousStep}
            />
          )}
        </form>
        <p className="text-center text-sm mt-8 text-gray-700 dark:text-gray-300">
          ¿Ya tienes cuenta?{" "}
           <Link
             to="/ingreso"
             className="text-violet-700 font-semibold hover:underline"
           >
             Inicia sesión aquí
           </Link>
         </p>
      </div>
    </div>
  );
};

export default Register;
