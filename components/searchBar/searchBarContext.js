import React from 'react'

export default React.createContext()

export const InitialReducer = {
  "error": {
    "haveError": false,
    "message": ""
  }
}

export const SearchBarReducer = (state, action) => {
  const { type, payload } = action
  console.log('Reducer ->', {
    state: state,
    payload: payload
  })
  switch (type) {
    case 'input-vacio':
      return {
        ...state,
        ...payload
      }
    case 'input-completado':
      return {
        ...state,
        ...payload
      }
      break;
    default:
      break;
  }
}
