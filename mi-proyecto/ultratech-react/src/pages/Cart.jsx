
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    carrito,
    quitarDelCarrito,
    cambiarCantidad,
    vaciarCarrito,
    precioTotal,
  } = useCart();

  function formatoPrecio(precio) {
    return Number(precio).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    });
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">
        Mi carrito
      </h1>

      {carrito.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-zinc-300">
            Tu carrito está vacío.
          </p>

          <Link
            to="/productos"
            className="mt-4 inline-block text-green-500 hover:text-green-400"
          >
            Ver productos
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {carrito.map((producto) => (
              <article
                key={producto.id}
                className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={producto.pictures?.[0]}
                    alt={producto.title}
                    className="h-24 w-24 rounded-lg bg-white object-contain p-2"
                  />

                  <div>
                    <h2 className="font-semibold">
                      {producto.title}
                    </h2>

                    <p className="mt-2 text-green-500">
                      {formatoPrecio(producto.price)}
                    </p>

                    <p className="mt-1 text-sm text-zinc-400">
                      Subtotal:{" "}
                      {formatoPrecio(
                        producto.price * producto.cantidad
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      cambiarCantidad(
                        producto.id,
                        producto.cantidad - 1
                      )
                    }
                    disabled={producto.cantidad <= 1}
                    className="rounded bg-zinc-700 px-3 py-2 disabled:opacity-40"
                  >
                    -
                  </button>

                  <span>{producto.cantidad}</span>

                  <button
                    type="button"
                    onClick={() =>
                      cambiarCantidad(
                        producto.id,
                        producto.cantidad + 1
                      )
                    }
                    className="rounded bg-zinc-700 px-3 py-2"
                  >
                    +
                  </button>

                  <button
                    type="button"
                    onClick={() => quitarDelCarrito(producto.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-xl font-bold">
              Total: {formatoPrecio(precioTotal)}
            </p>

            <div className="mt-5 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={vaciarCarrito}
                className="rounded-lg border border-red-500 px-4 py-2 text-red-400"
              >
                Vaciar carrito
              </button>

              <Link
                to="/productos"
                className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-500"
              >
                Seguir comprando
              </Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;
