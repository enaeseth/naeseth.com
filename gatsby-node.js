import {copy} from 'fs-promise'
import assign from 'object-assign'
import {join} from 'path'

const publicPath = 'public'
const rootAssets = [
  'keybase.txt',
]

function copyRootAssets(callback) {
  return Promise.all(
    rootAssets.map((filename) => copy(filename, join(publicPath, filename)))
  )
}

export function postBuild(pages, callback) {
  copyRootAssets()
    .then(() => callback())
    .catch(callback)
}
