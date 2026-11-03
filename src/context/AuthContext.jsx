
import { createContext, useContext, useState } from "react";

export const CUENTAS_DEMO = [
  {
    email: "cliente@ultratech.com",
    password: "Cliente123",
    rol: "cliente",
  },
  {
    email: "admin@ultratech.com",
    password: "Admin123",
    rol: "admin",
  },
];

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try {
      const guardado = localStorage.getItem("ultratech-usuario");

      if (!guardado) return null;

      const usuarioGuardado = JSON.parse(guardado);

      const cuentaValida = CUENTAS_DEMO.find(
        (cuenta) =>
          cuenta.email === usuarioGuardado.email &&
          cuenta.rol === usuarioGuardado.rol
      );

      return cuentaValida
        ? { email: cuentaValida.email, rol: cuentaValida.rol }
        : null;
    } catch {
      return null;
    }
  });

  function iniciarSesion(email, password) {
    const cuenta = CUENTAS_DEMO.find(
      (cuenta) =>
        cuenta.email === email.trim().toLowerCase() &&
        cuenta.password === password
    );

    if (!cuenta) {
      return {
        ok: false,
        mensaje: "Correo o contraseña incorrectos.",
      };
    }

    const nuevoUsuario = {
      email: cuenta.email,
      rol: cuenta.rol,
    };

    localStorage.setItem(
      "ultratech-usuario",
      JSON.stringify(nuevoUsuario)
    );

    setUsuario(nuevoUsuario);

    return { ok: true, usuario: nuevoUsuario };
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