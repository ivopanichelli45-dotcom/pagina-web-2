import { LitElement, html } from "lit";

class Footer extends LitElement {

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <footer class="bg-zinc-950 border-t border-zinc-800 mt-16">

        <div class="max-w-7xl mx-auto px-4 py-10">

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div>
              <h2 class="text-xl font-bold text-white">
                UltraTech
              </h2>

              <p class="text-zinc-400 mt-3">
                Hardware y tecnología para tu PC.
              </p>
            </div>

            <div>
              <h3 class="text-white font-semibold mb-3">
                Categorías
              </h3>

              <ul class="space-y-2 text-zinc-400">
                <li>Procesadores</li>
                <li>Placas de video</li>
                <li>Memorias RAM</li>
                <li>Almacenamiento</li>
              </ul>
            </div>

            <div>
              <h3 class="text-white font-semibold mb-3">
                UltraTech
              </h3>

              <p class="text-zinc-400">
                Componentes y accesorios para armar y mejorar tu PC.
              </p>
            </div>

          </div>

          <div class="border-t border-zinc-800 mt-8 pt-6 text-center">
            <p class="text-zinc-500 text-sm">
              © 2026 UltraTech. Todos los derechos reservados.
            </p>
          </div>

        </div>

      </footer>
    `;
  }
}

customElements.define("ultratech-footer", Footer);