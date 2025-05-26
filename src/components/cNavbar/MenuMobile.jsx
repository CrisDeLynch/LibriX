import { useNavigate } from "react-router";
import NavLinks from "./NavLinks";
import BotonLogin from "./BotonLogin";
import BuscadorLibros from "./BuscadorLibros";
import AvatarIniciales from "../AvatarIniciales";

const MenuMobile = ({ close }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  const navigate = useNavigate();
  const isAdmin = usuario && usuario.rol === "admin"; 

  const cierreSesion = () => {
    localStorage.removeItem("usuario");
    close();
    navigate("/libros");
    window.location.reload();
  };

  return (
    <div className="custom:hidden px-6 py-6 bg-gradient-to-b from-fuchsia-200 via-violet-200 to-indigo-200 border-t border-fuchsia-100 space-y-5 flex flex-col items-center shadow-xl animate-fade-in-down">
      <NavLinks onClick={close} admin={isAdmin} />
      {!isAdmin && (
        <div className="w-full flex justify-center">
          <BuscadorLibros className="w-full" onItemClick={close} />
        </div>
      )}
      {!usuario ? (
        <BotonLogin onClick={close} full />
      ) : (
        <div className="w-full flex flex-col items-center bg-white/80 rounded-xl p-4 mt-1 space-y-1">
          <div className="flex items-center gap-2 text-fuchsia-700 mb-2">
          <AvatarIniciales
          nombre={usuario.nombre}
          apellidos={usuario.apellidos || ""}
          tamaño="sm"
        />
            <span className="font-bold">{usuario.usuario}</span>
          </div>
          {!isAdmin ? (
            <>
              <button
                className="w-full text-left px-4 py-2 rounded hover:bg-fuchsia-50"
                onClick={() => {
                  close();
                  navigate("/usuario/perfil");
                }}
              >
                Perfil
              </button>
              <button
                className="w-full text-left px-4 py-2 rounded hover:bg-fuchsia-50"
                onClick={() => {
                  close();
                  navigate("/usuario/lecturas");
                }}
              >
                Mis lecturas
              </button>
              <button
                className="w-full text-left px-4 py-2 rounded hover:bg-fuchsia-50"
                onClick={() => {
                  close();
                  navigate("/favoritos");
                }}
              >
                Mis favoritos
              </button>
            </>
          ) : (
         
            <>
             
            </>
          )}
          <button
            onClick={cierreSesion}
            className="w-full px-4 py-2 text-red-600 hover:bg-fuchsia-100 rounded text-left font-bold"
          >
            Salir
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuMobile;
