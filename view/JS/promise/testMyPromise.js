/**
 * https://promisesaplus.com/
 */

const MyPromise1 = require('./MyPromise1')
const MyPromise2 = require('./MyPromise2')
const MyPromise3 = require('./MyPromise3')

// 基本 promise ----------------------------
const promise1 = new MyPromise1((resolve, reject) => {
  // resolve('resolve result')
  reject('reject reason')

  // throw new TypeError('type error')
})

// promise1.then((res) => {
//   console.log('fulfilled value：', res)
// }, (err) => {
//   console.log('reject reason：', err)
// })

// 异步 ----------------------------------
const promise2 = new MyPromise2((resolve, reject) => {
  setTimeout(() => {
    resolve('setTimeout 200')
  }, 2000);
})

// promise2.then((res) => {
//   console.log('fulfilled value：', res)
// }, (err) => {
//   console.log('reject reason：', err)
// })

// 链式调用 -------------------------------
const promise3 = new MyPromise3((resolve, reject) => {
  resolve(333)
})

const promise33 = promise3.then(() => {
  // return promise33
  // return 123

  // return new Promise((resolve) => {
  //   resolve('resolve')
  // })

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve('resolve')
  //   }, 2000);
  // })

  return new MyPromise3((resolve) => {
    setTimeout(() => {
      resolve(new MyPromise3((resolve) => {
        resolve(new MyPromise3((resolve) => {
          resolve('嵌套的 resolve')
        }))
      }))
    }, 2000);
  })
}, (reason) => {
  return reason
})

promise33.then().then().then().then((value) => {
  // console.log(value)
  throw new Error('jlk')
}, (reason) => {
  console.log('error --> ', reason)
}).catch(err => {
  console.log('catch error : >>>>', err)
})