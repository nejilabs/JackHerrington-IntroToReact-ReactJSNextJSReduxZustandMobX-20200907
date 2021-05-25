# 8-20210220-pokemonapp-nextjs-ssr
### Table of Contents
- [8-20210220-pokemonapp-nextjs-ssr](#8-20210220-pokemonapp-nextjs-ssr)
    + [Table of Contents](#table-of-contents)
- [16 - 7:48 Introduction to React #16 | Server Side Rendering (SSR)](#16---7-48-introduction-to-react--16---server-side-rendering--ssr-)
  * [16.1 Project Setup](#161-project-setup)
  * [16.2 getServerSideProps](#162-getserversideprops)
  * [Getting Started](#getting-started)
  * [Learn More](#learn-more)
  * [Deploy on Vercel](#deploy-on-vercel
---
# 16 - 7:48 Introduction to React #16 | Server Side Rendering (SSR)

Description:  We take our NextJS app and use Server Side Rendering to render the pages on the server before they go to the client.

## 16.1 Project Setup

to save a copy of the app's next js csr for,  just make a copy of the project and rename it accordingly with -ssr. then edit accordingly such as package.json

## 16.2 getServerSideProps
[Basic Features: Data Fetching | Next.js](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering)

Add this above pages/index.js @component

```jsx
export async function getServerSideProps() {
  const pokemons = await (await fetch("http://localhost:3000/pokemon.json")).json()
  return {
    props: {
      pokemons
    },
  }
}
```

then pages/index.js @Component and export statement

```jsx
// START: COMPONENT ---
const Home = ({ pokemons }) => {
  store.setPokemons(pokemons);

  // Start: Templates
  if (!store.pokemons) {
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

export default observer(Home);
```

remove the fetching of pokemons data in store.js

now if you test it, it works. 

if you look at the page source at ur browser tho, you can see our data in the code. this is what you called reconciliation

do the same for pages/pokemon/[id].js

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

export async function getServerSideProps(context) {
  const pokemons = await (await fetch("http://localhost:3000/pokemon.json")).json()
  const pokemon = pokemons.find((p) => p.id === parseInt(context.query.id));
  return {
    props: {
      pokemon
    },
  }
}

export default observer(({ pokemon }) => {
  const router = useRouter();

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
