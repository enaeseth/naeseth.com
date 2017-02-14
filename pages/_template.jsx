import React from 'react'
import Helmet from 'react-helmet'
import {Link} from 'react-router'
import {prefixLink} from 'gatsby-helpers'

import {config} from 'config'
import '../css/base'

export default ({location: {pathname: path}, route, children}) => {
  return (
    <div className="layout">
      <Helmet
        title={config.siteTitle} 
        htmlAttributes={{
          prefix: "og: http://ogp.me/ns# article: http://ogp.me/ns/article#"
        }}
        link={[
          {rel: "canonical", href: `${config.root}${path}`},
        ]}
        meta={[
          {property: 'og:site_name', content: config.siteTitle},
          {name: 'author', content: config.authorName},
          {name: 'twitter:creator', content: config.authorTwitter}
        ]}/>
      {children}
    </div>
  )
}

