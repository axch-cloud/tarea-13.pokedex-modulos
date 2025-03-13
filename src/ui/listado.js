/**
 * @typedef {import('../entidades/listadoPokemones').default} ListadoPokemones
 */

export function actualizarTextoIndicePokemones(texto) {
  const $indice = document.querySelector('#indice');
  $indice.textContent = texto;
}

/**
 * @callback pokemonSeleccionadoCallback
 * @param {string} nombre
 */

/**
 * @param {Array<string>} nombresPokemones
 * @param {pokemonSeleccionadoCallback} pokemonSeleccionadoCallback
 */
export function mostrarListadoPokemones(nombresPokemones, pokemonSeleccionadoCallback = () => {}) {
  const $indice = document.querySelector('#indice');
  $indice.innerHTML = '';

  nombresPokemones.forEach((nombre, index) => {
    const $link = document.createElement('a');
    $link.className = 'list-group-item list-group-item-action';
    $link.setAttribute('href', '#');
    $link.textContent = nombre;
    $link.onclick = () => pokemonSeleccionadoCallback(index + 1);
    $indice.appendChild($link);
  });
}
