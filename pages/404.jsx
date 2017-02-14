import React from 'react'
import Helmet from 'react-helmet'

import '../css/error'

export default () => (
  <div className="error-container">
    <div className="error">
      <Helmet title="404 Not Found" />
      <div className="icon">
        <i className="fa fa-question-circle" />
      </div>
      <div className="code">404</div>
      <div className="text">Not found</div>
    </div>
  </div>
)
