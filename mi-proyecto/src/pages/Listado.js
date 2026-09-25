import { obtenerProductos } from "../services/api.js";
import "../components/header.js";
import "../components/Navbar.js";

const app = document.querySelector("#app");

const params = new URLSearchParams(window.location.search);
const categoria = Number(params.get("categoria"));
const busqueda = params.get("buscar") || "";

console.log("Categoría seleccionada:", categoria);

const productosLocales = [
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
    image: "/imagenes/i5 12400f.jpg"
  },
  {
    id: 4,
    title: "Placa Madre Z590 asus Tuf gaming",
    price: 659999,
    category_id: 4,
    image: "/imagenes/Placa Madre Z590 asus Tuf gaming.jpg"
  },
  {
    id: 5,
    title: "Placa Madre Z760 tuf gaming",
    price: 679999,
    category_id: 4,
    image: "/imagenes/Placa Madre Z760 tuf gaming.jpg"
  },
  {
    id: 6,
    title: "Procesador AMD Ryzen 5 7600X 5.3GHz AM5",
    price: 499999,
    category_id: 1,
    image: "/imagenes/Procesador AMD Ryzen 5 7600X 5.3GHz AM5.webp"
  },

  {
    id: 7,
    title: "Procesador AMD Ryzen 7 7700X 5.4GHz Turbo AM5",
    price: 739999,
    category_id: 1,
    image: "/imagenes/Procesador AMD Ryzen 7 7700X 5.4GHz Turbo AM5.webp"
  },

  {
    id: 8,
    title: "Procesador AMD Ryzen 9 7900X 5.6GHz Turbo AM5",
    price: 799999,
    category_id: 1,
    image: "/imagenes/Procesador AMD Ryzen 9 7900X 5.6GHz Turbo AM5.webp"
  },

  {
    id: 9,
    title: "SSD M.2 NVMe 1TB",
    price: 79999,
    category_id: 5,
    image: "/imagenes/SSD M.2 NVMe 1TB.webp"
  },
  {
    id: 10,
    title: "SSD M.2 NVMe 2TB",
    price: 129999,
    category_id: 5,
    image: "/imagenes/SSD M.2 NVMe 2TB.webp"
  },
  {
    id: 11,
    title: "Gabinete Gamer Brainstorm Spark Acrilico",
    price: 459000,
    category_id: 7,
    image: "/imagenes/Gabinete Gamer Brainstorm Spark Acrilico.webp"
  },

  {
    id: 12,
    title: "Gabinete Pc Gamer Sentey K20 Super 4 Fan Rgb Vidrio Templado",
    price: 599000,
    category_id: 7,
    image: "/imagenes/Gabinete Pc Gamer Sentey K20 Super 4 Fan Rgb Vidrio Templado.webp"
  },

  {
    id: 13,
    title: "Gabinete Raidmax I600 Infinita Fishtank Gamer Vidrio Templado",
    price: 699000,
    category_id: 7,
    image: "/imagenes/Gabinete Raidmax I600 Infinita Fishtank Gamer Vidrio Templado.webp"
  },
  {
    id: 14,
    title: "Fuente Alimentacion Corsair 750w 80 Plus Gold Rmx 140mm",
    price: 129999,
    category_id: 6,
    image: "/imagenes/Fuente Alimentacion Corsair 750w 80 Plus Gold Rmx 140mm.webp"
},
{
    id: 15,
    title: "Fuente de alimentación MSI MPG A850GS PCIE5 80+ dorado ATX 3.1 y PCIe 5.1 850W",
    price: 239999,
    category_id: 6,
    image: "/imagenes/Fuente de alimentación MSI MPG A850GS PCIE5 80+ dorado ATX 3.1 y PCIe 5.1 850W.webp"
},
{
    id: 16,
    title: "Fuente de Alimentación Thermaltake Toughpower 650W 80 Gold",
    price: 79999,
    category_id: 6,
    image: "/imagenes/Fuente de Alimentación Thermaltake Toughpower 650W 80 Gold.webp"
  },
{
    id: 17,
    title: "Memoria RAM Patriot Signature Line 8GB DDR4 3200MHz CL22",
    price: 39999,
    category_id: 3,
    image: "/imagenes/Memoria RAM Patriot Signature Line 8GB DDR4 3200MHz CL22.webp"
},
{
    id: 18,
    title: "Memoria Ram Star 16gb 3200mhz Ddr4",
    price: 69999,
    category_id: 3,
    image: "/imagenes/Memoria Ram Star 16gb 3200mhz Ddr4.webp"
},
{
    id: 19,
    title: "Memoria Ram Ddr4 32gb 3200mhz Hiksemi Future U-dimm Rgb",
    price: 119999,
    category_id: 3,
    image: "/imagenes/Memoria Ram Ddr4 32gb 3200mhz Hiksemi Future U-dimm Rgb.webp"
},


];
function mostrarProductos(productos) {

let productosFiltrados = productos;

if (busqueda !== "") {

  const textoBusqueda = busqueda.toLowerCase();

  productosFiltrados = productos.filter(producto =>
    producto.title.toLowerCase().includes(textoBusqueda)
  );

} else if (categoria) {

  productosFiltrados = productos.filter(
    producto => producto.category_id === categoria
  );

}

app.innerHTML = `
  <ultratech-header></ultratech-header>

  <ultratech-navbar></ultratech-navbar>

  <main class="max-w-7xl mx-auto px-4 py-10">

    <h1 class="text-3xl font-bold text-white mb-8">
  ${busqueda !== "" ? `Resultados para: "${busqueda}"` : "Productos"}
  </h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

      ${productosFiltrados.map(producto => `
        <article class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">

          <div class="bg-white h-52 flex items-center justify-center p-4">
            <img
              src="${producto.image}"
              alt="${producto.title}"
              class="max-h-full max-w-full object-contain"
            >
          </div>

          <div class="p-4">

            <h2 class="text-white font-semibold">
              ${producto.title}
            </h2>

            <p class="text-green-500 text-xl font-bold mt-3">
              $${producto.price.toLocaleString("es-AR")}
            </p>

            <a
              href="ficha.html?producto=${producto.id}"
              class="block text-center mt-4 bg-green-600 hover:bg-green-500 text-white font-semibold py-2 rounded-lg"
            >
              Ver producto
            </a>

          </div>

        </article>
      `).join("")}

    </div>

  </main>
`;
}
obtenerProductos()
  .then(productosAPI => {

    console.log("Productos recibidos de la API:", productosAPI);

    const productos = productosAPI.length > 0
      ? productosAPI
      : productosLocales;

    mostrarProductos(productos);
  })
  .catch(error => {

    console.error("Error con la API:", error);

    mostrarProductos(productosLocales);
  });