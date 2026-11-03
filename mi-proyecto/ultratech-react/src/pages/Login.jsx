import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("cliente");
  const [error, setError] = useState("");

  const { iniciarSesion } = useAuth();
  const navigate = useNavigate();

  function manejarLogin(e) {
    e.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      setError("Ingresá un correo electrónico válido.");
      return;
    }

    iniciarSesion(email.trim(), rol);

    if (rol === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <h1 className="mb-2 text-3xl font-bold">Iniciar sesión</h1>

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
            <label htmlFor="rol" className="mb-2 block text-sm">
              Tipo de usuario
            </label>

            <select
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3"
            >
              <option value="cliente">Cliente</option>
              <option value="admin">Administrador</option>
            </select>
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
