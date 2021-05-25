# 7-20210113-pokemonapp-nextjs-csr
### Table of Contents
- [7-20210113-pokemonapp-nextjs-csr](#7-20210113-pokemonapp-nextjs-csr)
    + [Table of Contents](#table-of-contents)
- [15 - 13:01 Introduction to React #15 | NextJS (CSR)](#15---13-01-introduction-to-react--15---nextjs--csr-)
  * [15.1 Project Setup](#151-project-setup)
  * [15.2 NextJS Links](#152-nextjs-links)
    + [@PokemonRow.jsx](#-pokemonrowjsx)
    + [Create pages/pokemon/[id].js](#create-pages-pokemon--id-js)
  * [15.3 withRouter](#153-withrouter)
  * [15.4 Bring Store to Pokemon/[id].js](#154-bring-store-to-pokemon--id-js)
  * [Getting Started](#getting-started)
  * [Learn More](#learn-more)
  * [Deploy on Vercel](#deploy-on-vercel)
---
# 15 - 13:01 Introduction to React #15 | NextJS (CSR)
> Description: Where we port our application that was built on Create React App to the NextJS framework.

## 15.1 Project Setup

Terminal

```bash
npx create-next-app 7-20210113-pokemonapp-nextjs
cd 7-20210113-pokemonapp-nextjs
yarn dev
```

then set it up by getting our original codes back from the app we built using create-react-app

mkdir components and src folder. in components, copy all our component files. then in src, copy our store.js and PokemonType.js files

copy pokemon.json to public folder

then reinistall all our needed dependecies

```bash
yarn add mobx mobx-react @emotion/react @emotion/styled @material-ui/core
```

 

then fix all imports from our copied old codes! you dont need to import React from react in your files.

store.js - make fetching data like this instead

```jsx
// FETCH POKEMONS DATA
if (typeof window !== 'undefined') {
  fetch("/pokemon.json")
    .then((resp) => resp.json())
    .then((pokemons) => store.setPokemon(pokemons))
}
```

## 15.2 NextJS Links

### @PokemonRow.jsx

```jsx
import Link from 'next/link'
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";

import PokemonType from '../src/PokemonType'

const PokemonRow = ({ pokemon, onClick }) => (
  <>
    <tr>
      <td>
        <Link href={`pokemon/${pokemon.id}`}>
          <a>{pokemon.name.english}</a>
        </Link>
      </td>
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
  pokemons: PokemonType,
};

export default PokemonRow;
```

### Create pages/pokemon/[id].js

```jsx
export default () => {
  return (
    <div>
      hello there
    </div>
  )
}
```

Test: it shud work. if not whlep ewan ko sayo gg

[](http://localhost:3000/pokemon/1)

then yeah just design it a bit

```jsx
import { CssBaseline } from "@material-ui/core";
import styled from "@emotion/styled";

const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;

export default () => {
  return (
    <PageContainer>
      <CssBaseline />
      hello there
    </PageContainer>
  )
}
```

## 15.3 withRouter

[next/router | Next.js](https://nextjs.org/docs/api-reference/next/router#withrouter)

 pages/pokemon/[id].js

```jsx
import { withRouter } from 'next/router'

import { CssBaseline } from "@material-ui/core";
import styled from "@emotion/styled";

const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;

export default withRouter(({ router }) => {
  return (
    <PageContainer>
      <CssBaseline />
      hello there {router.query.id}
    </PageContainer>
  )
})
```

## 15.4 Bring Store to Pokemon/[id].js

Pokemon/[id].js

```jsx
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import {
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import styled from "@emotion/styled";

import store from "../../src/store";

const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;
const TypeHeader = styled.span`
  font-weight: bold;
`;

export default observer(() => {
  const router = useRouter();
  const pokemon = store.pokemons.find((p) => p.id === parseInt(router.query.id));
  return (
    <PageContainer>
      <CssBaseline />

      <div>
        {pokemon && (
          <>
            <h1>{pokemon.name.english}</h1>
            <p>
              <TypeHeader>Type:</TypeHeader> {" " + pokemon.type.join(", ")}
            </p>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Attribute</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(pokemon.base).map((key) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{pokemon.base[key]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </PageContainer>
  );
});
```
---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
