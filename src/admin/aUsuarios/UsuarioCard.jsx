import { FaUserEdit, FaUserSlash } from "react-icons/fa";

export default function UsuarioCard({ usuario, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border p-4 shadow flex flex-col gap-2 bg-white">
      <div className="flex justify-between items-center">
        <span className="font-bold text-violet-700">{usuario.nombre}</span>
        <span className={`px-2 py-1 rounded text-xs font-bold ${
          usuario.rol === "admin"
            ? "bg-violet-200 text-violet-700"
            : "bg-gray-100 text-gray-600"
        }`}>
          {usuario.rol}
        </span>
      </div>
      <div className="text-sm text-gray-700 break-all">{usuario.email || "-"}</div>
      <div className="text-xs text-gray-400">
        Registrado: {new Date(usuario.fecha_registro).toLocaleDateString()}
      </div>
      <div className="flex gap-2 pt-2">
        <button
          title="Editar usuario"
          className="flex-1 text-blue-600 border border-blue-200 rounded py-1 hover:bg-blue-50"
          onClick={() => onEdit(usuario)}
        >
          <FaUserEdit className="inline" /> Editar
        </button>
        <button
          title="Eliminar usuario"
          className="flex-1 text-red-600 border border-red-200 rounded py-1 hover:bg-red-50"
          onClick={() => onDelete(usuario)}
        >
          <FaUserSlash className="inline" /> Eliminar
        </button>
      </div>
    </div>
  );
}
