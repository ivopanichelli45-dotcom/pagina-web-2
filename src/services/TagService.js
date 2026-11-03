
const CLAVE_TAGS = "ultratech-tags";
const CLAVE_PRODUCTOS = "ultratech-productos";

const tagsIniciales = [
  { id: 1, title: "Destacado" },
  { id: 2, title: "Promoción" },
  { id: 3, title: "Nuevo" },
  { id: 4, title: "Oferta" },
];

function verificarAdministrador() {
  const usuarioGuardado = localStorage.getItem("ultratech-usuario");

  if (!usuarioGuardado) {
    throw new Error("Debés iniciar sesión como administrador.");
  }

  let usuario;

  try {
    usuario = JSON.parse(usuarioGuardado);
  } catch {
    throw new Error("La sesión no es válida.");
  }

  if (usuario?.rol !== "admin") {
    throw new Error("No tenés permisos para realizar esta operación.");
  }
}

function validarTitulo(titulo) {
  if (!titulo || !titulo.trim()) {
    throw new Error("El nombre de la etiqueta es obligatorio.");
  }
}

function verificarNombreRepetido(tags, titulo, idExcluir = null) {
  const repetida = tags.some(
    (tag) =>
      String(tag.id) !== String(idExcluir) &&
      tag.title.trim().toLowerCase() === titulo.trim().toLowerCase()
  );

  if (repetida) {
    throw new Error("Ya existe una etiqueta con ese nombre.");
  }
}

export async function obtenerTags() {
  try {
    const guardados = localStorage.getItem(CLAVE_TAGS);

    if (guardados !== null) {
      const tags = JSON.parse(guardados);

      if (!Array.isArray(tags)) {
        throw new Error("Los datos de las etiquetas tienen un formato incorrecto.");
      }

      return tags;
    }

    localStorage.setItem(CLAVE_TAGS, JSON.stringify(tagsIniciales));

    return tagsIniciales;
  } catch (error) {
    throw new Error(
      error.message || "No se pudieron cargar las etiquetas."
    );
  }
}

export function guardarTags(tags) {
  verificarAdministrador();

  if (!Array.isArray(tags)) {
    throw new Error("Las etiquetas tienen un formato incorrecto.");
  }

  localStorage.setItem(CLAVE_TAGS, JSON.stringify(tags));
}

export async function crearTag(titulo) {
  verificarAdministrador();
  validarTitulo(titulo);

  const tags = await obtenerTags();

  verificarNombreRepetido(tags, titulo);

  const nuevoTag = {
    id: Date.now(),
    title: titulo.trim(),
  };

  guardarTags([...tags, nuevoTag]);

  return nuevoTag;
}

export async function editarTag(id, titulo) {
  verificarAdministrador();
  validarTitulo(titulo);

  const tags = await obtenerTags();

  const tagExistente = tags.find(
    (tag) => String(tag.id) === String(id)
  );

  if (!tagExistente) {
    throw new Error("No se encontró la etiqueta que querés editar.");
  }

  verificarNombreRepetido(tags, titulo, id);

  const actualizados = tags.map((tag) =>
    String(tag.id) === String(id)
      ? { ...tag, title: titulo.trim() }
      : tag
  );

  guardarTags(actualizados);

  return actualizados;
}

export async function eliminarTag(id) {
  verificarAdministrador();

  const tags = await obtenerTags();

  const tag = tags.find(
    (item) => String(item.id) === String(id)
  );

  if (!tag) {
    throw new Error("No se encontró la etiqueta que querés eliminar.");
  }

  const productosGuardados = localStorage.getItem(CLAVE_PRODUCTOS);
  const productos = productosGuardados
    ? JSON.parse(productosGuardados)
    : [];

  if (!Array.isArray(productos)) {
    throw new Error("No se pudieron verificar los productos asociados.");
  }

  const tieneProductos = productos.some((producto) =>
    (producto.tags || []).some((item) => {
      const nombreTag = typeof item === "string" ? item : item.title;
      const idTag = typeof item === "object" ? item.id : null;

      return (
        nombreTag?.toLowerCase() === tag.title.toLowerCase() ||
        (idTag !== null && String(idTag) === String(id))
      );
    })
  );

  if (tieneProductos) {
    throw new Error(
      "No podés eliminar esta etiqueta porque está asociada a uno o más productos."
    );
  }

  const actualizados = tags.filter(
    (item) => String(item.id) !== String(id)
  );

  guardarTags(actualizados);

  return actualizados;
}
