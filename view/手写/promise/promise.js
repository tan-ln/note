const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor (executor) {
    this.status = PENDING
    this.value = null
    this.reason = null
    // 成功回调
    this.onResolvedCallbacks = []
    // 失败回调
    this.onRejectedCallbacks = []


    let resolve = (value) => {
      if (this.status == PENDING) {
        this.status = FULFILLED
        this.value = value
        // 依次执行
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    let reject = (reason) => {
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

  // 链式调用，每次返回 promise
  then (onFulfilled, onRejected) {

    return new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        try {
          resolve(onFulfilled(this.value))
        } catch (err) {
          reject(err)
        }
      }
  
      if (this.status === REJECTED) {
        try {
          resolve(onRejected(this.reason))
        } catch (err) {
          reject(err)
        }
      }

      // 如果状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          try {
            resolve(onFulfilled(this.value))
          } catch (err) {
            reject(err)
          }
        })
        this.onRejectedCallbacks.push(() => {
          try {
            resolve(onRejected(this.reason))
          } catch (err) {
            reject(err)
          }
        })
      }
    })
  }
}


const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(new TypeError('自定义错误'))
  }, 2000);
}).then(data=>{
  console.log(data);
},err=>{
  console.log('err',err);
})
