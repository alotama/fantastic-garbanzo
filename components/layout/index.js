import React from 'react'
import Footer from '@components/Footer'
import SearchBar from '@components/SearchBar'
import Head from 'next/head'
import PropTypes from 'prop-types';

const getPageTitle = (title) => ((title && `${title} | `) + 'Sebastián Tamashiro - Challenge Frontend 2021')

const Layout = ({ children, title, description, picture, pageURL, search }) => {
  return (
    <>
      <Head>
        <title>{getPageTitle(title || '')}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <meta name={"description"} content={description || ''}/>
        <meta name={"og:title"} content={getPageTitle(title || '')}/>
        {picture && <meta name={"og:image"} content={picture}/>}
        <meta name={"og:description"} content={description || ''} />
        <meta name={"og:url"} content={`${process.env.SITE_URL}/${pageURL || ''}`}/>
        <link rel="canonical" href={`${process.env.SITE_URL}/${pageURL || ''}`} />
      </Head>
      <SearchBar search={search}/>
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

Layout.prototype = {
  children: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
  picture: PropTypes.string,
  pageUR: PropTypes.string,
}

export default Layout
