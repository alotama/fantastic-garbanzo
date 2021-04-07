import Link from 'next/link'
import React from 'react'
import footerStyle from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={footerStyle.wrapper}>
      <div className={'layout__container'}>
        <section className={`layout__content ${footerStyle.content}`}>
          <article>
            <a href={'www.github.com/alotama'}>Documentación</a>
          </article>
          <article>
            <a href={'www.github.com/alotama'}>
              Repositiorio
          </a>
          </article>
        </section>
      </div>
    </footer>
  )
}

export default Footer
