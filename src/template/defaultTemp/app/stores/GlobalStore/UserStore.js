/*
 * 用户及权限数据
 */
import _ from 'lodash'
import { observable } from 'mobx'

class UserStore {
  @observable user         // 用户基础信息

  constructor (root) {
    this.root = root
  }
}

export default UserStore
