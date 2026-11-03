
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, CUENTAS_DEMO } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  function manejarLogin(e) {
    e.preventDefault();
    setError("");

    const resultado = iniciarSesion(email, password);

    if (!resultado.ok) {
      setError(resultado.mensaje);
      return;
    }

    if (resultado.usuario.rol === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h1 className="mb-2 text-3xl font-bold">
          Iniciar sesión
        </h1>

        <p className="mb-6 text-zinc-400">
          Ingresá para continuar en UltraTech.
        </p>

        <form onSubmit={manejarLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm">
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm">
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresá tu contraseña"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-green-500"
              required
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-500"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 rounded-lg bg-zinc-800 p-4 text-sm">
          <p className="mb-3 font-semibold">Cuentas de prueba</p>

          {CUENTAS_DEMO.map((cuenta) => (
            <div key={cuenta.email} className="mb-3 last:mb-0">
              <p className="font-medium">
                {cuenta.rol === "admin" ? "Administrador" : "Cliente"}
              </p>
              <p className="text-zinc-400">{cuenta.email}</p>
              <p className="text-zinc-400">{cuenta.password}</p>
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="mt-5 block text-center text-sm text-zinc-400 hover:text-green-500"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}

export default Login;