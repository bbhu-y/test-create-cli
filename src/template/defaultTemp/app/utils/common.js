import _ from 'lodash'
import superagent from 'superagent'
import { getQueryString } from 'edt-common'
import { decamelizeKeys } from 'humps'

export { getDate} from './date'

// 跳转到登录页
export function toLoginPage(platform, redirectPage = window.location.pathname) {
  let loginUrl = '/login_manager'
  window.location.href = loginUrl + '/?next=' + redirectPage
}

// 退出登录
export function toLogoutPage(platform, redirectPage = window.location.pathname) {
  let loginUrl = '/users/logout/' + platform
  window.location.href = loginUrl + '/?next=' + redirectPage
}
export function serilizeParams(params) {
  const searchParams = new window.URLSearchParams()
  _.forEach(params, (value, key) => {
    if (_.isArray(value)) {
      _.forEach(value, item => {
        searchParams.append(key, item)
      })
    } else {
      searchParams.append(key, value)
    }
  })
  return searchParams.toString()
}

//下载文件blob数据流
export function downloadFileData (url, data) {
  data = decamelizeKeys(data)
  return superagent.get(url)
    .query(data)
    .responseType('blob')
    .set('X-Dept-ID', getQueryString('dept'))
    .use((req) => {
      let callback = req.callback
      req.callback = function (err, response) {
        try {
          if (response.status === 200) {
            const content = response.header['content-disposition']
            let fileName = ''
            if (content) {
              let name1 = _.get(content.match(/filename=(.*)/), '[1]') // 获取filename的值
              let name2 = _.get(content.match(/filename\*=(.*)/), '[1]') // 获取filename*的值
              name1 = name1 && window.decodeURIComponent(name1);
              name2 = name2 && window.decodeURIComponent(name2.substring(7)); // 这个下标7就是UTF-8''
              fileName = name2 || name1
            }
            callback.call(req, null, {fileData: response.body, fileName})
          } else {
            callback.call(req, err, null)
          }
        } catch (error) {
          if (err) {
            callback.call(req, err, null)
          }
          callback.call(req, error, null)
        }
      }
    })
}


