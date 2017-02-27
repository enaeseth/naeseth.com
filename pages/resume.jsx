import React from 'react'
import {Link} from 'react-router'
import {prefixLink} from 'gatsby-helpers'
import Helmet from 'react-helmet'
import moment from 'moment'

import {config} from 'config'
import '../css/resume'

export default () => (
  <div id="resume">
    <Helmet title="Eric Naeseth&rsquo;s Resume" />
    <header>
      <h1>
        <a href="/">Eric Naeseth</a>
      </h1>
      <ul className="contact">
        <Contact type="email" icon="envelope" href="mailto:eric@naeseth.com">
          eric@naeseth.com
        </Contact>
        <Contact type="github" href="https://github.com/enaeseth">
          enaeseth
        </Contact>
      </ul>
    </header>
    <section className="nutshell">
      <ul>
        <li>
          Full-stack software engineer: provisioning AWS resources,
          implementing backend services, building maintainable interfaces
          using React.
        </li>
        <li>
          Seeking to help develop a meaningful product in an engaging,
          compassionate workplace.
        </li>
        <li>
          JavaScript, Python, React, node.js, GraphQL, AWS, Terraform, Docker, Datadog, Linux
        </li>
      </ul>
    </section>
    <main className="experience">
      <Position at="Trex Labs" href="http://trex.io/" title="Co-founder" start="2015-03-01" end="2016-03-08">
        <li>
          Designed and developed Codelands, a programming environment for people without programming experience, rooted in UNIX philosophy and design.
        </li>
        <li>
          Worked with my co-founder to architect and prototype several iterations of our concept.
        </li>
      </Position>
      <Position at="The Groundwork" href="https://thegroundwork.com/" title="Software Engineer" start="2014-12-01" end="2015-02-26" location="Brooklyn, NY">
        <li>
          Designed and built Pizza Planet, a transactional mailer internal service.
        </li>
        <li>
          Solved early concurrency problems in other services by developing a
          library to bind Boto3 to Tornado's HTTP client.
        </li>
        <li>
          Spearheaded an effort to develop a common platform for RESTful service design and implementation.
        </li>
      </Position>
      <Position at="Thumbtack" href="https://www.thumbtack.com/" title="Software Engineer" start="2010-09-07" end="2014-06-20">
        <li>
          Built the infrastructure for a Python 3 backend for an iOS app:
          provisioned servers, deployed an internal PyPI, designed and set
          up a rolling deployment system with safe rollbacks.
        </li>
        <li>
          Built a system used to determine new customer needs using specific
          questions tailored to hundreds of categories: customer frontend,
          backend, and admin interface.
        </li>
        <li>
          Championed an effort to develop a product process that gives
          product team members maximum agency, and coordinated and wrote the
          engineering team's proposal.
        </li>
        <li>
          Built Prospect, an event tracking and funnel analytics service.
        </li>
        <li>
          Designed and built an authentication/authorization system to let users sign on implicitly from notifiations yet still requiring a password later for sensitive operations.
        </li>
      </Position>
      <Position at="Carleton College" href="https://www.carleton.edu/" title="BA, Computer Science" start="2006-09" end="2010-06">
        <li>
          Group senior thesis: an intelligent music stand that uses a microphone to follow along with a piano player and automatically advance the sheet music.
        </li>
        <li>
           Extensive non-CS work in theater (acting and directing) and
           English analysis and composition.
        </li>
      </Position>
    </main>
    <footer>
      This website is
      {' '}
      <a href="https://github.com/enaeseth/naeseth.com">
        <i className="fa fa-code-fork" />
        {' '}
        open-source
      </a>.
    </footer>
  </div>
)

const Contact = ({type, href, children, icon = type}) => (
  <li>
    <a className={type} href={href}>
      <i className={`fa fa-fw fa-${icon}`} />
      <span className="sr-only">{`${type}: `}</span>
      <span className="label">{children}</span>
    </a>
  </li>
)

const Position = ({
  at,
  title,
  start,
  end,
  children,
  href = undefined,
  location = "San Francisco, CA",
  dateFormat = 'MMM YYYY'
}) => (
  <section className="position">
    <header>
      <h1>{href ? <a href={href}>{at}</a> : at}</h1>
      <h2>{title}</h2>
      <div className="dates">
        <time dateTime={start}>{moment(start).format(dateFormat)}</time>
        {' – '}
        <time dateTime={end}>{moment(end).format(dateFormat)}</time>
      </div>
    </header>
    <ul className="about">
      {children}
    </ul>
  </section>
)
