import React, { useState, useReducer } from 'react'
import searchBarStyle from './searchBar.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState('')
  const router = useRouter()

  const searchBarValidation = (e, text) => {
    e.preventDefault()
    if (text.length > 1) {
      router.push(`/items?search=${text}`)
    }
  }

  return (
    <section className={searchBarStyle.wrapper}>
      <div className={'layout__container'}>
        <article className={'layout__content'}>
          <Link href={'/'}>
            <a className={searchBarStyle.logoContainer}>
              <figure className={searchBarStyle.logoContent}>
                <img
                  className={searchBarStyle.logo}
                  src={'/Logo_ML.png'}
                  srcSet={'/Logo_ML@2x.png'}
                  alt={'MercadoLibre'}
                />
              </figure>
            </a>
          </Link>
          <form className={searchBarStyle.searchContainer}>
            <input
              className={searchBarStyle.searchInput}
              type={'text'}
              placeholder={'Nunca dejes de buscar'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className={searchBarStyle.searchButtonContainer}
              onClick={(e) => searchBarValidation(e, inputValue)}
            >
              <img
                className={searchBarStyle.searchIconButton}
                src={'/ic_Search.png'}
                srcSet={'/ic_Search@2x.png'}
                alt={'Buscar'}
              />
            </button>
          </form>
        </article>
      </div>
    </section>
  )
}

export default SearchBar;