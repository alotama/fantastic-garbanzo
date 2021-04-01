import React from 'react';

const SearchResult = ({ categories, items }) => {
  return (
    <>
      <h1>Resultado de búsqueda 2</h1>
      <h2>Categorias: {categories.map(element => element)}</h2>
      {items.map((element, key) => (
        <code key={key}>
          {element.title}
          {element.location}
          {element.price.amount}
        </code>
      ))}
    </>
  )
}

export async function getServerSideProps(params, req, res) {
  const response = await fetch(`http://localhost:3000/api/items?q=${params.query.search}`)
  const { categories, items } = await response.json()

  return {
    props: {
      categories: categories,
      items: items
    }
  }
}

export default SearchResult;