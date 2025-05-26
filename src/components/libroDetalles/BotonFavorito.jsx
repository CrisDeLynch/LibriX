import { useEffect, useState } from 'react';
import { cliente } from "../../conexionApi";
import { Heart, HeartOff } from 'lucide-react';

export default function BotonFavorito({ usuarioId, libroId }) {
  const [esFavorito, setEsFavorito] = useState(false);
  const [favoritoId, setFavoritoId] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const comprobarFavorito = async () => {
      const { data } = await cliente
        .from('favorito')
        .select('id')
        .eq('usuario_id', usuarioId)
        .eq('libro_id', libroId)
        .maybeSingle();

      if (data) {
        setEsFavorito(true);
        setFavoritoId(data.id);
      } else {
        setEsFavorito(false);
        setFavoritoId(null);
      }

      setCargando(false);
    };

    comprobarFavorito();
  }, [usuarioId, libroId]);

  const alternarFavorito = async () => {
    if (esFavorito) {
      await cliente.from('favorito').delete().eq('id', favoritoId);
      setEsFavorito(false);
      setFavoritoId(null);
    } else {
      const { data } = await cliente
        .from('favorito')
        .insert({ usuario_id: usuarioId, libro_id: libroId })
        .select('id')
        .single();

      if (data) {
        setEsFavorito(true);
        setFavoritoId(data.id);
      }
    }
  };

  if (cargando) return null;

  return (
    <button
      onClick={alternarFavorito}
      className="flex items-center gap-2 px-3 py-2 border border-purple-300 rounded-full hover:bg-purple-50 transition-all text-sm"
      aria-label={esFavorito ? "Eliminar de favoritos" : "Añadir a favoritos"}
    >
      {esFavorito ? (
        <>
          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
          <span className="text-red-500 font-medium">En favoritos</span>
        </>
      ) : (
        <>
          <HeartOff className="w-5 h-5 text-gray-400" />
          <span className="text-gray-600">Añadir a favoritos</span>
        </>
      )}
    </button>
  );
}
