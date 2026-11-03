import { LitElement, html } from "lit";
import "./Categoria.js";

class Categorias extends LitElement {

  createRenderRoot() {
    return this;
  }

  static properties = {
    categorias: { type: Array }
  };

  render() {
    return html`
      <section class="max-w-7xl mx-auto px-4 py-10">

        <h2 class="text-2xl font-bold text-white mb-6">
          Categorías
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          ${this.categorias.map(categoria => html`
            <ultratech-categoria
              .id=${categoria.id}
              .nombre=${categoria.nombre}
            ></ultratech-categoria>
          `)}

        </div>

      </section>
    `;
  }
}

customElements.define("ultratech-categorias", Categorias);