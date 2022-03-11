const arr = [1, [1, 20], 3, [[11, 2, 38], 4], 5]

// toString 方法把数组转为字符串

const str = arr.toString()
// 如果需要转为数值类型 可对每一项使用 Number()
const newArr = str.split(',').map(item => Number(item))
// [
//   1,  1, 20, 3, 11,
//   2, 38,  4, 5
// ]
console.log(newArr)
