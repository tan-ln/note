/**
 * 思考方式：
 * [4, 5, 1, 2, 7, 3, 6, 9]
 * 
 * 二维数组：
 * 4
 * 4 5
 * 遍历每一个数字，从二维数组中 从后往前 找最后一个数字与它比较
 * 如果比最后一个大，就新增一个数组，把它放进最后一个数组的最后一项作为新的数组
 * 
 * 如果比到第一个数字还是比当前这个数字大，就直接替换
 * 
 * 1
 * 4 5
 * ------
 * 1
 * 1 2
 * 1 2 7
 * ------
 * 1 2 3
 * 1 2 3 6
 * 1 2 3 6 9 
 * 
 */

function LIS (num) {
  if (!num.length) return []

  const result = [[num[0]]]

  for (let i = 0; i < num.length; i++) {
    const current = num[i]
    __update(current)
  }

  function __update (item) {
    for (let j = result.length - 1; j >= 0; j--) {
      const line = result[j] 
      const tailNum = line[line.length - 1]
      if (item > tailNum) {
        result[j + 1] = [
          ...line,
          item
        ]
        break
      } else if (item < tailNum && j === 0) {
        result[j] = [item]
      }
    }
  }

  return result.slice(-1)[0]
}

console.log(
  LIS(
    [4, 5, 1, 2, 7, 3, 6, 9]
  )
)
// [ 1, 2, 3, 6, 9 ]