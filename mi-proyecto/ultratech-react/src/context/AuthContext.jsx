
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try {
      const guardado = localStorage.getItem("ultratech-usuario");
      return guardado ? JSON.parse(guardado) : null;
    } catch {
      return null;
    }
  });

  function iniciarSesion(email, rol) {
    const nuevoUsuario = {
      email,
      rol,
    };

    localStorage.setItem(
      "ultratech-usuario",
      JSON.stringify(nuevoUsuario)
    );

    setUsuario(nuevoUsuario);
  }

  function cerrarSesion() {
    localStorage.removeItem("ultratech-usuario");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{ usuario, iniciarSesion, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
