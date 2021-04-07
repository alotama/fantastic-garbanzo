import { readFileSync } from 'fs'
import path from 'path'

export const searchResultResponseMock = JSON.parse(
  readFileSync(path.join(__dirname, '/searchResultResponse.json')).toString()
)

export const searchResultParsedMock = JSON.parse(
  readFileSync(path.join(__dirname, '/searchResultParsed.json')).toString()
)