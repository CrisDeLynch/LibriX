import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { ReactReader } from "react-reader";
import { cliente } from "../../conexionApi";
import ReaderControls from "./ReaderControls";
import ErrorModal from "../cLector/ErrorModal";

const EpubReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const referenciaRendicion = useRef(null);
  const [urlEpub, setUrlEpub] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [tamanoFuente, setTamanoFuente] = useState(100);
  const [colorFondo, setColorFondo] = useState("white");
  const [colorTexto, setColorTexto] = useState("black");
  const [familiaFuente, setFamiliaFuente] = useState("Arial");
  const [mostrarError, setMostrarError] = useState(false);
  const [cargando, setCargando] = useState(true);
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Cargar progreso guardado (CFI)
  const cargarProgresoGuardado = async () => {
    if (!usuario) return;

    const { data, error } = await cliente
      .from("lectura_usuario")
      .select("cfi")
      .eq("usuario_id", usuario.id)
      .eq("libro_id", id)
      .maybeSingle();

    if (data && data.cfi) {
      setUbicacion(data.cfi);
    } else if (error) {
      console.error("Error al cargar CFI:", error);
    }
  };

  // Cargar libro y verificar suscripción
  useEffect(() => {
    if (!usuario) {
      setMostrarError(true);
      return;
    }

    const verificarSuscripcion = async () => {
      const { data, error } = await cliente
        .from("suscripcion")
        .select("fecha_fin")
        .eq("usuario_id", usuario.id)
        .single();

      if (error || !data || new Date(data.fecha_fin) < new Date()) {
        setMostrarError(true);
      }
    };

    const obtenerLibro = async () => {
      const { data, error } = await cliente
        .from("libro")
        .select("archivo_url, genero")
        .eq("id", id)
        .single();

      if (data) {
        setUrlEpub(data.archivo_url);
        await cargarProgresoGuardado();
      } else {
        console.error("Error al cargar el libro:", error);
      }

      setCargando(false);
    };

    verificarSuscripcion();
    obtenerLibro();
  }, [id, usuario]);

  // Aplicar temas y estilos
  useEffect(() => {
    if (referenciaRendicion.current) {
      referenciaRendicion.current.themes.fontSize(`${tamanoFuente}%`);
      referenciaRendicion.current.themes.override(
        "background-color",
        colorFondo
      );
      referenciaRendicion.current.themes.override("color", colorTexto);
      referenciaRendicion.current.themes.override("font-family", familiaFuente);
    }
  }, [tamanoFuente, colorFondo, colorTexto, familiaFuente]);

  // Guardar progreso (CFI)
  const manejarCambioDeUbicacion = async (nuevaUbicacion) => {
    if (nuevaUbicacion === ubicacion) return;
    setUbicacion(nuevaUbicacion);

    if (usuario) {
      const { error } = await cliente.from("lectura_usuario").upsert(
        {
          usuario_id: usuario.id,
          libro_id: id,
          cfi: nuevaUbicacion,
          ultima_lectura: new Date().toISOString(),
        },
        { onConflict: ["usuario_id", "libro_id"] }
      );
      if (error) console.error("Error al guardar progreso:", error);
    }
  };

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      {mostrarError && (
        <ErrorModal
          show={true}
          message={
            usuario
              ? "No tienes suscripción. Renueva para seguir leyendo."
              : "Debes registrarte para acceder."
          }
          mainText={usuario ? "Renovar Suscripción" : "Registrarse"}
          registerText={usuario ? "Renovar Suscripción" : "Registrarse"}
          backText="Volver"
          onRegister={() =>
            navigate(usuario ? "/suscripcion/renovar" : "/registro")
          }
          onBack={() => navigate(-1)}
        />
      )}

      {!mostrarError && (
        <>
          <ReaderControls
            onBack={() => navigate(-1)}
            fontSize={tamanoFuente}
            setFontSize={setTamanoFuente}
            backgroundColor={colorFondo}
            setBackgroundColor={setColorFondo}
            setTextColor={setColorTexto}
            fontFamily={familiaFuente}
            setFontFamily={setFamiliaFuente}
          />

          {cargando ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "60vh" }}
            >
              <div className="text-center">
                <div
                  className="spinner-border text-primary"
                  role="status"
                  style={{ width: "3rem", height: "3rem" }}
                >
                  <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando libro...</p>
              </div>
            </div>
          ) : (
            urlEpub && (
              <ReactReader
                url={urlEpub}
                location={ubicacion}
                locationChanged={manejarCambioDeUbicacion}
                getRendition={(rendition) => {
                  referenciaRendicion.current = rendition;
                  rendition.book.ready.then(() => {
                    rendition.book.locations.generate(1600);
                  });
                }}
                epubOptions={{ allowScriptedContent: true }}
                className="react-reader"
              />
            )
          )}
        </>
      )}
    </div>
  );
};

export default EpubReader;
