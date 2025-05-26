import { Link } from "react-router";
import { FaQuestionCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NoEncontrada = () => {
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center bg-gray-50">
        <div className="flex flex-col items-center mb-5">
          <FaQuestionCircle className="text-6xl text-fuchsia-600 mb-4 drop-shadow-lg" />
          <h2 className="text-3xl font-bold text-fuchsia-800 mb-2">
            Página no encontrada
          </h2>
        </div>
        <p className="text-gray-600 mb-4 max-w-md">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link
          to="/libros"
          className="inline-block bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold px-7 py-3 rounded-full shadow transition"
        >
          Volver al inicio
        </Link>
      </main>
      <Footer />
    </>
  );
};

export default NoEncontrada;
