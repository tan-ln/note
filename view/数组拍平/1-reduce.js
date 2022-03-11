/**
 * 数组拍平 —— 多维数组转一维
 */

const arr = [1, [1, 2], 3, [[1, 2, 3], 4], 5]

// 1. reduce 累加器，concat + 递归
const foo = arr => arr.reduce((total, curVal) => total.concat((Array.isArray(curVal) ? foo(curVal) : curVal)), [])

const newArr = foo(arr)   // [ 1, 1, 2, 3, 1, 2, 3, 4, 5 ]
console.log(newArr)
