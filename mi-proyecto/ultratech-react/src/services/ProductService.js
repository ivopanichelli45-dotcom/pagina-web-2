
const CLAVE_PRODUCTOS = "ultratech-productos";

export async function obtenerProductos() {
  try {
    const guardados = localStorage.getItem(CLAVE_PRODUCTOS);

    // Si ya hay productos guardados, usamos esos.
    if (guardados !== null) {
      return JSON.parse(guardados);
    }

    // La primera vez, cargamos los productos del JSON.
    const respuesta = await fetch("/api-fake.json");

    if (!respuesta.ok) {
      throw new Error("No se pudieron cargar los productos.");
    }

    const productos = await respuesta.json();

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
  localStorage.setItem(
    CLAVE_PRODUCTOS,
    JSON.stringify(productos)
  );
}
