// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { cloneObject, getAsignedPropertyToProductTemplate, author, productTemplate } from '../../../utils'
import NodeCache from 'node-cache';

const CACHE_TTL = 9000
const CHECK_PERIOD = 10000
const searchCache = new NodeCache({stdTTL: CACHE_TTL, checkperiod: CHECK_PERIOD});

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

async function FetchSearchData(query) {
  const searchDataCache = searchCache.get("searchData")

  if (searchDataCache && searchDataCache.query === query) {
    console.log('cache')
    return searchDataCache
  } else {
    console.log('fetch') 
    let testingAPI = await fetch(`${process.env.API_URL}sites/MLA/search?q=${query}&nano&limit=4`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
      }
    })
  
    let jsonTestingAPI = await testingAPI.json()
  
    searchCache.set('searchData', jsonTestingAPI)
    return jsonTestingAPI;x
  }
}

const getParsedData = async (req, res) => {
  let breadcrumbSearchResult = []
  let fetchSearchResponse = await FetchSearchData(req.query.q)
  let clonedSearchResult = cloneObject(fetchSearchResponse)
  const searchResultItems = getBasicItemFormat(clonedSearchResult.results)

  const getFilterCategories = clonedSearchResult.available_filters.find(element => element.id === "category")
  if (getFilterCategories) {
    const sortedCategories = getFilterCategories.values.sort((pre, post) => parseFloat(post.results) - parseFloat(pre.results))
    breadcrumbSearchResult = sortedCategories.map(element => element.name)
  }

  const finalResult = {
    author,
    "categories": breadcrumbSearchResult,
    "items": searchResultItems,
  }

  res.status(200).json(finalResult)
}

export default getParsedData;