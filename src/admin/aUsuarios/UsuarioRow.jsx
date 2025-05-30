import { FaUserEdit } from "react-icons/fa";

export default function UsuarioRow({ usuario, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-violet-50">
      <td className="px-3 py-2 border">{usuario.id}</td>
      <td className="px-3 py-2 border">{usuario.nombre}</td>
      <td className="px-3 py-2 border">{usuario.email || "-"}</td>
      <td className="px-3 py-2 border">
        <span className={`px-2 py-1 rounded text-xs font-bold ${usuario.rol === "admin"
          ? "bg-violet-200 text-violet-700"
          : "bg-gray-100 text-gray-600"
        }`}>
          {usuario.rol}
        </span>
      </td>
      <td className="px-3 py-2 border">{new Date(usuario.fecha_registro).toLocaleDateString()}</td>
      <td className="px-3 py-2 border">
      <div className="flex justify-center">
        <button
          title="Editar usuario"
          className="text-blue-600 hover:text-blue-900"
          onClick={() => onEdit(usuario)}
        >
        <FaUserEdit />
        </button>
      </div> 
      </td>
    </tr>
  );
}
