import { Contexto } from "./ContextoApi";
import { cliente } from "./conexionApi";

export const ContextoApiProvider = ({ children }) => {
  return <Contexto.Provider value={cliente}>{children}</Contexto.Provider>;
};
