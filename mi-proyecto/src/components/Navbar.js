import { LitElement, html } from "lit";

class Navbar extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <nav class="bg-zinc-950 border-b border-zinc-800">
        <div class="max-w-7xl mx-auto px-4">
          <div class="flex items-center gap-6 overflow-x-auto py-3">
            <a
              href="index.html"
              class="text-white font-semibold hover:text-green-500 whitespace-nowrap"
            >
              Inicio
            </a>

            <a
              href="listado.html?categoria=1"
              class="text-zinc-400 hover:text-green-500 whitespace-nowrap"
            >
              Procesadores
            </a>

            <a
              href="listado.html?categoria=2"
              class="text-zinc-400 hover:text-green-500 whitespace-nowrap"
            >
              Placas de video
            </a>

            <a
              href="listado.html?categoria=3"
              class="text-zinc-400 hover:text-green-500 whitespace-nowrap"
            >
              Memorias RAM
            </a>

            <a
              href="listado.html?categoria=4"
              class="text-zinc-400 hover:text-green-500 whitespace-nowrap"
            >
              Motherboards
            </a>

            <a
              href="listado.html?categoria=5"
              class="text-zinc-400 hover:text-green-500 whitespace-nowrap"
            >
              Almacenamiento
            </a>

            <a
              href="listado.html?categoria=6"
              class="text-zinc-400 hover:text-green-500 whitespace-nowrap"
            >
              Fuentes
            </a>
            <a
              href="listado.html?categoria=7"
              class="text-zinc-400 hover:text-green-500 whitespace-nowrap"
            >
              Gabinetes
            </a>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define("ultratech-navbar", Navbar);
