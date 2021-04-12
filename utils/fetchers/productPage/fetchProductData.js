const FetchProductData = async (query, cache) => {
  const productCache = cache.mget(["productData"])
  if (productCache && productCache.productData && productCache.productData.id === query) {
    return productCache.productData
  } else {
    try {
      let getProductDataResponse = await fetch(`${process.env.API_URL}items/${query}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        }
      })

      if (getProductDataResponse.status === 200) {
        const productData = await getProductDataResponse.json()
        cache.mset([{ key: 'productData', val: productData }])
        return productData
      } else {
        throw {
          status: getProductDataResponse.status,
          cause: getProductDataResponse
        }
      }

    } catch (e) {
      console.error({
        "message": "Hubo un error al consultar al endpoint /items/:id de la API de Mercadolibre",
        "error": "no_reached_items_mercadolibre_api",
        "status": e.status,
        "cause": [e.cause],
      })
    }
  }
}

export default FetchProductData