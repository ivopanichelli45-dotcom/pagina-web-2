const CLAVE_CARRITO = "carrito";

export function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
}

export function agregarAlCarrito(producto) {
  const carrito = obtenerCarrito();

  const productoExistente = carrito.find(p => p.id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1
    });
  }

  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarContadorCarrito();
}

export function quitarDelCarrito(id) {
  let carrito = obtenerCarrito();

  carrito = carrito.filter(producto => producto.id !== id);

  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarContadorCarrito();
}

export function vaciarCarrito() {
  localStorage.removeItem(CLAVE_CARRITO);
  actualizarContadorCarrito();
}

export function obtenerCantidadTotal() {
  const carrito = obtenerCarrito();

  return carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );
}

export function obtenerPrecioTotal() {
  const carrito = obtenerCarrito();

  return carrito.reduce(
    (total, producto) => total + producto.price * producto.cantidad,
    0
  );
}

export function actualizarContadorCarrito() {
  const contador = document.getElementById("contador-carrito");

  if (contador) {
    contador.textContent = obtenerCantidadTotal();
  }
}