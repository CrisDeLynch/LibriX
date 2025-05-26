import { Link } from "react-router";

const BotonLogin = ({ onClick, full }) => (
  <Link
    to="/ingreso"
    className={`bg-fuchsia-600 text-white font-bold px-7 py-2 rounded-full shadow hover:bg-fuchsia-700 transition-all text-base ${full ? "w-full text-center" : "whitespace-nowrap"}`}
    onClick={onClick}
  >
    Iniciar sesión
  </Link>
);

export default BotonLogin;
