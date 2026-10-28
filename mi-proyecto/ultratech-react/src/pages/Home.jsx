import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { obtenerProductos } from "../services/ProductService";

function Home() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarProductos() {
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900 px-6 py-12 md:px-10">
        <p className="font-semibold text-green-500">ULTRATECH</p>

        <h1 className="mt-3 text-3xl font-bold md:text-5xl">
          Hardware para llevar tu PC al siguiente nivel
        </h1>

        <p className="mt-4 max-w-2xl text-zinc-400">
          Encontrá procesadores, placas de video y componentes
          para armar o mejorar tu computadora.
        </p>

        <Link
          to="/productos"
          className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold hover:bg-green-500"
        >
          Ver todos los productos
        </Link>
      </section>

      <section className="py-10">
        <h2 className="mb-6 text-2xl font-bold">Productos destacados</h2>

        {cargando && <p className="text-zinc-400">Cargando productos...</p>}

        {error && <p role="alert" className="text-red-400">{error}</p>}

        {!cargando && !error && productos.length === 0 && (
          <p className="text-zinc-400">No hay productos disponibles.</p>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {productos
            .filter((producto) =>
              producto.tags?.some((tag) => tag.title === "Destacado")
            )
            .map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
        </div>
      </section>
    </main>
  );
}

export default Home;