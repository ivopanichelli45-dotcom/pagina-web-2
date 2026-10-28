export async function obtenerProductos() {
  const respuesta = await fetch("/api-fake.json");

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los productos.");
  }

  return await respuesta.json();
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