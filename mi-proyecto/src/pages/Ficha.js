import "../components/header.js";
import "../components/Navbar.js";
import { agregarAlCarrito } from "../utils/Carrito.js";

const app = document.querySelector("#app");

const params = new URLSearchParams(window.location.search);
const productoId = Number(params.get("producto"));

console.log("Producto seleccionado:", productoId);

const productos = [
  {
    id: 1,
    title: "Placa de Video RTX 4080 super",
    price: 1345000,
    category_id: 2,
    image: "/imagenes/rtx-4080-super.jpg",
    description: "Placa de video de alto rendimiento, ideal para gaming en resoluciones altas, edición de contenido y tareas gráficas exigentes."
  },
  {
    id: 2,
    title: "Placa de Video RTX 3080 ti",
    price: 899999,
    category_id: 2,
    image: "/imagenes/rtx 3080-ti.jpg",
    description: "Placa de video pensada para gaming de alto rendimiento, con potencia suficiente para disfrutar juegos exigentes con una excelente calidad gráfica."
  },
  {
    id: 3,
    title: "Procesador I5 12400F con Memoria RAM 2x16gb DDR4 3200MHz",
    price: 369999,
    category_id: 1,
    image: "/imagenes/i5 12400f.jpg",
    description: "Combo compuesto por un procesador Intel Core i5 y 32 GB de memoria RAM DDR4, ideal para gaming, trabajo y uso general."
  },
  {
    id: 4,
    title: "Placa Madre Z590 asus Tuf gaming",
    price: 659999,
    category_id: 4,
    image: "/imagenes/Placa Madre Z590 asus Tuf gaming.jpg",
    description: "Placa madre ASUS TUF Gaming diseñada para equipos de alto rendimiento, con una construcción orientada a la estabilidad y durabilidad."
  },
  {
    id: 5,
    title: "Placa Madre Z760 tuf gaming",
    price: 679999,
    category_id: 4,
    image: "/imagenes/Placa Madre Z760 tuf gaming.jpg",
    description: "Motherboard TUF Gaming preparada para configuraciones de alto rendimiento y equipos orientados al gaming."
  },
  {
    id: 6,
    title: "Procesador AMD Ryzen 5 7600X 5.3GHz AM5",
    price: 499999,
    category_id: 1,
    image: "/imagenes/Procesador AMD Ryzen 5 7600X 5.3GHz AM5.webp",
    description: "Procesador AMD Ryzen 5 de alto rendimiento, ideal para gaming y aplicaciones exigentes. Utiliza plataforma AM5."
  },
  {
    id: 7,
    title: "Procesador AMD Ryzen 7 7700X 5.4GHz Turbo AM5",
    price: 739999,
    category_id: 1,
    image: "/imagenes/Procesador AMD Ryzen 7 7700X 5.4GHz Turbo AM5.webp",
    description: "Procesador AMD Ryzen 7 pensado para gaming, creación de contenido y multitarea, con una frecuencia Turbo de hasta 5.4 GHz."
  },
  {
    id: 8,
    title: "Procesador AMD Ryzen 9 7900X 5.6GHz Turbo AM5",
    price: 799999,
    category_id: 1,
    image: "/imagenes/Procesador AMD Ryzen 9 7900X 5.6GHz Turbo AM5.webp",
    description: "Procesador AMD Ryzen 9 de alto rendimiento para usuarios que necesitan potencia para gaming, edición y tareas profesionales."
  },
  {
    id: 9,
    title: "SSD M.2 NVMe 1TB",
    price: 79999,
    category_id: 5,
    image: "/imagenes/SSD M.2 NVMe 1TB.webp",
    description: "Unidad SSD M.2 NVMe de 1 TB que ofrece almacenamiento rápido para el sistema operativo, juegos, programas y archivos."
  },
  {
    id: 10,
    title: "SSD M.2 NVMe 2TB",
    price: 129999,
    category_id: 5,
    image: "/imagenes/SSD M.2 NVMe 2TB.webp",
    description: "SSD M.2 NVMe de 2 TB que combina gran capacidad de almacenamiento con velocidades rápidas para juegos y aplicaciones."
  },
  {
    id: 11,
    title: "Gabinete Gamer Brainstorm Spark Acrílico",
    price: 459000,
    category_id: 7,
    image: "/imagenes/Gabinete Gamer Brainstorm Spark Acrílico.webp",
    description: "Gabinete gamer con panel acrílico y diseño pensado para mostrar los componentes internos del equipo."
  },
  {
    id: 12,
    title: "Gabinete PC Gamer Sentey K20 Super 4 Fan RGB Vidrio Templado",
    price: 599000,
    category_id: 7,
    image: "/imagenes/Gabinete PC Gamer Sentey K20 Super 4 Fan RGB Vidrio Templado.webp",
    description: "Gabinete gamer con cuatro ventiladores RGB y panel de vidrio templado, pensado para equipos con buena refrigeración y estética gaming."
  },
  {
    id: 13,
    title: "Gabinete Raidmax I600 Infinita Fishtank Gamer Vidrio Templado",
    price: 699000,
    category_id: 7,
    image: "/imagenes/Gabinete Raidmax I600 Infinita Fishtank Gamer Vidrio Templado.webp",
    description: "Gabinete gamer con diseño panorámico tipo fishtank y paneles de vidrio templado, ideal para configuraciones con componentes visibles."
  },
  {
    id: 14,
    title: "Fuente Alimentacion Corsair 750w 80 Plus Gold Rmx 140mm",
    price: 129999,
    category_id: 6,
    image: "/imagenes/Fuente Alimentacion Corsair 750w 80 Plus Gold Rmx 140mm.webp",
    description: "Fuente de alimentación Corsair de 750 W con certificación 80 Plus Gold, pensada para equipos gamer de alto rendimiento."
  },
  {
    id: 15,
    title: "Fuente de alimentación MSI MPG A850GS PCIE5 80+ dorado ATX 3.1 y PCIe 5.1 850W",
    price: 239999,
    category_id: 6,
    image: "/imagenes/Fuente de alimentación MSI MPG A850GS PCIE5 80+ dorado ATX 3.1 y PCIe 5.1 850W.webp",
    description: "Fuente MSI de 850 W con certificación 80 Plus Gold y compatibilidad con estándares ATX 3.1 y PCIe 5.1."
  },
  {
    id: 16,
    title: "Fuente de Alimentación Thermaltake Toughpower 650W 80 Gold",
    price: 79999,
    category_id: 6,
    image: "/imagenes/Fuente de Alimentación Thermaltake Toughpower 650W 80 Gold.webp",
    description: "Fuente Thermaltake de 650 W con certificación 80 Plus Gold, adecuada para equipos gamer y configuraciones de rendimiento medio y alto."
  },
  {
    id: 17,
    title: "Memoria RAM Patriot Signature Line 8GB DDR4 3200MHz CL22",
    price: 39999,
    category_id: 3,
    image: "/imagenes/Memoria RAM Patriot Signature Line 8GB DDR4 3200MHz CL22.webp",
    description: "Memoria RAM Patriot de 8 GB DDR4 a 3200 MHz, una opción para ampliar la memoria de equipos compatibles."
  },
  {
    id: 18,
    title: "Memoria Ram Star 16gb 3200mhz Ddr4",
    price: 69999,
    category_id: 3,
    image: "/imagenes/Memoria Ram Star 16gb 3200mhz Ddr4.webp",
    description: "Memoria RAM DDR4 de 16 GB a 3200 MHz, ideal para mejorar la capacidad de multitarea y el rendimiento general del equipo."
  },
  {
    id: 19,
    title: "Memoria Ram Ddr4 32gb 3200mhz Hiksemi Future U-dimm Rgb",
    price: 119999,
    category_id: 3,
    image: "/imagenes/Memoria Ram Ddr4 32gb 3200mhz Hiksemi Future U-dimm Rgb.webp",
    description: "Memoria RAM DDR4 de 32 GB a 3200 MHz con iluminación RGB, pensada para equipos gamer que necesitan mayor capacidad de memoria."
  }
];

