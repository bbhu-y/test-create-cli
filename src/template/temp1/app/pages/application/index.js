import React from 'react'
import { observer, inject } from 'mobx-react'
import _ from 'lodash'
import Component from 'edt-components/Component'
import './style.less'

@observer
class Application extends Component {
  render() {
    return (
      <div>项目初始化成功！</div>
    )
  }
}

export default Application