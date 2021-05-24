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
