Promise.resolve()
  .then(() => {
    console.log(0)
    return Promise.resolve(4)
  }).then((res) => {
    console.log(res)
  })

Promise.resolve()
  .then(() => {
    console.log(1)
  })
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(5)
  })
  .then(() => {
    console.log(6)
  })

/**
 *   0 1 2 3 4 5 6
 * 
 *  0 回调进入微队列
 *  1 进入微队列
 *  打印 0
 * 
 *  任务A
 *  const p4 = Promise.resolve(4)
 *  return p4 相当于 p4.then(() => 此时完成p0)
 * 
 *  将上面这个 任务A 加入微队列
 *  打印 1
 *  2 进入微队列
 *  执行 任务A
 *  完成 p0 进入微队列
 *  打印 2
 *  3 进入 微队列
 *  完成 p0 执行
 *  p0 完成
 *  console.log(res) 进入微队列
 *  打印 3
 *  5 进入微队列
 *  执行 res 打印 4
 *  打印 5
 *  6 进入微队列
 *  完成
 */