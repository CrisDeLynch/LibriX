import { Link } from "react-router";
import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-fuchsia-50 via-purple-50 to-indigo-50 text-violet-800 mt-auto border-t border-fuchsia-100 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-2xl font-extrabold text-fuchsia-700 mb-3 drop-shadow">
            <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Librix
            </span>
          </h4>
          <ul className="space-y-2 text-base font-medium">
            <li>
              <Link to="/acerca" className="hover:text-fuchsia-700 transition-colors">Acerca de</Link>
            </li>
            <li>
              <Link to="/contacto" className="hover:text-fuchsia-700 transition-colors">Contacto</Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-fuchsia-700 transition-colors">Preguntas frecuentes</Link>
            </li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="flex flex-col items-center justify-center border-t border-fuchsia-100 pt-7 md:border-t-0 md:pt-0 md:border-x md:px-8">
          <h4 className="text-2xl font-extrabold text-fuchsia-700 mb-5">Contacto</h4>
          <p className="text-base flex items-center justify-center gap-1 mb-2">
           
            <a href="mailto:librixonline@gmail.com" className="hover:text-fuchsia-700 underline underline-offset-2 transition-colors">
              librixonline@gmail.com
            </a>
          </p>
          <p className="text-base flex items-center justify-center gap-1">
          
            +34 234 567 890
          </p>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-2xl font-extrabold text-fuchsia-700 mb-5">Síguenos</h4>
          <div className="flex justify-center space-x-5">
            <a
              href="https://twitter.com/librixonline"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-125 hover:text-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 rounded"
              aria-label="Twitter"
            >
              <FaTwitter size={26} />
            </a>
            <a
              href="https://instagram.com/librixonline"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-125 hover:text-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 rounded"
              aria-label="Instagram"
            >
              <FaInstagram size={26} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-125 hover:text-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 rounded"
              aria-label="GitHub"
            >
              <FaGithub size={26} />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-fuchsia-100 via-purple-100 to-indigo-100 text-center py-4 text-sm text-fuchsia-700 border-t border-fuchsia-100">
        &copy; {new Date().getFullYear()} <span className="font-semibold tracking-wide">Librix</span>. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
