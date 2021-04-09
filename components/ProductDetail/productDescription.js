import React from 'react'
import productDescriptionStyles from './productDescription.module.scss'
import PropTypes from 'prop-types';

const ProductDescription = ({ description }) => {
  return (
    <article className={productDescriptionStyles.container}> 
      <h3 className={productDescriptionStyles.title}>Descripción del producto</h3>
      <p className={productDescriptionStyles.content}>{description}</p>
    </article>
  )
}

ProductDescription.prototype = {
  description: PropTypes.string.isRequired
}

export default ProductDescription
