import { LitElement, html } from "lit";
import {
  actualizarContadorCarrito,
  obtenerCarrito,
  obtenerCantidadTotal,
  obtenerPrecioTotal,
  quitarDelCarrito,
  vaciarCarrito

} from "../utils/Carrito.js";

class Header extends LitElement {
  createRenderRoot() {
    return this;
  }
  toggleCarrito() {
    const carrito = document.getElementById("panel-carrito");

    if (carrito) {
      carrito.classList.toggle("hidden");
      this.actualizarPanelCarrito();
    }
  }
  actualizarPanelCarrito() {
    const lista = document.getElementById("lista-carrito");
    const cantidad = document.getElementById("cantidad-total-carrito");
    const precio = document.getElementById("precio-total-carrito");

    if (!lista) return;

    const carrito = obtenerCarrito();

    cantidad.textContent = obtenerCantidadTotal();
    precio.textContent = obtenerPrecioTotal().toLocaleString("es-AR");

    if (carrito.length === 0) {
      lista.innerHTML = `
      <p class="text-zinc-500 text-sm">
        El carrito está vacío.
      </p>
    `;
      return;
    }

    lista.innerHTML = carrito
      .map(
        (producto) => `
    <div class="border-b border-zinc-700 pb-3">
      <p class="text-white font-semibold text-sm">
        ${producto.title}
      </p>

      <p class="text-zinc-400 text-sm">
        Cantidad: ${producto.cantidad}
      </p>

      <p class="text-green-500 text-sm font-semibold">
        $${(producto.price * producto.cantidad).toLocaleString("es-AR")}
      </p>
    </div>
  `,
      )
      .join("");
  }

