# 6-20210106-pokemonapp-mobx
### Table of Contents
- [6-20210106-pokemonapp-mobx](#6-20210106-pokemonapp-mobx)
    + [Table of Contents](#table-of-contents)
- [14 - 11:51 Introduction to React #14 | MobX](#14---11-51-introduction-to-react--14---mobx)
  * [14.1 Project Setup](#141-project-setup)
  * [14.2 Uninstall Zustand and Install MobX](#142-uninstall-zustand-and-install-mobx)
  * [14.3 store.js](#143-storejs)
  * [14.4 410 Integrating MobX](#144-410-integrating-mobx)
    + [PokemonFilter.jsx](#pokemonfilterjsx)
    + [PokemonTable.jsx](#pokemontablejsx)
    + [PokemonInfo.jsx](#pokemoninfojsx)
    + [PokemonRow.jsx](#pokemonrowjsx)
  * [14.5 Computed](#145-computed)
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
# 14 - 11:51 Introduction to React #14 | MobX
> Description: We take our Zustand app and try just one more state manager and that's MobX.

## 14.1 Project Setup

Terminal

```bash
npx create-react-app 6-20210106-pokemonapp-mobx
```

then set it up like before:

copy paste src and public folders, then the package.json dependecies. 

yarn install then yarn start.

## 14.2 Uninstall Zustand and Install MobX

[README · MobX](https://mobx.js.org/README.html)

Terminal:

```bash
yarn remove zustand
yarn add mobx mobx-react
```

## 14.3 store.js

```jsx
import { makeAutoObservable } from 'mobx'

class Store {
  // START: OBSERVABLES
  pokemons = []
  filter = ""
  selectedPokemon = null

  // END: OBSERVABLES

  // START: CONSTRUCTORS
  constructor() {
    makeAutoObservable(this)
  }
  // END: CONSTRUCTORS

  // START: ACTIONS
  setPokemon(pokemons) {
    this.pokemons = pokemons
  }
  setFilter(filter) {
    this.filter = filter
  }
  setSelectedPokemon(selectedPokemon) {
    this.selectedPokemon = selectedPokemon;
  }
  // END: ACTIONS
}

// INSTANTIATE STORE OBJECT
const store = new Store()

// FETCH POKEMONS DATA
fetch("http://localhost:3000/pokemon.json")
  .then((resp) => resp.json())
  .then((pokemons) => store.setPokemon(pokemons))

// EXPORT STORE
export default store

```

## 14.4 410 Integrating MobX

### PokemonFilter.jsx

```jsx
import React from 'react'

import { observer } from 'mobx-react'
import store from '../store'

import Styled from "@emotion/styled"

const Input = Styled.input`
    width: 100%;
  padding: 0.2rem;
  font-size: large;
`

const PokemonFilter = () => {
  return (
    <Input type="text" value={store.filter} onChange={(e) => store.setFilter(e.target.value)} />
  )
}

export default observer(PokemonFilter)
```

do the same with the other components:

### PokemonTable.jsx

```jsx
import React from "react";

import { observer } from 'mobx-react'
import store from '../store'

import PokemonRow from "./PokemonRow";

function PokemonTable() {
  // START: TEMPLATES
  return (
    <table width="100%">
      <tbody>
        {store.pokemons
          .filter(({ name: { english } }) =>
            english.toLocaleLowerCase().includes(store.filter.toLocaleLowerCase())
          )
          .slice(0, 20)
          .map((pokemon) => (
            <PokemonRow
              key={pokemon.id}
              pokemon={pokemon}
              onClick={(pokemon) => store.setSelectedPokemon(pokemon)}
            />
          ))}
      </tbody>
    </table>
  );
  // END: TEMPLATES

}

export default observer(PokemonTable);
```

### PokemonInfo.jsx

```jsx
import React from "react";
import { observer } from 'mobx-react'
import store from '../store'

const PokemonInfo = () => {
  return store.selectedPokemon ? (
    <div>
      <h2>{store.selectedPokemon.name.english}</h2>
      <table>
        <tbody>
          {Object.keys(store.selectedPokemon.base).map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{store.selectedPokemon.base[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default observer(PokemonInfo);
```

### PokemonRow.jsx

```jsx
import React from "react";
import { Button } from "@material-ui/core";

const PokemonRow = ({ pokemon, onClick }) => (
  <>
    <tr>
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

export default PokemonRow;
```

## 14.5 Computed

store.js

```jsx
import {
  // makeAutoObservable,
  makeObservable,
  observable,
  computed
} from 'mobx'

// START: STORE CLASS --- ---
class Store {
  // START: STATES ---
  pokemons = []
  filter = ""
  selectedPokemon = null
  // END: STATES ---

  // START: METHODS ---
  // START: CONSTRUCTORS
  constructor() {
    // makeAutoObservable(this)

    makeObservable(this, {
      pokemons: observable,
      filter: observable,
      selectedPokemon: observable,
      filteredPokemons: computed
    })
  }
  // END: CONSTRUCTORS

  // START: GETTERS
  get filteredPokemons() {
    return this.pokemons
      .filter(({ name: { english } }) =>
        english.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase())
      )
  }
  // END: GETTERS

  // START: SETTERS
  setPokemon(pokemons) {
    this.pokemons = pokemons
  }
  setFilter(filter) {
    this.filter = filter
  }
  setSelectedPokemon(selectedPokemon) {
    this.selectedPokemon = selectedPokemon;
  }
  // END: SETTERS
  // END: METHODS ---
}
// END: STORE CLASS --- ---

// INSTANTIATE STORE OBJECT
const store = new Store()

// FETCH POKEMONS DATA
fetch("http://localhost:3000/pokemon.json")
  .then((resp) => resp.json())
  .then((pokemons) => store.setPokemon(pokemons))

// EXPORT STORE
export default store
```

@PokemonTable.jsx - move the filter method to store, turn it into a computed field, then change the filter method to store.filteredPokemons

```jsx
import React from "react";

import { observer } from 'mobx-react'
import store from '../store'

import PokemonRow from "./PokemonRow";

function PokemonTable() {
  // START: TEMPLATES
  return (
    <table width="100%">
      <tbody>
        {store.filteredPokemons
          .slice(0, 20)
          .map((pokemon) => (
            <PokemonRow
              key={pokemon.id}
              pokemon={pokemon}
              onClick={(pokemon) => store.setSelectedPokemon(pokemon)}
            />
          ))}
      </tbody>
    </table>
  );
  // END: TEMPLATES

}

export default observer(PokemonTable);
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
