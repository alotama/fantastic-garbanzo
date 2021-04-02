import React from 'react'
import ProductCluster from './productCluster'
import ProductListStyles from './productList.module.scss'

const ProductList = ({ products }) => {
  return (
    <section className={'layout__container'}>
      <div className={'layout__content'}>
        <ol className={ProductListStyles.productClusterContainer}>
          {products.map((item, index) => (
            <ProductCluster
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
      </div>
    </section>
  )
}

export default ProductList

