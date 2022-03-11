const arr = [1, [1, 2], 3, [[1, 2, 3], 4], 5]

// 递归数组的每一项
const foo = function (arr) {
  if (!Array.isArray(arr)) return
  const newArr = []
  for (let key of arr) {
    Array.isArray(key) ? newArr.push(...foo(key)) : newArr.push(key)
  }
  return newArr
}

console.log(foo(arr))
