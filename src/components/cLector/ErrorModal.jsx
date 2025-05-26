const ErrorModal = ({
  show,
  message,
  onRegister,
  onBack,
  registerText = "Registrarse",
  backText = "Volver",
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-fuchsia-200/90 to-violet-300/85 backdrop-blur-[3px]">
      <div className="bg-violet-50 rounded-3xl shadow-2xl px-12 py-10 w-[520px] max-w-[96vw] relative animate-pop border-2 border-fuchsia-200">
        {/* Icono animado */}
        <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-tr from-fuchsia-300 via-violet-400 to-fuchsia-200 shadow-xl animate-pulse-slow border border-fuchsia-300">
          <svg
            className="w-11 h-11 text-fuchsia-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
          </svg>
        </div>
        {/* Mensaje */}
        <p className="mb-8 text-xl font-semibold text-fuchsia-700 text-center">{message}</p>
        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="flex-1 bg-gradient-to-r from-fuchsia-400 to-violet-400 text-white py-3 rounded-xl shadow font-bold text-base hover:from-fuchsia-500 hover:to-violet-500 hover:scale-105 active:scale-95 transition-transform duration-150"
            onClick={onRegister}
          >
            {registerText}
          </button>
          <button
            className="flex-1 border-2 border-fuchsia-300 text-fuchsia-600 py-3 rounded-xl shadow-sm font-semibold text-base bg-violet-50 hover:bg-fuchsia-100 hover:scale-105 active:scale-95 transition-all duration-150"
            onClick={onBack}
          >
            {backText}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes pop {
          0% { transform: scale(0.82);}
          90% { transform: scale(1.04);}
          100% { transform: scale(1);}
        }
        .animate-pop { animation: pop 0.3s cubic-bezier(0.23, 1, 0.32, 1); }
        @keyframes pulse-slow {
          0%, 100% { box-shadow: 0 6px 36px 0 #f0abfc88, 0 0 0 0 #fff0; }
          50% { box-shadow: 0 16px 48px 12px #d8b4fe55, 0 0 0 10px #f5d0fe80; }
        }
        .animate-pulse-slow { animation: pulse-slow 1.7s infinite; }
      `}</style>
    </div>
  );
};

export default ErrorModal;
