import React from 'react'
import productDescriptionStyles from './productDescription.module.scss'

const ProductDescription = ({ description }) => {
  return (
    <article className={productDescriptionStyles.container}> 
      <h3 className={productDescriptionStyles.title}>Descripción del producto</h3>
      <p className={productDescriptionStyles.content}>{description}</p>
    </article>
  )
}

export default ProductDescription
