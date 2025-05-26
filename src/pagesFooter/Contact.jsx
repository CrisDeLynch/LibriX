import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const form = useRef();
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(false);

  const enviarCorreo = (e) => {
    e.preventDefault();

    const formElement = form.current;

    emailjs
      .sendForm(
        "service_4d4wa2p",
        "template_bgc701b",
        formElement,
        "NQJoRv0bpZmm5XGB_"
      )
      .then(() => {
        emailjs.sendForm(
          "service_4d4wa2p",
          "template_autoreply",
          formElement,
          "NQJoRv0bpZmm5XGB_"
        );
        setEnviado(true);
        setError(false);
        form.current.reset();
      })
      .catch((err) => {
        console.error(err.text);
        setError(true);
      });
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen text-gray-800 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 md:p-12 border border-purple-200">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-6 text-center">
            Contacto
          </h1>
          <p className="text-center text-md md:text-lg mb-8">
            ¿Tienes alguna pregunta, sugerencia o simplemente quieres saludar?
            Completa el formulario y te responderemos lo antes posible.
          </p>

          <form ref={form} onSubmit={enviarCorreo} className="space-y-6">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-medium mb-1 text-purple-800"
              >
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                required
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1 text-purple-800"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium mb-1 text-purple-800"
              >
                Asunto
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Asunto del mensaje"
              />
            </div>

            <div>
              <label
                htmlFor="mensaje"
                className="block text-sm font-medium mb-1 text-purple-800"
              >
                Mensaje
              </label>
              <textarea
                name="mensaje"
                id="mensaje"
                rows="5"
                required
                className="w-full px-4 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Escribe tu mensaje..."
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-lg transition duration-300"
              >
                Enviar mensaje
              </button>
            </div>
          </form>

          {enviado && (
            <p className="mt-6 text-green-600 text-center font-medium">
              ¡Mensaje enviado con éxito!
            </p>
          )}

          {error && (
            <p className="mt-6 text-red-600 text-center font-medium">
              Ocurrió un error al enviar el mensaje. Inténtalo más tarde.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Contact;
