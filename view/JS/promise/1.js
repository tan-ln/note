const promise = new Promise((resolve, reject) => {
  // 抛异常1
  // reject('Error')
  // 抛异常2
  throw new TypeError('type error')
})

/**
 * then(onFulfilled(), onRejected())
 * 
 * onRejected 方法捕获 promise 抛出的异常，未处理的异常有穿透效果（到外层链式调用的 then -> catch -> 报错未捕获的异常）
 */
promise.then(
  (res) => {

  }, 
  // (err) => {
  //   console.log(err)
  // }
).then(
  () => {
  },
  // (err2) => {
  //   console.log('err2', err2)
  // }
).catch(err => {
  console.log('catch err', err)
})