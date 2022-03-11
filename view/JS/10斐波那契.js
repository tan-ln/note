// 斐波那契数列 第 n 项的值
const fib = function (n) {
  if (n === 0 || n === 1) {
    return n
  }
  return fib(n - 1) + fib(n - 2)
}

console.log(fib(10))        // 55

const fn = function (n) {
  let current = 0, next = 1, temp = null
  for (let i = 0; i < n; i++ ) {
    temp = current
    current = next
    next += temp
  }
  return current
}

console.log(fn(10))        // 55