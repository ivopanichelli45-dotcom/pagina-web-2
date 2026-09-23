import "../components/header.js";
import "../components/Navbar.js";
import "../components/Categorias.js";

console.log("home.js funciona");

const app = document.querySelector("#app");

app.innerHTML = `
<ultratech-header></ultratech-header>
<ultratech-navbar></ultratech-navbar>
<main>
    <section class="max-w-7xl mx-auto px-4 py-12">
      <h1 class="text-3xl md:text-4xl font-bold text-white">
        Hardware y tecnología
      </h1>

      <p class="text-zinc-400 mt-3">
        Encontrá los componentes que necesitás para tu PC.
      </p>
    </section>

    <ultratech-categorias></ultratech-categorias>
  </main>
`;