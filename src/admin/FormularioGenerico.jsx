import { UploadCloud } from "lucide-react";
import { toast } from "react-toastify";

const FormularioGenerico = ({
  campos = [],
  preview,
  onChange,
  onSubmit,
  loading = false,
  tituloBoton = "Guardar",
}) => {
  return (
    <div className="w-full max-w-xl p-8 bg-white/90 rounded-3xl shadow-2xl border border-violet-200 backdrop-blur-md animate-fade-in">
      <div className="space-y-6">
        {campos.map((campo) => (
          <div key={campo.name}>
            <label className="block text-sm font-medium text-violet-700 mb-1 text-left">
              {campo.label}{" "}
              {campo.required && <span className="text-fuchsia-600">*</span>}
            </label>

            {campo.type === "select" ? (
              <>
                <select
                  name={campo.name}
                  value={campo.value}
                  onChange={onChange}
                  className="w-full px-4 py-2 border border-violet-200 rounded-xl shadow-sm"
                >
                  <option value="" disabled className="text-gray-400">
                    {campo.placeholder}
                  </option>
                  {campo.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {campo.extraInput && campo.value === campo.extraInput.when && (
                  <input
                    type="text"
                    name={campo.extraInput.name}
                    placeholder={campo.extraInput.placeholder}
                    value={campo.extraInput.value}
                    onChange={onChange}
                    className="mt-2 w-full px-4 py-2 border border-violet-200 rounded-xl shadow-sm"
                  />
                )}
              </>
            ) : campo.type === "textarea" ? (
              <textarea
                name={campo.name}
                value={campo.value}
                onChange={onChange}
                rows={campo.rows || 3}
                placeholder={campo.placeholder}
                className="w-full px-4 py-2 border border-violet-200 rounded-xl shadow-sm resize-none"
              />
            ) : campo.type === "file" ? (
              <>
                <input
                  type="file"
                  name={campo.name}
                  accept={
                    campo.name === "portada" || campo.name === "foto"
                      ? ".jpeg,.jpg,.png"
                      : campo.name === "archivo"
                      ? ".epub"
                      : ""
                  }
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const tipo = file?.type;

                    if (campo.name === "portada" || campo.name === "foto") {
                      if (
                        file &&
                        !["image/jpeg", "image/jpg", "image/png"].includes(tipo)
                      ) {
                        toast.error("Solo se permiten imágenes JPEG o PNG para la portada.");
                        e.target.value = "";
                        return;
                      }
                    } else if (campo.name === "archivo") {
                      if (
                        file &&
                        tipo !== "application/epub+zip"
                      ) {
                        toast.error("Solo se permiten archivos EPUB.");
                        e.target.value = "";
                        return;
                      }
                    }

                    onChange(e);
                  }}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                  file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700
                  hover:file:bg-fuchsia-100 transition"
                />

                {preview && campo.accept?.includes("image") && (
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="mt-4 h-44 w-auto max-w-xs object-cover rounded-xl shadow-lg border-2 border-fuchsia-200 animate-fade-in mx-auto"
                  />
                )}
              </>
            ) : (
              <input
                type={campo.type}
                name={campo.name}
                value={campo.value}
                onChange={onChange}
                placeholder={campo.placeholder}
                className="w-full px-4 py-2 border border-violet-200 rounded-xl shadow-sm"
              />
            )}
          </div>
        ))}

        <button
          onClick={() => {
            const faltan = campos.some((campo) => {
              const campoPrincipalInvalido =
                campo.required &&
                ((campo.type === "file" && !campo.value) ||
                  (campo.type !== "file" && !campo.value?.toString().trim()));

              const campoExtraInvalido =
                campo.extraInput &&
                campo.value === campo.extraInput.when &&
                campo.extraInput.required &&
                !campo.extraInput.value?.toString().trim();

              return campoPrincipalInvalido || campoExtraInvalido;
            });

            if (faltan) {
              toast.error("Todos los campos con * son obligatorios.");
              return;
            }

            onSubmit();
          }}
          disabled={loading}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl 
          bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white font-bold text-lg shadow-md 
          hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <UploadCloud className="w-6 h-6" />
          {loading ? "Guardando..." : tituloBoton}
        </button>
      </div>
    </div>
  );
};

export default FormularioGenerico;
