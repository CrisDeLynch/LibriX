import { useNavigate } from "react-router";

const Volver = ({ to = -1, label = "Volver" }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className="inline-flex items-center gap-2 text-fuchsia-700 hover:text-violet-800 font-semibold rounded-full bg-fuchsia-100 hover:bg-fuchsia-200 px-4 py-2 mb-2 shadow transition text-sm"
      style={{ minWidth: 0 }}
    >
      {label}
    </button>
  );
};

export default Volver;
