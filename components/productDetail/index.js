import React from 'react'
import ProductInformation from './ProductInformation'
import ProductDescription from './ProductDescription'
import productDetailStyles from './productDetail.module.scss'

const ProductDetail = ({ image, condition, sold_quantity, title, priceThousands, priceDecimals, description }) => {
  return (
    <section className={productDetailStyles.container}>
      <ProductInformation
        image={image}
        condition={condition}
        sold_quantity={sold_quantity}
        title={title}
        priceThousands={priceThousands}
        priceDecimals={priceDecimals}
      />
      <ProductDescription
        description={description}
      />
    </section>
  )
}

export default ProductDetail
