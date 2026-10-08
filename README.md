# Práctica 11: Componentes con TypeScript puro

Aplicación de catálogo de productos deportivos desarrollada con Web Components nativos y TypeScript, utilizando Vite.

## Preguntas de la práctica

### 1. ¿Qué pasa al cambiar la variante en el HTML sin tocar el TypeScript?
El botón cambia su diseño visual (colores y estilos) automáticamente porque el componente lee el atributo `variante` y le asigna la clase CSS correspondiente dentro del Shadow DOM. No hace falta modificar el TypeScript para que tome los estilos.

### 2. ¿Por qué el nombre de una etiqueta propia debe llevar guion?
Para que el navegador pueda distinguir las etiquetas personalizadas de las etiquetas estándar de HTML (como `button` o `div`), y para evitar que en un futuro haya problemas si HTML agrega nuevas etiquetas con el mismo nombre.

### 3. ¿Por qué un atributo llega siempre como texto y qué se debe hacer?
Porque en el DOM todos los valores de los atributos se reciben como tipo `string`. Si ocupamos usar números (como el precio o la existencia del producto), tenemos que convertirlos usando `Number()` para poder hacer cálculos o validaciones.

### 4. ¿Qué pasa si el evento no puede salir del árbol de sombra?
Si el evento no tiene `composed: true`, se queda atrapado dentro del Shadow DOM y el elemento contenedor (`#rejilla`) nunca lo escucha. Por eso el carrito no aumenta y la consola no muestra ningún error.

## Evidencias

Las capturas solicitadas se encuentran en la carpeta `evidencias/`:
- `evidencias/variantes-boton.png`: Botón en sus distintas variantes y deshabilitado.
- `evidencias/tarjetas-agotadas.png`: Tarjetas con productos sin existencia (Agotado).
- `evidencias/contador-carrito.png`: Contador del carrito tras agregar productos y botón vaciar.
