import React from "react";

import { useSelector, useDispatch } from 'react-redux'

import PokemonRow from "./PokemonRow";

function PokemonTable() {
  // Start: States
  const pokemons = useSelector(state => state.pokemons)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  // End: States


  // START: TEMPLATES
  return (
    <table width="100%">
      <tbody>
        {pokemons
          .filter(({ name: { english } }) =>
            english.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
          )
          .slice(0, 20)
          .map((pokemon) => (
            <PokemonRow
              pokemon={pokemon}
              onClick={(pokemon) =>
                dispatch({
                  type: "SET_SELECTED_POKEMON",
                  payload: pokemon,
                })
              }
            />
          ))}
      </tbody>
    </table>
  );
  // END: TEMPLATES

}

export default PokemonTable;