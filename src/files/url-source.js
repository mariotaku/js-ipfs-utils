'use strict'

const { default: ky } = require('ky-universal')
const toIterable = require('stream-to-it/source')

/*
Options are used for `ky.get`.
*/
module.exports = async function * urlSource (url, options) {
  options = options || {}

  const { body } = await ky.get(url, options)

  yield {
    path: decodeURIComponent(new URL(url).pathname.split('/').pop() || ''),
    content: toIterable(body)
  }
}
