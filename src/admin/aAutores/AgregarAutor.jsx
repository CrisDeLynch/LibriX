import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Volver from "../../components/Volver";
import FormularioGenerico from "../../admin/FormularioGenerico";
import { cliente } from "../../conexionApi";
import { toast } from "react-toastify";

const AñadirAutor = () => {
  const [form, setForm] = useState({
    foto: null,
    nombre: "",
    nacionalidad: "",
    fecha_nacimiento: "",
    fecha_fallecimiento: "",
    biografia: "",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const campos = [
    {
      name: "foto",
      label: "Foto del autor",
      type: "file",
      accept: "image/*",
      required: true,
      value: form.foto,
    },
    {
      name: "nombre",
      label: "Nombre completo",
      type: "text",
      required: true,
      value: form.nombre,
    },
    {
      name: "nacionalidad",
      label: "Nacionalidad",
      type: "text",
      required: true,
      value: form.nacionalidad,
    },
    {
      name: "fecha_nacimiento",
      label: "Fecha de nacimiento",
      type: "date",
      required: true,
      value: form.fecha_nacimiento,
    },
    {
      name: "fecha_fallecimiento",
      label: "Fecha de fallecimiento",
      type: "date",
      value: form.fecha_fallecimiento,
    },
    {
      name: "biografia",
      label: "Biografía",
      type: "textarea",
      required: true,
      value: form.biografia,
    },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "foto" && files.length > 0) {
      const archivo = files[0];
      setForm((prev) => ({ ...prev, foto: archivo }));

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(archivo);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async () => {
    try {
      setLoading(true);

      if (
        form.fecha_fallecimiento &&
        new Date(form.fecha_fallecimiento) < new Date(form.fecha_nacimiento)
      ) {
        toast.error(
          "La fecha de fallecimiento no puede ser anterior a la de nacimiento."
        );
        setLoading(false);
        return;
      }

      const { data: existe } = await cliente
        .from("autor")
        .select("id")
        .eq("nombre", form.nombre)
        .maybeSingle();

      if (existe) {
        toast.error("Ya existe un autor con ese nombre.");
        setLoading(false);
        return;
      }

      // Subida de imagen
      const ruta = `autores/${Date.now()}_${form.foto.name}`;
      const { error: uploadError } = await cliente.storage
        .from("LibriX")
        .upload(ruta, form.foto);
      if (uploadError) throw new Error("Error al subir la foto.");

      const foto_url = `https://exdklfmxedddztunquou.supabase.co/storage/v1/object/public/LibriX/${ruta}`;
      const { foto, ...resto } = form;
      const nuevoAutor = {
        ...resto,
        fecha_fallecimiento: form.fecha_fallecimiento || null,
        foto_url,
      };

      const { error } = await cliente.from("autor").insert([nuevoAutor]);

      if (error) throw new Error("Error al guardar el autor.");

      toast.success("Autor añadido correctamente.");
      setForm({
        foto: null,
        nombre: "",
        nacionalidad: "",
        fecha_nacimiento: "",
        fecha_fallecimiento: "",
        biografia: "",
      });
      setPreview(null);
      document.querySelector('input[name="foto"]').value = "";
    } catch (err) {
      toast.error(err.message || "Error inesperado.");
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center py-12 px-4">
        <div className="max-w-4xl w-full">
          <Volver />
          <h1 className="text-2xl font-bold text-center text-violet-700 mt-[-2.5rem] mb-5">
            Añadir Autor
          </h1>
          <div className="flex justify-center">
            <div className="w-full max-w-xl text-center">
              <FormularioGenerico
                campos={campos}
                preview={preview}
                onChange={handleChange}
                onSubmit={onSubmit}
                loading={loading}
                tituloBoton="Guardar Autor"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AñadirAutor;
