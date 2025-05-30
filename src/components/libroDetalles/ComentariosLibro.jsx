import { useEffect, useState } from "react";
import { cliente } from "../../conexionApi";
import Estrellas from "./Estrellas";
import ComentarioCard from "./ComentarioCard";
import { toast } from "react-toastify";
import { Link } from "react-router";

const ComentariosLibro = ({ libroId }) => {
  const [comentarios, setComentarios] = useState([]);
  const [comentario, setComentario] = useState("");
  const [estrellas, setEstrellas] = useState(0);
  const [hover, setHover] = useState(0);
  const [editandoId, setEditandoId] = useState(null);
  const [comentarioEditado, setComentarioEditado] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user) setUsuarioActual(user.nombre);
  }, []);

  const cargarComentarios = async () => {
    const { data } = await cliente
      .from("comentario")
      .select("*")
      .eq("libro_id", libroId)
      .order("fecha", { ascending: false });

    setComentarios(data || []);
  };

  useEffect(() => {
    cargarComentarios();
  }, [libroId]);

  const promedio = comentarios.length
    ? comentarios.reduce((acc, c) => acc + c.estrellas, 0) / comentarios.length
    : 0;

  const sendComentario = async (e) => {
    e.preventDefault();
    if (!comentario.trim() || estrellas === 0 || !usuarioActual) {
      toast.error("Debes escribir un comentario y seleccionar una valoración.");
      return;
    }

    const { error } = await cliente.from("comentario").insert({
      libro_id: libroId,
      nombre_usuario: usuarioActual,
      comentario,
      estrellas,
    });

    if (!error) {
      setComentario("");
      setEstrellas(0);
      setHover(0);
      setMostrarFormulario(false);
      toast.success("¡Comentario enviado!");
      cargarComentarios();
    }
  };

  const guardarEdicion = async () => {
     if (!comentarioEditado.trim()) {
      toast.error("El comentario no puede estar vacío.");
      return;
    }

    const { error } = await cliente
      .from("comentario")
      .update({ comentario: comentarioEditado })
      .eq("id", editandoId);

    if (!error) {
      setEditandoId(null);
      toast.success("Comentario editado");
      cargarComentarios();
    }
  };

  const eliminarComentario = async (id) => {
    const { error } = await cliente.from("comentario").delete().eq("id", id);
    if (!error) {
      toast.info("Comentario eliminado");
      cargarComentarios();
    }
  };

  return (
    <section className=" pb-6 px-4 sm:px-0">
      <div className="max-w-5xl mx-auto bg-purple-100 p-8 rounded-2xl shadow-md">
        <h3 className="text-3xl font-bold text-purple-700 text-center mb-4">
          Comentarios
        </h3>

        {comentarios.length > 0 && (
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600">Valoración promedio</p>
            <div className="flex justify-center">
              <Estrellas valor={Math.round(promedio)} className="text-3xl" />
            </div>
            <p className="text-xs text-gray-500">
              {comentarios.length} comentario(s)
            </p>
          </div>
        )}

        {usuarioActual && !mostrarFormulario && (
          <div className="text-center mb-6">
            <button
              onClick={() => setMostrarFormulario(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition"
            >
              Añadir comentario
            </button>
          </div>
        )}

        {usuarioActual && mostrarFormulario && (
          <form
            onSubmit={sendComentario}
            className="space-y-4 mb-6 bg-white rounded-lg p-6 shadow"
          >
            <h4 className="text-xl font-semibold text-purple-700 mb-2">
              Deja tu opinión
            </h4>
            <Estrellas
              valor={estrellas}
              hover={hover}
              onSelect={(s, isHover) =>
                isHover ? setHover(s) : setEstrellas(s)
              }
              className="text-4xl"
            />
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Escribe tu comentario..."
              className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:ring-2 focus:ring-purple-400"
              rows={4}
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setMostrarFormulario(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded shadow transition"
              >
                Enviar comentario
              </button>
            </div>
          </form>
        )}

        {!usuarioActual && (
          <p className="text-center text-sm text-gray-500 mb-6">
            <Link
              to="/ingreso"
              className="font-medium text-purple-700 hover:underline"
            >
              Inicia sesión
            </Link>{" "}
            para dejar un comentario.
          </p>
        )}

        <div className="space-y-4 max-h-[400px] overflow-y-auto px-1">
          {comentarios.length === 0 ? (
            <p className="text-gray-600 text-center">
              Aún no hay comentarios. ¡Sé el primero en opinar!
            </p>
          ) : (
            comentarios.map((c) => (
              <ComentarioCard
                key={c.id}
                comentario={c}
                usuarioActual={usuarioActual}
                editando={editandoId}
                comentarioEditado={comentarioEditado}
                setComentarioEditado={setComentarioEditado}
                setEditandoId={setEditandoId}
                guardarEdicion={guardarEdicion}
                onEdit={() => {
                  setEditandoId(c.id);
                  setComentarioEditado(c.comentario);
                }}
                onDelete={eliminarComentario}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ComentariosLibro;
