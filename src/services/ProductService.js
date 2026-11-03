
const CLAVE_PRODUCTOS = "ultratech-productos";

function verificarAdministrador() {
  const usuarioGuardado = localStorage.getItem("ultratech-usuario");

  if (!usuarioGuardado) {
    throw new Error("Debés iniciar sesión como administrador.");
  }

  let usuario;

  try {
    usuario = JSON.parse(usuarioGuardado);
  } catch {
    throw new Error("La sesión no es válida.");
  }

  if (usuario?.rol !== "admin") {
    throw new Error("No tenés permisos para realizar esta operación.");
  }
}

export async function obtenerProductos() {
  try {
    const guardados = localStorage.getItem(CLAVE_PRODUCTOS);

    if (guardados !== null) {
      try {
        const productosGuardados = JSON.parse(guardados);

        if (Array.isArray(productosGuardados)) {
          return productosGuardados;
        }
      } catch {
        // Si los datos guardados están dañados, se vuelve a consultar el JSON.
      }

      localStorage.removeItem(CLAVE_PRODUCTOS);
    }

    const respuesta = await fetch("/api-fake.json");

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los productos.");
    }

    const productos = await respuesta.json();

    if (!Array.isArray(productos)) {
      throw new Error("El archivo de productos tiene un formato incorrecto.");
    }

    localStorage.setItem(
      CLAVE_PRODUCTOS,
      JSON.stringify(productos)
    );

    return productos;
  } catch (error) {
    throw new Error(
      error.message || "Ocurrió un error al cargar los productos."
    );
  }
}

export async function obtenerProducto(id) {
  const productos = await obtenerProductos();

  const producto = productos.find(
    (item) => String(item.id) === String(id)
  );

  if (!producto) {
    throw new Error("No se encontró el producto solicitado.");
  }

  return producto;
}

export function guardarProductos(productos) {
  verificarAdministrador();

  if (!Array.isArray(productos)) {
    throw new Error("Los productos tienen un formato incorrecto.");
  }

  localStorage.setItem(
    CLAVE_PRODUCTOS,
    JSON.stringify(productos)
  );
}
