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
