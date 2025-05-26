import { useEffect, useState } from "react";
import { cliente } from "../../conexionApi";
import { Sparkles } from "lucide-react";


const banners = [
  {
    href: "/generos",
    img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1200&q=80",
    title: "Explora géneros",
    desc: "Fantasía, romance, misterio y más.",
  },
  {
    href: "/novedades",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
    title: "Novedades",
    desc: "Recién llegados a la biblioteca.",
  },
];

const BannersSlider = () => {
  const [recomendacion, setRecomendacion] = useState(null);

  useEffect(() => {
    const cargarRecomendacion = async () => {
      const hoy = new Date().toISOString().split("T")[0];
      const guardado = JSON.parse(localStorage.getItem("libroDelDia"));

      if (guardado?.fecha === hoy) {
        setRecomendacion(guardado.libro);
        return;
      }

      const { data: libros } = await cliente
        .from("libro")
        .select("id, titulo, portada_url, descripcion")
        .neq("portada_url", null)
        .limit(100);

      if (!libros?.length) return;

      const aleatorio = libros[Math.floor(Math.random() * libros.length)];
      setRecomendacion(aleatorio);
      localStorage.setItem(
        "libroDelDia",
        JSON.stringify({ fecha: hoy, libro: aleatorio })
      );
    };

    cargarRecomendacion();
  }, []);

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 md:px-10 space-y-12">
   
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {banners.map(({ href, img, title, desc }, i) => (
          <a
            key={i}
            href={href}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition block"
          >
            <img src={img} alt={title} className="h-36 w-full object-cover" />
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-1">
                {title}
              </h4>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          </a>
        ))}
      </div>

      {recomendacion && (
        <a
          href={`/libros/${recomendacion.id}`}
          className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md hover:shadow-lg transition px-4 py-6 flex flex-col md:flex-row items-center md:items-center gap-4"
        >
          <img
            src={recomendacion.portada_url}
            alt={recomendacion.titulo}
            className="w-28 h-40 object-cover rounded-lg"
          />
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs text-purple-600 font-semibold uppercase mb-1 flex items-center justify-center gap-1">
              <Sparkles size={14} /> Recomendación del Día
            </p>

            <h3 className="text-xl font-bold text-gray-900 leading-snug">
              {recomendacion.titulo}
            </h3>

            <p className="text-sm text-gray-600 mt-1 line-clamp-3 max-w-xl mx-auto md:mx-0">
              {recomendacion.descripcion || "Una lectura especial para hoy."}
            </p>
          </div>
        </a>
      )}
    </section>
  );
};

export default BannersSlider;
