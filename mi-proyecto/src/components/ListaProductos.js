import { LitElement, html } from "lit";
import { obtenerProductos } from "../services/api.js";

const imagenesProductos = {
  "Placa de Video RTX 4080 Super": "/imagenes/rtx-4080-super.jpg",
  "Placa de Video RTX 3080 ti": "/imagenes/rtx 3080-ti.jpg",

  "Procesador I5 12400F con Memoria RAM 2x16gb DDR4 3200MHz": "/imagenes/i5 12400f.jpg",
  "Procesador AMD Ryzen 5 7600X 5.3GHz AM5": "/imagenes/Procesador AMD Ryzen 5 7600X 5.3GHz AM5.webp",
  "Procesador AMD Ryzen 7 7700X 5.4GHz Turbo AM5": "/imagenes/Procesador AMD Ryzen 7 7700X 5.4GHz Turbo AM5.webp",
  "Procesador AMD Ryzen 9 7900X 5.6GHz Turbo AM5": "/imagenes/Procesador AMD Ryzen 9 7900X 5.6GHz Turbo AM5.webp",

  "Placa Madre Z590 asus Tuf gaming": "/imagenes/Placa Madre Z590 asus Tuf gaming.jpg",
  "Placa Madre Z760 tuf gaming": "/imagenes/Placa Madre Z760 tuf gaming.jpg",

  "SSD M.2 NVMe 1TB": "/imagenes/SSD M.2 NVMe 1TB.webp",
  "SSD M.2 NVMe 2TB": "/imagenes/SSD M.2 NVMe 2TB.webp",

  "Gabinete Gamer Brainstorm Spark Acrilico": "/imagenes/Gabinete Gamer Brainstorm Spark Acrilico.webp",
  "Gabinete PC Gamer Sentey K20 Super 4 Fan Rgb Vidrio Templado": "/imagenes/Gabinete Pc Gamer Sentey K20 Super 4 Fan Rgb Vidrio Templado.webp",
  "Gabinete Raidmax I600 Infinita Fishtank Gamer Vidrio Templado": "/imagenes/Gabinete Raidmax I600 Infinita Fishtank Gamer Vidrio Templado.webp",

  "Fuente Alimentacion Corsair 750w 80 Plus Gold Rmx 140mm": "/imagenes/Fuente Alimentacion Corsair 750w 80 Plus Gold Rmx 140mm.webp",
  "Fuente de alimentación MSI MPG A850GS PCIE5 80+ dorado ATX 3.1 y PCIe 5.1 850W": "/imagenes/Fuente de alimentación MSI MPG A850GS PCIE5 80+ dorado ATX 3.1 y PCIe 5.1 850W.webp",
  "Fuente de Alimentación Thermaltake Toughpower 650W 80 Gold": "/imagenes/Fuente de Alimentación Thermaltake Toughpower 650W 80 Gold.webp",

  "Memoria RAM Patriot Signature Line 8GB DDR4 3200MHz CL22": "/imagenes/Memoria RAM Patriot Signature Line 8GB DDR4 3200MHz CL22.webp",
  "Memoria Ram Star 16gb 3200mhz Ddr4": "/imagenes/Memoria Ram Star 16gb 3200mhz Ddr4.webp",
  "Memoria Ram Ddr4 32gb 3200mhz Hiksemi Future U-dimm Rgb": "/imagenes/Memoria Ram Ddr4 32gb 3200mhz Hiksemi Future U-dimm Rgb.webp"
};

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

  this.productos = [];
  console.log("TITULOS:", this.productos);
  this.cargarProductos();
}

async cargarProductos() {
  try {
    this.productos = await obtenerProductos();
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
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
                  src="${imagenesProductos[producto.title] || "/imagenes/combointel.jpg"}"
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