import React from 'react'
import ErrorStyles from './errors.module.scss'
import PropTypes from 'prop-types';

const ErrorMessege = ({ title, content }) => {
  return (
    <section className={ErrorStyles.container}>
      <div className={ErrorStyles.wrapper}>
        <h1 className={ErrorStyles.title}>{title}</h1>
        <p className={ErrorStyles.content}>{content}</p>
      </div>
    </section>
  )
}

ErrorMessege.prototype = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default ErrorMessege
