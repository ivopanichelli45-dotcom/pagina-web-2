import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { obtenerProductos } from "../services/ProductService";

function Products() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("nombre");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        setProductos(await obtenerProductos());
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    cargar();
  }, []);

  const productosFiltrados = productos
    .filter((producto) =>
      producto.title.toLowerCase().includes(busqueda.toLowerCase())
    )
    .sort((a, b) => {
      if (orden === "menor") return a.price - b.price;
      if (orden === "mayor") return b.price - a.price;
      return a.title.localeCompare(b.title);
    });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">Todos los productos</h1>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar un producto..."
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3"
        />

        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3"
        >
          <option value="nombre">Ordenar por nombre</option>
          <option value="menor">Precio: menor a mayor</option>
          <option value="mayor">Precio: mayor a menor</option>
        </select>
      </div>

      {cargando && <p>Cargando productos...</p>}
      {error && <p role="alert" className="text-red-400">{error}</p>}

      {!cargando && !error && productosFiltrados.length === 0 && (
        <p className="text-zinc-400">No se encontraron productos.</p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {productosFiltrados.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </main>
  );
}

export default Products;