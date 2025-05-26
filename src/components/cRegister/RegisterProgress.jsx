const steps = [
  { label: "Datos" },
  { label: "Suscripción" },
  { label: "Pago" },
  { label: "Cuenta" },
];

const CheckIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
    <path
      d="M6 10.8l2.5 2.5 5-5"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RegisterProgress = ({ step }) => (
  <div className="relative flex items-center justify-between w-full mb-8 select-none">
    <div className="absolute left-10 right-10 top-6 -translate-y-1/2 h-1 bg-gray-200 z-0" />
    <div
      className="absolute left-10 right-10 top-6 -translate-y-1/2 h-1 z-10 transition-all duration-300"
      style={{
        width:
          step === 1
            ? "0%"
            : step === 2
            ? "33%"
            : step === 3
            ? "50%"
            : "80%",
        background:
          step > 1
            ? "linear-gradient(to right, #a21caf 40%, #d946ef 90%)"
            : "transparent",
      }}
    />
    {steps.map((s, idx) => {
      const isCompleted = step > idx + 1;
      const isActive = step === idx + 1;
      
      return (
        <div key={s.label} className="flex flex-col items-center flex-1 z-20">
          <div className="relative flex flex-col items-center">
            <div
              className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 shadow-md font-bold text-base
                transition-all duration-300
                ${
                  isActive
                    ? "bg-violet-600 border-violet-600 text-white scale-110 ring-4 ring-violet-300/30"
                    : isCompleted
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-gray-100 border-gray-300 text-gray-400"
                }
              `}
              style={{ zIndex: 10 }}
            >
              {isCompleted ? <CheckIcon /> : idx + 1}
            </div>
          </div>
          <span
            className={`
              mt-2 text-xs text-center max-w-[90px] font-medium transition-colors duration-300
              ${
                isActive
                  ? "text-violet-700"
                  : isCompleted
                  ? "text-green-600"
                  : "text-gray-400"
              }
            `}
          >
            {s.label}
          </span>
        </div>
      );
    })}
  </div>
);

export default RegisterProgress;
