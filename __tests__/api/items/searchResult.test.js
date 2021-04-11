import getParsedSearchResultData from '../../../pages/api/items'
import { searchResultResponseMock, searchResultParsedMock } from 'api/items'

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve(searchResultResponseMock),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

describe("Test /api/items?q=", () => {
  test("getParsedProductPage", async () => {
    const req = {
      query: { q: 'tempo' },
    }
    const res = {};
    res.status = () => res;
    res.json = () => res;
    const SearchResultParsed = await getParsedSearchResultData(req, res)

    expect(typeof SearchResultParsed.categories).toBe(typeof searchResultParsedMock.categories)
    expect(typeof SearchResultParsed.items).toBe(typeof searchResultParsedMock.items)
    expect(SearchResultParsed.items.length).toBe(searchResultParsedMock.items.length)
    expect(SearchResultParsed.items.map((property) => {
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