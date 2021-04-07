import { readFileSync } from 'fs'
import path from 'path'

export const productDataMock = JSON.parse(
  readFileSync(path.join(__dirname, '/productData.json')).toString()
)

export const productDescriptionMock = JSON.parse(
  readFileSync(path.join(__dirname, '/productDescription.json')).toString()
)

export const productCategoryMock = JSON.parse(
  readFileSync(path.join(__dirname, '/productCategory.json')).toString()
)

export const productParsedDataMock = JSON.parse(
  readFileSync(path.join(__dirname, '/productParsedData.json')).toString()
)