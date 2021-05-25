# 3-20201111-pokemonapp-usereducer
### Table of Contents

- [3-20201111-pokemonapp-usereducer](#3-20201111-pokemonapp-usereducer)
    + [Table of Contents](#table-of-contents)
- [11 - 9:23 Introduction to React #11 | useReducer](#11---9-23-introduction-to-react--11---usereducer)
  * [11.1 useReducer](#111-usereducer)
    + [Bringing to PokemonTable.jsx](#bringing-to-pokemontablejsx)
    + [@PokemonFilter](#-pokemonfilter)
- [Getting Started with Create React App](#getting-started-with-create-react-app)
  * [Available Scripts](#available-scripts)
    + [`yarn start`](#-yarn-start-)
    + [`yarn test`](#-yarn-test-)
    + [`yarn build`](#-yarn-build-)
    + [`yarn eject`](#-yarn-eject-)
  * [Learn More](#learn-more)
    + [Code Splitting](#code-splitting)
    + [Analyzing the Bundle Size](#analyzing-the-bundle-size)
    + [Making a Progressive Web App](#making-a-progressive-web-app)
    + [Advanced Configuration](#advanced-configuration)
    + [Deployment](#deployment)
    + [`yarn build` fails to minify](#-yarn-build--fails-to-minify)

---
# 11 - 9:23 Introduction to React #11 | useReducer

Description: We learn how to use the useReducer hook instead of the useState hook to store data.

## 11.1 useReducer

App.js - under imports

```jsx
const pokemonReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POKEMONS':
      return {
        ...state,
        pokemons: action.payload
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      }
    case 'SET_SELECTED_POKEMON':
      return {
        ...state,
        selectedPokemon: action.payload
      }
    default:
      throw new Error('No Action')
  }
}
```

App.js @States

```jsx
const [selectedPokemon, setSelectedPokemon] = React.useState(null)
```

App.js @Template

```jsx
<PokemonContext.Provider
      value={{
        filter, setFilter, pokemons, setPokemons, selectedPokemon, setSelectedPokemon, state, dispatch
      }}
    >
```

App.js @Methods 

```jsx
// START: METHODS
  React.useEffect(() => {
    fetch("http://localhost:3000/pokemon.json")
      .then((res) => res.json())
      .then(data => dispatch({
        type: 'SET_POKEMONS',
        payload: data
      }))
  }, [])
  // END: METHODS
```

App.js @Template

```jsx

  // START: TEMPLATE
  if (!state.pokemons) {
    return <div>Loading Data...</div>
  }

  return (
    <PokemonContext.Provider
      value={{
        filter, setFilter, pokemons, setPokemons, selectedPokemon, setSelectedPokemon, state, dispatch
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
```

### Bringing to PokemonTable.jsx

```jsx
import React from 'react'
import PokemonRow from './PokemonRow'
import PokemonContext from '../PokemonContext'

const PokemonTable = () => {
  const { state: { pokemons, filter }, dispatch } = React.useContext(PokemonContext)

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
            <PokemonRow pokemon={pokemon} onSelect={(pokemon) => dispatch({
              type: 'SET_SELECTED_POKEMON',
              payload: pokemon
            })} />
          ))}
      </tbody>
    </table>
  )
}

export default PokemonTable
```

### @PokemonFilter

```jsx
import React from 'react'
import PokemonContext from '../PokemonContext'
import Styled from "@emotion/styled"
const Input = Styled.input`
    width: 100%;
  padding: 0.2rem;
  font-size: large;
`

const PokemonFilter = () => {
  const { state: { filter }, dispatch } = React.useContext(PokemonContext);
  return (
    <Input type="text" value={filter} onChange={(e) => dispatch({ type: "SET_FILTER", payload: e.target.value })} />

  )
}

export default PokemonFilter
```

okay so the guy kept changing stuff even after course and codes be different. so i revamped it na lang

App.js

```jsx
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
      throw new Error();
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
```

components/PokemonFilter.jsx

```jsx
import React from 'react'
import PokemonContext from '../PokemonContext'
import Styled from "@emotion/styled"
const Input = Styled.input`
    width: 100%;
  padding: 0.2rem;
  font-size: large;
`

const PokemonFilter = () => {
  const { state: { filter }, dispatch } = React.useContext(PokemonContext);
  return (
    <Input type="text" value={filter} onChange={(e) => dispatch({ type: "SET_FILTER", payload: e.target.value })} />

  )
}

export default PokemonFilter
```

components/PokemonTable.jsx

```jsx
import React, { useContext } from "react";

import PokemonRow from "./PokemonRow";
import PokemonContext from "../PokemonContext";

function PokemonTable() {
  const {
    state: { filter, pokemons },
    dispatch,
  } = useContext(PokemonContext);
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
}

export default PokemonTable;
```

components/PokemonInfo.jsx

```jsx
import React, { useContext } from "react";

import PokemonContext from "../PokemonContext";

const PokemonInfo = () => {
  const {
    state: { selectedPokemon },
  } = useContext(PokemonContext);

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

export default PokemonInfo;
```

components/PokemonRow.jsx

```jsx
import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

import PokemonType from "../PokemonType";

const PokemonRow = ({ pokemon, onClick }) => (
  <>
    <tr key={pokemon.id}>
      <td>{pokemon.name.english}</td>
      <td>{pokemon.type.join(", ")}</td>
      <td>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onClick(pokemon)}
        >
          More Information
        </Button>
      </td>
    </tr>
  </>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.arrayOf(PokemonType),
};

export default PokemonRow;
```
---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
