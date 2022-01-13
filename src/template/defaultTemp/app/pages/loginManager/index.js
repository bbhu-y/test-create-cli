import React from 'react'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'
import Component from 'edt-components/Component'
import Header from 'components/Header'
import { getQueryString } from 'edt-common'
import { Icon } from 'antd'
import './style.less'

@observer
class Login extends Component {
  login = () => {
    let platform = _.get(this.props, 'match.params.platform', 'ne')
    let next = getQueryString('next')
    window.location.href = `/users/login/${platform}/${next ? '?next=' + window.encodeURIComponent(next) : ''}`
  }
  renderLoginInfo = () => {
    let platform = _.get(this.props, 'match.params.platform', 'ne')
    switch (platform) {
      case 'ne':
        return '使用OpenID登录'
      default:
        return '使用OpenID登录'
    }
  }
  render () {
    return (
      <div className='Login'>
        <Header/>
        <div className='login-container'>
          <div className='container-title big-logo'>
            <i className='icn-logo' />
          </div>
          <div className='container-subtitle'>网易A+</div>
          <div className='login-btn' onClick={this.login}>{this.renderLoginInfo()}<Icon type='login' /></div>
        </div>
      </div>
    )
  }
}

export default Login