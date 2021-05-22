import React from 'react'
import PokemonRow from './PokemonRow'
import PokemonContext from '../PokemonContext'

const PokemonTable = () => {
  const { pokemons, filter, setSelectedPokemon } = React.useContext(PokemonContext)

  return (
    <table width="100%">
      <thead>
        <td>Name</td>
        <td>Type</td>
      </thead>
      <tbody>
        {pokemons
          .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
          .slice(0, 20)
          .map((pokemon) => (
            <PokemonRow pokemon={pokemon} onSelect={(pokemon) => setSelectedPokemon(pokemon)} />
          ))}
      </tbody>
    </table>
  )
}

export default PokemonTable
