const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const LIMITE_POKEMONES = 20;

async function cargarPokemon(id) {
  if (id === undefined) {
    throw new Error('Se necesita un identificador para cargar un pokemon');
  }
  return (await fetch(`${BASE_URL}${id}`)).json();
}

async function cargarPokemones(offset = 0, limite = LIMITE_POKEMONES) {
  return (await fetch(`${BASE_URL}?offset=${offset}&limit=${limite}`)).json();
}

class Pokemon {
  /**
   * @param {Number} id
   * @param {String} nombre
   * @param {String} foto
   * @param {Array<String>} habilidades
   * @param {Array<String>} tipos
   * @param {Array<Movimiento>} movimientos
   */
  constructor(id, nombre, foto, habilidades = [], tipos = [], movimientos = []) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.habilidades = habilidades;
    this.tipos = tipos;
    this.movimientos = movimientos;
  }
}

class Movimiento {
  /**
   *
   * @param {String} nombre
   * @param {Array<String>} versiones
   */
  constructor(nombre, versiones = []) {
    this.nombre = nombre;
    this.versiones = versiones;
  }
}

class ListadoPokemones {
  /**
   * @param {Number} total
   * @param {String} siguienteUrl
   * @param {String} anteriorUrl
   * @param {Array<String>} nombresPokemones
   */
  constructor(total, siguienteUrl, anteriorUrl, nombresPokemones) {
    this.total = total;
    this.siguienteUrl = siguienteUrl;
    this.anteriorUrl = anteriorUrl;
    this.nombresPokemones = nombresPokemones;
  }
}

/**
 * @param {Object} datosApi
 * @returns {Pokemon}
 */
function mapearPokemon(datosApi) {
  const {
    id,
    name: nombre,
    sprites: { front_default: fotoPrincipal },
    types: tipos,
    abilities: habilidades,
    moves: movimientos,
  } = datosApi;

  return new Pokemon(
    id,
    nombre,
    fotoPrincipal,
    habilidades.map((item) => item.ability.name),
    tipos.map((item) => item.type.name),
    movimientos.map((item) => new Movimiento(
      item.move.name,
      item.version_group_details.map((v) => v.version_group.name),
    )),
  );
}

/**
 * @param {Object} datosApi
 * @returns {ListadoPokemones}
 */
function mapearListadoPokemones(datosApi) {
  const {
    count: total,
    next: siguienteUrl,
    previous: anteriorUrl,
    results: resultados,
  } = datosApi;

  return new ListadoPokemones(
    total,
    siguienteUrl,
    anteriorUrl,
    resultados.map((pokemon) => pokemon.name),
  );
}