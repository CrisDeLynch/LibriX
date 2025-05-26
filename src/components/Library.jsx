import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { cliente } from "../conexionApi";
import { RingLoader } from "react-spinners";
import BannersSlider from "../components/cLibrary/BannersSlider";
import SectionWithSlider from "../components/cLibrary/SectionWithSlider";
import SectionHeader from "../components/cLibrary/SectionHeader";

const Library = () => {
  const [libros, setLibros] = useState([]);
  const [recomendados, setRecomendados] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = localStorage.getItem("usuario");
    if (u) setUserId(JSON.parse(u).id);
  }, []);

  useEffect(() => {
    cliente.from("libro").select("*").order("id", { ascending: false }).limit(6)
      .then(({ data }) => setLibros(data || []));
  }, []);

  useEffect(() => {
    if (!userId) return setLoading(false);
    const getRecomendados = async () => {
      const { data: lecturas } = await cliente.from("lectura_usuario")
        .select("libro_id").eq("usuario_id", userId);
      if (!lecturas?.length) return setLoading(false);
      const ids = lecturas.map(l => l.libro_id);
      const { data: generosData } = await cliente.from("libro")
        .select("genero").in("id", ids);
      const generos = [...new Set(generosData.map(g => g.genero))];
      const { data } = await cliente.from("libro")
        .select("*").in("genero", generos).limit(5);
      setRecomendados(data || []);
      setLoading(false);
    };
    getRecomendados();
  }, [userId]);

  const anyLoading = loading || libros.length === 0;

  return (
    <div className="bg-gradient-to-b from-violet-50 via-white to-white">
      {anyLoading && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-white bg-opacity-70">
          <RingLoader color="#a970ff" loading size={80} />
        </div>
      )}
      <BannersSlider />

      <div className="bg-white max-w-7xl mx-auto px-4 py-4">
        {libros.length > 0 && (
          <section className="mb-8">
            <SectionHeader
              title="Nuevos en la Biblioteca"
              subtitle="Últimos libros añadidos, ¡descúbrelos ahora!"
              link="/novedades"
            />
            <SectionWithSlider libros={libros} />
          </section>
        )}

        {userId && recomendados.length > 0 && (
          <section className="mb-8">
            <SectionHeader
              title="Para ti"
              subtitle="Sugerencias de lectura según tus intereses."
              link="/recomendados"
            />
            <SectionWithSlider libros={recomendados} />
          </section>
        )}
      </div>

      <style>
        {`
          .slick-dots li button:before { margin-top:5px; font-size:8px; color:#a970ff;}
          .slick-dots li.slick-active button:before { color:#7c3aed;}
        `}
      </style>
    </div>
  );
};

export default Library;
