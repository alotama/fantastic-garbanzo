// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ItemMock, ItemDescriptionMock } from '../../../../mocks'
import { cloneObject, getAsignedPropertyToProductTemplate, author, productTemplate } from '../../../../utils'
import NodeCache from 'node-cache';

const CACHE_TTL = 9000
const CHECK_PERIOD = 10000
const productPageCache = new NodeCache({ stdTTL: CACHE_TTL, checkperiod: CHECK_PERIOD });

async function FetchProductData(query) {
  const productCache = productPageCache.mget(["productData"])
  if (productCache && productCache.productData && productCache.productData.id === query) {
    console.log('cache productData')
    return productCache.productData
  }
  
  console.log('fetch Data') 
  let testingAPI = await fetch(`${process.env.API_URL}items/${query}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
    }
  })

  let jsonTestingAPI = await testingAPI.json()
  productPageCache.mset([{key: 'productData', val: jsonTestingAPI}])
  return jsonTestingAPI
}

async function FetchProductDescription(query) {
  const productCache = productPageCache.mget(["productDescription"]) 
  if (productCache && productCache.productDescription && productCache.productDescription.query === query) {
    console.log('cache productDescription')
    return productCache.productDescription
  } else {
    console.log('fetch Description') 
    let testingAPI = await fetch(`${process.env.API_URL}items/${query}/description`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
      }
    })

    let jsonTestingAPI = await testingAPI.json()
    jsonTestingAPI.query = query
    productPageCache.mset([{key: 'productDescription', val: jsonTestingAPI}])
    return jsonTestingAPI
  }
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