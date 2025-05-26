import { Link } from "react-router";
import { useEffect, useState } from "react";
import { cliente } from "../conexionApi";

const Home = () => {
  const [generosAleatorios, setGenerosAleatorios] = useState([]);

  useEffect(() => {
    const fetchGenerosDesdeLibros = async () => {
      const { data, error } = await cliente.from("libro").select("genero");
      if (!error && data) {
        const generosUnicos = [...new Set(data.map((libro) => libro.genero).filter(Boolean))];
        const aleatorios = generosUnicos.sort(() => 0.5 - Math.random()).slice(0, 4);
        setGenerosAleatorios(aleatorios);
      }
    };
    fetchGenerosDesdeLibros();
  }, []);

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth font-sans bg-gradient-to-br from-fuchsia-50 via-indigo-50 to-white dark:from-zinc-900 dark:via-fuchsia-950 dark:to-zinc-900 text-gray-800">

      {/* SECCION 1 */}
      <header className="snap-start h-screen relative bg-indigo-900 text-white flex items-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-indigo-900 to-fuchsia-900 opacity-90"></div>
          <div className="absolute inset-0 bg-cover bg-center opacity-10 animate-pulse" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-indigo-900 to-transparent" />
        </div>
        <div className="container mx-auto px-6 z-10 relative flex flex-col justify-center min-h-[80vh]">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-7 drop-shadow-[0_5px_40px_#a21caf55] text-left w-full">
            Explora, descubre y lee tus libros favoritos <span className="bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">en cualquier lugar</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 text-indigo-100 max-w-3xl text-left">
            LIBRIX, tu biblioteca digital. Siempre contigo.
          </p>
          <div className="flex flex-col sm:flex-row gap-7 items-start">
            <Link to="/registro" className="bg-gradient-to-r from-fuchsia-500 to-indigo-600 text-white font-bold py-4 px-12 rounded-full shadow-xl hover:scale-105 active:scale-100 transition text-lg ring-2 ring-fuchsia-200 hover:ring-indigo-300">
              Regístrate ahora
            </Link>
            <Link to="/ingreso" className="underline underline-offset-4 text-indigo-100 text-lg hover:text-white hover:font-semibold transition mt-4 sm:mt-0">
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </div>
      </header>

      {/* SECCION 2 */}
      <section className="snap-start h-screen flex flex-col justify-center items-center bg-pink-50 text-center px-6">
        <h2 className="text-4xl font-extrabold mb-5 text-purple-800 drop-shadow">
          Miles de libros, una sola biblioteca
        </h2>
        <p className="text-lg text-purple-700 mb-7 max-w-2xl">
          Con LIBRIX puedes llevar toda tu colección literaria a donde quieras. Lecturas sin límites, sin importar el dispositivo.
        </p>
        <Link to="/libros" className="bg-gradient-to-r from-indigo-600 to-fuchsia-500 text-white py-4 px-12 rounded-full font-semibold shadow-md text-lg hover:scale-105 transition-all duration-300">
          Empieza a explorar
        </Link>
      </section>

      {/* SECCION 3 */}
      <section className="snap-start h-screen flex flex-col justify-center items-center bg-white text-center px-6">
        <h2 className="text-4xl font-bold mb-14 text-indigo-800">
          Nuestra comunidad crece cada día
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {[{ value: "+10k", label: "Lectores activos" }, { value: "+5k", label: "Libros disponibles" }, { value: "24/7", label: "Acceso online" }, { value: "100%", label: "Compatibilidad móvil" }].map((stat, i) => (
            <div key={i} className="p-9 bg-gradient-to-br from-fuchsia-100 to-indigo-100 rounded-2xl shadow-lg border-2 border-fuchsia-200 hover:-translate-y-1 hover:shadow-2xl transition-all">
              <p className="text-5xl font-black text-fuchsia-700 mb-2">{stat.value}</p>
              <p className="text-base text-indigo-800 font-semibold tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

 
      <section className="snap-start h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 text-center px-6">
        <h2 className="text-4xl font-bold mb-7 text-purple-800">
          ¿No sabes por dónde empezar?
        </h2>
        <p className="text-lg text-gray-700 mb-9">
          Descubre una selección aleatoria de géneros para inspirarte hoy.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {generosAleatorios.map((genero, i) => (
            <Link key={i} to={`/libros/genero/${encodeURIComponent(genero)}`} className="flex items-center justify-center bg-white/95 hover:bg-fuchsia-100 border border-fuchsia-100 transition shadow-lg rounded-2xl p-7 text-xl font-semibold text-indigo-800 hover:scale-105 active:scale-100 duration-200 min-h-[78px]">
              {genero}
            </Link>
          ))}
        </div>
      </section>


      <section className="snap-start h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-center px-6">
        <h2 className="text-4xl font-bold mb-16 text-indigo-800">
          Elige tu plan
        </h2>
        <div className="grid md:grid-cols-2 gap-16">
          {[{
            title: "Mensual",
            price: <>9,99<span className="text-2xl align-super">€/mes</span></>,
            badge: "Más popular",
            color: "from-fuchsia-500 to-indigo-500",
          }, {
            title: "Anual",
            price: <>99,99<span className="text-xl align-super">€/año</span></>,
            badge: "Ahorra 20%",
            color: "from-indigo-500 to-fuchsia-500",
          }].map((plan, i) => (
            <div key={i} className="relative bg-white p-14 rounded-3xl shadow-xl border-2 border-fuchsia-100 hover:scale-[1.035] hover:border-fuchsia-300 transition-all duration-200">
              <span className="absolute -top-4 left-7 bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white px-5 py-2 text-xs rounded-full shadow font-bold tracking-wider">
                {plan.badge}
              </span>
              <h3 className="text-2xl font-bold text-indigo-700 mb-4">{plan.title}</h3>
              <p className="text-5xl font-extrabold text-fuchsia-700 mb-6">{plan.price}</p>
              <p className="mb-8 text-base text-gray-700">
                Acceso ilimitado a todos los libros de la plataforma.
              </p>
              <Link to="/registro" className="inline-block bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white px-10 py-4 rounded-full hover:bg-indigo-700 font-bold shadow-lg transition text-lg hover:scale-105">
                Empezar ahora
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="snap-start h-screen flex flex-col justify-center items-center bg-white text-center px-6">
        <h2 className="text-4xl font-bold mb-10 text-indigo-800">Síguenos en redes sociales</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Únete a nuestra comunidad y mantente al día con novedades, lanzamientos y eventos.
        </p>
        <div className="flex gap-10 justify-center items-center">
          <a href="https://twitter.com/librixonline" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 text-3xl">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com/librixonline" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 text-3xl">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://github.com/crisdelynch/libriX" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 text-3xl">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

    </div>
  );
};

export default Home;