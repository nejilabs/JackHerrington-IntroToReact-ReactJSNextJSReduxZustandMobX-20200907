// START: IMPORTS ---
import React from "react";
import Styled from "@emotion/styled"
import "./App.css";

import PokemonInfo from './components/PokemonInfo'
import PokemonFilter from './components/PokemonFilter'
import PokemonTable from './components/PokemonTable'

import PokemonContext from './PokemonContext'
// END: IMPORTS ---

// START: INNER COMPONENTS ---
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
    <PokemonContext.Provider
      value={{
        filter, setFilter, pokemons, setPokemons, selectedPokemon, setSelectedPokemon
      }}
    >
      <Container>
        <Title>Pokemon Search</Title>
        <TwoColumnLayout>
          <div>
            <PokemonFilter />
            <PokemonTable />
          </div>
          {selectedPokemon && (
            <PokemonInfo />
          )}
        </TwoColumnLayout>
      </Container>
    </PokemonContext.Provider>
  );
  // END: TEMPLATE
}
// END: COMPONENT ---
export default App;