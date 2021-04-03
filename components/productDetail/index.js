import React from 'react'
import ProductInformation from './productInformation'
import ProductDescription from './ProductDescription'
import productDetailStyles from './productDetail.module.scss'

const ProductDetail = ({ image, condition, sold_quantity, title, price, description }) => {
  return (
    <section className={productDetailStyles.container}>
      <ProductInformation
        image={image}
        condition={condition}
        sold_quantity={sold_quantity}
        title={title}
        price={price}
      />
      <ProductDescription
        description={description}
      />
    </section>
  )
}

export default ProductDetail
