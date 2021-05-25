# 1-20200907-pokemonapp
### Table of Contents
- [1-20200907-pokemonapp](#1-20200907-pokemonapp)
    - [Table of Contents](#table-of-contents)
- [0 - Project Setup](#0---project-setup)
- [1 - 11:35 Introduction to React #1 | Deployment](#1---1135-introduction-to-react-1--deployment)
  - [1.1 Project Setup](#11-project-setup)
  - [1.2 Adding Repository to Github](#12-adding-repository-to-github)
  - [1.3 Deploying to Github Pages](#13-deploying-to-github-pages)
    - [1.3.1 Add homepage to package.json](#131-add-homepage-to-packagejson)
    - [1.3.2 Install gh-pages and add deploy to scrpts in package.json](#132-install-gh-pages-and-add-deploy-to-scripts-in-packagejson)
    - [1.3.3 Deploy App](#133-deploy-app)
- [1-20200907-pokemonapp](#1-20200907-pokemonapp)
    - [Table of Contents](#table-of-contents)
- [0 - Project Setup](#0---project-setup)
- [1 - 11:35 Introduction to React #1 | Deployment](#1---1135-introduction-to-react-1--deployment)
  - [1.1 Project Setup](#11-project-setup)
  - [1.2 Adding Repository to Github](#12-adding-repository-to-github)
  - [1.3 Deploying to Github Pages](#13-deploying-to-github-pages)
    - [1.3.1 Add homepage to package.json](#131-add-homepage-to-packagejson)
    - [1.3.2 Install gh-pages and add deploy to scripts in package.json](#132-install-gh-pages-and-add-deploy-to-scripts-in-packagejson)
    - [1.3.3 Deploy App](#133-deploy-app)
- [2 - 6:57 Introduction To React #2 | JSX](#2---657-introduction-to-react-2--jsx)
- [3 - 6:48 Introduction To React #3 | Lists](#3---648-introduction-to-react-3--lists)
- [4 - 4:39 Introduction to React #4 | Creating Components](#4---439-introduction-to-react-4--creating-components)
  - [4.1 Inner Components Demo](#41-inner-components-demo)
  - [4.2 Prop Types](#42-prop-types)
    - [Install dependency](#install-dependency)
    - [Import](#import)
    - [Sample](#sample)
    - [Shape - specifying objects in proptypes](#shape---specifying-objects-in-proptypes)
- [5 - 10:34 Introduction to React #5 | State and Events](#5---1034-introduction-to-react-5--state-and-events)
  - [5.1 Setup](#51-setup)
  - [5.2 Filter Search bar - useState and onChange](#52-filter-search-bar---usestate-and-onchange)
  - [5.3 Select A Pokemon to Display](#53-select-a-pokemon-to-display)
  - [5.4 Pokemon Info Component](#54-pokemon-info-component)
- [6 - 14:57 Introduction to React #6 | Asynchronous Requests](#6---1457-introduction-to-react-6--asynchronous-requests)
  - [6.1 Move pokemon.json to public](#61-move-pokemonjson-to-public)
  - [6.2 useEffect](#62-useeffect)
- [7 - 6:08 Introduction to React #7 | CSS in JS](#7---608-introduction-to-react-7--css-in-js)
  - [7.1 Emotion (@emotion/styled)](#71-emotion-emotionstyled)
    - [Install](#install)
- [8 - 4:36 Introduction to React #8 | Component Libraries](#8---436-introduction-to-react-8--component-libraries)
  - [8.1 Material UI](#81-material-ui)
  - [8.2 Buttons](#82-buttons)
  - [8.3 CssBaseLine](#83-cssbaseline)
- [9 - 7:21 Introduction to React #9 | Class Components](#9---721-introduction-to-react-9--class-components)
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
# 0 - Project Setup

```bash
mkdir JackHerrington-IntroToReact-ReactJSNextJSReduxZustandMobX-20200907
cd JackHerrington-IntroToReact-ReactJSNextJSReduxZustandMobX-20200907
```

---

# 1 - 11:35 Introduction to React #1 | Deployment

> Description: Let's start our journey in React by creating a React application then deploying it to Github Pages!

## 1.1 Project Setup

```bash
npx create-react-app 1-20200907-pokemonapp
cd 1-20200907-pokemonapp
yarn start
```

## 1.2 Adding Repository to Github

1. Have Github Account
2. Create New Repository
3. Have the same name for the name of git repo as the one you have on your local
4. Create Repository
5. CRA already done most of the work, now all you need to do is to do these two commands:

```bash
git remote add origin <link of repo.git>
git push -u origin master
```

## 1.3 Deploying to Github Pages

Heres the docs

[Deployment | Create React App](https://create-react-app.dev/docs/deployment/#github-pages)

### 1.3.1 Add homepage to package.json

package.json - above dependecies

```bash
"homepage": "https://<username>.github.io/<name-of-app>",
```

### 1.3.2 Install gh-pages and add deploy to scripts in package.json

package.json - install this dependency

```bash
npm install --save gh-pages
or
yarn add gh-pages
```

package.json - then add this to your scripts

```bash
"predeploy": "npm run build",
"deploy": "gh-pages -d build",
```

### 1.3.3 Deploy App

```bash
yarn deploy
```

checking your github repo, youll find new branch called gh-pages

now go to settings and look for github pages section, you shud find the link of the app you deployed to github pages.

SKIP

---

# 2 - 6:57 Introduction To React #2 | JSX

> Description: We learn how to create HTML in React using the JSX syntax, as well as gotchas around CSS classes and styles.

What he did: Explain how jsx works and doing stuff with css and tables

SKIP

---

# 3 - 6:48 Introduction To React #3 | Lists

> Description: We learn how to load data into our project, as well as how to iterate through arrays to create tables.

What he did: 

1. Just used this github gist for pokemon api json, save at src then import to app.js

    [Pokemon list](https://gist.github.com/jherr/23ae3f96cf5ac341c98cd9aa164d2fe3)

2. Creates table
3. Demos map function
4. Array methods

    ```jsx
    // .join() method
    // pokemon.type is an array
    <td>{pokemon.type.join(", ")}</td>
    // Output sample: type1, type2, type3

    // .slice()
    {pokemon.slice(0,20).map(pokemon=> blah blah)}
    ```

SKIP

---

# 4 - 4:39 Introduction to React #4 | Creating Components

> Description: We take our existing Pokemon list application and make it more maintainable by creating a new component to display a row in the table.

## 4.1 Inner Components Demo

## 4.2 Prop Types

### Install dependency

Terminal:

```jsx
yarn add PropTypes
```

### Import

App.js

```jsx
import PropTypes from 'prop-types'
```

### Sample

App.js

```jsx
//Syntax
NameOfComponent.propTypes = {
	prop: Proptypes.string
}

//Under PokemonRow Inner Component
PokemonRow.propTypes = {
	pokemon: PropTypes.string
}
```

### Shape - specifying objects in proptypes

App.js

```jsx
PokemonRow.propTypes = {
	pokemon: PropTypes.shape({
		name: PropTypes.shape({
			english: PropTypes.string
		}),
		type: PropTypes.arrayOf(PropTypes.string)
	}),
}
```

SKIP

---

# 5 - 10:34 Introduction to React #5 | State and Events

> Description:  We get our first look at state management and event handling by upgrading our Pokemon list viewer to make it searchable and to give it Pokemon detail view.

## 5.1 Setup

src/App.css

```css
.title {
  text-align: center;
}

thead {
  text-align: left;
  font-size: x-large;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.2rem;
  font-size: large;
}
```

App.js

```jsx
import React from "react";
import pokemon from "./pokemon.json";
import PropTypes from "prop-types";

import "./App.css";

const PokemonRow = ({ pokemon }) => (

  <tr key={pokemon.id}>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
  </tr>

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
};

function App() {
  return (
    <div
      style={{
        margin: "auto",
        width: 800,
        paddingTop: "1em",
      }}
    >
      <h1 className="title">Pokemon Search</h1>
      <input type="text" />
      <table width="100%">
        <thead>
          <td>Name</td>
          <td>Type</td>
        </thead>
        <tbody>
          {pokemon.slice(0, 20).map((pokemon) => (
            <PokemonRow pokemon={pokemon} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
```

- pokemon.json

```bash
yarn add prop-types
```

 

## 5.2 Filter Search bar - useState and onChange

App.js:

@States

```jsx
const [filter, setFilter] = React.useState("")
```

@Template

```jsx
<tbody>
{pokemon
	.filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
	.slice(0, 20)
	.map((pokemon) => (
		<PokemonRow pokemon={pokemon} />
	)
)}
</tbody>
```

## 5.3 Select A Pokemon to Display

App.js

@States

```jsx
const [selectedItem, setSelectedItem] = React.useState(null)
```

@Templates

- Change Design
- Conditional Rendering of displaying selected pokemon

```jsx
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
                  <PokemonRow pokemon={pokemon} onSelect={(pokemon) => setSelectedItem(pokemon)} />
                ))}
            </tbody>
          </table>
          {/* END: TABLE */}

        </div>
        {selectedPokemon && (
          <div>
            <h1>{selectedPokemon.name.english}</h1>
          </div>
        )}
      </div>

    </div>
  );
  // END: TEMPLATE
```

@Inner Components - PokemonRow

```jsx
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
  onSelect: PropTypes.func
};
```

## 5.4 Pokemon Info Component

App.js

@Inner Components

```jsx
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
```

@Template

```jsx
{selectedPokemon && (
          <PokemonInfo {...selectedPokemon} />
        )}
```

---

# 6 - 14:57 Introduction to React #6 | Asynchronous Requests

> Description: We dump the data file and instead learn how to load the Pokemon data via a web request using React's useEffect hook and fetch.

## 6.1 Move pokemon.json to public

1. Move Pokemon.json to public/
2. delete import statement of pokemon.json @App.js
3. create a new useState array field called pokemon @App.js @States

## 6.2 useEffect

```jsx
// START: METHODS
  React.useEffect(() => {
    fetch("http://localhost:3000/pokemon.json")
      .then((res) => res.json())
      .then(data => setPokemons(data))
  }, [])
  // END: METHODS
```

---

# 7 - 6:08 Introduction to React #7 | CSS in JS

> Description: We make our application easier to maintain by using CSS in Javascript and the emotion library.

Emotion:[https://emotion.sh/docs/introduction](https://www.youtube.com/redirect?event=video_&redir_token=QUFFLUhqbEpsaVgwdUgtNFhsQ18tSlk1Y0NrZmNCRTRzQXxBQ3Jtc0trY1FmUHd5NldPMkpIRlVqM1ZsXzJFajdBTmNlRk9pSjYtQ0FreVQ0QkxHVzl0TVBZbzlBNlQ2REJMdW9WM1VpMXBVZklxNDRRdjQ1ZjZNUklud0UybFZQN1NTZEFVSVF5MzhlWFV0MjVzODNOMVhYUQ&q=https%3A%2F%2Femotion.sh%2Fdocs%2Fintroduction)

Emotion / Styled: [https://emotion.sh/docs/@emotion/styled](https://www.youtube.com/redirect?event=video_>redir_token=QUFFLUhqbVNLNVFPLXJKMHdRaUwwQ3ZaSEM0aC1Vbkpad3xBQ3Jtc0ttMEE4dG9Ga3Iwb2NOMjFwX1BhclE2NnVNSnVNMkg0X2lCUnQ0SjcxS2pILVlXSmZlVjFxUDBTeUEtNWQ5YVJucm5CSUZsR3lPaHZYZTJVVkYyOTBlYkpZRjZLaVB6SkVoRFhrbnRKakhLMUkwbDAxSQ&q=https%3A%2F%2Femotion.sh%2Fdocs%2F%40emotion%2Fstyled)

## 7.1 Emotion (@emotion/styled)

### Install

[@emotion/styled](https://emotion.sh/docs/@emotion/styled)

```bash
yarn add @emotion/react @emotion/styled
```

App.js

```jsx
// START: IMPORTS ---
import React from "react";
import PropTypes from "prop-types";
import Styled from "@emotion/styled"
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
```

App.css

```css
thead {
  text-align: left;
  font-size: x-large;
  font-weight: bold;
}
```

---

# 8 - 4:36 Introduction to React #8 | Component Libraries

> Description: We start to get the most out of React by using the Material UI component library to give our application a much cleaner look.

Material UI: [https://material-ui.com/](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbThxdUNkUlhWRkttUjE1MDlLRVhKdHZvcTFQZ3xBQ3Jtc0trZGFvV2VpeU5LVkIxVUlDUjdVY2ZPN0Q0bjIzNFdOSml3TDlKNW04YXIxZ0syY0ZISjRWUVlJN3pQOGZfODduX3FaSFZsREFsWXVSTFliNFFRaWVYdjJCUllvVHloS2c2Z2doX1NEM1RubUxScVUwWQ&q=https%3A%2F%2Fmaterial-ui.com%2F)

Shards React: [https://designrevision.com/docs/shard...](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbWtwWmhMT3h4TUxMWTFNWWlvTWRadEl2bkdkUXxBQ3Jtc0tsbEx6TkMzZDdkbHZaT3hUcF9yU0NfMFRfSmY1X2Z6UFlmOU1zSzVldFVIX1hwSGhuTktwdVBBdUk3WENlX2c2WkxaNjNxWWhuaUpXZ2tGRU9MTkV4dXlrVFdPa1hDTTM4NFFqcGUzbzlZdVRBcGY1VQ&q=https%3A%2F%2Fdesignrevision.com%2Fdocs%2Fshards-react%2Fgetting-started)

Adobe Spectrum: [https://react-spectrum.adobe.com/](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbnhtZy1WUFVLOHh6TklVVHNwT1M5ZzdzQzZQd3xBQ3Jtc0tselVib3l5dmNobGJZd0p4LTV4V3diWTJKRmJUVllIWmhkLUV4aFI3OVMwNXUtclBfZXU2dnd6bUJMeHcta0Jweko0WVVTZy0zWnpqN3otRElCUlFfN3prcTBMS01UYlNfaVYyOUF4N0ZoZGgtU2t1MA&q=https%3A%2F%2Freact-spectrum.adobe.com%2F)

## 8.1 Material UI

Well the goi used cdn to use the lib. ill just install it na lang hehehhe

[](https://material-ui.com)

```bash
yarn install @material-ui/core
```

## 8.2 Buttons

App.js

```jsx
import { Button } from '@material-ui/core'

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
```

## 8.3 CssBaseLine

index.js

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { CssBaseline } from '@material-ui/core'

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

# 9 - 7:21 Introduction to React #9 | Class Components

Description: We learn how to create a class based component by turning the App component from a function into an ES6 class.

SKIP


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
