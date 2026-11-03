import { LitElement, html } from "lit";

class Categoria extends LitElement {

  createRenderRoot() {
    return this;
  }

  static properties = {
    nombre: { type: String },
    id: { type: Number }
  };

  constructor() {
    super();
    this.nombre = "";
    this.id = 0;
  }

  render() {
    return html`
      <a
        href="listado.html?categoria=${this.id}"
        class="block bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center hover:border-green-500 hover:bg-zinc-800 transition"
      >
        <h3 class="text-white font-semibold">
          ${this.nombre}
        </h3>
      </a>
    `;
  }
}

customElements.define("ultratech-categoria", Categoria);