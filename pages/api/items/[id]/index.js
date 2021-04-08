// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AuthorTemplate, productTemplate } from '@utils/template'
import { cloneObject, getTranslatedCondition } from '@utils/helpers'
import { getFilledProductTemplate } from '@utils/parsers'
import { fetchProductData, fetchProductCategory, fetchProductDescription } from '@utils/fetchers'
import NodeCache from 'node-cache';

const productPageCache = new NodeCache({ stdTTL: process.env.CACHE_TTL, checkperiod: process.env.CHECK_PERIOD });

const getParsedProductPage = async (req, res) => {
  let parsedProductData = {
    AuthorTemplate,
    "item": productTemplate
  }

  try {
    let productDataResponse = await fetchProductData(req.query.id, productPageCache)
    let clonedItem = cloneObject(productDataResponse)
    let ProductDescriptionResponse = await fetchProductDescription(req.query.id, productPageCache)
    let productCategoryResponse = await fetchProductCategory(clonedItem.category_id, productPageCache)
    const clonedProductTemplate = cloneObject(productTemplate)
    let clonedItemDescription = cloneObject(ProductDescriptionResponse)
    let clonedItemCategory = cloneObject(productCategoryResponse)
    let asignedProductTemplate = getFilledProductTemplate(clonedProductTemplate, clonedItem, "productDetail")

    asignedProductTemplate.condition = getTranslatedCondition(clonedItem.condition)
    asignedProductTemplate.sold_quantity = clonedItem.sold_quantity,
    asignedProductTemplate.categories = clonedItemCategory.path_from_root.map(category => category.name)
    asignedProductTemplate.description = clonedItemDescription.plain_text

    parsedProductData = {
      "item": asignedProductTemplate
    }

    res.status(200).json(parsedProductData)
    return parsedProductData
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