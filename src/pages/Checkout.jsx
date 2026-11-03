
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Checkout() {
  const { carrito, precioTotal, vaciarCarrito } = useCart();
  const { usuario } = useAuth();

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [compraConfirmada, setCompraConfirmada] = useState(false);
  const [totalCompra, setTotalCompra] = useState(0);
  const [error, setError] = useState("");

  function formatoPrecio(precio) {
    return Number(precio).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    });
  }

  function confirmarCompra(e) {
    e.preventDefault();
    setError("");

    if (carrito.length === 0) {
      setError("Tu carrito está vacío.");
      return;
    }

    if (!nombre.trim() || !direccion.trim()) {
      setError("Completá todos los campos.");
      return;
    }

    setTotalCompra(precioTotal);
    vaciarCarrito();
    setCompraConfirmada(true);
  }

  if (compraConfirmada) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <h1 className="text-3xl font-bold text-green-500">
            ¡Compra confirmada!
          </h1>

          <p className="mt-4 text-zinc-300">
            Gracias por tu compra, {nombre}.
          </p>

          <p className="mt-2 text-zinc-400">
            Tu pedido fue registrado correctamente.
          </p>

          <p className="mt-6 text-xl font-bold">
            Total: {formatoPrecio(totalCompra)}
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-500"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  if (carrito.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <h1 className="text-2xl font-bold">
            No tenés productos en el carrito
          </h1>

          <Link
            to="/productos"
            className="mt-5 inline-block text-green-500 hover:text-green-400"
          >
            Ver productos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Finalizar compra</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <form
          onSubmit={confirmarCompra}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <h2 className="mb-5 text-xl font-semibold">
            Datos de envío
          </h2>

          <label className="mb-2 block text-sm text-zinc-300">
            Nombre completo
          </label>

          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresá tu nombre"
            className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white"
          />

          <label className="mb-2 block text-sm text-zinc-300">
            Correo electrónico
          </label>

          <input
            type="email"
            value={usuario?.email || ""}
            readOnly
            className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-zinc-400"
          />

          <label className="mb-2 block text-sm text-zinc-300">
            Dirección de entrega
          </label>

          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Ingresá tu dirección"
            className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white"
          />

          {error && (
            <p className="mb-4 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-500"
          >
            Confirmar compra
          </button>

          <Link
            to="/carrito"
            className="mt-4 block text-center text-sm text-zinc-400 hover:text-green-500"
          >
            Volver al carrito
          </Link>
        </form>

        <section className="h-fit rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="mb-5 text-xl font-semibold">
            Resumen de compra
          </h2>

          <div className="space-y-4">
            {carrito.map((producto) => (
              <div
                key={producto.id}
                className="flex justify-between gap-4 border-b border-zinc-800 pb-3"
              >
                <div>
                  <p className="font-medium">{producto.title}</p>
                  <p className="text-sm text-zinc-400">
                    Cantidad: {producto.cantidad}
                  </p>
                </div>

                <p className="font-semibold text-green-500">
                  {formatoPrecio(producto.price * producto.cantidad)}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xl font-bold">
            Total: {formatoPrecio(precioTotal)}
          </p>

          <p className="mt-3 text-xs text-zinc-500">
            Compra simulada para el trabajo práctico.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Checkout;
