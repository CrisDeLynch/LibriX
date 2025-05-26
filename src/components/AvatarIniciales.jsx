const AvatarIniciales = ({ nombre = "", apellidos = "", tamaño = "md", claseExtra = "" }) => {
    const obtenerIniciales = (nombre, apellidos) => {
      const inicialNombre = nombre?.charAt(0) || "";
      const primerApellido = apellidos?.split(" ")[0] || "";
      const inicialApellido = primerApellido.charAt(0) || "";
      return (inicialNombre + inicialApellido).toUpperCase();
    };
  
    const tamaños = {
      sm: "w-8 h-8 text-sm",
      md: "w-12 h-12 text-base",
      lg: "w-16 h-16 text-xl",
      xl: "w-20 h-20 text-2xl",
    };
  
    const colores = [
      "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-yellow-500", "bg-lime-500",
      "bg-green-500", "bg-emerald-500", "bg-teal-500", "bg-cyan-500", "bg-sky-500",
      "bg-blue-500", "bg-indigo-500", "bg-violet-500", "bg-purple-500", "bg-pink-500",
      "bg-rose-500",
    ];
  
    const hash = (str) => {
      let h = 0;
      for (let i = 0; i < str.length; i++) {
        h = str.charCodeAt(i) + ((h << 5) - h);
      }
      return Math.abs(h);
    };
  
    const indexColor = hash(nombre + apellidos) % colores.length;
    const colorFondo = colores[indexColor];
  
    return (
      <div
        className={`rounded-full ${colorFondo} text-white flex items-center justify-center font-bold shadow-md 
          ${tamaños[tamaño] || tamaños.md} ${claseExtra}`}
      >
        {obtenerIniciales(nombre, apellidos)}
      </div>
    );
  };
  
  export default AvatarIniciales;
  