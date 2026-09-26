import { LitElement, html } from "lit";
import { agregarAlCarrito } from "../utils/Carrito.js";

class ListaProductos extends LitElement {

  createRenderRoot() {
    return this;
  }

  static properties = {
    productos: { type: Array }
  };

  constructor() {
    super();

    this.productos = [
      {
        id: 1,
        title: "Placa de Video RTX 4080 super",
        price: 1345000,
        category_id: 2,
        image: "/imagenes/rtx-4080-super.jpg"
      },
      {
        id: 2,
        title: "Placa de Video RTX 3080 ti",
        price: 899999,
        category_id: 2,
        image: "/imagenes/rtx 3080-ti.jpg"
      },
      {
        id: 3,
        title: "Procesador I5 12400F con Memoria RAM 2x16gb DDR4 3200MHz",
        price: 369999,
        category_id: 1,
        image: "/imagenes/combointel.jpg"
      },
      {
        id: 4,
        title: "Procesador I5 11400 con placa madre Z590 asus",
        price: 659999,
        category_id: 4,
        image: "/imagenes/I5 11400-Z590.jpg"
      },
      {
        id: 5,
        title: "Procesador I7 14600K con placa madre Z760 tuf gaming",
        price: 679999,
        category_id: 4,
        image: "/imagenes/I7 14600K-Z760.jpg"
      },
      {
        id: 6,
        title: "SSD M.2 NVMe 1TB",
        price: 79999,
        category_id: 5,
        image: "/imagenes/SSD M.2 NVMe 1TB.webp"
      },
      {
        id: 7,
        title: "SSD M.2 NVMe 2TB",
        price: 129999,
        category_id: 5,
        image: "/imagenes/SSD M.2 NVMe 2TB.webp"
      }
    ];
  }
    agregarProducto(producto) {
    agregarAlCarrito(producto);
}

  render() {
    return html`
      <section class="max-w-7xl mx-auto px-4 py-10">

        <h2 class="text-2xl font-bold text-white mb-6">
          Productos destacados
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          ${this.productos.map(producto => html`
            <article
              class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-green-500 transition"
            >

              <div class="bg-white h-52 flex items-center justify-center p-4">
                <img
                  src="${producto.image}"
                  alt="${producto.title}"
                  class="max-h-full max-w-full object-contain"
                >
              </div>

              <div class="p-4">

                <h3 class="text-white font-semibold">
                  ${producto.title}
                </h3>

                <p class="text-green-500 text-xl font-bold mt-3">
                  $${producto.price.toLocaleString("es-AR")}
                </p>

                <a
                  href="ficha.html?producto=${producto.id}"
                  class="block text-center mt-4 bg-green-600 hover:bg-green-500 text-white font-semibold py-2 rounded-lg transition"
                >
                  Ver producto
                </a>
                <button
                  @click=${() => this.agregarProducto(producto)}
                    class="w-full mt-2 bg-zinc-800 hover:bg-zinc-700 text-green-500 border border-zinc-700 font-semibold py-2 rounded-lg transition"
>
  Agregar al carrito
</button>

              </div>

            </article>
          `)}

        </div>

      </section>
    `;
  }
}

customElements.define("ultratech-lista-productos", ListaProductos);