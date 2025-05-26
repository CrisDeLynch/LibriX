import { useState } from "react";
import { Link } from "react-router";

const BookCard = ({ id, titulo, autor, portadaUrl, descripcion }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative w-40 h-60 mx-auto rounded-xl shadow-lg overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={portadaUrl || "/fallback.jpg"}
        alt={titulo}
        className={`w-full h-full object-cover transition-transform duration-500 ${
          hovered ? "scale-110" : "scale-100"
        }`}
      />

      <div
        className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 text-white p-3 flex flex-col justify-center items-center text-center transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <h3 className="text-base font-bold mb-1">{titulo}</h3>
        <p className="text-xs mb-3">
          {typeof descripcion === "string"
            ? descripcion.length > 80
              ? descripcion.substring(0, 80) + "..."
              : descripcion
            : ""}
        </p>
        <Link
          to={`/libros/${id}`}
          className="bg-white text-violet-700 text-xs font-semibold px-3 py-1.5 rounded hover:bg-violet-100 transition"
        >
          Explora
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
