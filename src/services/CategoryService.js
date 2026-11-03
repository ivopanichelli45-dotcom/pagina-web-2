
const CLAVE_CATEGORIAS = "ultratech-categorias";
const CLAVE_PRODUCTOS = "ultratech-productos";

const categoriasIniciales = [
  { id: 1, title: "Procesadores" },
  { id: 2, title: "Placas de video" },
  { id: 3, title: "Almacenamiento" },
  { id: 4, title: "Placas madre" },
  { id: 5, title: "Memoria RAM" },
  { id: 6, title: "Gabinetes" },
  { id: 7, title: "Fuentes de alimentación" },
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
    throw new Error("El nombre de la categoría es obligatorio.");
  }
}

function verificarNombreRepetido(categorias, titulo, idExcluir = null) {
  const repetida = categorias.some(
    (categoria) =>
      categoria.id !== idExcluir &&
      categoria.title.trim().toLowerCase() === titulo.trim().toLowerCase()
  );

  if (repetida) {
    throw new Error("Ya existe una categoría con ese nombre.");
  }
}

export async function obtenerCategorias() {
  try {
    const guardadas = localStorage.getItem(CLAVE_CATEGORIAS);

    if (guardadas !== null) {
      const categorias = JSON.parse(guardadas);

      if (!Array.isArray(categorias)) {
        throw new Error("Los datos de las categorías tienen un formato incorrecto.");
      }

      return categorias;
    }

    localStorage.setItem(
      CLAVE_CATEGORIAS,
      JSON.stringify(categoriasIniciales)
    );

    return categoriasIniciales;
  } catch (error) {
    throw new Error(
      error.message || "No se pudieron cargar las categorías."
    );
  }
}

export function guardarCategorias(categorias) {
  verificarAdministrador();

  if (!Array.isArray(categorias)) {
    throw new Error("Las categorías tienen un formato incorrecto.");
  }

  localStorage.setItem(
    CLAVE_CATEGORIAS,
    JSON.stringify(categorias)
  );
}

export async function crearCategoria(titulo) {
  verificarAdministrador();
  validarTitulo(titulo);

  const categorias = await obtenerCategorias();

  verificarNombreRepetido(categorias, titulo);

  const nuevaCategoria = {
    id: Date.now(),
    title: titulo.trim(),
  };

  guardarCategorias([...categorias, nuevaCategoria]);

  return nuevaCategoria;
}

export async function editarCategoria(id, titulo) {
  verificarAdministrador();
  validarTitulo(titulo);

  const categorias = await obtenerCategorias();

  const existe = categorias.some(
    (categoria) => String(categoria.id) === String(id)
  );

  if (!existe) {
    throw new Error("No se encontró la categoría que querés editar.");
  }

  verificarNombreRepetido(
    categorias,
    titulo,
    categorias.find((categoria) => String(categoria.id) === String(id)).id
  );

  const actualizadas = categorias.map((categoria) =>
    String(categoria.id) === String(id)
      ? { ...categoria, title: titulo.trim() }
      : categoria
  );

  guardarCategorias(actualizadas);

  return actualizadas;
}

export async function eliminarCategoria(id) {
  verificarAdministrador();

  const categorias = await obtenerCategorias();

  const categoria = categorias.find(
    (item) => String(item.id) === String(id)
  );

  if (!categoria) {
    throw new Error("No se encontró la categoría que querés eliminar.");
  }

  const productosGuardados = localStorage.getItem(CLAVE_PRODUCTOS);
  const productos = productosGuardados
    ? JSON.parse(productosGuardados)
    : [];

  if (!Array.isArray(productos)) {
    throw new Error("No se pudieron verificar los productos asociados.");
  }

  const tieneProductos = productos.some(
    (producto) =>
      String(producto.category_id ?? producto.category?.id) === String(id) ||
      producto.category === categoria.title
  );

  if (tieneProductos) {
    throw new Error(
      "No podés eliminar esta categoría porque tiene productos asociados. Primero modificá o eliminá esos productos."
    );
  }

  const actualizadas = categorias.filter(
    (item) => String(item.id) !== String(id)
  );

  guardarCategorias(actualizadas);

  return actualizadas;
}
