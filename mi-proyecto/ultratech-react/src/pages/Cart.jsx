
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    carrito,
    quitarDelCarrito,
    cambiarCantidad,
    vaciarCarrito,
    cantidadTotal,
    precioTotal
  } = useCart();

  const formatoPrecio = (precio) =>
    Number(precio).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0
    });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Mi carrito</h1>

      {carrito.length === 0 ? (
        <div>
          <p className="text-zinc-400">Tu carrito está vacío.</p>
          <Link
            to="/productos"
            className="mt-5 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-500"
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
                className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:flex-row sm:items-center"
              >
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-white p-2">
                  {producto.pictures?.[0] && (
                    <img
                      src={producto.pictures[0]}
                      alt={producto.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </div>

                <div className="flex-1">
                  <h2 className="font-semibold">{producto.title}</h2>
                  <p className="mt-1 text-green-500">
                    {formatoPrecio(producto.price)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <label
                    htmlFor={`cantidad-${producto.id}`}
                    className="text-sm text-zinc-300"
                  >
                    Cantidad
                  </label>

                  <input
                    id={`cantidad-${producto.id}`}
                    type="number"
                    min="1"
                    value={producto.cantidad}
                    onChange={(e) => {
                      const valor = Number(e.target.value);
                      if (Number.isInteger(valor) && valor >= 1) {
                        cambiarCantidad(producto.id, valor);
                      }
                    }}
                    className="w-20 rounded-lg border border-zinc-700 bg-zinc-950 px-2 py-2"
                  />
                </div>

                <div className="font-semibold">
                  {formatoPrecio(producto.price * producto.cantidad)}
                </div>

                <button
                  type="button"
                  onClick={() => quitarDelCarrito(producto.id)}
                  className="text-left text-red-400 hover:text-red-300"
                >
                  Quitar
                </button>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-zinc-300">
              Cantidad total de artículos: {cantidadTotal}
            </p>

            <p className="mt-3 text-2xl font-bold">
              Total: {formatoPrecio(precioTotal)}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={vaciarCarrito}
                className="rounded-lg border border-zinc-700 px-5 py-3 hover:bg-zinc-800"
              >
                Vaciar carrito
              </button>

              <button
                type="button"
                disabled
                title="El checkout se implementará más adelante."
                className="cursor-not-allowed rounded-lg bg-zinc-700 px-5 py-3 font-semibold text-zinc-300"
              >
                Continuar compra (próximamente)
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;
