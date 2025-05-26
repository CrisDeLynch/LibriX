import { Link } from "react-router";

export default function LibroCard({ libro }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-violet-100">
      <Link to={`/libros/${libro.id}`} className="block group h-full">
        <div className="relative w-full h-64 bg-gray-100 overflow-hidden flex items-center justify-center">
          <img
            src={libro.portada_url}
            alt={libro.titulo}
            className="object-contain h-full w-full transition duration-300 group-hover:brightness-95"
          />
        </div>
        <div className="p-4">
          <h3 className="text-base font-bold text-violet-700 group-hover:text-violet-900 mb-2 line-clamp-2">
            {libro.titulo}
          </h3>
          {libro.autor?.nombre && (
            <p className="text-sm text-gray-600 mb-2">
              {libro.autor.nombre}
            </p>
          )}

          {libro.genero && (
            <span className="inline-block bg-violet-100 text-violet-700 text-xs font-semibold px-3 py-1 rounded-full">
              {libro.genero}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
