import React from 'react'
import {message} from 'antd'
import { toLoginPage} from 'utils/common'
import _ from 'lodash'

export function handleError(err, type, url, data) {
  console.error({ err, type, url, data })
  switch (err.code) {
    case 4001:
      toLoginPage(null, window.encodeURIComponent(window.location.pathname + window.location.search))
      break
    default:
      break
  }
  let msg = err.message
  if (_.isArray(err) && err.length > 0) {
    msg = getArrayErrorMsg(err)
  }
  if (!msg && _.isObject(err) && _.some(err, item => { return _.isArray(item) && item.length > 0})) {
    msg = _.reduce(err, (result, item) => {
      return result + getArrayErrorMsg(item)
    }, '')
  }
  msg && message.error(msg)
}

function getArrayErrorMsg(err) {
  return _.reduce(err, (result, item) => {
    return `${result}
        ${item.id}: ${item.message}`
  }, '')
}