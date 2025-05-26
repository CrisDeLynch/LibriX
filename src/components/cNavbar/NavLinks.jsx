import { Link } from "react-router";

const NavLinks = ({ onClick, admin }) => (
  <>
    {admin ? (
      <>
        <Link
          to="/admin/autores"
          className="font-semibold text-violet-800 hover:text-fuchsia-600 transition lg:ml-4"
          onClick={onClick}
        >
          Autores
        </Link>
        <Link
          to="/admin/libros"
          className="font-semibold text-violet-800 hover:text-fuchsia-600 transition"
          onClick={onClick}
        >
          Libros
        </Link>
        <Link
          to="/admin/usuarios"
          className="font-semibold text-violet-800 hover:text-fuchsia-600 transition"
          onClick={onClick}
        >
          Usuarios
        </Link>
        <Link
          to="/admin/suscripciones"
          className="font-semibold text-violet-800 hover:text-fuchsia-600 transition"
          onClick={onClick}
        >
          Suscripciones
        </Link>
       
      </>
    ) : (
      <>
        <Link
          to="/catalogo"
          className="font-semibold text-violet-800 hover:text-fuchsia-600 transition lg:ml-4"
          onClick={onClick}
        >
          Catálogo
        </Link>
        <Link
          to="/generos"
          className="font-semibold text-violet-800 hover:text-fuchsia-600 transition"
          onClick={onClick}
        >
          Géneros
        </Link>
        <Link
          to="/autores"
          className="font-semibold text-violet-800 hover:text-fuchsia-600 transition"
          onClick={onClick}
        >
          Autores
        </Link>
      </>
    )}
  </>
);

export default NavLinks;
