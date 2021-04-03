import React from 'react'
import productInformationStyles from './productInformation.module.scss'

const productInformation = ({ image, condition, sold_quantity, title, price }) => {
  return (
    <article className={productInformationStyles.container}>
      <figure className={productInformationStyles.imageContainer}>
        <img src={image} />
      </figure>
      <section className={productInformationStyles.content}>
        <small className={productInformationStyles.detail}>{condition} - {sold_quantity}</small>
        <h1 className={productInformationStyles.title}>{title}</h1>
        <h2 className={productInformationStyles.price}>{price}</h2>
        <button className={productInformationStyles.button}>Comprar</button>
      </section>
    </article>
  )
}

export default productInformation
