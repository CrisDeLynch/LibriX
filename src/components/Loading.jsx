import { RingLoader } from "react-spinners";

export default function Loading({ mensaje = "Cargando..." }) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50">
      <RingLoader color="#7c3aed" size={80} />
      <p className="mt-6 text-lg font-semibold text-violet-700">{mensaje}</p>
    </div>
  );
}
