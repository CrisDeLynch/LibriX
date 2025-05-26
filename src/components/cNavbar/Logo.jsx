import { Link } from "react-router";

const Logo = ({ admin }) => (
  <Link
    to={admin ? "/admin/dashboard" : "/libros"}
    className="flex flex-col items-center justify-center mr-6 select-none"
  >
    <img
      src="/Logo1.png"
      alt="Logo"
      className="h-14 object-contain scale-100 transition-transform duration-200"
      draggable={false}
    />
    <span
      className="
        mt-[-0.8rem]
      text-3xl
      font-extrabold
      text-transparent
      bg-clip-text
      bg-gradient-to-r
      from-purple-500
      via-pink-400
      to-purple-500
      drop-shadow-md
      tracking-wide
      select-none
      text-center
    "
    >
      LibriX
    </span>
  </Link>
);

export default Logo;
