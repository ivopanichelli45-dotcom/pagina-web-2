import { LitElement, html } from "lit";

class Navbar extends LitElement {
  static properties = {
  menuAbierto: { type: Boolean }
};
  constructor() {
  super();
  this.menuAbierto = false;
}
  createRenderRoot() {
    return this;
  }

  toggleCategorias() {
  this.menuAbierto = !this.menuAbierto;
}

render() {
  return html`
    <nav class="bg-zinc-950 border-b border-zinc-800">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between py-3">

          <a
            href="index.html"
            class="text-white font-semibold hover:text-green-500"
          >
            Inicio
          </a>

          <div class="relative">
            <button
              @click=${() => this.toggleCategorias()}
              class="text-white text-2xl hover:text-green-500"
            >
              ☰
            </button>

            ${this.menuAbierto
              ? html`
                  <div
                    class="absolute right-0 top-10 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg p-3 w-56 z-50"
                  >
                    <a
                      href="listado.html?categoria=344"
                      class="block text-zinc-300 hover:text-green-500 py-2"
                    >
                      Procesadores
                    </a>

                    <a
                      href="listado.html?categoria=346"
                      class="block text-zinc-300 hover:text-green-500 py-2"
                    >
                      Placas de video
                    </a>

                    <a
                      href="listado.html?categoria=345"
                      class="block text-zinc-300 hover:text-green-500 py-2"
                    >
                      Memorias RAM
                    </a>

                    <a
                      href="listado.html?categoria=347"
                      class="block text-zinc-300 hover:text-green-500 py-2"
                    >
                      Motherboards
                    </a>

                    <a
                      href="listado.html?categoria=348"
                      class="block text-zinc-300 hover:text-green-500 py-2"
                    >
                      Almacenamiento
                    </a>

                    <a
                      href="listado.html?categoria=349"
                      class="block text-zinc-300 hover:text-green-500 py-2"
                    >
                      Fuentes
                    </a>

                    <a
                      href="listado.html?categoria=350"
                      class="block text-zinc-300 hover:text-green-500 py-2"
                    >
                      Gabinetes
                    </a>
                  </div>
                `
              : ""}
          </div>

        </div>
      </div>
    </nav>
  `;
 }
}

customElements.define("ultratech-navbar", Navbar);
