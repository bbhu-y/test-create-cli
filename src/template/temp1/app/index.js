/**
 * 项目入口
 */
import React, {Suspense} from 'react'
import ReactDom from 'react-dom'
// 表单验证，用于拓展formsy的验证规则
import 'utils/formsyValidate'
// 表单重置样式
import 'edt-formsy/style.less'
// 字体图标设置
import 'icons/_icons.less'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
// 全局样式
import './style.less'

import { Provider } from 'mobx-react'
import stores from 'stores'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LoginManager from 'loginManager'
import Application from 'application'
import FullLoading from 'edt-components/FullLoading'
import ErrorBoundary from 'components/ErrorBoundary'

ReactDom.render(
  <ErrorBoundary>
    <ConfigProvider locale={zhCN}>
      <Provider {...stores.globalStore} {...stores.moduleStore}>
        <BrowserRouter>
          <Suspense fallback={<FullLoading/>}>
            <Switch>
              <Route path='/login_manager/:platform?' render={(props) => {
                return <LoginManager {...props} />
              }}/>
              <Application />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </ErrorBoundary>,
  document.getElementById('content')
)