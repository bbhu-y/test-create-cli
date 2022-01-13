import React from 'react'
import { observer, inject } from 'mobx-react'
import Component from 'edt-components/Component'
import { sessionStorage } from 'utils/storage'
import FullLoading from 'edt-components/FullLoading'
import _ from 'lodash'
@observer
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.data = {
      hasError: false,
      errorType: null
    }
    this.clearLoadingChunk()
  }
  componentDidCatch(error, errorInfo) {
    this.handleError(error, errorInfo)
  }
  clearLoadingChunk = () => {
    window.clearTimeout(this.clearTimer)
    this.clearTimer = window.setTimeout(() => {
      sessionStorage.removeItem('loadingChunk')
    }, 60000)
  }
  handleError = (error, errorInfo) => {
    this.setData({hasError: true})
    this.handleLoadingChunkError(error)
  }
  handleLoadingChunkError = (error, errorInfo) => {
    //页面浏览期间重新发布，会出现浏览器缓存文件名和服务器文件名不一致，导致下载js失败白屏的问题
    const loadFaild = new RegExp(/Loading chunk (\d)+ failed/g)
    if (error && error.message && error.message.match(loadFaild)) {
      this.setData({errorType: ERROR_ENUM.RE_LOADING})
      let loadingChunk = sessionStorage.getItem('loadingChunk')
      loadingChunk = _.isNumber(loadingChunk) ? loadingChunk + 1 : 1
      if (loadingChunk > 2) {
        this.setData({errorType: ERROR_ENUM.LOAD_FAIL})
        //当前流程结束，重置loadingChunk
        sessionStorage.setItem('loadingChunk', 0)
      } else {
        sessionStorage.setItem('loadingChunk', loadingChunk)
        window.location.reload()
      }
    }
  }
  renderErrorContent = () => {
    const {errorType} = this.data
    if (errorType === ERROR_ENUM.LOAD_FAIL) {
      return (
        <h3>页面加载失败, 请刷新页面重新加载...</h3>
      )
    }
    if (errorType === ERROR_ENUM.RE_LOADING) {
      return (
        <FullLoading/>
      )
    }
  }
  render() {
    return this.data.hasError ? this.renderErrorContent() : this.props.children
  }
}

//页面错误类型枚举
const ERROR_ENUM = {
  LOAD_FAIL: 'LOAD_FAIL',
  RE_LOADING: 'RE_LOADING'
}

export default ErrorBoundary