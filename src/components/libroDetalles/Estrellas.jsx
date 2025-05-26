const Estrellas = ({ valor = 0, onSelect, hover = 0, className = "" }) => (
  <div className={`flex gap-1 text-yellow-400 ${className || "text-3xl"}`}>
    {[1, 2, 3, 4, 5].map((s) => (
      <span
        key={s}
        className={`cursor-pointer ${
          s <= (hover || valor) ? "text-yellow-400" : "text-gray-300"
        }`}
        onClick={() => onSelect?.(s)}
        onMouseEnter={() => onSelect && onSelect(s, true)}
        onMouseLeave={() => onSelect && onSelect(0, true)}
      >
        ★
      </span>
    ))}
  </div>
);

export default Estrellas;
