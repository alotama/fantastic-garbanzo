import React from 'react'
import Footer from '../footer'
import SearchBar from '../searchBar'

const Layout = ({children}) => {
  return (
    <>
      <SearchBar />
      <main className={'layout__main'}>
        {children}
      </main>
      <Footer/>
    </>
  )
}

export default Layout
