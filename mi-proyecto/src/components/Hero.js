import { LitElement, html } from "lit";

class Hero extends LitElement {

  createRenderRoot() {
    return this;
  }

  cambiarImagen(direccion) {

  const imagenes = [
    "/imagenes/promocion1.jpg",
    "/imagenes/promocion2.jpg",
    "/imagenes/promocion3.jpg"
  ];

  const imagen = this.querySelector("#imagen-promocion");

  let actual = Number(imagen.dataset.indice || 0);

  actual += direccion;

  if (actual < 0) {
    actual = imagenes.length - 1;
  }

  if (actual >= imagenes.length) {
    actual = 0;
  }

  imagen.classList.add("opacity-0"); 

  setTimeout(() => {

    imagen.src = imagenes[actual];
    imagen.dataset.indice = actual;

    imagen.classList.remove("opacity-0");

  }, 250);
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
        
        <div class="relative w-full max-w-xl overflow-hidden rounded-xl">

  <img
    id="imagen-promocion"
    src="/imagenes/promocion1.jpg"
    class="w-full h-80 object-cover transition-all duration-500"
  >

 <button
  @click=${() => this.cambiarImagen(-1)}
  class="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 text-white w-10 h-10 rounded-full hover:bg-green-500"
>
  ⇇
</button>

 <button
  @click=${() => this.cambiarImagen(1)}
  class="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 text-white w-10 h-10 rounded-full hover:bg-green-500"
>
  ⇉
</button>

</div>
      </section>
    `;
  }
}

customElements.define("ultratech-hero", Hero);