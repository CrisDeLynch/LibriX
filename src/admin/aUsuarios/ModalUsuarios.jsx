export default function ModalAdmin({
  open,
  title,
  children,
  onAccept,
  onCancel,
  acceptLabel = "Aceptar",
  cancelLabel = "Cancelar",
  acceptColor = "violet",
  danger = false,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-700/40 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm animate-fade-in-down">
        <h2
          className={`text-xl font-bold mb-4 ${
            danger ? "text-red-600" : "text-violet-700"
          }`}
        >
          {title}
        </h2>
        <div className="mb-6">{children}</div>
        <div className="flex gap-2">
          <button
            onClick={onAccept}
            className={`flex-1 px-4 py-2 rounded text-white transition
              ${
                danger
                  ? "bg-red-600 hover:bg-red-700"
                  : acceptColor === "green"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-violet-600 hover:bg-violet-700"
              }
              ${loading ? "opacity-70 pointer-events-none" : ""}
            `}
            disabled={loading}
          >
            {acceptLabel}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
            disabled={loading}
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
