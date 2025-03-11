import {cargarPokemon, cargarPokemones} from './api/pokemon.js';
import {mapearPokemon, mapearListadoPokemones} from './mapeadores/pokemon.js';

export default async function inicializar() {
	console.log(mapearPokemon(await cargarPokemon(1)))
	console.log(mapearListadoPokemones(await cargarPokemones()))
}


