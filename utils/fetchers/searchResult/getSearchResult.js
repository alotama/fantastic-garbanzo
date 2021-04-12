import { stringNormalize } from '@utils/helpers'

const fetchSearchResult = async (query, cache) => {
  const searchResultCache = cache.mget(["searchResult"])
  const queryNormalized = stringNormalize(query)

  if (searchResultCache && searchResultCache.searchResult && searchResultCache.searchResult.query === query) {
    console.log('cache')
    return searchResultCache.searchResult
  } else {
    console.log('fetch')
    try {
      let getSearchResultResponse = await fetch(`${process.env.API_URL}sites/MLA/search?q=${queryNormalized}&nano&limit=${process.env.LIMIT_RESULT}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        }
      })

      if (getSearchResultResponse.status === 200) {        
        const searchResult = await getSearchResultResponse.json()
        cache.mset([{ key: 'searchResult', val: searchResult }])        
        return searchResult;
      } else {
        throw {
          status: getSearchResultResponse.status,
          cause: getSearchResultResponse
        }
      }
    } catch (er) {
      console.error({
        "message": "Hubo un error al consultar a la API de Mercadolibre",
        "error": "no_reached_mercadolibre_api",
        "status": er.status,
        "cause": er.cause,
      })
    }
  }
}

export default fetchSearchResult;