const producto = productos.find(
  producto => producto.id === productoId
);

function agregarProducto() {
  agregarAlCarrito(producto);

  const mensaje = document.querySelector("#mensaje-carrito");

  mensaje.textContent = "✓ Producto agregado al carrito";
  mensaje.classList.remove("hidden");

  setTimeout(() => {
    mensaje.classList.add("hidden");
  }, 2000);

}

if (!producto) {

  app.innerHTML = `
    <ultratech-header></ultratech-header>
    <ultratech-navbar></ultratech-navbar>

    <main class="max-w-7xl mx-auto px-4 py-10">

      <h1 class="text-3xl font-bold text-white">
        Producto no encontrado
      </h1>

    </main>
  `;

} else {

  app.innerHTML = `
    <ultratech-header></ultratech-header>

    <ultratech-navbar></ultratech-navbar>

    <main class="max-w-7xl mx-auto px-4 py-10">

      <a
        href="javascript:history.back()"
        class="text-green-500 hover:text-green-400"
      >
        Volver
      </a>

      <section class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">

        <div class="bg-white rounded-xl p-8 flex items-center justify-center">
          <img
            src="${producto.image}"
            alt="${producto.title}"
            class="max-h-96 max-w-full object-contain"
          >
        </div>

        <div>

          <h1 class="text-3xl font-bold text-white">
            ${producto.title}
          </h1>

          <p class="text-green-500 text-3xl font-bold mt-6">
            $${producto.price.toLocaleString("es-AR")}
          </p>

          <p class="text-zinc-400 mt-6 leading-relaxed">
            ${producto.description}
          </p>

          <div
            id="mensaje-carrito"
            class="hidden mt-4 text-green-400 text-sm font-semibold text-center"
          >
            ✓ Producto agregado al carrito
          </div>

          <button
             id="btn-agregar"
             class="mt-8 w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg"
           >
             🛒 Agregar al carrito
          </button>

        </div>

      </section>

    </main>
  `;

  document
   .querySelector("#btn-agregar")
   .addEventListener("click", agregarProducto);
}