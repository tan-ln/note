// 1. 简单版
Array.prototype._map = function (fn) {
  if (typeof fn !== 'function') return 'fn is not a function'
  let temp = []
  const arr = this
  for(let val of arr) {
    temp.push(fn(val))
  }
  return temp
}

const arr = [1, 2, 3, 4]

const res = arr._map(item => {
  return '_' + item + '_'
})

// console.log(res)  // [ '_1_', '_2_', '_3_', '_4_' ]

/**
 *  2. 完整版
 *                   当前值   下标 所属数组    可作为this值
 *  arr.map(function (curVal, idx, arr) {}, thisValue)
 */

Array.prototype.__map = function (fn, ctx) {
  if (typeof fn !== 'function') return 'fn is not a function'
  let temp = []
  const arr = this
  let l = arr.length
  for (let i = 0; i < l; i++) {
    temp.push(fn.call(ctx, arr[i], i, arr))
  }
  return temp
}

arr.__map(function (curVal, idx, arr) {
  console.log(curVal, idx, arr)
})

/**
 *  1 0 [ 1, 2, 3, 4 ]
    2 1 [ 1, 2, 3, 4 ]
    3 2 [ 1, 2, 3, 4 ]
    4 3 [ 1, 2, 3, 4 ]
 */


// reduce 版
Array.prototype.___map = function (fn, ctx) {
  if (typeof fn !== 'function') return 'fn is not a function'
  let temp = []
  this.reduce((total, curVal, idx, arr) => {
    temp.push(fn.call(ctx, curVal, idx, arr))
  }, [])
  return temp
}

arr.___map(function (curVal, idx, arr) {
  console.log(curVal, idx, arr)
})

/**
 *  1 0 [ 1, 2, 3, 4 ]
    2 1 [ 1, 2, 3, 4 ]
    3 2 [ 1, 2, 3, 4 ]
    4 3 [ 1, 2, 3, 4 ]
 */
