/* 网站头部 */
import React from 'react'
import Component from 'edt-components/Component'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { NavLink, Link, withRouter } from 'react-router-dom'
import { Popover } from 'antd'
import './style.less'

@withRouter
@observer
class Header extends Component {
  data = {
    visible: false
  }
  handleVisibleChange = visible => {
    this.data.visible = visible
  }
  handleChangeLink = () => {
    this.data.visible = false
  }
  renderMenuList = (menuTypes) => {
    return (
      <div className='menu-list'>
        {
          _.map(menuTypes, (list, type) => {
            return (
              <div key={type} className='sub-list'>
                <div className='title'>{type}</div>
                {
                  _.map(list, item => {
                    return (
                      <NavLink
                        key={item.key}
                        to={{
                          pathname: item.url,
                          search: `dept=${this.props.deptId}`
                        }}
                        onClick={this.handleChangeLink}
                      >
                        {item.title}
                      </NavLink>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
  renderMenuTitle = () => {
    let pathname = _.get(this.props, 'location.pathname')
    let menu = _.find(this.props.menuList, item => {
      return pathname.indexOf(item.url) !== -1
    })
    let menuTypes = _.groupBy(this.props.menuList, 'type')
    return menu ? (
      <Popover
        trigger='click'
        content={this.renderMenuList(menuTypes)}
        overlayClassName='header-menu-popover'
        placement='bottomLeft'
        visible={this.data.visible}
        onVisibleChange={this.handleVisibleChange}
        overlayStyle={{ width: _.map(menuTypes).length * 150 + 32 + 'px'}}
      >
        <div className='menu-title'>{menu.title}</div>
      </Popover>
    ) : null
  }
  render () {
    return (
      <div className='Header f-clearfix'>
        <div className='f-left'>
          <Link to='/home/' className='home-link'>
            <div className='title'>首页</div>
          </Link>
          {this.renderMenuTitle()}
        </div>
        <div className='f-right'>
          {this.props.children}
        </div>
      </div>
    )
  }
}


Header.propTypes = {
  /**
   * 菜单列表
   */
  menuList: PropTypes.array,
  /**
   * 右边内部内容
   */
  children: PropTypes.node
}

Header.defaultProps = {
  showSwitcher: true,
  justShowTitle: false,
  disabledHome: false
}

export default Header
