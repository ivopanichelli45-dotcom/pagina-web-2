import { Link } from "react-router-dom";

function ProductCard({ producto }) {
  return (
    <article className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="flex h-52 items-center justify-center bg-white p-4">
        <img
          src={producto.pictures?.[0] || "/imagenes/logoultra.png"}
          alt={producto.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="p-4">
        <h2 className="font-semibold text-white">
          {producto.title}
        </h2>

        <p className="mt-3 text-xl font-bold text-green-500">
          {producto.price.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0
          })}
        </p>

        <Link
          to={`/productos/${producto.id}`}
          className="mt-4 block rounded-lg bg-green-600 py-2 text-center font-semibold text-white hover:bg-green-500"
        >
          Ver producto
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;