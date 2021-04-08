import Link from 'next/link'
import React from 'react'
import BreadcrumbStyle from './breadcrumb.module.scss'
import PropTypes from 'prop-types';

const Breadcrumb = ({ steps, search }) => {
  return (
    <section>
    <ol className={BreadcrumbStyle.steps}>
      {steps.map((step, index) => (
        <li className={BreadcrumbStyle.item} key={index}>
          <Link href={`/items?search=${search}`}>
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

Breadcrumb.propTypes = {
  steps: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired
};

export default Breadcrumb
