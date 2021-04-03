import React from 'react';
import Layout from '../../../components/layout'
import ProductDetail from '../../../components/productDetail';

const ProductPage = ({ item, categories }) => {
  return (
    <Layout>
      <ProductDetail
        image={item.picture}
        condition={item.condition}
        sold_quantity={item.sold_quantity}
        title={item.title}
        price={item.price.amount}
        description={item.description}
      />
    </Layout>
  )
}

export async function getServerSideProps(params, req, res) {
  const response = await fetch(`http://localhost:3000/api/items/${params.query.id}`)
  const { item } = await response.json()

  return {
    props: {
      item: item
    }
  }
}


export default ProductPage