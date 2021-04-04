// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ItemMock, ItemDescriptionMock } from '../../../../mocks'
import { cloneObject, getAsignedPropertyToProductTemplate, author, productTemplate } from '../../../../utils'
import NodeCache from 'node-cache';

const CACHE_TTL = 9000
const CHECK_PERIOD = 10000
const productPageCache = new NodeCache({ stdTTL: CACHE_TTL, checkperiod: CHECK_PERIOD });

const FetchProductData = async (query) => {
  const productCache = productPageCache.mget(["productData"])
  if (productCache && productCache.productData && productCache.productData.id === query) {
    console.log('cache productData')
    return productCache.productData
  } else {
    console.log('fetch Data')
    try {
      let getProductDataResponse = await fetch(`${process.env.API_URL}items/${query}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        }
      })

      let productDataResponse = await getProductDataResponse
      if (productDataResponse.status === 200) {
        const productData = productDataResponse.json()
        productPageCache.mset([{ key: 'productData', val: productData }])
        return productData
      } else {
        throw productDataResponse
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

const FetchProductDescription = async (query) => {
  const productCache = productPageCache.mget(["productDescription"])

  if (productCache && productCache.productDescription && productCache.productDescription.query === query) {
    console.log('cache productDescription')

    return productCache.productDescription
  } else {
    console.log('fetch Description')

    try {
      let getProductDescriptionResponse = await fetch(`${process.env.API_URL}items/${query}/description`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        }
      })
      
      let productDescriptionResponse = await getProductDescriptionResponse
      if (productDescriptionResponse.status === 200) { 
        let productDescription = productDescriptionResponse.json()
        productDescription.query = query
        productPageCache.mset([{ key: 'productDescription', val: productDescription }])
        return productDescription
      } else {
        throw productDescriptionResponse
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

const getParsedProductPage = async (req, res) => {
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

export default getParsedProductPage;