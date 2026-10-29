
import { Link } from "react-router-dom";

function Forbidden() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-center">
      <h1 className="text-4xl font-bold text-red-400">
        Acceso denegado
      </h1>

      <p className="mt-4 text-zinc-300">
        No tenés permisos para entrar a esta página.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-500"
      >
        Volver al inicio
      </Link>
    </main>
  );
}

export default Forbidden;
