
const CLAVE_TAGS = "ultratech-tags";

const tagsIniciales = [
  { id: 1, title: "Destacado" },
  { id: 2, title: "Promoción" },
  { id: 3, title: "Nuevo" },
  { id: 4, title: "Oferta" },
];

export async function obtenerTags() {
  const guardados = localStorage.getItem(CLAVE_TAGS);

  if (guardados !== null) {
    return JSON.parse(guardados);
  }

  localStorage.setItem(CLAVE_TAGS, JSON.stringify(tagsIniciales));

  return tagsIniciales;
}

export function guardarTags(tags) {
  const usuario = JSON.parse(
    localStorage.getItem("ultratech-usuario")
  );

  if (usuario?.rol !== "admin") {
    throw new Error("No tenés permisos para realizar esta operación.");
  }

  localStorage.setItem(CLAVE_TAGS, JSON.stringify(tags));
}

export async function crearTag(titulo) {
  const tags = await obtenerTags();

  const nuevoTag = {
    id: Date.now(),
    title: titulo.trim(),
  };

  guardarTags([...tags, nuevoTag]);

  return nuevoTag;
}

export async function editarTag(id, titulo) {
  const tags = await obtenerTags();

  const actualizados = tags.map((tag) =>
    tag.id === id ? { ...tag, title: titulo.trim() } : tag
  );

  guardarTags(actualizados);
}

export async function eliminarTag(id) {
  const tags = await obtenerTags();

  const actualizados = tags.filter((tag) => tag.id !== id);

  guardarTags(actualizados);
}
