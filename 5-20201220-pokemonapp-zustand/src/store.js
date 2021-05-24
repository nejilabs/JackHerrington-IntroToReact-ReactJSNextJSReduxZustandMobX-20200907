import create from 'zustand'

const useStore = create(set => ({
  pokemons: [],
  setPokemons: (pokemons) => set((state) => ({ ...state, pokemons })),

  filter: "",
  setFilter: (filter) => set((state) => ({ ...state, filter })),

  selectedPokemon: null,
  setSelectedPokemon: (selectedPokemon) => set((state) => ({ ...state, selectedPokemon })),
}))

fetch("http://localhost:3000/pokemon.json")
  .then((resp) => resp.json())
  .then((pokemons) => useStore.setState((state) => ({ ...state, pokemons })));


export default useStore