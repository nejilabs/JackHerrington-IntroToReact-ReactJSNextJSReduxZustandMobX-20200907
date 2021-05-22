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
