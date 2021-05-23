// START: IMPORTS ---
import React from "react";
import PokemonType from '../PokemonType'
import PokemonContext from '../PokemonContext'
// END: IMPORTS ---

// Start: PokemonInfo
const PokemonInfo = () => {
  const { selectedPokemon } = React.useContext(PokemonContext)

  return selectedPokemon ? (

    <div>
      <h2>{selectedPokemon.name.english}</h2>
      <table>
        <tbody>
          {Object.keys(selectedPokemon.base).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{selectedPokemon.base[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
};
// End: PokemonInfo

PokemonInfo.propTypes = PokemonType;
export default PokemonInfo;