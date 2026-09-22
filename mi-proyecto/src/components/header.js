import { LitElement, html } from "lit";

class Header extends LitElement {

  render() {
    return html`
      <header class="bg-black border-b border-zinc-800">

        <div class="max-w-7xl mx-auto px-4 py-5">

          <div class="flex flex-col lg:flex-row items-center gap-5">

            <!-- Logo -->
            <div class="flex items-center gap-3">

              <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span class="text-black font-black text-2xl">
                  U
                </span>
              </div>

              <div>
                <h1 class="text-3xl font-black text-white">
                  ULTRA<span class="text-green-500">TECH</span>
                </h1>

                <p class="text-xs text-zinc-500">
                  HARDWARE & TECNOLOGÍA
                </p>
              </div>

            </div>

            <!-- Buscador -->
            <div class="flex-1 w-full max-w-2xl">

              <input
                type="text"
                placeholder="Buscar productos..."
                class="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-5 py-3 text-white outline-none focus:border-green-500"
              >

            </div>

            <!-- Cuenta y carrito -->
            <div class="flex items-center gap-3">

              <button class="text-zinc-300 hover:text-green-500">
                👤 Mi cuenta
              </button>

              <button class="relative bg-zinc-900 border border-zinc-700 hover:border-green-500 rounded-lg p-3">

                🛒

                <span class="absolute -top-2 -right-2 bg-green-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>

              </button>

            </div>

          </div>

        </div>

      </header>
    `;
  }
}

customElements.define("ultratech-header", Header);