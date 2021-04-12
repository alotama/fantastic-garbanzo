import React from 'react'
import footerStyle from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={`layout__container ${footerStyle.wrapper}`}>
        <section className={`layout__content ${footerStyle.content}`}>
          <article>
            <a href={'https://alotama.github.io/fantastic-garbanzo/#/'}>Documentación</a>
          </article>
          <article>
            <a href={'https://github.com/alotama/fantastic-garbanzo'}>
              Repositiorio
          </a>
          </article>
        </section>
    </footer>
  )
}

export default Footer
