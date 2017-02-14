import React from 'react'
import Helmet from 'react-helmet'

import '../css/error'

export default () => (
  <div className="error-container">
    <div className="error">
      <Helmet title="403 Forbidden" />
      <div className="icon">
        <i className="fa fa-ban" />
      </div>
      <div className="code">403</div>
      <div className="text">Forbidden</div>
    </div>
  </div>
)
