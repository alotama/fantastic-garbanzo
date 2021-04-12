import GetParsedProductPage from '../../../../pages/api/items/[id]'
import { productDataMock, productDescriptionMock, categoryMock, productParsedDataMock } from 'api/items/[id]'

global.fetch = jest.fn(() => Promise.resolve({
  status: 200,
  json: () => Promise.resolve(categoryMock)
})).mockImplementationOnce(() => Promise.resolve({
  status: 200,
  json: () => Promise.resolve(productDataMock)
})).mockImplementationOnce(() => Promise.resolve({
  status: 200,
  json: () => Promise.resolve(productDescriptionMock)
}))

beforeEach(() => {
  fetch.mockClear();
});

describe("Test /api/:id", () => {
  test("GetParsedProductPage - Description", async () => {
    const req = {
      query: { id: 'MLA897952360' },
    }
    const res = {};
    res.status = () => res;
    res.json = () => res;
    const productParsedData = await GetParsedProductPage(req, res)

    expect(typeof productParsedData.item).toBe(typeof productParsedDataMock.item)
    expect(typeof productParsedData.item.id).toBe(typeof productParsedDataMock.item.id)
    expect(typeof productParsedData.item.title).toBe(typeof productParsedDataMock.item.title)
    expect(typeof productParsedData.item.price).toBe(typeof productParsedDataMock.item.price)
    expect(typeof productParsedData.item.price.currency).toBe(typeof productParsedDataMock.item.price.currency)
    expect(typeof productParsedData.item.price.amount).toBe(typeof productParsedDataMock.item.price.amount)
    expect(typeof productParsedData.item.price.decimals).toBe(typeof productParsedDataMock.item.price.decimals)
    expect(typeof productParsedData.item.picture).toBe(typeof productParsedDataMock.item.picture)
    expect(typeof productParsedData.item.condition).toBe(typeof productParsedDataMock.item.condition)
    expect(typeof productParsedData.item.sold_quantity).toBe(typeof productParsedDataMock.item.sold_quantity)
    expect(typeof productParsedData.item.categories).toBe(typeof productParsedDataMock.item.categories)
    expect(typeof productParsedData.item.description).toBe(typeof productParsedDataMock.item.description)
  })
})