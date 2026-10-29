
import { useEffect, useState } from "react";
import {
  obtenerProductos,
  guardarProductos,
} from "../../services/ProductService";

const categorias = {
  "1": "Procesadores",
  "2": "Placas de video",
  "3": "Almacenamiento",
  "4": "Placas madre",
};

const formularioVacio = {
  title: "",
  description: "",
  price: "",
  category_id: "1",
  category: "Procesadores",
  picture: "",
};

function AdminProducts() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const [nuevoProducto, setNuevoProducto] = useState(formularioVacio);

  useEffect(() => {
    async function cargarProductos() {
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch (err) {
        setError(err.message || "No se pudieron cargar los productos.");
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  function manejarCambio(evento) {
    const { name, value } = evento.target;

    setNuevoProducto((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  function manejarCategoria(evento) {
    const id = evento.target.value;

    setNuevoProducto((anterior) => ({
      ...anterior,
      category_id: id,
      category: categorias[id],
    }));
  }

  function guardarFormulario(evento) {
    evento.preventDefault();

    const precio = Number(nuevoProducto.price);

    if (
      !nuevoProducto.title.trim() ||
      !Number.isFinite(precio) ||
      precio <= 0
    ) {
      setError("Ingresá un nombre y un precio mayor que cero.");
      return;
    }

    const producto = {
      title: nuevoProducto.title.trim(),
      description: nuevoProducto.description.trim(),
      price: precio,
      category_id: Number(nuevoProducto.category_id),
      category: nuevoProducto.category,
      pictures: nuevoProducto.picture.trim()
        ? [nuevoProducto.picture.trim()]
        : [],
    };

    let actualizados;

    if (editandoId !== null) {
      actualizados = productos.map((existente) =>
        String(existente.id) === String(editandoId)
          ? { ...existente, ...producto }
          : existente
      );
    } else {
      const productoNuevo = {
        ...producto,
        id: Date.now(),
        tags: [],
      };

      actualizados = [...productos, productoNuevo];
    }

    guardarProductos(actualizados);
    setProductos(actualizados);
    cancelarEdicion();
    setError("");
  }

  function empezarEdicion(producto) {
    setEditandoId(producto.id);

    setNuevoProducto({
      title: producto.title || "",
      description: producto.description || "",
      price: String(producto.price ?? ""),
      category_id: String(producto.category_id ?? "1"),
      category:
        producto.category ||
        categorias[String(producto.category_id ?? "1")],
      picture:
        producto.pictures?.[0] ||
        producto.picture ||
        "",
    });

    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setNuevoProducto({ ...formularioVacio });
  }

  function eliminarProducto(id) {
    const confirmar = window.confirm(
      "¿Seguro que querés eliminar este producto?"
    );

    if (!confirmar) return;

    const actualizados = productos.filter(
      (producto) => String(producto.id) !== String(id)
    );

    guardarProductos(actualizados);
    setProductos(actualizados);

    if (String(editandoId) === String(id)) {
      cancelarEdicion();
    }

    setError("");
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">
        Administrar productos
      </h1>

      <p className="mb-8 text-zinc-400">
        Creá, editá y eliminá productos de la tienda.
      </p>

      <section className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <h2 className="mb-5 text-xl font-semibold">
          {editandoId !== null ? "Editar producto" : "Agregar producto"}
        </h2>

        <form
          onSubmit={guardarFormulario}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div>
            <label htmlFor="title" className="mb-1 block text-sm">
              Nombre del producto
            </label>
            <input
              id="title"
              name="title"
              value={nuevoProducto.title}
              onChange={manejarCambio}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3"
              placeholder="Ej.: Placa de video RTX 4060"
            />
          </div>

          <div>
            <label htmlFor="price" className="mb-1 block text-sm">
              Precio en pesos
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="1"
              step="0.01"
              value={nuevoProducto.price}
              onChange={manejarCambio}
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3"
              placeholder="Ej.: 450000"
            />
          </div>

          <div>
            <label htmlFor="category_id" className="mb-1 block text-sm">
              Categoría
            </label>
            <select
              id="category_id"
              name="category_id"
              value={nuevoProducto.category_id}
              onChange={manejarCategoria}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3"
            >
              {Object.entries(categorias).map(([id, nombre]) => (
                <option key={id} value={id}>
                  {nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="picture" className="mb-1 block text-sm">
              Ruta de la imagen
            </label>
            <input
              id="picture"
              name="picture"
              value={nuevoProducto.picture}
              onChange={manejarCambio}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3"
              placeholder="/imagenes/rtx-4060.jpg"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className="mb-1 block text-sm">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              value={nuevoProducto.description}
              onChange={manejarCambio}
              rows="3"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3"
              placeholder="Características del producto"
            />
          </div>

          {error && (
            <p role="alert" className="sm:col-span-2 text-red-400">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-500"
            >
              {editandoId !== null
                ? "Guardar cambios"
                : "Agregar producto"}
            </button>

            {editandoId !== null && (
              <button
                type="button"
                onClick={cancelarEdicion}
                className="rounded-lg border border-zinc-600 px-5 py-3 hover:bg-zinc-800"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <h2 className="mb-4 text-xl font-semibold">
        Productos cargados ({productos.length})
      </h2>

      {cargando && <p>Cargando productos...</p>}

      {!cargando && productos.length === 0 && (
        <p className="text-zinc-400">No hay productos cargados.</p>
      )}

      {!cargando && productos.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-left">
            <thead className="bg-zinc-900">
              <tr>
                <th className="p-4">Producto</th>
                <th className="p-4">Precio</th>
                <th className="p-4">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id} className="border-t border-zinc-800">
                  <td className="p-4">{producto.title}</td>

                  <td className="p-4">
                    {Number(producto.price).toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                      maximumFractionDigits: 0,
                    })}
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => empezarEdicion(producto)}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-500"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => eliminarProducto(producto.id)}
                        className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-500"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default AdminProducts;
