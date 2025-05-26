import * as XLSX from "xlsx";
import { cliente } from "../../conexionApi";

export default function ExportarExcel() {
  const exportarXLSX = async () => {
    // Usuarios
    const { data: usuarios, error: errorUsuarios } = await cliente.from("usuario").select(`
      id, nombre, apellidos, email, subscripcion, usuario, fecha_registro
    `);
    if (errorUsuarios || !usuarios) {
      console.error("Error al obtener usuarios:", errorUsuarios);
      return;
    }

    // Libros
    const { data: libros, error: errorLibros } = await cliente.from("libro").select(`
      id, titulo, genero, descripcion, fecha_creacion
    `);
    if (errorLibros || !libros) {
      console.error("Error al obtener libros:", errorLibros);
      return;
    }

    // Autores
    const { data: autores, error: errorAutores } = await cliente.from("autor").select(`
      id, nombre, nacionalidad, fecha_nacimiento, fecha_fallecimiento, biografia
    `);
    if (errorAutores || !autores) {
      console.error("Error al obtener autores:", errorAutores);
      return;
    }

    const formatearFecha = (fecha) =>
      fecha ? new Date(fecha).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) : "—";

    const hojaUsuarios = [...usuarios].sort((a, b) => a.id - b.id).map((u) => ({
      ID: u.id,
      Nombre: u.nombre,
      Apellidos: u.apellidos,
      Usuario: u.usuario,
      Email: u.email,
      Subscripción: u.subscripcion,
      "Fecha de Registro": formatearFecha(u.fecha_registro),
    }));

    const hojaLibros = [...libros].sort((a, b) => a.id - b.id).map((l) => ({
      ID: l.id,
      Título: l.titulo,
      Género: l.genero,
      Descripción: l.descripcion || "—",
      "Fecha de Creación": formatearFecha(l.fecha_creacion),
    }));

    const hojaAutores = [...autores].sort((a, b) => a.id - b.id).map((a) => ({
      ID: a.id,
      Nombre: a.nombre,
      Nacionalidad: a.nacionalidad || "—",
      "Fecha de Nacimiento": formatearFecha(a.fecha_nacimiento),
      "Fecha de Fallecimiento": formatearFecha(a.fecha_fallecimiento) || "-",
      Biografía: a.biografia || "—",
    }));

    const libroXLSX = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libroXLSX, XLSX.utils.json_to_sheet(hojaUsuarios), "Usuarios");
    XLSX.utils.book_append_sheet(libroXLSX, XLSX.utils.json_to_sheet(hojaLibros), "Libros");
    XLSX.utils.book_append_sheet(libroXLSX, XLSX.utils.json_to_sheet(hojaAutores), "Autores");

    XLSX.writeFile(libroXLSX, "Resumen_LibriX.xlsx");
  };

  return (
    <button
      onClick={exportarXLSX}
      className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
    >
      Exportar Datos
    </button>
  );
}
