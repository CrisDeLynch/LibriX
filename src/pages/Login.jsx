import { useState } from "react";
import { cliente } from "../conexionApi";
import { useNavigate } from "react-router";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";
import { FaLock, FaUserAlt } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    contrasena: "",
  });
  const [loading, setLoading] = useState(false);

  const inputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, contrasena } = formData;

    if (!email || !contrasena) {
      toast.error("Todos los campos son obligatorios.", {

        theme: "colored",
      });
      setLoading(false);
      return;
    }

    const { data: usuario, error: usuarioError } = await cliente
      .from("usuario")
      .select("id, nombre, apellidos, usuario, rol, email, contrasena")
      .eq("email", email)
      .single();

    if (usuarioError) {
      toast.error("Email incorrecto.", {
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    if (!usuario) {
      toast.error("Usuario no encontrado.", {
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    const match = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!match) {
      toast.error("Contraseña incorrecta.", {
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    localStorage.setItem("usuario", JSON.stringify(usuario));

    const { data: suscripcion } = await cliente
      .from("suscripcion")
      .select("id, fecha_fin, estado")
      .eq("usuario_id", usuario.id)
      .order("fecha_fin", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (
      suscripcion &&
      suscripcion.estado === "activa" &&
      new Date(suscripcion.fecha_fin) < new Date()
    ) {
      await cliente
        .from("suscripcion")
        .update({ estado: "expirada" })
        .eq("id", suscripcion.id);
    }

    toast.success("Inicio de sesión exitoso", {
      theme: "colored",
    });

    setTimeout(() => {
      if (usuario.rol === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/libros");
      }
      setLoading(false);
    }, 1500);
  };
  return (
    <div className="min-h-screen flex flex-col items-center px-2 bg-gradient-to-tr from-fuchsia-200 via-violet-100 to-violet-300 dark:from-zinc-900 dark:via-fuchsia-950 dark:to-zinc-900 transition-all duration-300">
       <img
     src="/Logo1.png"
      alt="Logo"
      className="h-14 object-contain scale-100 transition-transform duration-200 mt-8"
      draggable={false}
    />
    <span
      className="
        mt-[-0.8rem]
      text-3xl
      font-extrabold
      text-transparent
      bg-clip-text
      bg-gradient-to-r
      from-purple-500
      via-pink-400
      to-purple-500
      drop-shadow-md
      tracking-wide
      select-none
      text-center
      mb-8
    "
    >
      LibriX
    </span>
      <div className="bg-white/95 dark:bg-zinc-800/90 rounded-3xl shadow-2xl px-8 py-10 md:px-16 md:py-14 w-full max-w-xl flex flex-col items-center border border-violet-100 dark:border-fuchsia-900/40 mt-0">
        <h2 className="text-4xl font-extrabold text-center text-fuchsia-800 dark:text-fuchsia-100 mb-8 mt-2 drop-shadow">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="w-full space-y-7">
          <div>
            <label className="block font-semibold text-fuchsia-700 dark:text-fuchsia-200 mb-2 text-lg">
              Email
            </label>
            <div className="relative">
              <FaUserAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-fuchsia-400 text-lg" />
              <input
                type="email"
                name="email"
                value={formData.email}
                autoComplete="email"
                onChange={inputChange}
                
                className="w-full pl-10 pr-4 py-4 border-2 rounded-xl bg-white/90 dark:bg-fuchsia-900/20 dark:text-white shadow-md outline-none focus:ring-2 focus:ring-fuchsia-400 border-fuchsia-200 text-base transition-all duration-200"
                placeholder="Tu email"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold text-fuchsia-700 dark:text-fuchsia-200 mb-2 text-lg">
              Contraseña
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-fuchsia-400 text-lg" />
              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                autoComplete="current-password"
                onChange={inputChange}
                
                className="w-full pl-10 pr-4 py-4 border-2 rounded-xl bg-white/90 dark:bg-fuchsia-900/20 dark:text-white shadow-md outline-none focus:ring-2 focus:ring-fuchsia-400 border-fuchsia-200 text-base transition-all duration-200"
                placeholder="Contraseña"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-xl bg-gradient-to-r from-fuchsia-600 to-pink-400 text-white hover:scale-105 active:scale-95 transition-all duration-150 ${
              loading ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {loading ? "Accediendo..." : "Iniciar Sesión"}
          </button>
        </form>
        <p className="text-center text-base mt-10 text-gray-700 dark:text-gray-300">
          ¿No tienes cuenta?{" "}
          <a
            href="/registro"
            className="text-violet-700 font-semibold hover:underline"
          >
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;