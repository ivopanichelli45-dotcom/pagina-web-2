# INTEGRANTES:
# Grupo 5
Ignacio Federico Cantero
Ivo Santiago Daniel Panichelli
# UltraTech

UltraTech es un proyecto de e-commerce orientado a la venta de componentes y productos de hardware para PC.

## Descripción

El proyecto permite visualizar productos de distintas categorías, consultar información detallada de cada producto y agregar productos a un carrito de compras.

La aplicación cuenta con tres páginas principales:

* *Inicio (index.html)*: muestra la página principal, categorías y productos.
* *Listado (listado.html)*: muestra los productos correspondientes a una categoría seleccionada mediante la URL.
* *Ficha (ficha.html)*: muestra la información detallada de un producto seleccionado.

## Tecnologías utilizadas

* HTML5
* JavaScript
* Lit
* TailwindCSS
* Vite
* API REST
* LocalStorage

## Funcionalidades

* Visualización de productos.
* Navegación por categorías.
* Filtrado de productos por categoría.
* Visualización del detalle de cada producto.
* Carrito de compras.
* Agregar productos al carrito.
* Quitar productos del carrito.
* Vaciar el carrito.
* Cálculo de cantidad total de productos.
* Cálculo del precio total.
* Persistencia del carrito mediante localStorage.

## API

Los productos se obtienen mediante una API REST proporcionada para el proyecto.

Endpoint principal:

https://ecommerce.fedegonzalez.com

La aplicación utiliza solicitudes GET para obtener el listado de productos y la información individual de cada producto.

## Estructura del proyecto

text
mi-proyecto/
├── index.html
├── listado.html
├── ficha.html
├── public/
│   └── imagenes/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── utils/
├── package.json
└── vite.config.js


## Componentes

El proyecto utiliza *Lit* para crear componentes reutilizables de la interfaz, como:

* Header
* Navbar
* Hero
* Categorías
* Lista de productos
* Footer

## Carrito

El carrito utiliza localStorage para guardar los productos seleccionados. De esta manera, los productos permanecen guardados aunque se recargue la página.
