// 斐波那契 1 2 3 5 8 。。。
// 输出相同

// 1. 
// let a = 1, b = 1

// for (let i = 0; b < 1000; i++) {
//   console.log(b)

//   b += a
//   a = b - a
// }


// 2. 
(function a (arr = [1, 0]) {
  const [x, y] = arr
  if (x < 1000) {
    y && console.log(x)
    const t = (x * 10 + y * 10) / 10
    a([t, x])
  }
})()
