const fetchSearchResult = async (query, cache) => {
  const searchResultCache = cache.get("searchResult")

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
        cache.set('searchResult', searchResult)
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

export default fetchSearchResult;