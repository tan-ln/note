class EventEmit {
  constructor () {
    this.eventMap = {}
  }

  on (eventName, callback) {
    if (!this.eventMap[eventName]) {
      this.eventMap[eventName] = []
    }
    this.eventMap[eventName].push(callback)
  }

  emit (eventName, ...args) {
    if (this.eventMap[eventName]) {
      this.eventMap[eventName].forEach(fn => fn(...args))
    }
  }

  off (eventName, cb) {
    const target = this.eventMap[eventName]
    const cbIdx = target.indexOf(cb)
    if (cbIdx !== -1) {
      target.splice(cbIdx, 1)
    }
  }

  once (eventName, cb) {
    // 执行完成一次后删除
    const fn = (...args) => {
      cb(...args)
      this.off(eventName, cb)
    }
    this.on(eventName, fn)
  }
}

const eventBus = new EventEmit()
const onShow = (name, age) => {
  console.log(`${name} 今年 ${age}`)
}

eventBus.on('show', onShow)
eventBus.emit('show', '🐔', '2.5')

