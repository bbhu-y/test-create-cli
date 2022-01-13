/*
 * 数据管理中心
 * 仅作为引用入口，不要在这里新建数据
 */
import GlobalStore from './GlobalStore'
import ModuleStore from './ModuleStore'

class Stores {
  constructor () {
    this.globalStore = new GlobalStore(this)
    this.moduleStore = new ModuleStore(this)
  }
}

const stores = new Stores()

export default stores