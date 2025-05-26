import {
  FaArrowLeft,
  FaPlus,
  FaMinus,
  FaPalette,
  FaFont,
} from "react-icons/fa";

const fuentes = [
  { label: "Arial", value: "Arial" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Georgia", value: "Georgia" },
  { label: "Garamond", value: "Garamond" },
];

const ReaderControls = ({
  onBack,
  fontSize,
  setFontSize,
  backgroundColor,
  setBackgroundColor,
  setTextColor,
  fontFamily,
  setFontFamily,
}) => (
  <div
    className="
      flex flex-nowrap items-center justify-center
      gap-1 sm:gap-2 lg:gap-4
      py-2 sm:py-3 lg:py-4
      mb-2 sm:mb-3
      rounded-xl
      bg-gradient-to-r from-violet-50 via-fuchsia-50 to-indigo-50
      shadow-sm
      text-xs sm:text-sm lg:text-base
      w-full
      overflow-x-auto
      scrollbar-hide
      "
    style={{ maxWidth: "100vw" }}
  >
    {/* Volver */}
    <button
      title="Volver"
      onClick={onBack}
      className="
        flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full
        bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-200 font-semibold shadow transition
        text-xs sm:text-sm lg:text-base
      "
    >
      <FaArrowLeft className="text-base sm:text-lg lg:text-xl" /> Volver
    </button>

    {/* Disminuir tamaño */}
    <button
      title="Reducir tamaño de letra"
      onClick={() => setFontSize(Math.max(fontSize - 10, 80))}
      className="
        flex items-center px-1 sm:px-2 py-1 sm:py-2 rounded-full
        bg-white text-violet-700 border border-violet-200
        hover:bg-violet-50 hover:text-violet-900 transition
        text-xs sm:text-sm lg:text-base
      "
    >
      <FaMinus className="text-base sm:text-lg lg:text-xl" />
    </button>
    <span className="px-1 sm:px-2 text-xs sm:text-sm lg:text-base text-violet-800 font-semibold">
      {fontSize}%
    </span>
    {/* Aumentar tamaño */}
    <button
      title="Aumentar tamaño de letra"
      onClick={() => setFontSize(Math.min(fontSize + 10, 200))}
      className="
        flex items-center px-1 sm:px-2 py-1 sm:py-2 rounded-full
        bg-white text-violet-700 border border-violet-200
        hover:bg-violet-50 hover:text-violet-900 transition
        text-xs sm:text-sm lg:text-base
      "
    >
      <FaPlus className="text-base sm:text-lg lg:text-xl" />
    </button>

    {/* Cambiar fondo */}
    <button
      title="Cambiar fondo"
      onClick={() => {
        const isWhite = backgroundColor === "white";
        setBackgroundColor(isWhite ? "#f4e1c5" : "white");
        setTextColor("black");
      }}
      className="
        flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full
        bg-white text-fuchsia-700 border border-fuchsia-200
        hover:bg-fuchsia-50 hover:text-fuchsia-900 transition
        text-xs sm:text-sm lg:text-base
      "
    >
      <FaPalette className="text-base sm:text-lg lg:text-xl" />
      {backgroundColor === "white" ? "Sepia" : "Blanco"}
    </button>

    {/* Cambiar fuente */}
    <div className="flex items-center gap-1 sm:gap-2">
      <FaFont className="text-violet-500 text-base sm:text-lg lg:text-xl" />
      <select
        aria-label="Cambiar tipografía"
        className="
          px-1 sm:px-2 py-0.5 sm:py-1 rounded
          bg-white border border-violet-200 text-violet-800
          focus:ring-2 focus:ring-violet-200 focus:outline-none
          text-xs sm:text-sm lg:text-base
        "
        value={fontFamily}
        onChange={(e) => setFontFamily(e.target.value)}
      >
        {fuentes.map((f) => (
          <option key={f.value} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default ReaderControls;
