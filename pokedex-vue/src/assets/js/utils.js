import { Pokedex } from "pokeapi-js-wrapper"

/** Unique pokedex instance, no need to have more than one to wrap around the API */
export const pokedexInstance = new Pokedex({cacheImages: true});
console.log(pokedexInstance)

/**
 * Get a color associated to a pokemon type
 * @param {String} type The pokemon type
 * @returns {String} The color as a CSS string 
 */
export function getTypeColor(type){
  console.log(type)
  switch (type) {
    case 'bug': return '#92BC2C';
    case 'dark': return '#595761';
    case 'dragon': return '#0C69C8';
    case 'electric': return '#F2D94E';
    case 'fire': return '#FBA54C';
    case 'fairy': return '#EE90E6';
    case 'fighting': return '#D3425F';
    case 'flying': return '#A1BBEC';
    case 'ghost': return '#5F6DBC';
    case 'grass': return '#5FBD58';
    case 'ground': return '#DA7C4D';
    case 'ice': return '#75D0C1';
    case 'normal': return '#A0A29F';
    case 'poison': return '#B763CF';
    case 'psychic': return '#FA8581';
    case 'rock': return '#C9BB8A';
    case 'steel': return '#5695A3';
    case 'water': return '#539DDF';
  
    default: return '#000';
  }
}