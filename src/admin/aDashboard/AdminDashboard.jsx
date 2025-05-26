import { useState, useEffect } from "react";
import { cliente } from "../../conexionApi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AdminNav from "./AdminNav";
import EstadisticasResumen from "../aDashboard/EstadisticasResumen";
import UsuariosLibrosPorMes from "../aDashboard/UsuariosLibrosPorMes";
import Loading from "../../components/Loading";

export default function AdminDashboard() {
  const [totalLibros, setTotalLibros] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalSuscripciones, setTotalSuscripciones] = useState(0);
  const [totalLecturas, setTotalLecturas] = useState(0);
  const [usuariosPorMes, setUsuariosPorMes] = useState([]);
  const [ultimosLibros, setUltimosLibros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: libros = [] } = await cliente.from("libro").select("id, fecha_creacion, genero, titulo, portada_url");
      const { data: usuarios = [] } = await cliente.from("usuario").select("id, fecha_registro");
      const { data: suscripciones = [] } = await cliente.from("suscripcion").select("id");
      const { data: lecturas = [] } = await cliente.from("lectura_usuario").select("id");

      setTotalLibros(libros.length);
      setTotalUsuarios(usuarios.length);
      setTotalSuscripciones(suscripciones.length);
      setTotalLecturas(lecturas.length);

      const ahora = new Date();
      const meses = Array.from({ length: 12 }, (_, i) => {
        const d = new Date(ahora.getFullYear(), ahora.getMonth() - 11 + i, 1);
        return d.toLocaleString("default", { month: "short", year: "2-digit" });
      });

      const datosMensuales = meses.map((mes) => ({ mes, usuarios: 0, libros: 0 }));

      usuarios.forEach(u => {
        const mes = new Date(u.fecha_registro).toLocaleString("default", { month: "short", year: "2-digit" });
        const elemento = datosMensuales.find(d => d.mes === mes);
        if (elemento) elemento.usuarios += 1;
      });

      libros.forEach(l => {
        const mes = new Date(l.fecha_creacion).toLocaleString("default", { month: "short", year: "2-digit" });
        const elemento = datosMensuales.find(d => d.mes === mes);
        if (elemento) elemento.libros += 1;
      });

      const ultimos = [...libros].sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion)).slice(0, 6);

      setUsuariosPorMes(datosMensuales);
      setUltimosLibros(ultimos);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-violet-700 mb-2 text-center">Panel de Administración</h1>
        <p className="text-gray-600 mb-8 text-center">Resumen y estadísticas del sistema</p>
        <AdminNav />

        {loading ? (
          <Loading />
        ) : (
          <>
            <EstadisticasResumen
              totalLibros={totalLibros}
              totalUsuarios={totalUsuarios}
              totalSuscripciones={totalSuscripciones}
              totalLecturas={totalLecturas}
            />
            <UsuariosLibrosPorMes data={usuariosPorMes} />
           
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
