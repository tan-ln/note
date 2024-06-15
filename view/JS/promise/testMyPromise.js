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
  console.log(value)
  // throw new Error('jlk')
}, (reason) => {
  console.log('error --> ', reason)
}).catch(err => {
  console.log('catch error : >>>>', err)
})

// 静态方法 -------------------------
const a = MyPromise3.resolve(
  new MyPromise3((resolve) => {
    setTimeout(() => {
      resolve('静态方法 resolve')
    }, 0);
  })
)
a.then(data => {
  console.log(data)
})

const b = MyPromise3.reject(
  // new TypeError('类型错误')
  'XXX'
)
b.then((value) => {
  console.log('then value --> ', value)
}, (reason) => {
  console.log('error --> ', reason)
})

const p1 = new MyPromise3((resolve) => {
  resolve(123)
})
const p2 = new MyPromise3((resolve) => {
  setTimeout(() => {
    resolve(() => 'hahaha')
  }, 200);
})
const p3 = new MyPromise3((resolve, reject) => {
  setTimeout(() => {
    reject('砸了你们！砸了！')
  }, 200);
})

MyPromise3.all(['aa', p1, p2, p3]).then((value) => {
  console.log('all value --> ', value)
}, (reason) => {
  console.log('all error --> ', reason)
})

MyPromise3.allSettled(['aa', p1, p2, p3]).then((value) => {
  console.log('allSettled value --> ', value)
}, (reason) => {
  console.log('allSettled error --> ', reason)
})

MyPromise3.race([p1, p2, p3]).then((value) => {
  console.log('race value --> ', value)
}, (reason) => {
  console.log('race error --> ', reason)
})

const pFinally = new MyPromise3((resolve, reject) => {
  resolve(new MyPromise3((resolve) => {
    resolve('finally')
    // reject('finally')
  }))
})

pFinally.then().then().finally(() => {
  console.log('finally -----')
  return new MyPromise3((resolve) => {
    setTimeout(() => {
      resolve('wait 4000')
    }, 4000);
  })
}).then(value => {
  console.log('after finally then: ', value)
}, reason => {
  console.log('after finally reject: ', reason)
})
