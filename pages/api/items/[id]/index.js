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
  } else {
    console.log('fetch Data')
    try {
      let testingAPI = await fetch(`${process.env.API_URL}items/${query}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        }
      })

      let jsonTestingAPI = await testingAPI
      if (jsonTestingAPI.status === 200) {
        const daleProductData = jsonTestingAPI.json()
        productPageCache.mset([{ key: 'productData', val: daleProductData }])
        return daleProductData
      } else {
        throw jsonTestingAPI
      }

    } catch (e) {
      console.error({
        "message": "Hubo un error al consultar al endpoint /items/:id de la API de Mercadolibre",
        "error": "no_reached_items_mercadolibre_api",
        "status": 403,
        "cause": [e],
      })
    }
  }
}

async function FetchProductDescription(query) {
  const productCache = productPageCache.mget(["productDescription"])
  if (productCache && productCache.productDescription && productCache.productDescription.query === query) {
    console.log('cache productDescription')
    return productCache.productDescription
  } else {
    console.log('fetch Description')
    try {
      let testingAPI = await fetch(`${process.env.API_URL}items/${query}/description`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        }
      })
      
      let testingAPIResponse = await testingAPI
      if (testingAPIResponse.status === 200) { 
        let daleQueVa = testingAPIResponse.json()
        daleQueVa.query = query
        productPageCache.mset([{ key: 'productDescription', val: daleQueVa }])
        return daleQueVa
      } else {
        throw testingAPIResponse
      }
    } catch (e) {
      console.error({
        "message": "Hubo un error al consultar al endpoint /items/:id/description de la API de Mercadolibre",
        "error": "no_reached_items_description_mercadolibre_api",
        "status": 403,
        "cause": [e],
      })
    }
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
  let parsedProductData = {
    author,
    "item": productTemplate
  }

  try {
    let productDataResponse = await FetchProductData(req.query.id)
    let ProductDescriptionResponse = await FetchProductDescription(req.query.id)
    const clonedProductTemplate = cloneObject(productTemplate)
    let clonedItem = cloneObject(productDataResponse)
    let clonedItemDescription = cloneObject(ProductDescriptionResponse)
    let asignedProductTemplate = getAsignedPropertyToProductTemplate(clonedProductTemplate, clonedItem, "productDetail")

    asignedProductTemplate.condition = getTranslatedCondition(clonedItem.condition)
    asignedProductTemplate.sold_quantity = clonedItem.sold_quantity,
      asignedProductTemplate.description = clonedItemDescription.plain_text

    parsedProductData = {
      "item": asignedProductTemplate
    }

    res.status(200).json(parsedProductData)
  } catch (e) {
    console.error({
      "message": "No se pudo parsear correctamente la respuesta de la API",
      "error": "unable_to_parse_productData_from_api",
      "status": 500,
      "cause": [e],
    })
    res.status(500).json(parsedProductData)
  }
}

export default getParsedProductData;