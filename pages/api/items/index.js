// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AuthorTemplate, productTemplate } from '@utils/template';
import { cloneObject } from '@utils/helpers';
import { getBasicItemFormat } from '@utils/parsers';
import { fetchSearchResult } from '@utils/fetchers';
import NodeCache from 'node-cache';

const searchCache = new NodeCache({ stdTTL: process.env.CACHE_TTL, checkperiod: process.env.CHECK_PERIOD });

const getParsedSearchResultData = async (req, res) => {
  let breadcrumbSearchResult = []
  let parsedSearchResult = {
    AuthorTemplate,
    "categories": breadcrumbSearchResult,
    "items": [],
  }
  try {
    let fetchSearchResponse = await fetchSearchResult(req.query.q, searchCache)

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