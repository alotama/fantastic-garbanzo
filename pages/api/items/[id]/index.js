// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ItemMock, ItemDescriptionMock } from '../../../../mocks'
import { cloneObject, getAsignedPropertyToProductTemplate, author, productTemplate } from '../../../../utils'

async function FetchProductData(query) {
  
  let testingAPI = await fetch(`${process.env.API_URL}items/${query}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
    }
  })

  let jsonTestingAPI = await testingAPI.json()
  
  return jsonTestingAPI
}

async function FetchProductDescription(query) {
  
  let testingAPI = await fetch(`${process.env.API_URL}items/${query}/description`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
    }
  })

  let jsonTestingAPI = await testingAPI.json()
  
  return jsonTestingAPI
}

const getTranslatedCondition = (condition) => {
  switch (condition) {
    case 'new':
      return 'Nuevo'
    case 'used':
      return 'Usado'
    default:
      break;
  }
}

const getParsedProductData = async (req, res) => {
  let productDataResponse = await FetchProductData(req.query.id)
  let ProductDescriptionResponse = await FetchProductDescription(req.query.id)
  const clonedProductTemplate = cloneObject(productTemplate)
  let clonedItem = cloneObject(productDataResponse)
  let clonedItemDescription = cloneObject(ProductDescriptionResponse)
  let asignedProductTemplate = getAsignedPropertyToProductTemplate(clonedProductTemplate, clonedItem, "productDetail")

  asignedProductTemplate.condition = getTranslatedCondition(clonedItem.condition)
  asignedProductTemplate.sold_quantity = clonedItem.sold_quantity,
  asignedProductTemplate.description = clonedItemDescription.plain_text

  const finalItem = {
    author,
    "item": asignedProductTemplate
  }

  res.status(200).json(finalItem)
}

export default getParsedProductData;