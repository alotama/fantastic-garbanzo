import Layout from '../components/layout'
import ProductError from '../components/errors'

function Error({ query, productID }) {
  return (
    <Layout>
      {query.search && (
        <ProductError
          title={'No se encontraron resultados para lo que estas buscando'}
          content={'Escribí en el buscador nuevamente otra cosa que estés buscando.'}
        />
      )}
      {productID && (
        <ProductError
          title={'Lo sentimos, no llegamos a poder mostrarte este producto'}
          content={'Volvé a escribir en el buscado para buscar un producto similar a este.'}
        />
      )}
    </Layout>
  )
}

Error.getInitialProps = ({ query, asPath, req, res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  const pathID = asPath.match(/.*\/(.*)$/);
  const productID = pathID[1].startsWith('MLA')

  return { statusCode, query, productID }
}

export default Error