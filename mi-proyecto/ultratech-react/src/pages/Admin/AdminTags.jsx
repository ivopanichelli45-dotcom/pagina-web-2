
import { useEffect, useState } from "react";
import {
  obtenerTags,
  crearTag,
  editarTag,
  eliminarTag,
} from "../../services/TagService";

function AdminTags() {
  const [tags, setTags] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState("");

  async function cargarTags() {
    try {
      const datos = await obtenerTags();
      setTags(datos);
    } catch {
      setError("No se pudieron cargar las etiquetas.");
    }
  }

  useEffect(() => {
    cargarTags();
  }, []);

  async function manejarSubmit(e) {
    e.preventDefault();
    setError("");

    if (!titulo.trim()) {
      setError("Ingresá el nombre de la etiqueta.");
      return;
    }

    const repetida = tags.some(
      (tag) =>
        tag.title.toLowerCase() === titulo.trim().toLowerCase() &&
        tag.id !== editando
    );

    if (repetida) {
      setError("Ya existe una etiqueta con ese nombre.");
      return;
    }

    try {
      if (editando !== null) {
        await editarTag(editando, titulo);
      } else {
        await crearTag(titulo);
      }

      setTitulo("");
      setEditando(null);
      await cargarTags();
    } catch (error) {
      setError(error.message || "No se pudo guardar la etiqueta.");
    }
  }

  function comenzarEdicion(tag) {
    setTitulo(tag.title);
    setEditando(tag.id);
    setError("");
  }

  async function manejarEliminar(id) {
    if (!window.confirm("¿Estás seguro de eliminar esta etiqueta?")) {
      return;
    }

    try {
      await eliminarTag(id);
      await cargarTags();
    } catch (error) {
      setError(error.message || "No se pudo eliminar la etiqueta.");
    }
  }

  function cancelarEdicion() {
    setTitulo("");
    setEditando(null);
    setError("");
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        Administrar etiquetas
      </h1>

      <form
        onSubmit={manejarSubmit}
        className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <h2 className="mb-4 text-xl font-semibold">
          {editando !== null ? "Editar etiqueta" : "Nueva etiqueta"}
        </h2>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Nombre de la etiqueta"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3"
          />

          <button
            type="submit"
            className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500"
          >
            {editando !== null ? "Guardar cambios" : "Crear etiqueta"}
          </button>

          {editando !== null && (
            <button
              type="button"
              onClick={cancelarEdicion}
              className="rounded-lg border border-zinc-700 px-6 py-3"
            >
              Cancelar
            </button>
          )}
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-400">{error}</p>
        )}
      </form>

      <section className="overflow-hidden rounded-xl border border-zinc-800">
        <div className="border-b border-zinc-800 bg-zinc-900 p-4">
          <h2 className="font-semibold">
            Etiquetas existentes ({tags.length})
          </h2>
        </div>

        {tags.length === 0 ? (
          <p className="p-6 text-zinc-400">
            No hay etiquetas cargadas.
          </p>
        ) : (
          <div className="divide-y divide-zinc-800">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <span>{tag.title}</span>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => comenzarEdicion(tag)}
                    className="text-sm text-green-500 hover:text-green-400"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => manejarEliminar(tag.id)}
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

export default AdminTags;
