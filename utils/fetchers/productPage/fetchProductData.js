const FetchProductData = async (query, cache) => {
  const productCache = cache.mget(["productData"])
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
        cache.mset([{ key: 'productData', val: productData }])
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

export default FetchProductData