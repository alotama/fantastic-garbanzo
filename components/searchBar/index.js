import React, { useState } from 'react';
import searchBarStyle from './searchBar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const SearchBar = ({search}) => {
  const [inputValue, setInputValue] = useState(search || '')
  
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
        <article className={`layout__content ${searchBarStyle.container}`}>
          <Link href={'/'}>
            <a className={searchBarStyle.logoContainer}>
              <figure className={searchBarStyle.logoContent}>
                <img
                  className={searchBarStyle.logo}
                  src={'/Logo_ML.png'}
                  srcSet={'/Logo_ML@2x.png'}
                  alt={'MercadoLibre'}
                  width={48}
                  height={32}
                />
              </figure>
            </a>
          </Link>
          <form className={searchBarStyle.searchContainer}>
            <input
              data-testid={'use-input-searchbar'}
              data-cy={'integration-search-input'}
              className={searchBarStyle.searchInput}
              type={'text'}
              placeholder={'Nunca dejes de buscar'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              data-testid={'use-button-searchbar'}
              data-cy={'integration-search-button'}
              type="submit"
              className={searchBarStyle.searchButtonContainer}
              onClick={(e) => searchBarValidation(e, inputValue)}
            >
              <img
                className={searchBarStyle.searchIconButton}
                src={'/ic_Search.png'}
                srcSet={'/ic_Search@2x.png'}
                alt={'Buscar'}
                height={18}
                width={18}
              />
            </button>
          </form>
        </article>
      </div>
    </section>
  )
}

SearchBar.prototype = {
  search: PropTypes.string,
}

export default SearchBar;