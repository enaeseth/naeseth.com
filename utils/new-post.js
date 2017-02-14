'use strict'

const fs = require('fs')
const moment = require('moment')
const prompt = require('prompt')
const {slugify} = require('underscore.string')
const yaml = require('js-yaml')

prompt.start()

prompt.get(
  [
    {
      name: 'title',
      description: 'Post title',
      required: true,
    },
    {
      name: 'slug',
      description: 'URL slug',
      default: () => slugify(prompt.history('title').value),
    },
    {
      name: 'date',
      description: 'Post date',
      pattern: /^\d{4}(?:-\d{2}){2}$/,
      default: () => moment().format('YYYY-MM-DD'),
      required: false,
    }
  ],
  (err, {title, slug, date}) => {
    if (err != null) {
      console.error(err)
      process.exit(1)
      return
    }

    const m = moment(date)
    const dir = `./pages/posts/${m.format('YYYY-MM-DD')}-${slug}`

    const frontMatter = {
      layout: 'post',
      path: `/${slug}/`,
      title: title,
      date: m.toJSON(),
    }

    fs.mkdirSync(dir)
    fs.writeFileSync(`${dir}/index.md`, `---\n${yaml.safeDump(frontMatter)}---\n\n`, {
      encoding: 'utf-8'
    })

    console.info(dir)
  }
)
