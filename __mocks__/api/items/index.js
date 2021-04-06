import { readFileSync } from 'fs'
import path from 'path'
import { act } from '@testing-library/react'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ searchResultResponseMock }),
  })
);

// export const searchResultParsedMock = JSON.parse(
//   readFileSync(path.join(__dirname, '/searchResultParsed.json')).toString()
// )

export const searchResultResponseMock = JSON.parse(
  readFileSync(path.join(__dirname, '/searchResultResponse.json')).toString()
)

// const mock = {
//   searchResultResponse: jest.fn(() => {
//     return {
//       then: callback => act(() => callback({searchResultResponseMock}))
//     }
//   }),
//   searchResultParsed: jest.fn(() => {
//     return {
//       then: callback => act(() => callback({searchResultParsedMock}))
//     }
//   })
// }

// export default mock;