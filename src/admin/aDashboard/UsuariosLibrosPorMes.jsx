import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function UsuariosLibrosPorMes({ data }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-10">
      <h2 className="text-lg font-semibold mb-6 text-center">Usuarios y Libros Registrados por Mes</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" interval={0} angle={-45} textAnchor="end" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="usuarios" stroke="#8b5cf6" name="Usuarios" />
          <Line type="monotone" dataKey="libros" stroke="#10b981" name="Libros" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
