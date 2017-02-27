import React from 'react'
import 'css/markdown-styles.css'
import Helmet from 'react-helmet'
import moment from 'moment'

import {config} from 'config'

module.exports = React.createClass({
  propTypes () {
    return {
      router: React.PropTypes.object,
    }
  },

  render () {
    const post = this.props.route.page.data
    const id = post.path.slice(1, -1)
    const url = `${config.root}${post.path}`

    const meta = [
      {property: 'og:type', content: 'article'},
      {property: 'og:title', content: post.title},
      {property: 'og:url', content: url},
      {property: 'article:author', content: config.authorFacebook},
    ]

    if (post.image) {
      meta.push({property: 'og:image', content: `${url}${post.image}`})
    }
    if (post.blurb) {
      meta.push({property: 'og:description', content: post.blurb})
    }

    return (
      <div id={id} className="post">
        <Helmet title={`${post.title} | ${config.siteTitle}`} meta={meta} />
        {post.masthead && <div className="masthead"></div>}
        <article>
          <header>
            <h1>{post.title}</h1>
          </header>
          <div className="post-body markdown" dangerouslySetInnerHTML={{ __html: post.body }} />
          <Footer post={post} />
        </article>
      </div>
    )
  },
})

const Footer = ({post}) => {
  const twitter = config.authorTwitter.slice(1)
  const date = moment(post.date)

  return (
    <footer>
      <p>
        <a href={`https://twitter.com/${twitter}`} className="social twitter">
          <i className="fa fa-twitter" />
          <span className="cta">Want to say hi?</span>
        </a>
      </p>
      <p className="legal">
        &ldquo;{post.title}&rdquo; by {config.authorName} is licensed under{' '}
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
          a Creative Commons license
        </a>.
        <span className="pubdate">
          Posted <time dateTime={post.date}>{date.format('MMMM Do, YYYY')}</time>.
        </span>
      </p>
    </footer>
  )
}
