import React from 'react'
import footerStyle from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={`layout__container ${footerStyle.wrapper}`}>
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
    </footer>
  )
}

export default Footer
