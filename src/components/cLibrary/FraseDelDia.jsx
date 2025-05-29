import { useEffect, useState } from "react";
import { Quote } from "lucide-react";

const FraseDelDia = () => {
  const [frase, setFrase] = useState(null);

  useEffect(() => {
    const hoy = new Date().toISOString().split("T")[0];
    const guardada = JSON.parse(localStorage.getItem("fraseDelDia"));

    // Si hay frase guardada, pero NO es de hoy se elimina
    if (guardada?.fecha && guardada.fecha !== hoy) {
      localStorage.removeItem("fraseDelDia");
    }

    // Si la frase guardada es de hoy se usa
    if (guardada?.fecha === hoy && guardada.frase?.phrase) {
      setFrase(guardada.frase);
      return;
    }

    fetch(
      `https://api.codetabs.com/v1/proxy?quest=https://frasedeldia.azurewebsites.net/api/phrase`
    )
      .then((res) => res.json())
      .then((data) => {
        setFrase(data);
        localStorage.setItem(
          "fraseDelDia",
          JSON.stringify({ fecha: hoy, frase: data })
        );
      })
      .catch((err) =>
        console.error("Error al obtener la frase del día:", err)
      );
  }, []);

  if (!frase) return null;

  return (
    <div className="text-center max-w-3xl mx-auto italic text-purple-800 text-lg flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm">
        <Quote size={18} /> Frase del Día
      </div>
      <p className="text-purple-900 text-center">“{frase.phrase}”</p>
      {frase.author && (
        <p className="text-sm text-gray-600">— {frase.author}</p>
      )}
    </div>
  );
};

export default FraseDelDia;
