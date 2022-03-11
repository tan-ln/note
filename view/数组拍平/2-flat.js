const arr = [1, [1, 2], 3, [[1, 2, 3], 4], 5]
/**
 * 2. Array.prototype.flat()
 * 
 * 创建一个新数组，把旧数组所有元素递归连接到新数组当中，直到达到指定的深度
 * [].flat(n) | [].flat(Infinity)
 * 兼容性问题
 */
const newArr = arr.flat(Infinity)

// [
//   1, 1, 2, 3, 1,
//   2, 3, 4, 5
// ]
console.log(newArr)
