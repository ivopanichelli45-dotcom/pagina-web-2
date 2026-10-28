

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { obtenerProducto } from "../services/ProductService";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const { agregarAlCarrito } = useCart();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    let activo = true;

    async function cargarProducto() {
      setCargando(true);
      setError("");
      setProducto(null);

      try {
        const resultado = await obtenerProducto(id);

        if (activo) {
          setProducto(resultado);
        }
      } catch (err) {
        if (activo) {
          setError(err.message || "No se pudo cargar el producto.");
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarProducto();

    return () => {
      activo = false;
    };
  }, [id]);

  if (cargando) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-zinc-300">Cargando producto...</p>
      </main>
    );
  }

  if (error || !producto) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10">
        <p role="alert" className="text-red-400">
          {error || "No se encontró el producto."}
        </p>

        <Link
          to="/productos"
          className="mt-5 inline-block text-green-500 hover:text-green-400"
        >
          Volver al catálogo
        </Link>
      </main>
    );
  }

  const imagen = producto.pictures?.[0];

  function manejarAgregar() {
    agregarAlCarrito(producto);
    setAgregado(true);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <Link
        to="/productos"
        className="mb-8 inline-block text-green-500 hover:text-green-400"
      >
        Volver al catálogo
      </Link>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex min-h-72 items-center justify-center rounded-xl bg-white p-6">
          {imagen ? (
            <img
              src={imagen}
              alt={producto.title}
              className="max-h-96 max-w-full object-contain"
            />
          ) : (
            <p className="text-zinc-500">Imagen no disponible</p>
          )}
        </div>

        <div className="flex flex-col items-start">
          <p className="mb-3 text-sm text-green-500">
            {producto.category?.title || "Hardware y tecnología"}
          </p>

          <h1 className="text-3xl font-bold text-white">
            {producto.title}
          </h1>

          <p className="mt-5 text-2xl font-bold text-green-500">
            {Number(producto.price).toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              maximumFractionDigits: 0,
            })}
          </p>

          <p className="mt-6 leading-7 text-zinc-300">
            {producto.description || "Sin descripción disponible."}
          </p>

          <button
            type="button"
            onClick={manejarAgregar}
            className="mt-8 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500"
          >
            Agregar al carrito
          </button>

          {agregado && (
            <p role="status" className="mt-3 text-green-400">
              Producto agregado al carrito.
            </p>
          )}

          <Link
            to="/carrito"
            className="mt-4 text-green-500 hover:text-green-400"
          >
            Ir al carrito
          </Link>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;
