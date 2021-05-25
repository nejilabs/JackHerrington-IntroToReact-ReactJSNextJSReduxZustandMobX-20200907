# 4-20201125-pokemonapp-redux
### Table of Contents
- [4-20201125-pokemonapp-redux](#4-20201125-pokemonapp-redux)
    + [Table of Contents](#table-of-contents)
- [12 - 7:39 Introduction to React #12 | Redux](#12---7-39-introduction-to-react--12---redux)
  * [12.1 Project Setup](#121-project-setup)
  * [12.2 Install Redux](#122-install-redux)
  * [12.3 Redux](#123-redux)
  * [12.4 Integrate Redux to other components](#124-integrate-redux-to-other-components)
    + [PokemonTable](#pokemontable)
    + [PokemonFilter](#pokemonfilter)
    + [PokemonInfo](#pokemoninfo)
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
# 12 - 7:39 Introduction to React #12 | Redux
> Description: We port our application to the Redux statement manager to see how that works

## 12.1 Project Setup

Terminal

```bash
npx create-react-app 4-20201125-pokemonapp-redux
```

then set it up like before:

copy paste src and public folders, then the package.json dependecies. 

yarn install then yarn start.

## 12.2 Install Redux

```bash
yarn add redux react-redux
```

## 12.3 Redux

App.js @Reducer

```jsx
// START: REDUCER
const pokemonReducer = (
  state = {
    pokemons: [],
    filter: '',
    selectedPokemon: null
  },
  { type, payload }
) => {
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
      return state
  }
};
// END: REDUCER
```

then import createStore from redux, and Provider from react-redux

```jsx
import {createStore} from 'redux'
import {Provider} from 'react-redux'
```

remove the PokemonContext.Provider wrapper App.js @templates

```jsx
if (!state.pokemons) {
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
```

export statement changes

```jsx
export default () => <Provider store={store}><App /></Provider>;
```

import useSelector & useDispatch hooks from 

```jsx
import { Provider, useSelector, useDispatch } from 'react-redux'
```

you can remove the PokemonContext import and delete that file

## 12.4 Integrate Redux to other components

### PokemonTable

- remove context
- bring in useDispatch useSelector from App.js
- @States - observe:

```jsx
import React, { useContext } from "react";

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
```

do the same for the other components:

### PokemonFilter

```jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Styled from "@emotion/styled"
const Input = Styled.input`
    width: 100%;
  padding: 0.2rem;
  font-size: large;
`

const PokemonFilter = () => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  return (
    <Input type="text" value={filter} onChange={(e) => dispatch({ type: "SET_FILTER", payload: e.target.value })} />

  )
}

export default PokemonFilter
```

### PokemonInfo

```jsx
import React from "react";
import { useSelector } from 'react-redux'

const PokemonInfo = () => {
  const selectedPokemon = useSelector(state => state.selectedPokemon)

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
