// console.log(Math.random())        // 0 - 1 之间的随机数 如 0.8559064587799594
// console.log(Math.ceil(Math.random() * 10))        // 1 - 10 之间的随机整数 如 6
// console.log(Math.floor(Math.random() * 10))        // 0 - 9 之间的随机整数 如 9

// console.log(Math.round(Math.random() * 10))        // 0 - 10 之间的随机整数 如 3

// 生成 [n, m] 直接的随机数
const randomNum = function (n, m) {
  const min = Math.min(n, m)
  const max = min === n ? m : n
  const value = min + Math.ceil(Math.random() * (max - min))
  return value
}

console.log(randomNum(15, 36))
