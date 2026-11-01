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
import AdminCategories from "./pages/Admin/AdminCategories";
import AdminTags from "./pages/Admin/AdminTags";
function App() {
  const { usuario, cerrarSesion } = useAuth();
  return (
    <>
      <header className="border-b border-zinc-800 bg-zinc-950">
        <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <Link to="/" className="text-xl font-bold text-green-500">
            UltraTech
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <Link to="/" className="text-zinc-300 hover:text-green-500">
              Inicio
            </Link>

            <Link
              to="/productos"
              className="text-zinc-300 hover:text-green-500"
            >
              Productos
            </Link>

            <Link to="/carrito" className="text-zinc-300 hover:text-green-500">
              Carrito
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {usuario && (
              <>
                {usuario.rol === "admin" && (
                  <Link
                    to="/admin"
                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
                  >
                    Panel de administración
                  </Link>
                )}

                <span className="max-w-full break-all text-sm text-zinc-400">
                  {usuario.email}
                </span>

                <button
                  onClick={cerrarSesion}
                  className="text-zinc-300 hover:text-green-500"
                >
                  Cerrar sesión
                </button>
              </>
            )}

            {!usuario && (
              <Link to="/login" className="text-zinc-300 hover:text-green-500">
                Iniciar sesión
              </Link>
            )}
          </div>
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
          path="/admin/tags"
          element={
            <ProtectedRoute soloAdmin>
              <AdminTags />
            </ProtectedRoute>
          }
        />

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
                <Link
                  to="/admin/categorias"
                  className="mt-6 ml-3 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-500"
                >
                  Administrar categorías
                </Link>
                <Link
                  to="/admin/tags"
                  className="mt-6 ml-3 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-500"
                >
                  Administrar etiquetas
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
          path="/admin/categorias"
          element={
            <ProtectedRoute soloAdmin>
              <AdminCategories />
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
