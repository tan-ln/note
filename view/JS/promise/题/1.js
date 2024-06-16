async function asy1 () {
  console.log(1)
  await asy2()
  console.log(2)
}

async function asy2 () {
  // 第一组 1 7 6 2 4 3
  // await setTimeout((_) => {
  //   Promise.resolve().then((_) => {
  //     console.log(3)
  //   })
  //   console.log(4)
  // }, 0)

  // 第二组 1 33 7 44 6 2
  // await (async () => {
  //   // 没有返回值，相当于 Promise.resolve(undefined)
  //   // 且不是异步任务 await 未生效
  //   await (() => {
  //     console.log(33)
  //   })()
  //   console.log(44) // 推入微队列
  // })()

  // 第三组 1 444 7 3 6 2
  // await (async () => {
  //   Promise.resolve().then(() => {
  //     console.log(3) // 推入微队列
  //   })
  //   console.log(444)
  // })()

  // 第四组 1 7 4444 6 3333 555 2
  await Promise.resolve().then(() => {
    Promise.resolve().then(() => {
      console.log(3333)
    })
    console.log(444444)
  })
  console.log(555)
}

async function asy3 () {
  Promise.resolve().then((_) => {
    console.log(6) // 推入微队列
  })
}

asy1()
console.log(7)
asy3()


/**
 * 第一组
 * 执行 asy1 同步代码
 * 打印 1
 * 执行 asy2 同步代码
 * await setTimeout 相当于 await Promise.resolve(timerId)
 * asy2 的完成在 同步代码执行后立即改为完成状态
 * 相当于 将其先推入 微任务
 * 等待他完成后将 console.log(2) 推入微队列
 * 执行 console.log(7)
 * 执行 asy3 同步代码
 * 将 asy3 的 then 回调（console.log(6)）推入微队列
 * 
 * 同步代码走完，执行微任务【微队列：[6]】
 * await setTimeout 完成
 * 执行 asy2 的异步代码，
 * setTimeout 回调进入宏队列 【宏队列：[setTimeout回调]】
 * 将 console.log(2) 推入微队列 【微队列：[6, 2]】
 * 
 * 打印 6
 * 打印 2
 * 执行宏任务
 * 进入 setTimeout
 * 将 then 中的回调推入微队列
 * 执行同步代码 console.log(4)
 * 打印 4
 * 下一轮微任务
 * 打印 3
 * 
 * 1 7 6 2 4 3
 */


/**
 * asy2 中的
  Promise.resolve(
    // 定时器的回调将推入宏队列
    setTimeout((_) => {
      Promise.resolve().then((_) => {
        console.log(3)
      })
      console.log(4)
    }, 0)
  ).then(() => {
    console.log(2)
  })

 */

  /**
   * 第二组 asy2 中
   * 执行同步代码
   * console.log(33)
   * 不用等待 33 完成因为不是异步任务 await 无效
   * console.log(44) 推入微队列
   * 
   * asy2 完成的事件推入微队列
   * 同步执行 console.log(7)
   * console.log(6) 推入微队列
   * 
   * 执行异步
   * 微队列 
   * 打印 44
   * console.log(2) 推入微队列
   * 打印 6
   * 打印 2
   * 
   */


  /**
   * 第四组
   * asy2 同步代码执行
   * 将第一个 then 的回调推入微队列
   * 同步执行打印 7
   * 将 console.log(6) 推入微队列
   * 
   * 执行微任务
   * 将第二层 then 回调推入微队列
   * 同步执行 打印 4444
   * 微任务 打印 6
   * 微任务 打印 333
   * 微任务 555
   * 微任务 2
   */