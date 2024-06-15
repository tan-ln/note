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

  finally (finallyCallback) {
    return this.then(
      (value) => MyPromise3.resolve(
        finallyCallback()
      ).then(() => value),
      (reason) => MyPromise3.resolve(
        finallyCallback()
      ).then(() => { throw reason })
    )
  }

  // 静态方法 由构造函数或类直接调用，而非实例调用
  static resolve (value) {
    return new MyPromise3((resolve, reject) => {
      if (value instanceof MyPromise3) {
        value.then(
          (res) => {
            resolve(res)
          },
          (err) => {
            reject(err)
          }
        );
      } else {
        resolve(value)
      }
    });
  }

  static reject (error) {
    return new MyPromise3((resolve, reject) => {
      reject(error)
    })
  }

  static all (list) {
    const result = []
    let count = 0

    return new MyPromise3((resolve, reject) => {
      function addResult (key, value) {
        result[key] = value
        count++
        if (count === list.length) {
          resolve(result)
        }
      }

      for (let i = 0; i < list.length; i++) {
        const current = list[i]
        if (current instanceof MyPromise3) {
          current.then(val => {
            addResult(i, val)
          }, err => {
            reject(err)
          })
        } else {
          addResult(i, current)
        }
      }
    })
  }

  static race (pList) {
    return new MyPromise3((resolve, reject) => {
      pList.forEach(p => {
        p.then((value) => {
          resolve(value)
        }, (reason) => {
          reject(reason)
        })
      })
    })
  }

  static allSettled (pList) {
    return new MyPromise3((resolve, reject) => {
      const result = []
      let count = 0

      function setResult (key, val) {
        result[key] = val
        count++
        if (count === pList.length) {
          resolve(result)
        }
      }

      for (let i = 0; i < pList.length; i++) {
        const current = pList[i]

        if (current instanceof MyPromise3) {
          current.then(
            (value) => setResult(i, {
              status: 'fulfilled', 
              value
            }),
            (reason) => 
              setResult(i, {
                status: 'rejected',
                reason
              })
          ).catch(err => {
            setResult(i, {
              status: 'rejected',
              reason: err
            })
          })
        } else {
          // 普通类型
          setResult(i, current)
        }
      }
    })
  }

  static any (pList) {
    return new Promise((resolve, reject) => {
      const rejectResult = []
      let count = 0

      function addRejectedResult (key, val) {
        rejectResult[key] = val
        count++
        if (count === pList.length) {
          reject(rejectResult)
        }
      }

      for (let i = 0; i < pList.length; i++) {
        const current = pList[i]

        if (current instanceof MyPromise3) {
          current.then((value) => {
            resolve(value)
          }, (reason) => {
            addRejectedResult(i, reason)
          })
        } else {
          resolve(current)
        }
      }
    })
  }
}

module.exports = MyPromise3