import UsuarioRow from "./UsuarioRow";

export default function TablaUsuarios({ usuarios, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-violet-50">
            <th className="px-3 py-2 border">ID</th>
            <th className="px-3 py-2 border">Nombre</th>
            <th className="px-3 py-2 border">Email</th>
            <th className="px-3 py-2 border">Rol</th>
            <th className="px-3 py-2 border">Fecha Registro</th>
            <th className="px-3 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario =>
            <UsuarioRow
              key={usuario.id}
              usuario={usuario}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}
