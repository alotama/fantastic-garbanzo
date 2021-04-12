import React from 'react'
import Link from 'next/link'
import ProductClusterStyles from './productCluster.module.scss'
import PropTypes from 'prop-types';
const ProductCluster = ({ title, id, index, image, price, location, free_shipping }) => {
  return (
    <Link href={{
      pathname: '/items/[id]',
      query: { id: id },
    }}>
      <li>
        <a data-cy={`integration-productCluster-${index}`} className={ProductClusterStyles.container}>
          <figure className={ProductClusterStyles.imageContainer}>
            <img
              src={image}
              alt={title}
              width={180}
              height={180}
            />
          </figure>
          <section className={ProductClusterStyles.informationContainer}>
            <article className={ProductClusterStyles.description}>
              <div className={ProductClusterStyles.condition}>
                <p className={ProductClusterStyles.price}>$ {price}</p>
                {free_shipping &&
                  <figure className={ProductClusterStyles.shipping}>
                    <img
                      src={'/ic_shipping.png'}
                      srcSet={'/ic_shipping@2x.png'}
                      alt={'Envío gratis'}
                      width={16}
                      height={16}
                    />
                  </figure>
                }
              </div>
              <h2 className={ProductClusterStyles.name}>{title}</h2>
            </article>
            <article className={ProductClusterStyles.extraInfo}>
              <small className={ProductClusterStyles.location}>{location}</small>
            </article>
          </section>
        </a>
      </li>
    </Link>
  )
}

ProductCluster.prototype = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  free_shipping: PropTypes.bool
}

export default ProductCluster
