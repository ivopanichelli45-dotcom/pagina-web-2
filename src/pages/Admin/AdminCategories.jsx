
import { useEffect, useState } from "react";
import {
  obtenerCategorias,
  crearCategoria,
  editarCategoria,
  eliminarCategoria,
} from "../../services/CategoryService";

function AdminCategories() {
  const [categorias, setCategorias] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(true);

  async function cargarCategorias() {
    try {
      setError("");
      const datos = await obtenerCategorias();
      setCategorias(datos);
    } catch (error) {
      setError(error.message || "No se pudieron cargar las categorías.");
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarCategorias();
  }, []);

  async function manejarSubmit(e) {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!titulo.trim()) {
      setError("Ingresá el nombre de la categoría.");
      return;
    }

    try {
      if (editando !== null) {
        await editarCategoria(editando, titulo);
        setMensaje("La categoría se actualizó correctamente.");
      } else {
        await crearCategoria(titulo);
        setMensaje("La categoría se creó correctamente.");
      }

      setTitulo("");
      setEditando(null);
      await cargarCategorias();
    } catch (error) {
      setError(error.message || "No se pudo guardar la categoría.");
    }
  }

  function comenzarEdicion(categoria) {
    setTitulo(categoria.title);
    setEditando(categoria.id);
    setError("");
    setMensaje("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function manejarEliminar(id) {
    const confirmar = window.confirm(
      "¿Estás seguro de eliminar esta categoría?"
    );

    if (!confirmar) return;

    setError("");
    setMensaje("");

    try {
      await eliminarCategoria(id);
      setMensaje("La categoría se eliminó correctamente.");

      if (editando !== null && String(editando) === String(id)) {
        cancelarEdicion();
      }

      await cargarCategorias();
    } catch (error) {
      setError(error.message || "No se pudo eliminar la categoría.");
    }
  }

  function cancelarEdicion() {
    setTitulo("");
    setEditando(null);
    setError("");
    setMensaje("");
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        Administrar categorías
      </h1>

      <form
        onSubmit={manejarSubmit}
        className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <h2 className="mb-4 text-xl font-semibold">
          {editando !== null ? "Editar categoría" : "Nueva categoría"}
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Nombre de la categoría"
            required
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3"
          />

          <button
            type="submit"
            className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500"
          >
            {editando !== null ? "Guardar cambios" : "Crear categoría"}
          </button>

          {editando !== null && (
            <button
              type="button"
              onClick={cancelarEdicion}
              className="rounded-lg border border-zinc-700 px-6 py-3 hover:bg-zinc-800"
            >
              Cancelar
            </button>
          )}
        </div>

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-400">
            {error}
          </p>
        )}

        {mensaje && (
          <p role="status" className="mt-3 text-sm text-green-400">
            {mensaje}
          </p>
        )}
      </form>

      <section className="overflow-hidden rounded-xl border border-zinc-800">
        <div className="border-b border-zinc-800 bg-zinc-900 p-4">
          <h2 className="font-semibold">
            Categorías existentes ({categorias.length})
          </h2>
        </div>

        {cargando ? (
          <p className="p-6 text-zinc-400">
            Cargando categorías...
          </p>
        ) : categorias.length === 0 ? (
          <p className="p-6 text-zinc-400">
            No hay categorías cargadas.
          </p>
        ) : (
          <div className="divide-y divide-zinc-800">
            {categorias.map((categoria) => (
              <div
                key={categoria.id}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <span>{categoria.title}</span>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => comenzarEdicion(categoria)}
                    className="text-sm text-green-500 hover:text-green-400"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => manejarEliminar(categoria.id)}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminCategories;
