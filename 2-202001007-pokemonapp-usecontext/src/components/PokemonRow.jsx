// START: IMPORTS ---
import React from "react";
import PropTypes from "prop-types";

import PokemonType from '../PokemonType'
import { Button } from '@material-ui/core'
// END: IMPORTS ---

// Start: PokemonRow
const PokemonRow = ({ pokemon, onSelect }) => (
  <tr key={pokemon.id}>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onSelect(pokemon)}
      >Select</Button>
    </td>
  </tr >
);
// End: PokemonRow

PokemonRow.propTypes = {
  pokemon: PropTypes.arrayOf(PokemonType)
};

export default PokemonRow;