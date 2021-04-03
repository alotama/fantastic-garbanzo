import React from 'react'
import Footer from '../footer'
import SearchBar from '../searchBar'
import Head from 'next/head'

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <html lang="es" />
        <title>{title && `${title} | `}Sebastián Tamashiro - Challenge</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
