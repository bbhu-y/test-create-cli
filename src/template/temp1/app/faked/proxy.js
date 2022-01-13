import faked from 'faked/src'
import request from 'request'
import _ from 'lodash'
import urls from './urls'

const prefix = '/mock/39'

_.forEach(urls, item => {
  faked.when(item.method || 'get', item.url, async ({ request: req }) => {
    let data = await request(req.method, prefix + req.url, req.body)
    let paging = data && data.paging
    if (item.addPaging && !paging) {
      paging = {
        total: data.length,
        total_page: 1
      }
    }
    return { data, paging }
  });
})