import React from 'react'
import productInformationStyles from './productInformation.module.scss'

const productInformation = ({ image, condition, sold_quantity, title, priceThousands, priceDecimals }) => {
  return (
    <article className={productInformationStyles.container}>
      <figure className={productInformationStyles.imageContainer}>
        <img src={image} alt={title} width={680} height={'auto'} />
      </figure>
      <section className={productInformationStyles.content}>
        <small className={productInformationStyles.detail}>{condition} - {sold_quantity}</small>
        <h1 className={productInformationStyles.title}>{title}</h1>
        <h2 className={productInformationStyles.priceThousands}>
          $ {priceThousands}
          <span className={productInformationStyles.priceDecimals}>
            {priceDecimals}
          </span>
        </h2>
        <button aria-label="Comprar" className={productInformationStyles.button}>Comprar</button>
      </section>
    </article>
  )
}

export default productInformation
