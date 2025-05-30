import { Routes, Route, Navigate } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Books from "./pages/Books";
import EpubReader from "./components/cLector/EpubReader";
import LecturasUsuario from "./pages/LecturasUsuario";
import Catalogo from "./pages/Catalogo";
import Detalles from "./pages/Detalles";
import AdminDashboard from "./admin/aDashboard/AdminDashboard";
import LibrosAdmin from "./admin/aListaLibros/LibrosAdmin";
import NoEncontrada from "./pages/PaginaNoEncontrada";
import AñadirLibro from "./admin/AñadirLibro";
import Generos from "./pages/Generos";
import LibrosGenero from "./pages/LibrosGenero";
import AccesoDenegado from "./pages/AccesoDenegado";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutUs from "./pagesFooter/AboutUs";
import Contact from "./pagesFooter/Contact";
import FAQ from "./pagesFooter/FAQ";
import RenovarSuscripcion from "./pages/RenovarSuscripcion";
import CancelarSuscripcion from "./pages/CancelarSuscripcion";
import Novedades from "./pages/Novedades";
import Recomendados from "./pages/Recomendados";
import UsuariosAdmin from "./admin/aUsuarios/UsuariosAdmin";
import SuscripcionesAdmin from "./admin/aSuscripciones/SuscripcionesAdmin";
import AgregarAutor from "./admin/aAutores/AgregarAutor";
import ListaAutores from "./admin/aAutores/ListarAutores";
import VistaObrasAutor from "./pages/VistaObrasAutor";
import LibrosFavoritos from "./pages/LibrosFavoritos";
import Autores from "./pages/Autores";

import PerfilUsuario from "./pages/PerfilUsuario";

const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("usuario"));
  return user && user.rol === "admin";
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/acceso-denegado" />;
};

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/ingreso" element={<Login />} />
        <Route path="/libros" element={<Books />} />
        <Route path="/libros/:id" element={<Detalles />} />
        <Route path="/libros/autor/:id" element={<VistaObrasAutor />} />
        <Route path="/libros/genero/:genero" element={<LibrosGenero />} />
        <Route path="/lectura/:id" element={<EpubReader />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/generos" element={<Generos />} />
        <Route path="/usuario/lecturas" element={<LecturasUsuario />} />
        <Route path="/usuario/perfil" element={<PerfilUsuario />} />
        <Route path="/suscripcion/renovar" element={<RenovarSuscripcion />} />
        <Route path="/suscripcion/cancelar" element={<CancelarSuscripcion />} />
        <Route path="/acerca" element={<AboutUs />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/recomendados" element={<Recomendados />} />
        <Route path="/favoritos" element={<LibrosFavoritos />} />
        <Route path="/autores" element={<Autores />} />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={<PrivateRoute element={<AdminDashboard />} />}
        />
        <Route
          path="/admin/libros"
          element={<PrivateRoute element={<LibrosAdmin />} />}
        />
        <Route
          path="/admin/libros/agregar"
          element={<PrivateRoute element={<AñadirLibro />} />}
        />
        <Route
          path="/admin/usuarios"
          element={<PrivateRoute element={<UsuariosAdmin />} />}
        />
        <Route
          path="/admin/suscripciones"
          element={<PrivateRoute element={<SuscripcionesAdmin />} />}
        />
        <Route
          path="/admin/autores/agregar"
          element={<PrivateRoute element={<AgregarAutor />} />}
        />
        <Route
          path="/admin/autores"
          element={<PrivateRoute element={<ListaAutores />} />}
        />

        {/* Otros */}
        <Route path="/acceso-denegado" element={<AccesoDenegado />} />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
    </>
  );
};

export default App;
