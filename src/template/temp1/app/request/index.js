import React from 'react'
import superagent from 'superagent'
import _ from 'lodash'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { serilizeParams, getQueryString } from 'edt-common'
import { handleError } from './errorHandler'
import { storage } from 'utils/storage'

// 调用ajax并对数据预处理
function request (type, url, data, { camelizeResponse, decamelizeRequest, formatResponse} = {
  camelizeResponse: true,
  decamelizeRequest: true
}) {
  camelizeResponse = _.isUndefined(camelizeResponse) ? true : camelizeResponse
  decamelizeRequest = _.isUndefined(decamelizeRequest) ? true : decamelizeRequest
  data = formatData(data, decamelizeRequest)
  type = type.toLowerCase()
  return superagent[type](url)
    .query(type === 'get' ? data : null)
    .send(type === 'get' ? null : data)
    .set('X-Dept-ID', getQueryString('dept'))
    .use((req) => {
      let callback = req.callback
      req.callback = function (err, response) {
        try {
          let res = camelizeResponse ? camelizeKeys(JSON.parse(response.text)) : JSON.parse(response.text)
          err = res.error
          if (hadError(err)) {
            handleError(err, type, url, data)
            callback.call(req, res, null)
          } else {
            if (formatResponse) {
              if (!res.paging) {
                res = res.data
              } else {
                res = {
                  list: res.data,
                  paging: res.paging,
                  rid: res.rid
                }
              }
            }
            callback.call(req, null, res)
          }
        } catch (error) {
          if (err) {
            callback.call(req, err, null)
          } else if (response) {
            callback.call(req, null, {
              data: response.text,
              type: response.type
            })
          }
          callback.call(req, error, null)
        }
      }
    })
}

function formatData (data, decamelizeRequest) {
  if (data instanceof FormData) {
    return data
  }
  return decamelizeRequest ? decamelizeKeys(data) : data
}

function hadError (err) {
  // 普通模式
  if (_.isObject(err) && err.message) {
    return true
  }

  // 批量模式
  if (_.isArray(err) && err.length > 0) {
    return true
  }

  // 多种类批量模式
  if (_.isObject(err) && _.some(err, hadError)) {
    return true
  }

  return false
}


function fetchCacheWrapper (fetch) {
  // 清除缓存介质（sessionStorage，localStorage）中遗留未清理的的过期内容
  storage.clearTimeoutStorage()
  return function (type, url, data, config) {
    config = _.assign({
      formatResponse: true,
      useCache: false,
      forceUpdate: false,
      cacheKey: url + serilizeParams(data),
      cacheMode: 'memory'
    }, config)
    let cacheData
    if (config.useCache) {
      cacheData = config.forceUpdate ? null : storage.getItem(config.cacheKey, config.cacheMode)
    }
    if (cacheData) {
      return Promise.resolve(cacheData)
    } else {
      let req = fetch.call(this, type, url, data, config)
      req.then((res) => {
        if (config.useCache) {
          storage.setItem(config.cacheKey, res, config.cacheMode, config.cacheTimeout)
        }
        return res
      })
      return req
    }
  }
}

/**
 * @param  {string}  type get/post
 * @param  {string}  url
 * @param  {object}  data
 * @param  {object}  config 缓存以及其他配置
 * @param  {boolean} config.useCache 是否启用缓存，默认不缓存
 * @param  {boolean} config.forceUpdate 启用缓存时，是否更新缓存
 * @param  {string}  config.cacheKey 缓存key，默认为包含参数的请求url
 * @param  {number}  config.cacheTimeout 缓存失效时间，不传则根据默认策略设定
 * @param  {string}  config.cacheMode    缓存介质，默认 'memory' 可选 'memory' 'local' 'session'
 * @param  {boolean} config.camelizeResponse 是否驼峰处理响应数据key，默认处理
 * @param  {boolean} config.decamelizeRequest 是否下划线处理请求参数key，默认处理
 * @param  {boolean} config.formatResponse 是否统一处理接口返回数据,默认统一处理数据
 * @return {Promise}
 */
export default fetchCacheWrapper(request)
