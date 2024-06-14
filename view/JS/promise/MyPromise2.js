const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise2 {
  constructor (executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined

    this.onResolveCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value

        this.onResolveCallbacks.forEach(fn => fn())
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason

        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }

  }

  then (onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    } 
    
    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
    
    // 没有在 executor 中直接 resolve 或 reject，而是异步情况
    // 按顺序收集 成功和失败的函数
    // 在最终 resolve 或 reject 调用的时候，按顺序执行
    if (this.status === PENDING) {
      this.onResolveCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }
  }
}

module.exports = MyPromise2