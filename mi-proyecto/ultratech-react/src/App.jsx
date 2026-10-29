import { Link, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Forbidden from "./pages/Forbidden";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Products from "./pages/products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import AdminProducts from "./pages/Admin/AdminProducts";

function App() {
  const { usuario, cerrarSesion } = useAuth();
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
          {usuario ? (
            <>
              <span className="text-sm text-zinc-400">{usuario.email}</span>

              <button
                onClick={cerrarSesion}
                className="text-zinc-300 hover:text-green-500"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link to="/login" className="text-zinc-300 hover:text-green-500">
              Iniciar sesión
            </Link>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/403" element={<Forbidden />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute soloAdmin>
              <main className="mx-auto max-w-7xl px-4 py-12">
                <h1 className="text-3xl font-bold">Panel de administración</h1>

                <p className="mt-3 text-zinc-400">
                  Elegí qué sección querés administrar.
                </p>

                <Link
                  to="/admin/productos"
                  className="mt-6 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-500"
                >
                  Administrar productos
                </Link>
              </main>
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin/productos"
  element={
    <ProtectedRoute soloAdmin>
      <AdminProducts />
    </ProtectedRoute>
  }
/>
        <Route
          path="*"
          element={
            <main className="p-10 text-center">
              <h1 className="text-3xl font-bold">Página no encontrada</h1>
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
