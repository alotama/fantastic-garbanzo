import Link from 'next/link'
import React from 'react'
import BreadcrumbStyle from './breadcrumb.module.scss'

const Breadcrumb = ({ steps }) => {
  return (
    <section>
    <ol className={BreadcrumbStyle.steps}>
      {steps.map((step, index) => (
        <li className={BreadcrumbStyle.item} key={index}>
          <Link href={'/items'}>
            <a>
              {`${step}`}
            </a>
          </Link>
        </li>
      ))}
    </ol>
    </section>
  )
}

export default Breadcrumb
