# 5-20201220-pokemonapp-zustand
### Table of Contents
- [5-20201220-pokemonapp-zustand](#5-20201220-pokemonapp-zustand)
    + [Table of Contents](#table-of-contents)
- [13 - 8:12 Introduction to React #13 | Zustand](#13---8-12-introduction-to-react--13---zustand)
  * [13.1 Project Setup](#131-project-setup)
  * [13.2 Uninstall Redux and Install Zustand](#132-uninstall-redux-and-install-zustand)
  * [13.3 store.js](#133-storejs)
  * [13.4 Replacing Redux](#134-replacing-redux)
    + [App.js](#appjs)
    + [PokemonTable.js](#pokemontablejs)
    + [PokemonFilter.js](#pokemonfilterjs)
    + [PokemonInfo.js](#pokemoninfojs)
  * [13.5 Moving fetching data to store.js](#135-moving-fetching-data-to-storejs)
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
# 13 - 8:12 Introduction to React #13 | Zustand
> Description: We port our Redux application to the much simpler Zustand state manager.

## 13.1 Project Setup

Terminal

```bash
npx create-react-app 5-20201220-pokemonapp-zustand
```

then set it up like before:

copy paste src and public folders, then the package.json dependecies. 

yarn install then yarn start.

## 13.2 Uninstall Redux and Install Zustand

[pmndrs/zustand](https://github.com/pmndrs/zustand)

Terminal:

```bash
yarn remove redux react-redux
yarn add zustand
```

## 13.3 store.js

create new src/store.js

```jsx
import create from 'zustand'

const useStore = create(set => ({
  pokemons: [],
  setPokemons: (pokemons) => set((state) => ({ ...state, pokemons })),

  filter: "",
  setFilter: (filter) => set((state) => ({ ...state, filter })),

  selectedPokemon: null,
  setSelectedPokemon: (selectedPokemon) => set((state) => ({ ...state, selectedPokemon })),
}))

export default useStore
```

## 13.4 Replacing Redux

### App.js

- remove all redux stuff like imports, reducers, export back to default, etc.
- import useStore from store.js and list states and actions accordingly

```jsx
// START: IMPORTS
import React from "react";
import styled from "@emotion/styled";
import { CssBaseline } from "@material-ui/core";

import useStore from './store'

import PokemonInfo from "./components/PokemonInfo";
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

// START: COMPONENT ---
function App() {
  // Start: States
  const pokemons = useStore(state => state.pokemons)
  const setPokemons = useStore(state => state.setPokemons)
  // End: States

  // Start: Methods

  React.useEffect(() => {
    fetch("http://localhost:3000/pokemon.json")
      .then((resp) => resp.json())
      .then(setPokemons);
  }, []);
  // End: Methods

  // Start: Templates
  if (!pokemons) {
    return <div>Loading data</div>;
  }
  return (
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
  );
  // End: Templates

}
// END: COMPONENT ---

export default App;
```

do the same for the other components

### PokemonTable.js

```jsx
import React from "react";

import useStore from '../store'

import PokemonRow from "./PokemonRow";

function PokemonTable() {
  // Start: States
  const pokemons = useStore(state => state.pokemons)
  const filter = useStore(state => state.filter)
  const setSelectedPokemon = useStore(state => state.setSelectedPokemon)
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
              onClick={(pokemon) => setSelectedPokemon(pokemon)}
            />
          ))}
      </tbody>
    </table>
  );
  // END: TEMPLATES

}

export default PokemonTable;
```

### PokemonFilter.js

```jsx
import React from 'react'

import useStore from '../store'

import Styled from "@emotion/styled"

const Input = Styled.input`
    width: 100%;
  padding: 0.2rem;
  font-size: large;
`

const PokemonFilter = () => {
  const filter = useStore(state => state.filter)
  const setFilter = useStore(state => state.setFilter)

  return (
    <Input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
  )
}

export default PokemonFilter
```

### PokemonInfo.js

```jsx
import React from "react";

import useStore from '../store'

const PokemonInfo = () => {
  const selectedPokemon = useStore(state => state.selectedPokemon)

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

## 13.5 Moving fetching data to store.js

store.js

```jsx
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
```

App.js

```jsx
// START: IMPORTS
import React from "react";
import styled from "@emotion/styled";
import { CssBaseline } from "@material-ui/core";

import useStore from './store'

import PokemonInfo from "./components/PokemonInfo";
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

// START: COMPONENT ---
function App() {
  // Start: States
  const pokemons = useStore(state => state.pokemons)
  // End: States

  // Start: Methods
  // End: Methods

  // Start: Templates
  if (!pokemons) {
    return <div>Loading data</div>;
  }
  return (
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
  );
  // End: Templates

}
// END: COMPONENT ---

export default App;
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
