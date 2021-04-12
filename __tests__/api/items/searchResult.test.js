import getParsedSearchResultData from '../../../pages/api/items'
import { searchResultResponseMock, searchResultParsedMock, categoryMock } from 'api/items'
import { createMocks } from 'node-mocks-http';

global.fetch = jest.fn(() => Promise.resolve({
  status: 200,
  json: () => Promise.resolve(categoryMock)
})).mockImplementationOnce(() => Promise.resolve({
  status: 200,
  json: () => Promise.resolve(searchResultResponseMock)
}))

beforeEach(() => {
  fetch.mockClear();
});

describe("Test /api/items?q=", () => {
  test("getParsedProductPage", async () => {

    const { req, res } = createMocks({
      method: 'GET',
      query: {
        q: 'tempo',
      },
    });

    await getParsedSearchResultData(req, res)
    const searchResultParsedResponse = JSON.parse(res._getData())
    
    expect(res.statusCode).toBe(200)
    expect(typeof searchResultParsedResponse.categories).toBe(typeof searchResultParsedMock.categories)
    expect(typeof searchResultParsedResponse.items).toBe(typeof searchResultParsedMock.items)
    expect(searchResultParsedResponse.items.length).toBe(searchResultParsedMock.items.length)
    expect(searchResultParsedResponse.items.map((property) => {
      return {
        id: typeof property.id,
        title: typeof property.title,
        price: typeof property.price,
        free_shipping: typeof property.free_shipping,
        picture: typeof property.picture,
        location: typeof property.location,
      }
    })).toEqual(searchResultParsedMock.items.map(property => {
      return {
        id: typeof property.id,
        title: typeof property.title,
        price: typeof property.price,
        free_shipping: typeof property.free_shipping,
        picture: typeof property.picture,
        location: typeof property.location,
      }
    }))
  })
})