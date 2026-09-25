const API_URL = "https://ecommerce.fedegonzalez.com";

export async function obtenerProductos() {
  const respuesta = await fetch(`${API_URL}/products/?skip=0&limit=100`, {
    headers: {
      Authorization: "Bearer 1"
    }
  });
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al obtener los productos`);
  }

  const productos = await respuesta.json();

  return productos;
}