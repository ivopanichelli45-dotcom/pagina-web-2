import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <header className="border-b border-zinc-800 bg-zinc-950">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 py-5">
          <Link to="/" className="text-xl font-bold text-green-500">
            UltraTech
          </Link>

          <Link to="/" className="text-zinc-300 hover:text-green-500">
            Inicio
          </Link>

          <Link to="/productos" className="text-zinc-300 hover:text-green-500">
            Productos
          </Link>
          <Link to="/carrito" className="text-zinc-300 hover:text-green-500">
            Carrito
          </Link>
        </nav>
      </header>

      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/productos" element={<Products />} />
  <Route path="/productos/:id" element={<ProductDetail />} />
  <Route path="/carrito" element={<Cart />} />

  <Route
    path="*"
    element={
      <main className="p-10 text-center">
        <h1 className="text-3xl font-bold">
          Página no encontrada
        </h1>
        <Link to="/" className="mt-4 inline-block text-green-500">
          Volver al inicio
        </Link>
      </main>
    }
  />
</Routes>
    </>
  );
}

export default App;
