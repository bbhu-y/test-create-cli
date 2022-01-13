/*
 * 全局数据
 * 仅作为引用入口，不要在这里新建数据
 */
import UserStore from './UserStore'
import ConfigStore from './ConfigStore'
import StateStore from './StateStore'

class GlobalStore {
  constructor (root) {
    this.root = root
    this.userStore = new UserStore(root)
    this.configStore = new ConfigStore(root)
    this.stateStore = new StateStore(root)
  }
}

export default GlobalStore