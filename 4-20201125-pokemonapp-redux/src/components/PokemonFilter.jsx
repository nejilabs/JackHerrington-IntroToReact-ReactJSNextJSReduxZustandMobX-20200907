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
