import React from 'react'
import ProductCluster from './ProductCluster'
import ProductListStyles from './productList.module.scss'
import PropTypes from 'prop-types';
const ProductList = ({ products }) => {
  return (
    <section className={ProductListStyles.container} >
      <ol className={ProductListStyles.content} data-testid={'use-productList'}>
        {products.map((item, index) => (
          <ProductCluster
            data-testid={'use-productClusters'}
            index={index}
            key={`${index}-${item.id}`}
            title={item.title}
            id={item.id}
            image={item.picture}
            price={item.price.amount}
            location={item.location}
            free_shipping={item.free_shipping}
          />
        ))}
      </ol>
    </section>
  )
}

ProductList.prototype = {
  products: PropTypes.object,
}

export default ProductList

