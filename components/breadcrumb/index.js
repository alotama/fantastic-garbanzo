import React from 'react'
import BreadcrumbStyle from './breadcrumb.module.scss'
import PropTypes from 'prop-types';

const Breadcrumb = ({ steps }) => {
  return (
    <section>
      <ol className={BreadcrumbStyle.steps}>
        {steps.map((step, index) => (
          <li className={BreadcrumbStyle.item} key={index}>
            {step}
          </li>
        ))}
      </ol>
    </section>
  )
}

Breadcrumb.propTypes = {
  steps: PropTypes.array.isRequired,
};

export default Breadcrumb