const promise = new Promise((resolve, reject) => {
  resolve('1st resolve')
})

promise.then((res) => res) // 普通值
.then(res => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('timeout error')
    }, 2000);
  })
})
.then((value) => {
  console.log('value', value) // 不打印，因为 reject 不会执行 onFulfilled 函数
}, (reason) => {
  console.log('reject reason: ', reason)
  // reject 函数的返回值会作为参数，传递到下一个 fulfilled 函数，不写则为 undefined
  // return 100
})
.then((value) => {
  console.log(value, '- ----- > fulfilled') // undefined - ----- > fulfilled
}, (reason) => {
  console.log(reason, '- ----- > rejected') // 不执行，因为前面已经有 rejected 函数处理异常
})
.then(() => {
  throw new Error('throw error : ') 
})
.then((value) => {
  console.log('fulfilled after throw ======> ', value) // 不执行
}, (reason) => {
  console.log('rejected after throw ======> ', reason) // rejected after throw ======>  Error: throw error : 。。。
})
.catch((err) => {
  console.log('rejected in catch ', err) // rejected after throw ======>  Error: throw error : 。。。
})
.then((value) => {
  // catch 后可以继续 then，value 是 catch 的 return value，如果 catch 执行了

  // catch 遵循 then 的运行原则
})

// 成功的条件
// 1. then 中返回 普通 javascript 值
// 2. then 中返回 新的 promise 成功状态的结果
//  return new Promise((resolve) => resolve(123))

// 失败的条件
// 1. then 返回新的 promise 失败状态的原因
//  return new Promise((resolve, reject) => reject('error'))
// 2. throw 异常
