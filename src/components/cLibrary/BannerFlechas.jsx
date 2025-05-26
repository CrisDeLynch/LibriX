import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const BannerFlechas = ({ onClick, left }) => (
  <div
    className={`
      absolute 
      top-1/2 
      -translate-y-1/2 
      z-20 
      ${left 
        ? "left-1 sm:left-3 md:left-6 lg:left-[-20px] xl:left-[-40px]" 
        : "right-1 sm:right-3 md:right-6 lg:right-[-20px] xl:right-[-40px]"
      }
    `}
  >
    <button
      onClick={onClick}
      className="rounded-full bg-fuchsia-200 text-fuchsia-800 p-2 shadow-lg hover:bg-fuchsia-300 transition"
      aria-label={left ? "Anterior" : "Siguiente"}
    >
      {left ? <FaArrowLeft size={22} /> : <FaArrowRight size={22} />}
    </button>
  </div>
);

export default BannerFlechas;
