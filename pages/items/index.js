import React from 'react';
import Layout from '../../components/Layout'
import ProductList from '../../components/ProductList'
import Breadcrumb from '../../components/Breadcrumb'
import { capitalizeFirstLetter } from '../../utils'

const SearchResult = ({ errorCode, categories, items, search }) => {
  if (errorCode) {
    return <Error search={search} statusCode={errorCode} />
  }

  return (
    <Layout
      title={search}
      pageURL={`items?search=${search}`}
      description={`Encontrá ${search} en esta fantástica app de Sebastián Tamashiro. Nunca dejes de buscar. Meli Challenge 2021`}
    >
      <Breadcrumb
        steps={categories}
        search={search}
      />
      <ProductList
        products={items}
      />
    </Layout>
  )
}

export async function getServerSideProps(params, req, res) {
  try {
    const response = await fetch(`${process.env.SITE_URL}/api/items?q=${params.query.search}`)
    if (response.status === 200) {      
      const { categories, items } = await response.json()
      
      if (params.query.search) {        
        return {
          props: {
            search: capitalizeFirstLetter(params.query.search),
            categories: categories,
            items: items
          }
        }
      } else {
        throw {
          status: response.status,
          response: params.query
        };
      }
    } else {
      throw {
        status: response.status,
        response: await response.json()
      };
    }
  } catch (er) {
    console.error({
      "message": "No se obtuvo una respuesta de la API que obtiene el resultado de la búsqueda",
      "error": "searchResult_error_api",
      "status": er.status,
      "cause": [er.response],
    })
    return {
      props: {
        search: capitalizeFirstLetter(params.query.search),
        categories: [],
        items: [],
        errorCode: er.status
      }
    }
  }

}

export default SearchResult;