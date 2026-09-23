const API_URL = "https://ecommerce.fedegonzalez.com";

export async function obtenerProductos() {
  const respuesta = await fetch(`${API_URL}/products`);

  if (!respuesta.ok) {
    throw new Error("Error al obtener los productos");
  }

  const productos = await respuesta.json();

  return productos;
}