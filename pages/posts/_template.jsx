import React from 'react'

import '../../css/post'
import '../../css/markdown-styles'

export default ({children}) => {
  return (
    <div className="layout">
      {children}
    </div>
  )
}

