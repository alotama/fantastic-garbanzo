import React from 'react';
import Layout from '@components/Layout'
import ProductDetail from '@components/ProductDetail';
import Breadcrumb from '@components/Breadcrumb'

const ProductPage = ({ id, item, errorCode }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <Layout
      title={item.title}
      pageURL={`items/${id}`}
      description={item.description}
      picture={item.picture}
    >
      <Breadcrumb
        steps={item.categories}
      />
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
  try {
    const response = await fetch(`${process.env.SITE_URL}/api/items/${params.query.id}`)
    if (response.status === 200) {
      const { item } = await response.json()

      return {
        props: {
          id: params.query.id,
          item: item
        }
      }
    } else {
      throw {
        status: response.status,
        response: await response.json()
      }
    }
  } catch (er) {
    console.error({
      "message": "No se obtuvo una respuesta de la API que obtiene el detalle del producto que se buscó",
      "error": "productPage_error_api",
      "status": er.status,
      "cause": [er.response],
    })

    return {
      props: {
        id: params.query.id,
        item: er.response.item,
        errorCode: er.status
      }
    }
  }
}


export default ProductPage