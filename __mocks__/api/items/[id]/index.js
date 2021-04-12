import { readFileSync } from 'fs'
import path from 'path'

export const productDataMock = JSON.parse(
  readFileSync(path.join(__dirname, '/productData.json')).toString()
)

export const productDescriptionMock = JSON.parse(
  readFileSync(path.join(__dirname, '/productDescription.json')).toString()
)

export const categoryMock = JSON.parse(
  readFileSync(path.join('./__mocks__/categoryResponse.json')).toString()
)

export const productParsedDataMock = JSON.parse(
  readFileSync(path.join(__dirname, '/productParsedData.json')).toString()
)