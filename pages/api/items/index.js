// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { cloneObject, getAsignedPropertyToProductTemplate, author, productTemplate } from '../../../utils'
import NodeCache from 'node-cache';

const CACHE_TTL = 9000
const CHECK_PERIOD = 10000
const searchCache = new NodeCache({ stdTTL: CACHE_TTL, checkperiod: CHECK_PERIOD });

const getBasicItemFormat = (object) => {
  const clonedProductTemplate = cloneObject(productTemplate);
  return object.reduce((acc, element) => {
    let asignedProductTemplate = getAsignedPropertyToProductTemplate(clonedProductTemplate, element)
    asignedProductTemplate.location = element.address.state_name
    return [
      ...acc,
      cloneObject(asignedProductTemplate)
    ]
  }, [])
}

export const getSearchResult = async (query) => {
  const searchResultCache = searchCache.get("searchResult")

  if (searchResultCache && searchResultCache.query === query) {
    console.log('cache')
    return searchResultCache
  } else {
    console.log('fetch')
    try {
      let getSearchResultResponse = await fetch(`${process.env.API_URL}sites/MLA/search?q=${query}&nano&limit=4`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        }
      })

      
      let searchResultResponse = await getSearchResultResponse
      
      if (searchResultResponse.status === 200) {        
        const searchResult = searchResultResponse.json()
        searchCache.set('searchResult', searchResult)
        return searchResult;
      } else {
        throw searchResultResponse
      }
    } catch (er) {
      console.error({
        "message": "Hubo un error al consultar a la API de Mercadolibre",
        "error": "no_reached_mercadolibre_api",
        "status": 403,
        "cause": [er],
      })
    }
  }
}

const getParsedSearchResultData = async (req, res) => {
  let breadcrumbSearchResult = []
  let parsedSearchResult = {
    author,
    "categories": breadcrumbSearchResult,
    "items": [],
  }
  try {
    let fetchSearchResponse = await getSearchResult(req.query.q)

    let clonedSearchResult = cloneObject(fetchSearchResponse)
    const searchResultItems = getBasicItemFormat(clonedSearchResult.results || [])
    
    const getFilterCategories = clonedSearchResult.available_filters && clonedSearchResult.available_filters.find(element => element.id === "category")
    if (getFilterCategories) {
      const sortedCategories = getFilterCategories.values.sort((pre, post) => parseFloat(post.results) - parseFloat(pre.results))
      breadcrumbSearchResult = sortedCategories.map(element => element.name)
    }
  
    parsedSearchResult = {
      "categories": breadcrumbSearchResult,
      "items": searchResultItems,
    }
  
    res.status(200).json(parsedSearchResult)
    return parsedSearchResult;
  } catch (e) {
    console.error({
      "message": "No se pudo parsear correctamente la respuesta de la API",
      "error": "unable_to_parse_searchResultData_from_api",
      "status": 500,
      "cause": [e],
    });
    parsedSearchResult = {
      "categories": breadcrumbSearchResult,
      "items": productTemplate,
    }
    res.status(500).json(parsedSearchResult)
  }
}

export default getParsedSearchResultData;