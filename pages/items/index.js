import React from 'react';
import Layout from '../../components/layout'
import ProductList from '../../components/productList'
import Breadcrumb from '../../components/breadcrumb'

const SearchResult = ({ categories, items }) => {
  return (
    <Layout>
      <Breadcrumb
        steps={categories}
      />
      <ProductList
        products={items}
      />
    </Layout>
  )
}

export async function getServerSideProps(params, req, res) {
  const response = await fetch(`http://localhost:3000/api/items?q=${params.query.search}`)
  const { categories, items } = await response.json()

  return {
    props: {
      categories: categories,
      items: items
    }
  }
}

export default SearchResult;