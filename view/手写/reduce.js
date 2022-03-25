Array.prototype.__reduce = function (fn, init) {
  const arr = this
  let total = init || arr[0]

  for (let i = (init ? 0 : 1); i < arr.length; i++) {
    total = fn(total, arr[i], i, arr)
  }

  return total
}

const arr = [1, 2, 3, 4]
console.log(arr.__reduce((a, b) => a + b))                  // 10
console.log(arr.__reduce((a, b) => a + b, 100))             // 110
