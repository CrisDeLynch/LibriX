import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "./cNavbar/Logo";
import NavLinks from "./cNavbar/NavLinks";
import MenuMobile from "./cNavbar/MenuMobile";
import BuscadorLibros from "./cNavbar/BuscadorLibros";
import BotonLogin from "./cNavbar/BotonLogin";
import UsuarioMenu from "./cNavbar/UsuarioMenu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) setUsuario(JSON.parse(usuarioGuardado));
  }, []);

  const isAdmin = usuario && usuario.rol === "admin";

  return (
    <nav className="bg-gradient-to-r from-fuchsia-200 via-violet-200 to-indigo-200 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-3">
        {/* Logo con redirección inteligente */}
        <Logo admin={isAdmin} />
        
        {/* LINKS DESKTOP */}
        <div className="hidden custom:flex items-center gap-8 flex-1">
          <NavLinks admin={isAdmin} usuario={usuario} />
          {!isAdmin && (
            <div className="flex-1 flex justify-center">
              <BuscadorLibros className="w-[280px]" />
            </div>
          )}
        </div>

        {/* Botón login / menú usuario */}
        <div className="hidden custom:block ml-8">
          {!usuario
            ? <BotonLogin />
            : <UsuarioMenu nombre={usuario.nombre} admin={isAdmin} />
          }
        </div>
        
        {/* Botón menú móvil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="custom:hidden text-3xl text-violet-800 focus:outline-none"
          aria-label="Abrir menú"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && <MenuMobile usuario={usuario} close={() => setMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar;
