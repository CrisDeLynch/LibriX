import { Link } from "react-router";
import { FaUser, FaUserShield, FaPlus, FaList } from "react-icons/fa";
import ExportacionExcel from "../aDashboard/ExportacionExcel";

export default function AdminNav() {
  const links = [
    { to: "/admin/libros/agregar", label: "Añadir Libro", icon: <FaPlus /> },
    { to: "/admin/libros", label: "Listar Libros", icon: <FaList /> },
    { to: "/admin/autores/agregar", label: "Añadir Autor", icon: <FaPlus /> },
    { to: "/admin/autores", label: "Listar Autores", icon: <FaList /> },
    { to: "/admin/usuarios", label: "Usuarios", icon: <FaUser /> },
    { to: "/admin/suscripciones", label: "Suscripciones", icon: <FaUserShield /> },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      {links.map((link, idx) => (
        <Link
          key={idx}
          to={link.to}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg shadow hover:bg-violet-700 hover:scale-105 transition-all"
          aria-label={link.label}
        >
          {link.icon}
          <span className="text-sm font-semibold">{link.label}</span>
        </Link>
      ))}
      <div className="flex items-center">
        <ExportacionExcel />
      </div>
    </div>
  );
}
