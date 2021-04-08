import React from 'react'
import ProductInformation from './ProductInformation'
import ProductDescription from './ProductDescription'
import productDetailStyles from './productDetail.module.scss'
import PropTypes from 'prop-types';

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

ProductDetail.prototype = {
  image: PropTypes.string.isRequired,
  condition: PropTypes.string.isRequired,
  sold_quantity: PropTypes.number.isRequired, 
  title: PropTypes.string.isRequired, 
  priceThousands: PropTypes.string.isRequired, 
  priceDecimals: PropTypes.string.isRequired, 
  description: PropTypes.string.isRequired
}

export default ProductDetail
