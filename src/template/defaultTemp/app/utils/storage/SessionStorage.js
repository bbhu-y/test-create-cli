let sessionData = window.sessionStorage

class SessionStorage {
  getItem = (key) => {
    return JSON.parse(sessionData[key] || null)
  }
  setItem = (key, value) => {
    return sessionData.setItem(key, JSON.stringify(value))
  }
  removeItem = (key) => {
    return sessionData.removeItem(key)
  }
  getKeys = () => {
    const keys = []
    for (let i = 0; i < sessionData.length; i++) {
      keys.push(sessionData.key(i))
    }
    return keys
  }
  clear = () => {
    return sessionData.clear()
  }
}

export const sessionStorage = new SessionStorage()