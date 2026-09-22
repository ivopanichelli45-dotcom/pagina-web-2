import "../components/header.js";
import "../components/Navbar.js";

console.log("home.js funciona");

const app = document.querySelector("#app");

app.innerHTML = `
<ultratech-header></ultratech-header>
<ultratech-navbar></ultratech-navbar>
`;