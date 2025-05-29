import { Link } from "react-router";

export default function TarjetaAutor({ autor }) {
  if (!autor) return null;

  const formatFecha = (fecha) => {
    if (!fecha) return null;
    return new Date(fecha).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="mt-8 mb-20 max-w-5xl mx-auto bg-white/90 border border-violet-200 rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row gap-6 items-start backdrop-blur">
      <img
        src={autor.foto_url}
        alt={`Foto de ${autor.nombre}`}
        className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-xl border border-violet-100 shadow-sm"
      />
      <div className="flex-1 space-y-2 text-left">
        <h3 className="text-xl font-semibold text-violet-800">{autor.nombre}</h3>
        <p className="text-sm text-gray-500">{autor.nacionalidad}</p>
        <p className="text-sm text-gray-500">
          {formatFecha(autor.fecha_nacimiento)}
          {autor.fecha_fallecimiento && ` - ${formatFecha(autor.fecha_fallecimiento)}`}
        </p>
        <p className="text-sm text-gray-700 italic leading-snug mt-2">
          {autor.biografia}
        </p>
        <Link
          to={`/libros/autor/${autor.id}`}
          className="inline-block mt-3 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-full transition"
        >
          Ver obras
        </Link>
      </div>
    </div>
  );
}
