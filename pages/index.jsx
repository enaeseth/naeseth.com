import React from 'react'
import {Link} from 'react-router'
import {prefixLink} from 'gatsby-helpers'
import Helmet from 'react-helmet'
import moment from 'moment'

import {config} from 'config'
import '../css/index'

export default ({route}) => {
  return (
    <main id="index">
      <header>
        <h1>Eric Naeseth</h1>
        <ul className="social">
          <Social network="email" icon="envelope" href="mailto:eric@naeseth.com" />
          <Social network="facebook" icon="facebook-square" href="https://www.facebook.com/naeseth" />
          <Social network="github" href="https://github.com/enaeseth" />
          <Social network="instagram" href="https://instagram.com/enaeseth/" />
          <Social network="spotify" href="http://open.spotify.com/user/enaeseth" />
          <Social network="pinboard" icon="bookmark" href="https://pinboard.in/u:enaeseth" />
          <Social network="twitter" href="https://twitter.com/enaeseth" />
        </ul>
        <div className="work">
          <a href="/resume/">
            <i className="fa fa-briefcase" />
            résumé
          </a>
        </div>
      </header>
      <div className="content">
        <Posts pages={route.pages} />
      </div>
    </main>
  )
}

const Social = ({network, href, icon = network}) => (
  <li>
    <a className={network} href={href}>
      <i className={`fa fa-${icon}`} />
      <span className="sr-only">{network}</span>
    </a>
  </li>
)

const Posts = ({pages}) => {
  const posts = pages
    .filter(({data}) => data.layout === 'post')
    .sort(({data: {date: a}}, {data: {date: b}}) => Date.parse(b) - Date.parse(a))

  return (
    <ul className="posts">
      {posts.map((page) => <Post key={page.path} page={page} />)}
    </ul>
  )
}

const Post = ({page}) => (
  <li>
    <time dateTime={page.data.date}>
      {moment(page.data.date).format('MMM D, YYYY')}
    </time>
    <Link to={prefixLink(page.path)} className="post-link">{page.data.title}</Link>
  </li>
)
