
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

function leerCarrito() {
  try {
    const guardado = localStorage.getItem("ultratech-carrito");
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(leerCarrito);

  useEffect(() => {
    localStorage.setItem("ultratech-carrito", JSON.stringify(carrito));
  }, [carrito]);

  function agregarAlCarrito(producto) {
    setCarrito((actual) => {
      const existente = actual.find(
        (item) => item.id === producto.id
      );

      if (existente) {
        return actual.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...actual, { ...producto, cantidad: 1 }];
    });
  }

  function quitarDelCarrito(id) {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  }

  function cambiarCantidad(id, cantidad) {
    if (cantidad < 1) return;

    setCarrito((actual) =>
      actual.map((item) =>
        item.id === id ? { ...item, cantidad } : item
      )
    );
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const precioTotal = carrito.reduce(
    (total, item) => total + Number(item.price) * item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        quitarDelCarrito,
        cambiarCantidad,
        vaciarCarrito,
        cantidadTotal,
        precioTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
