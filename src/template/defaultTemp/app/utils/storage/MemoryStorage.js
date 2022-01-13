class MemoryStorage {
  storage = {}
  getItem = (key) => {
    return (this.storage[key] && JSON.parse(this.storage[key])) || null
  }
  setItem = (key, value) => {
    this.storage[key] = JSON.stringify(value)
  }
  removeItem = (key) => {
    delete this.storage[key]
  }
  getKeys = () => {
    return Object.keys(this.storage)
  }
  clear = () => {
    this.storage = {}
  }
}

export const memoryStorage = new MemoryStorage()