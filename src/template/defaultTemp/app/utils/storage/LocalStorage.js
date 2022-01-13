const localData = window.localStorage
const expiresSuffix = '__expires__'

class LocalStorage {
  constructor(props) {
    this.initRun()
  }
  initRun = () => {
    const reg = new RegExp(expiresSuffix)
    let keys = this.getKeys()
    if (keys.length > 0) {
      keys.forEach((key, v) => {
        if (!reg.test(key)) {
          let now = Date.now()
          let expires = localData[`${key}${expiresSuffix}`] || Date.now()
          if (now >= expires) {
            this.removeItem(key)
          }
        }
      })
    }
  }
  getItem = (key) => {
    return JSON.parse(localData.getItem(key))
  }
  /*
  * set 存储方法
  * @ param {String}     key 键
  * @ param {String}     value 值
  * @ param {String}     expired 过期时间，以小时为单位，默认存储7天
  */
  setItem = (key, value, expired = 24 * 7) => {
    localData.setItem(key, JSON.stringify(value))
    localData.setItem(`${key}${expiresSuffix}`, Date.now() + 1000 * 60 * 60 * expired)
  }
  removeItem = (key) => {
    localData.removeItem(key)
    localData.removeItem(key + expiresSuffix)
  }
  getKeys = () => {
    const keys = []
    const reg = new RegExp(expiresSuffix)
    for (let i = 0; i < localData.length; i++) {
      if (!reg.test(keys[i])) {
        keys.push(localData.key(i))
      }
    }
    return keys
  }
  clear = () => {
    return localData.clear()
  }
}

export const localStorage = new LocalStorage()