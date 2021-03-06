const FetchProductCategory = async (query, cache) => {
  const productCache = cache.mget(["productCategory"])
  
  if (productCache && productCache.productCategory && productCache.productCategory.id === query) {
    return productCache.productCategory
  } else {
    try {
      let getProductCategoryResponse = await fetch(`${process.env.API_URL}categories/${query}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        }
      })

      if (getProductCategoryResponse.status === 200) { 
        const productCategory = await getProductCategoryResponse.json()
        cache.mset([{ key: 'productCategory', val: productCategory }])
        return productCategory
      } else {
        throw {
          status: getProductCategoryResponse.status,
          cause: getProductCategoryResponse
        }
      }
    } catch (e) {
      console.error({
        "message": "Hubo un error al consultar al endpoint /category/:id de la API de Mercadolibre",
        "error": "no_reached_items_category_mercadolibre_api",
        "status": e.status,
        "cause": [e.cause],
      })
    }
  }
}

export default FetchProductCategory