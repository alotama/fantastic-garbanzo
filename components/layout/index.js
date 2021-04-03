import React from 'react'
import Footer from '../footer'
import SearchBar from '../searchBar'

const Layout = ({ children }) => {
  return (
    <>
      <SearchBar />
      <main className={'layout__main'}>
        <div className={'layout__container'}>
          <div className={'layout__content'}>
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Layout
