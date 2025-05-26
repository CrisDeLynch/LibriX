import { Link } from "react-router";

const SectionHeader = ({ title, subtitle, link }) => (
  <div className="flex flex-col md:flex-row md:items-center gap-1 mb-4">
    <div>
      <h2 className="text-xl md:text-2xl font-extrabold text-violet-800 tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-gray-500 text-sm font-normal mt-1">{subtitle}</p>
      )}
    </div>
    {link && (
      <Link to={link} className="ml-0 md:ml-auto text-xs text-fuchsia-500 font-semibold hover:underline px-2 py-1">
        Ver más &rarr;
      </Link>
    )}
  </div>
);

export default SectionHeader;
