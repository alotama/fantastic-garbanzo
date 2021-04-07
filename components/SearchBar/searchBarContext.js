import React from 'react'

export default React.createContext()

export const InitialReducer = {
  "search": '',
  "category": []
}

export const SearchBarReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'search':
      return {
        ...state,
        ...payload
      }
    case 'select-product':
      return {
        ...state,
        ...payload
      }
      break;
    default:
      break;
  }
}
