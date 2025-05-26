import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const faqs = [
  {
    pregunta: "¿Qué es Librix?",
    respuesta:
      "Librix es una plataforma digital que conecta lectores con libros, autores y contenido literario de calidad. Nuestro objetivo es fomentar la lectura y facilitar el acceso a todo tipo de obras."
  },
  {
    pregunta: "¿Cómo puedo contactar con el equipo de Librix?",
    respuesta:
      "Puedes enviarnos un mensaje desde la página de contacto o escribirnos directamente a librixonline@gmail.com. Estaremos encantados de ayudarte."
  },
  {
    pregunta: "¿Librix es gratuito?",
    respuesta:
      "No. Librix funciona mediante un sistema de suscripción mensual o anual. Puedes consultar los planes disponibles desde tu cuenta o sección de suscripciones."
  },
  {
    pregunta: "¿Puedo recomendar libros o autores?",
    respuesta:
      "¡Por supuesto! Nos encanta recibir recomendaciones. Escríbenos a través del formulario de contacto o por redes sociales."
  },
  {
    pregunta: "¿Dónde puedo ver mis libros favoritos?",
    respuesta:
      "Una vez que inicias sesión, tendrás acceso a tu perfil, donde puedes gestionar tus libros favoritos y tus lecturas."
  }
];

const FAQ = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen text-gray-800 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-purple-700 mb-10 text-center">Preguntas Frecuentes</h1>

          <div className="space-y-6">
            {faqs.map((item, index) => (
              <div key={index} className="bg-white shadow-md border border-purple-200 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-purple-600 mb-2">{item.pregunta}</h2>
                <p className="text-gray-700">{item.respuesta}</p>
              </div>
            ))} 
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default FAQ;
