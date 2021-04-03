import React from 'react';
import Layout from '../../../components/layout'
import ProductDetail from '../../../components/productDetail';
import Head from 'next/head'

const ProductPage = ({ item, categories }) => {
  return (
    <Layout title={item.title}>
      <Head>
        <meta name={"description"} content={item.description}/>
      </Head>
      <ProductDetail
        image={item.picture}
        condition={item.condition}
        sold_quantity={item.sold_quantity}
        title={item.title}
        priceThousands={item.price.amount}
        priceDecimals={item.price.decimals}
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