/*
 * 组件内state数据
 */

import { observable, action } from 'mobx'

class StateStore {
  @observable store
  i
  constructor(root) {
    this.root = root
    this.store = new Map()
    this.i = 0
  }

  @action
  set = (key, value) => {
    this.store.set(key, value)
  }

  @action
  newState = (name = 'key', value) => {
    let key = 'sym_' + name + '_' + this.i++     // 需用Symbol代替
    this.set(key, value)
    return key
  }

  get = (key) => {
    return this.store.get(key)
  }

  @action
  delete = (key) => {
    this.store.delete(key)
  }
}

export default StateStore;
