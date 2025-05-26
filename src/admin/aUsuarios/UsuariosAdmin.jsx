import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { cliente } from "../../conexionApi";
import { FaSearch, FaSyncAlt } from "react-icons/fa";
import TablaUsuarios from "./TablaUsuarios";
import ModalUsuarios from "./ModalUsuarios";
import UsuarioCard from "./UsuarioCard";
import Loading from "../../components/Loading"; 
import Volver from "../../components/Volver";

export default function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalEdit, setModalEdit] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [deleteUser, setDeleteUser] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    const { data } = await cliente
      .from("usuario")
      .select("*")
      .order("id", { ascending: true });
    if (data) setUsuarios(data);
    setLoading(false);
  };

  const usuariosFiltrados = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const openEditModal = (user) => {
    setEditUser(user);
    setModalEdit(true);
  };
  const openDeleteModal = (user) => {
    setDeleteUser(user);
    setModalDelete(true);
  };

  const handleSaveEdit = async () => {
    if (!editUser) return;
    await cliente.from("usuario").update(editUser).eq("id", editUser.id);
    setModalEdit(false);
    fetchUsuarios();
  };

  const handleDelete = async () => {
    if (!deleteUser) return;
    await cliente.from("usuario").delete().eq("id", deleteUser.id);
    setModalDelete(false);
    fetchUsuarios();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
          {/* Volver (izquierda) */}
          <div className="flex-shrink-0">
            <Volver />
          </div>

          {/* Título centrado */}
          <h1 className="flex-1 text-center text-xl sm:text-2xl font-bold text-violet-700">
            Gestión de usuarios
          </h1>

          <div className="w-10 sm:w-16" />
        </div>

        <div className="bg-white rounded-xl shadow p-4 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center gap-2 w-full md:w-1/3"
            >
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-violet-300"
              />
              <FaSearch className="text-violet-400" />
            </form>
            <button
              onClick={fetchUsuarios}
              className="flex items-center gap-2 bg-violet-100 text-violet-700 px-3 py-2 rounded shadow hover:bg-violet-200 transition"
            >
              <FaSyncAlt /> Recargar
            </button>
          </div>

          {/* CARGANDO */}
          {loading ? (
            <Loading mensaje="Cargando usuarios..." />
          ) : usuariosFiltrados.length === 0 ? (
            <div className="text-fuchsia-600 py-8 text-center">
              No hay usuarios que coincidan.
            </div>
          ) : (
            <>
              {/* TABLA para escritorio */}
              <div className="hidden md:block">
                <TablaUsuarios
                  usuarios={usuariosFiltrados}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                />
              </div>

              {/* TARJETAS para móvil */}
              <div className="md:hidden space-y-4">
                {usuariosFiltrados.map((u) => (
                  <UsuarioCard
                    key={u.id}
                    usuario={u}
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* MODAL EDITAR */}
      <ModalUsuarios
        open={modalEdit}
        title="Editar usuario"
        onAccept={handleSaveEdit}
        onCancel={() => setModalEdit(false)}
        acceptLabel="Guardar"
      >
        <label className="block mb-2 text-violet-700">Nombre</label>
        <input
          className="mb-4 w-full border px-3 py-2 rounded"
          value={editUser?.nombre ?? ""}
          onChange={(e) => setEditUser({ ...editUser, nombre: e.target.value })}
        />
        <label className="block mb-2 text-violet-700">Email</label>
        <input
          className="mb-4 w-full border px-3 py-2 rounded"
          value={editUser?.email ?? ""}
          onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
        />
        <label className="block mb-2 text-violet-700">Rol</label>
        <select
          className="mb-4 w-full border px-3 py-2 rounded"
          value={editUser?.rol ?? ""}
          onChange={(e) => setEditUser({ ...editUser, rol: e.target.value })}
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </ModalUsuarios>

      {/* MODAL ELIMINAR */}
      <ModalUsuarios
        open={modalDelete}
        title="Eliminar usuario"
        onAccept={handleDelete}
        onCancel={() => setModalDelete(false)}
        acceptLabel="Eliminar"
        danger
      >
        <p>
          ¿Seguro que quieres eliminar a <b>{deleteUser?.nombre}</b>?
        </p>
      </ModalUsuarios>

      <Footer />
    </div>
  );
}
