// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AuthorTemplate, productTemplate } from '@utils/template';
import { cloneObject } from '@utils/helpers';
import { getBasicItemFormat } from '@utils/parsers';
import { fetchSearchResult, fetchProductCategory } from '@utils/fetchers';
import NodeCache from 'node-cache';

const searchCache = new NodeCache({ stdTTL: process.env.CACHE_TTL, checkperiod: process.env.CHECK_PERIOD });

const getParsedSearchResultData = async (req, res) => {
  let categories = []
  let parsedSearchResult = {
    AuthorTemplate,
    "categories": categories,
    "items": [],
  }
  try {
    const searchResultResponse = await fetchSearchResult(req.query.q, searchCache)
    const clonedSearchResultResponse = cloneObject(searchResultResponse)
    const searchResultItems = getBasicItemFormat(clonedSearchResultResponse.results || [])
    const getFilterCategories = clonedSearchResultResponse.available_filters && clonedSearchResultResponse.available_filters.find(element => element.id === "category")

    /*
      Se checkea que venga el filtro por categoría porque, en algunas búsquedas, la API
      no devuelve esta parámetro y rompe la aplicación. En esos casos, se envía el un array vacío.
    */

    if (getFilterCategories) {
      const sortedCategories = getFilterCategories.values.sort((pre, post) => parseFloat(post.results) - parseFloat(pre.results))
      const clonedSortedCategories = cloneObject(sortedCategories)
      const productCategoryResponse = await fetchProductCategory(clonedSortedCategories[0].id, searchCache)
      categories = productCategoryResponse.path_from_root.map(category => category.name)
    }

    parsedSearchResult = {
      "categories": categories,
      "items": searchResultItems,
    }

    if (searchResultItems.length > 0) {
      res.status(200).json(parsedSearchResult)
      return parsedSearchResult;
    } else {
      throw {
        status: 204,
        cause: 'Empty response'
      }
    }
  } catch (e) {
    console.error({
      "message": "No se pudo parsear correctamente la respuesta de la API",
      "error": "unable_to_parse_searchResultData_from_api",
      "status": e.status || '',
      "cause": [e],
    });
    parsedSearchResult = {
      "categories": categories,
      "items": productTemplate,
      "status": e.status
    }
    res.status(e.status).json(parsedSearchResult)
    return parsedSearchResult
  }
}

export default getParsedSearchResultData;