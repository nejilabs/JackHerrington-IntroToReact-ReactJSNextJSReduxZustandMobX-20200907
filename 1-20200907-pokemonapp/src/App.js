// START: IMPORTS ---
import React from "react";
import pokemon from "./pokemon.json";
import PropTypes from "prop-types";

import "./App.css";
// END: IMPORTS ---



// START: INNER COMPONENTS ---
// Start: PokemonRow
const PokemonRow = ({ pokemon, onSelect }) => (
  <tr key={pokemon.id}>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select</button>
    </td>
  </tr >
);

PokemonRow.propTypes = {
  pokemon: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.shape({
        english: PropTypes.string.isRequired,
      }),
      type: PropTypes.arrayOf(PropTypes.string.isRequired),
    })
  ),
  onSelect: PropTypes.func.isRequired
};
// End: PokemonRow

// Start: PokemonInfo
const PokemonInfo = ({ name: { english }, base }) => (
  <div>
    <h2>{english}</h2>
    <table>
      <tbody>
        {Object.keys(base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

PokemonInfo.propTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
    japanese: PropTypes.string.isRequired,
    chinese: PropTypes.string.isRequired,
    french: PropTypes.string.isRequired,
  }),
  type: PropTypes.arrayOf(PropTypes.string.isRequired),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
});
// End: PokemonInfo

// END: INNER COMPONENTS ---


// START: COMPONENT ---
function App() {
  // START: STATES
  const [filter, setFilter] = React.useState("")
  const [selectedPokemon, setSelectedPokemon] = React.useState(null)

  // END: STATES

  // START: METHODS
  // END: METHODS

  // START: TEMPLATE
  return (
    <div
      style={{
        margin: "auto",
        width: 800,
        paddingTop: "1em",
      }}
    >
      <h1 className="title">Pokemon Search</h1>


      <div
        style={{
          display: "grid",
          gridTemplateColumns: "70% 30%",
          gridColumnGap: "1rem"
        }}
      >
        <div>
          {/* START: SEARCH FILTER INPUT */}
          <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
          {/* END: SEARCH FILTER INPUT */}

          {/* START: TABLE */}
          <table width="100%">
            <thead>
              <td>Name</td>
              <td>Type</td>
            </thead>
            <tbody>
              {pokemon
                .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
                .slice(0, 20)
                .map((pokemon) => (
                  <PokemonRow pokemon={pokemon} onSelect={(pokemon) => setSelectedPokemon(pokemon)} />
                ))}
            </tbody>
          </table>
          {/* END: TABLE */}

        </div>
        {selectedPokemon && (
          <PokemonInfo {...selectedPokemon} />
        )}
      </div>

    </div>
  );
  // END: TEMPLATE
}
// END: COMPONENT ---

export default App;