  firstUpdated() {
    actualizarContadorCarrito();
    this.actualizarPanelCarrito();

    const botonVaciar = document.getElementById("vaciar-carrito");

    if (botonVaciar) {
      botonVaciar.addEventListener("click", () => {
        vaciarCarrito();

        const cantidad = document.getElementById("cantidad-total-carrito");
        const precio = document.getElementById("precio-total-carrito");

        if (cantidad) {
          cantidad.textContent = obtenerCantidadTotal();
        }

        if (precio) {
          precio.textContent = obtenerPrecioTotal().toLocaleString("es-AR");
        }
        this.actualizarPanelCarrito();
      });
    }
  }
  buscarProducto(event) {
    if (event.key === "Enter") {
      const texto = event.target.value.trim();

      if (texto === "") {
        return;
      }

      window.location.href = `listado.html?buscar=${encodeURIComponent(texto)}`;
    }
  }
abrirCarrito() {
  const carrito = obtenerCarrito();

  let contenido = "";

  if (carrito.length === 0) {
    contenido = `
      <p class="text-zinc-400 text-center py-6">
        Tu carrito está vacío.
      </p>
    `;
  } else {
    contenido = carrito.map(producto => `
      <div class="flex items-center gap-3 border-b border-zinc-700 py-4">
        
        <img
          src="${producto.image}"
          alt="${producto.title}"
          class="w-16 h-16 object-contain bg-white rounded"
        >

        <div class="flex-1">
          <p class="text-white font-semibold text-sm">
            ${producto.title}
          </p>

          <p class="text-green-400 text-sm mt-1">
            $${producto.price.toLocaleString("es-AR")} x ${producto.cantidad}
          </p>
        </div>

        <button
          data-id="${producto.id}"
          class="eliminar-producto text-red-400 hover:text-red-300 text-sm"
        >
          ✕
        </button>

      </div>
    `).join("");
  }

  const total = obtenerPrecioTotal();

  const ventana = document.createElement("div");

  ventana.className =
    "fixed inset-0 bg-black/70 flex justify-end z-50 opacity-0 transition-opacity duration-300";

  ventana.innerHTML = `
      <div
         id="panel-carrito"
         class="bg-zinc-900 w-full max-w-md h-full p-6 overflow-y-auto transform translate-x-full transition-transform duration-300"
        >

      <div class="flex justify-between items-center mb-6">

        <h2 class="text-2xl font-bold text-white">
            Mi carrito
        </h2>

        <button
          id="cerrar-carrito"
          class="text-zinc-400 hover:text-white text-2xl"
        >
          ✕
        </button>

      </div>

      ${contenido}

      <div class="border-t border-zinc-700 mt-6 pt-5">

        <div class="flex justify-between text-white font-bold text-lg">
          <span>Total:</span>
          <span class="text-green-400">
            $${total.toLocaleString("es-AR")}
          </span>
        </div>

        <button
          id="vaciar-carrito"
          class="w-full mt-5 bg-red-600 hover:bg-red-500 text-white py-3 rounded-lg"
        >
          Vaciar carrito
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(ventana);

  setTimeout(() => {
    ventana.classList.remove("opacity-0");
    ventana.querySelector("#panel-carrito").classList.remove("translate-x-full");
  }, 10);

  ventana.querySelector("#cerrar-carrito").addEventListener("click", () => {
    ventana.remove();
  });

  ventana.querySelector("#vaciar-carrito").addEventListener("click", () => {
    vaciarCarrito();
    ventana.remove();
    this.abrirCarrito();
  });

  ventana.querySelectorAll(".eliminar-producto").forEach(boton => {
    boton.addEventListener("click", () => {
      quitarDelCarrito(Number(boton.dataset.id));
      ventana.remove();
      this.abrirCarrito();
    });
  });
}
  render() {
    return html`
      <header class="bg-black border-b border-zinc-800">
        <div class="max-w-7xl mx-auto px-4 py-5">
          <div class="flex flex-col lg:flex-row items-center gap-7">
            <!-- Logo -->

            <div
               class="w-12 h-12 bg-green-950 rounded-lg flex items-center justify-center overflow-hidden"
           >
             <img
               src="/imagenes/logoultra.png"
               alt="UltraTech"
               class="w-full h-full object-contain"
           >
            </div>

              <div>
                <h1 class="text-3xl font-black text-white">
                  ULTRA<span class="text-green-500">TECH</span>
                </h1>

                <p class="text-xs text-zinc-500">HARDWARE & TECNOLOGÍA</p>
              </div>
            </div>

            <!-- Buscador -->

            <div class="flex-1 w-full max-w-2xl mt-6 lg:mt-0">
              <input
                type="text"
                placeholder="Buscar productos..."
                @keydown=${this.buscarProducto}
                class="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-5 py-3 text-white outline-none focus:border-green-500"
              />
            </div>

            <!-- Cuenta y carrito -->

            <div class="relative flex items-center gap-3 mt-5 lg:mt-0">
              <button class="text-zinc-300 hover:text-green-500">
                Mi cuenta
              </button>

              <button
                @click=${this.toggleCarrito}
                class="relative bg-zinc-900 border border-zinc-700 hover:border-green-500 rounded-lg p-3"
              >
                🛒 Carrito

                <span
                  id="contador-carrito"
                  class="absolute -top-2 -right-2 bg-green-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  0
                </span>
              </button>
               <!-- PANEL DEL CARRITO -->
  <div
    id="panel-carrito"
    class="hidden absolute right-0 top-14 w-80 bg-zinc-900 border border-zinc-700 rounded-xl p-5 z-50"
  >
    <h2 class="text-xl font-bold text-white mb-4">
      Carrito
    </h2>

    <p class="text-zinc-400">
      Productos:
      <span id="cantidad-total-carrito">0</span>
    </p>

    <p class="text-green-500 font-bold mt-2">
      Total:
      $<span id="precio-total-carrito">0</span>
    </p>
    
    <div id="lista-carrito" class="mt-4 space-y-3">
  <p class="text-zinc-500 text-sm">
    El carrito está vacío.
  </p>
</div>

    <button
      id="vaciar-carrito"
      class="w-full mt-5 bg-red-600 hover:bg-red-500 text-white font-semibold py-2 rounded-lg"
    >
      Vaciar carrito
    </button>
  </div>

</div>
            </div>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define("ultratech-header", Header);
