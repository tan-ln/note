const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function resolvePromise (promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<MyPromise3>'))
  }

  // 成功或失败的回调只能调用一次
  let called = false;

  // 判断是否是一个 promise
  if (
    (typeof x === 'object' && x !== null) ||
    typeof x === 'function'
  ) {
    try {
      const then = x.then // 可能报异常

      if (typeof then === 'function') { // 为 Promise
        // this 指向 x（promise）
        then.call(x, (y) => {
          if (called) return
          called = true
          // resolve(y)
          // 可能会是嵌套的 resolve 结果 -> testMyPromise.js(55)
          resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          if (called) return
          called = true
          reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }

  } else {
    // 普通 js 类型
    resolve(x)
  }
}

class MyPromise3 {
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

  // 链式调用是因为 then 这一类的方法返回了一个 promise

  then (onFulfilled, onRejected) {

    // onFulfilled onRejected 可以不传
    onFulfilled = typeof onFulfilled === 'function'
      ? onFulfilled
      : value => value

    onRejected = typeof onFulfilled === 'function'
      ? onRejected
      : reason => {
        throw reason
      }

    const promise2 = new MyPromise3((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0);
      } 
      
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        }, 0);
      }
      
      // 没有在 executor 中直接 resolve 或 reject，而是异步情况
      // 按顺序收集 成功和失败的函数
      // 在最终 resolve 或 reject 调用的时候，按顺序执行
      if (this.status === PENDING) {
        this.onResolveCallbacks.push(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
        this.onRejectedCallbacks.push(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }
    })

    return promise2
  }

  catch (errCallback) {
    return this.then(null, errCallback)
  }
}

module.exports = MyPromise3