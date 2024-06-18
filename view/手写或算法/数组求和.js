/**
 * 递归求和思路
 *  f(i) 表示从数组 i 位到末尾之和
 *  如 f(2) = num[2] + f(3)
 *  得 f(i) = num[i] + f(i + 1) 
 *  且当 i 位于数组最后一位时 为0
 */

// const num = [4, 7, 3, 6 , 3, 7]

function sum(num) {
  function f (i) {
    return i < num.length
      ? f(i + 1) + num[i]
      : 0
  }

  return f(0)
}

console.log(sum([0]), sum([4, 7, 3, 6 , 3, 7]))
