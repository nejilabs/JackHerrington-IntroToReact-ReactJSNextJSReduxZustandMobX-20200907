// START: IMPORTS ---
import React from "react";
import PropTypes from "prop-types";

import Styled from "@emotion/styled"
import { Button } from '@material-ui/core'
import "./App.css";
// END: IMPORTS ---

// START: INNER COMPONENTS ---
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

const Title = Styled.h1`
  text-align: center;
`

const TwoColumnLayout = Styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-column-gap: 1re;
`

const Container = Styled.div` 
  margin: auto;
  width: 800;
  paddingTop: 1em;
`

const Input = Styled.input`
    width: 100%;
  padding: 0.2rem;
  font-size: large;
`
// END: INNER COMPONENTS ---

// START: COMPONENT ---
function App() {
  // START: STATES
  const [pokemons, setPokemons] = React.useState([])
  const [filter, setFilter] = React.useState("")
  const [selectedPokemon, setSelectedPokemon] = React.useState(null)
  // END: STATES

  // START: METHODS
  React.useEffect(() => {
    fetch("http://localhost:3000/pokemon.json")
      .then((res) => res.json())
      .then(data => setPokemons(data))
  }, [])
  // END: METHODS

  // START: TEMPLATE
  return (
    <Container>
      <Title>Pokemon Search</Title>
      <TwoColumnLayout>
        <div>
          {/* START: SEARCH FILTER INPUT */}
          <Input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
          {/* END: SEARCH FILTER INPUT */}

          {/* START: TABLE */}
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
          {/* END: TABLE */}

        </div>
        {selectedPokemon && (
          <PokemonInfo {...selectedPokemon} />
        )}
      </TwoColumnLayout>
    </Container>
  );
  // END: TEMPLATE
}
// END: COMPONENT ---
export default App;