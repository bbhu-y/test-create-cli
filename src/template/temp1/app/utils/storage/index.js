import { localStorage as local } from './LocalStorage'
import { sessionStorage as session } from './SessionStorage'
import { memoryStorage as memory} from './MemoryStorage'

export default class Storage {
  static _keyPrefix = 'Storage-'
  _getDefaultTimeout = (mode) => {
    switch (mode) {
      case 'memory':
        return 24 * 60 * 60 * 1000
      case 'session':
        return 60 * 60 * 1000
      case 'local':
        return 7 * 24 * 60 * 60 * 1000
      default:
        return 24 * 60 * 60 * 1000
    }
  }
  _getStorage = (mode) => {
    switch (mode) {
      case 'memory':
        return memory
      case 'session':
        return session
      case 'local':
        return local
      default:
        return memory
    }
  }
  getItem = (key, mode) => {
    const storage = this._getStorage(mode)
    const result = storage.getItem(Storage._keyPrefix + key)
    if (result && result.age > new Date().getTime()) {
      return result.value
    }
    storage.removeItem(Storage._keyPrefix + key)
    return null
  }
  setItem = (key, data, mode, cacheTimeout) => {
    const storage = this._getStorage(mode)
    storage.setItem(Storage._keyPrefix + key, {
      value: data,
      age: new Date().getTime() + (cacheTimeout || this._getDefaultTimeout(mode))
    })
  }
  removeItem = (key, mode) => {
    const storage = this._getStorage(mode)
    storage.removeItem(Storage._keyPrefix + key)
  }
  clear = (mode) => {
    let storages
    if (mode) {
      storages = [this._getStorage(mode)]
    } else {
      storages = [memory, session, local]
    }
    storages.forEach(storage => {
      storage.clear()
    })
  }
  clearTimeoutStorage = (mode) => {
    let storages
    if (mode) {
      storages = [this._getStorage(mode)]
    } else {
      storages = [memory, session, local]
    }
    storages.forEach(storage => {
      const keys = storage.getKeys().filter((key) => {
        return key.indexOf(Storage._keyPrefix) !== -1
      })
      keys.forEach(key => {
        const result = storage.getItem(Storage._keyPrefix + key)
        if (result && result.age < new Date().getTime()) {
          storage.removeItem(key)
        }
      })
    })
  }
}

export const storage = new Storage()
export const localStorage = local
export const sessionStorage = session
export const memoryStorage = memory