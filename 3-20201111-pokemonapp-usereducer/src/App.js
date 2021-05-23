// START: IMPORTS
import React from "react";
import styled from "@emotion/styled";
import { CssBaseline } from "@material-ui/core";

import PokemonInfo from "./components/PokemonInfo";
import PokemonContext from "./PokemonContext";
import PokemonFilter from "./components/PokemonFilter";
import PokemonTable from "./components/PokemonTable";

import "./App.css";
// END: IMPORTS

// START: STYLED COMPONENTS
const Title = styled.h1`
  text-align: center;
`;
const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 1rem;
`;
// END: STYLED COMPONENTS

// START: REDUCER
const pokemonReducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_FILTER":
      return {
        ...state,
        filter: payload,
      };
    case "SET_POKEMONS":
      return {
        ...state,
        pokemons: payload,
      };
    case "SET_SELECTED_POKEMON":
      return {
        ...state,
        selectedPokemon: payload,
      };
    default:
      throw new Error('No Action');
  }
};
// END: REDUCER

// START: COMPONENT ---
function App() {
  // Start: States
  const [state, dispatch] = React.useReducer(pokemonReducer, {
    filter: "",
    pokemons: [],
    selectedPokemon: null,
  });
  // End: States

  // Start: Methods

  React.useEffect(() => {
    fetch("http://localhost:3000/pokemon.json")
      .then((resp) => resp.json())
      .then((payload) =>
        dispatch({
          type: "SET_POKEMONS",
          payload,
        })
      );
  }, []);
  // End: Methods

  // Start: Templates
  if (!state.pokemons) {
    return <div>Loading data</div>;
  }
  return (
    <PokemonContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <PageContainer>
        <CssBaseline />
        <Title>Pokemon Search</Title>
        <TwoColumnLayout>
          <div>
            <PokemonFilter />
            <PokemonTable />
          </div>
          <PokemonInfo />
        </TwoColumnLayout>
      </PageContainer>
    </PokemonContext.Provider>
  );
  // End: Templates

}
// END: COMPONENT ---

export default App;