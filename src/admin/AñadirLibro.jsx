import { useState, useEffect } from "react";
import { cliente } from "../conexionApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Volver from "../components/Volver";
import Loading from "../components/Loading";
import FormularioGenerico from "../admin/FormularioGenerico";
import { toast } from "react-toastify";

const bucket = "LibriX";
const baseUrl = `https://exdklfmxedddztunquou.supabase.co/storage/v1/object/public/${bucket}`;

const AñadirLibro = () => {
  const [autores, setAutores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [preview, setPreview] = useState(null);
  const [datos, setDatos] = useState({
    titulo: "",
    autor_id: "",
    genero: "",
    genero_otro: "",
    descripcion: "",
    archivo: null,
    portada: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const [{ data: autoresData }, { data: librosData }] = await Promise.all([
        cliente.from("autor").select("id, nombre").order("nombre"),
        cliente.from("libro").select("genero"),
      ]);

      const unicos = Array.from(
        new Set(librosData?.map((l) => l.genero).filter(Boolean))
      );
      setAutores(autoresData || []);
      setGeneros(unicos);
      setCargando(false);
    };

    fetchData();
  }, []);

  const campos = [
    {
      name: "portada",
      label: "Portada",
      type: "file",
      required: true,
      accept: "image/*",
      value: datos.portada,
    },
    {
      name: "titulo",
      label: "Título del libro",
      type: "text",
      required: true,
      value: datos.titulo,
    },
    {
      name: "autor_id",
      label: "Autor",
      type: "select",
      required: true,
      value: datos.autor_id,
      placeholder: "Selecciona un autor",
      options: autores.map((a) => ({ value: a.id, label: a.nombre })),
    },
    {
      name: "genero",
      label: "Género",
      type: "select",
      required: true,
      value: datos.genero,
      placeholder: "Selecciona un género",
      options: [
        ...generos.map((g) => ({ value: g, label: g })),
        { value: "otro", label: "Otro (escribir)" },
      ],
      extraInput: {
        when: "otro",
        name: "genero_otro",
        placeholder: "Introduce el género",
        value: datos.genero_otro,
        required: true,
      },
    },
    {
      name: "descripcion",
      label: "Descripción",
      type: "textarea",
      required: true,
      value: datos.descripcion,
    },
    {
      name: "archivo",
      label: "Archivo EPUB",
      type: "file",
      required: true,
      accept: ".epub",
      value: datos.archivo,
    },
  ];

  const updateCampo = (e) => {
    const { name, files, value } = e.target;
    if (files?.[0]) {
      const file = files[0];
      setDatos((prev) => ({ ...prev, [name]: file }));
      if (name === "portada") {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setDatos((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setDatos({
      titulo: "",
      autor_id: "",
      genero: "",
      genero_otro: "",
      descripcion: "",
      archivo: null,
      portada: null,
    });
    setPreview(null);
    document
      .querySelectorAll('input[type="file"]')
      .forEach((el) => (el.value = ""));
  };

  const subirLibro = async () => {
    try {
      const generoFinal =
        datos.genero === "otro" ? datos.genero_otro : datos.genero;

      const { data: autorData, error: autorError } = await cliente
        .from("autor")
        .select("nombre")
        .eq("id", datos.autor_id)
        .maybeSingle();

      if (autorError || !autorData)
        throw new Error("Error al obtener el autor.");

      const tiempoAhora = Date.now();
      const imgPath = `covers/${tiempoAhora}_${datos.portada.name}`;
      const filePath = `epubs/${tiempoAhora}_${datos.archivo.name}`;

      const [{ error: imgError }, { error: fileError }] = await Promise.all([
        cliente.storage.from(bucket).upload(imgPath, datos.portada),
        cliente.storage.from(bucket).upload(filePath, datos.archivo),
      ]);
      if (imgError) throw new Error("Error al subir la portada.");
      if (fileError) throw new Error("Error al subir el archivo EPUB.");

      const nuevoLibro = {
        titulo: datos.titulo,
        autor_id: parseInt(datos.autor_id),
        genero: generoFinal,
        descripcion: datos.descripcion,
        portada_url: `${baseUrl}/${imgPath}`,
        archivo_url: `${baseUrl}/${filePath}`,
      };

      const { error } = await cliente.from("libro").insert(nuevoLibro);
      if (error) throw new Error("Error al insertar el libro.");

      toast.success("Libro agregado correctamente.");
      resetForm();
    } catch (err) {
      toast.error(err.message || "Error inesperado.");
    }
  };

  if (cargando) return <Loading mensaje="Cargando formulario..." />;

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center py-12 px-4">
        <div className="max-w-4xl w-full">
          <Volver />
          <h1 className="text-2xl font-bold text-center text-violet-700 mt-[-2.5rem] mb-5">
            Añadir Nuevo Libro
          </h1>
          <div className="flex justify-center">
            <div className="w-full max-w-xl text-center">
              <FormularioGenerico
                campos={campos}
                onChange={updateCampo}
                onSubmit={subirLibro}
                preview={preview}
                tituloBoton="Guardar Libro"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AñadirLibro;
