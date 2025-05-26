import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen text-gray-800 flex flex-col items-center px-6 py-16">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-6">Acerca de Librix</h1>
          <p className="text-lg md:text-xl mb-8 leading-relaxed">
            En <span className="font-semibold text-purple-600">Librix</span>, creemos que la lectura transforma. 
            Nuestro objetivo es conectar a los lectores con historias increíbles, desde clásicos hasta nuevas voces emergentes.
          </p>
          <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 border border-purple-200">
            <h2 className="text-2xl font-semibold text-purple-600 mb-4">¿Quiénes somos?</h2>
            <p className="text-base md:text-lg mb-6">
              Somos un equipo apasionado por los libros, la tecnología y el acceso al conocimiento. Librix nace con la intención de ser más que un catálogo: queremos crear una comunidad de lectores, compartir recomendaciones y descubrir juntos nuevas aventuras literarias.
            </p>
            <h2 className="text-2xl font-semibold text-purple-600 mb-4">Nuestra misión</h2>
            <p className="text-base md:text-lg">
              Democratizar el acceso a la literatura, apoyar a autores independientes y ofrecer una experiencia de lectura personalizada y moderna. Librix es más que una plataforma, es tu compañera de lectura.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AboutUs;

