// eventEmitter 发布订阅

class EventEmit {
  constructor () {
    // 存储事件和监听函数之间的关系
    this.eventMap = {}
  }

  // 监听（订阅）
  /**
   * @param {string} type 事件名称
   * @param {function} handler 处理函数
   */
  on (type, handler) {
    if (!(handler instanceof Function)) {
      throw new Error('传入一个 Function')
    }
    if (!this.eventMap[type]) {
      // 不存在则创建
      this.eventMap[type] = []
    }
    // 存在则 push
    this.eventMap[type].push(handler)
  }

  // 触发可传参
  emit (type, params) {
    if (this.eventMap[type]) {
      this.eventMap[type].forEach(item => item(params))
    }
  }

  // 移除监听
  off (type, handler) {
    if (this.eventMap[type]) {
      this.eventEmit[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1)    // >>> 位运算符，本质上就是保证x有意义（为数字类型），且为正整数
    }
  }
}

const myEvent = new EventEmit()
const testHanler = function (params) {
  console.log('事件触发，传参：' + params);
}

// 添加监听
myEvent.on('test', testHanler)

// 触发
myEvent.emit('test', 'new props')   // 事件触发，传参：new props

