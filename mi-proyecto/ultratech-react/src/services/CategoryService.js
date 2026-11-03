const CLAVE_CATEGORIAS = "ultratech-categorias";

const categoriasIniciales = [
  { id: 1, title: "Procesadores" },
  { id: 2, title: "Placas de video" },
  { id: 3, title: "Almacenamiento" },
  { id: 4, title: "Placas madre" },
  { id: 5, title: "Memoria RAM" },
  { id: 6, title: "Gabinetes" },
  { id: 7, title: "Fuentes de alimentacion" },
];

export async function obtenerCategorias() {
  const guardadas = localStorage.getItem(CLAVE_CATEGORIAS);

  if (guardadas !== null) {
    return JSON.parse(guardadas);
  }

  localStorage.setItem(CLAVE_CATEGORIAS, JSON.stringify(categoriasIniciales));

  return categoriasIniciales;
}

export function guardarCategorias(categorias) {
  const usuario = JSON.parse(localStorage.getItem("ultratech-usuario"));

  if (usuario?.rol !== "admin") {
    throw new Error("No tenés permisos para realizar esta operación.");
  }

  localStorage.setItem(CLAVE_CATEGORIAS, JSON.stringify(categorias));
}
export async function crearCategoria(titulo) {
  const categorias = await obtenerCategorias();

  const nuevaCategoria = {
    id: Date.now(),
    title: titulo.trim(),
  };

  guardarCategorias([...categorias, nuevaCategoria]);

  return nuevaCategoria;
}

export async function editarCategoria(id, titulo) {
  const categorias = await obtenerCategorias();

  const actualizadas = categorias.map((categoria) =>
    categoria.id === id
      ? { ...categoria, title: titulo.trim() }
      : categoria
  );

  guardarCategorias(actualizadas);
}

export async function eliminarCategoria(id) {
  const categorias = await obtenerCategorias();

  const actualizadas = categorias.filter(
    (categoria) => categoria.id !== id
  );

  guardarCategorias(actualizadas);
}
