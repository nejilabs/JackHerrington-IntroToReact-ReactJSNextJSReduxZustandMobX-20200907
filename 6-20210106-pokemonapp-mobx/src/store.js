import { makeAutoObservable } from 'mobx'

class Store {
  // START: OBSERVABLES
  pokemons = []
  filter = ""
  selectedPokemon = null

  // END: OBSERVABLES

  // START: CONSTRUCTORS
  constructor() {
    makeAutoObservable(this)
  }
  // END: CONSTRUCTORS

  // START: ACTIONS
  setPokemon(pokemons) {
    this.pokemons = pokemons
  }
  setFilter(filter) {
    this.filter = filter
  }
  setSelectedPokemon(selectedPokemon) {
    this.selectedPokemon = selectedPokemon;
  }
  // END: ACTIONS
}

// INSTANTIATE STORE OBJECT
const store = new Store()

// FETCH POKEMONS DATA
fetch("http://localhost:3000/pokemon.json")
  .then((resp) => resp.json())
  .then((pokemons) => store.setPokemon(pokemons);

// EXPORT STORE
export default store