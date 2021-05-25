# 2-20201007-pokemonapp-usecontext
### Table of Contents
- [2-20201007-pokemonapp-usecontext](#2-20201007-pokemonapp-usecontext)
    - [Table of Contents](#table-of-contents)
- [10 - 15:02 Introduction to React #10 | Use Context](#10---1502-introduction-to-react-10--use-context)
  - [10.1 Project Setup](#101-project-setup)
    - [npx degit](#npx-degit)
    - [Our Way >:)](#our-way-)
  - [10.2 Refactoring Code Base](#102-refactoring-code-base)
    - [10.2.1 PokemonType.js](#1021-pokemontypejs)
    - [10.2.2 Components](#1022-components)
  - [10.3 PokemonContext.js](#103-pokemoncontextjs)
- [Getting Started with Create React App](#getting-started-with-create-react-app)
  - [Available Scripts](#available-scripts)
    - [`yarn start`](#yarn-start)
    - [`yarn test`](#yarn-test)
    - [`yarn build`](#yarn-build)
    - [`yarn eject`](#yarn-eject)
  - [Learn More](#learn-more)
    - [Code Splitting](#code-splitting)
    - [Analyzing the Bundle Size](#analyzing-the-bundle-size)
    - [Making a Progressive Web App](#making-a-progressive-web-app)
    - [Advanced Configuration](#advanced-configuration)
    - [Deployment](#deployment)
    - [`yarn build` fails to minify](#yarn-build-fails-to-minify)

---
# 10 - 15:02 Introduction to React #10 | Use Context
> Description: We learn how to use context to pass data around our React application.

## 10.1 Project Setup

### npx degit

Syntax:

```bash
npx degit <his-8th-git-repo> <name-of-app>
```

Our command:

```bash
npx degit https://github.com/nellyXinwei/JackHerrington-IntroToReact-ReactJSNextJSReduxZustandMobX-20200907/tree/master/1-20200907-pokemonapp 2-202001007-pokemonapp
```

btw dont do this, just set it up normal way nlng. doesnt work if you only want the repo in a bigger repo.

### Our Way >:)

```bash
npx create-react-app 2-202001007-pokemonapp
```

then just copy our public and src files

then all dependecies of package.json from 1-/

```json
"dependencies": {
    "@emotion/react": "^11.4.0",
    "@emotion/styled": "^11.3.0",
    "@material-ui/core": "^4.11.4",
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "prop-types": "^15.7.2",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.0.1"
  },
```

## 10.2 Refactoring Code Base

### 10.2.1 PokemonType.js

Move PokemonType from App.js to PokemonType.js

```jsx
import PropTypes from "prop-types";

const PokemonType = PropTypes.shape({
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

export default PokemonType;
```

### 10.2.2 Components

mkdir src/components, and add these components in it

PokemonInfo.jsx

```jsx
// START: IMPORTS ---
import React from "react";
import PokemonType from '../PokemonType'
// END: IMPORTS ---

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
// End: PokemonInfo

PokemonInfo.propTypes = PokemonType;
export default PokemonInfo;
```

PokemonRow.jsx

```jsx
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
```

PokemonFilter.jsx

```jsx
import React from 'react'
import Styled from "@emotion/styled"

const Input = Styled.input`
    width: 100%;
  padding: 0.2rem;
  font-size: large;
`

const PokemonFilter = ({ filter, setFilter }) => {
  return (
    <Input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />

  )
}

export default PokemonFilter
```

PokemonTable.jsx

```jsx
import React from 'react'
import PokemonRow from './PokemonRow'

const PokemonTable = ({ pokemons, filter, setSelectedPokemon }) => {
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
            <PokemonRow pokemon={pokemon} onSelect={(pokemon) => setSelectedPokemon(pokemon)} />
          ))}
      </tbody>
    </table>
  )
}

export default PokemonTable
```

Then @App.js

```jsx
// START: IMPORTS ---
import React from "react";
import Styled from "@emotion/styled"
import "./App.css";

import PokemonInfo from './components/PokemonInfo'
import PokemonFilter from './components/PokemonFilter'
import PokemonTable from './components/PokemonTable'
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
    <Container>
      <Title>Pokemon Search</Title>
      <TwoColumnLayout>
        <div>
          <PokemonFilter filter={filter} setFilter={setFilter} />
          <PokemonTable pokemons={pokemons} filter={filter} setSelectedPokemon={setSelectedPokemon} />
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
```

however as the app gets bigger and more layers are formed, it becomes harder to pass data and actions up and down from parents to children. 

Lets then create context to make em accessible anywhere

## 10.3 PokemonContext.js

```jsx
import React from 'react'

const PokemonContext = React.createContext({});

export default PokemonContext;
```

import to App.js

```jsx
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
            <PokemonFilter filter={filter} setFilter={setFilter} />
            <PokemonTable pokemons={pokemons} filter={filter} setSelectedPokemon={setSelectedPokemon} />
          </div>
          {selectedPokemon && (
            <PokemonInfo {...selectedPokemon} />
          )}
        </TwoColumnLayout>
      </Container>
    </PokemonContext.Provider>
  );
  // END: TEMPLATE
}
// END: COMPONENT ---
export default App;
```

then @PokemonFilter.jsx

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
  const { filter, setFilter } = React.useContext(PokemonContext);
  return (
    <Input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />

  )
}

export default PokemonFilter
```

then back at App.js remove all the props passed to PokemonFilter, and it still works!

```jsx
<PokemonFilter />
```

Lez do the same for @PokemonTable.jsx and delete props passed from @App.js

```jsx
import React from 'react'
import PokemonRow from './PokemonRow'
import PokemonContext from '../PokemonContext'

const PokemonTable = () => {
  const { pokemons, filter, setSelectedPokemon } = React.useContext(PokemonContext)

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
            <PokemonRow pokemon={pokemon} onSelect={(pokemon) => setSelectedPokemon(pokemon)} />
          ))}
      </tbody>
    </table>
  )
}

export default PokemonTable
```

likewise to @PokemonInfo.jsx

```jsx
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
