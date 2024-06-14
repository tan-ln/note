const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise1 {
  constructor (executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
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
    } else if (this.status === REJECTED) {
      onRejected(this.reason)
    }
  }
}

module.exports = MyPromise1