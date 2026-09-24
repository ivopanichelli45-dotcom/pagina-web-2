import { LitElement, html } from "lit";

class Hero extends LitElement {

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section class="bg-zinc-900 border-b border-zinc-800">
        <div class="max-w-7xl mx-auto px-4 py-16 md:py-20">

          <div class="max-w-3xl">

            <p class="text-green-500 font-semibold mb-3">
              ULTRATECH
            </p>

            <h1 class="text-4xl md:text-5xl font-bold text-white leading-tight">
              Hardware para llevar tu PC al siguiente nivel
            </h1>

            <p class="text-zinc-400 text-lg mt-5">
              Encontrá procesadores, placas de video, memorias,
              almacenamiento y todos los componentes para tu PC.
            </p>

            <a
              href="#productos"
              class="inline-block mt-7 bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Ver productos
            </a>

          </div>

        </div>
      </section>
    `;
  }
}

customElements.define("ultratech-hero", Hero);