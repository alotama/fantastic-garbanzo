const fetchProductDescription = async (query, cache) => {
  const productCache = cache.mget(["productDescription"])

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
      
      if (getProductDescriptionResponse.status === 200) { 
        const productDescription = await getProductDescriptionResponse.json()
        productDescription.query = query
        cache.mset([{ key: 'productDescription', val: productDescription }])
        return productDescription
      } else {
        throw {
          status: getProductDescriptionResponse.status,
          cause: getProductDescriptionResponse
        }
      }
    } catch (e) {
      console.error({
        "message": "Hubo un error al consultar al endpoint /items/:id/description de la API de Mercadolibre",
        "error": "no_reached_items_description_mercadolibre_api",
        "status": e.status,
        "cause": [e.cause],
      })
    }
  }
}

export default fetchProductDescription;