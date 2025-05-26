import { Link, useNavigate } from "react-router";
import { useRef, useEffect, useState } from "react";
import AvatarIniciales from "../AvatarIniciales";

const UsuarioMenu = ({ nombre, admin }) => {
  const [open, setOpen] = useState(false);
  const [usuario, setUsuario] = useState({});
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(usuarioGuardado || null);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const cierreSesion = () => {
    localStorage.removeItem("usuario");
    setOpen(false);
    navigate("/libros");
    window.location.reload();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        className={`flex items-center gap-2 font-semibold ${
          admin ? "text-violet-800" : "text-fuchsia-700"
        } bg-white/90 px-4 py-2 rounded-full shadow hover:bg-fuchsia-100 transition`}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <AvatarIniciales
          nombre={usuario.nombre}
          apellidos={usuario.apellidos || ""}
          tamaño="sm"
        />
        <span>{usuario.usuario}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-fuchsia-100 z-50 text-fuchsia-900 animate-fade-in-down">
          {!admin ? (
            <>
              <Link
                to="/usuario/perfil"
                className="block px-5 py-3 hover:bg-fuchsia-50"
                onClick={() => setOpen(false)}
              >
                Perfil
              </Link>
              <Link
                to="/usuario/lecturas"
                className="block px-5 py-3 hover:bg-fuchsia-50"
                onClick={() => setOpen(false)}
              >
                Mis lecturas
              </Link>
              <Link
                to="/favoritos"
                className="block px-5 py-3 hover:bg-fuchsia-50"
                onClick={() => setOpen(false)}
              >
                Mis favoritos
              </Link>
            </>
          ) : (
            <>
              
            </>
          )}
          <button
            onClick={cierreSesion}
            className="w-full text-left px-5 py-3 hover:bg-fuchsia-100 text-red-600 font-bold rounded-b-xl"
          >
            Salir
          </button>
        </div>
      )}
    </div>
  );
};

export default UsuarioMenu;
