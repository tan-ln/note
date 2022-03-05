// 递归 1 - 100 求和

// 1. 传 首尾 两个参数 （1， 100）
//    递归 100 / 2 - 1 次
const add = function (a, b, total = 0) {
  total += (a + b)
  a++; b--
  if (a > b) {
    return total
  } else {
    return add(a, b, total)
  }
}

// const res = add(1, 100)
// console.log(res)              // 5050

// 2. 传 第一 二 个参数 （1， 2） 默认结束值 100
//    递归 100 - 1 次
// const add2 = function (a, b) {
//   let sum = a + b
//   if (b < 100) {
//     return add2(sum, b + 1)
//   } else {
//     return sum
//   }
// }

// const res2 = add2(1, 2)
// console.log(res2)              // 5050

// 3. 传 1 个参数 即结束值 （100） 默认开始值 1
//    递归 100 - 1 次
// const add3 = function (end) {
//   if (end < 1) {
//     return 0
//   } else {
//     return add3(end-1) + end
//   }
// }

// const res3 = add3(100)
// console.log(res3)              // 5050

// 4. 非递归写法1( reduce 累加器)
// const addReduce = function (a, b) {
//   // (0 - xxx) 可直接使用 arr
//   const arr = [...Array(b + 1).keys()]
//   // (6 - xxx) 需要切除部分
//   arr.splice(0, a)
//   return arr.reduce((i, j) => i + j)
// }
// const res4 = addReduce(1, 100)          // 5050
// const res4 = addReduce(4, 66)           // 2205
// console.log(res4)

// 5. 非递归写法2( for 循环)
// const addFor = function (a, b) {
//   let total = 0
//   for (let i = a; i <= b; i++) {
//     total += i
//   }
//   return total
// }
// const res5 = addFor(1, 100)
// console.log(res5)              // 5050

// 6. 数学方法 (首项 + 尾项 * 项数 / 2)
// const add4 = (a, b) => (a + b) * (b - a + 1) / 2
// const res6 = add4(1, 100)
// console.log(res6)              // 5050
