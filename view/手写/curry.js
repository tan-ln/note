/**
 *  定长
 */

function curry (fn) {
  return function curried (...args) {
    if (args.length >= fn.length) // fn.length 是函数对象参数的数量
    {
      // 参数长度够就直接返回
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(fn, [...args, ...args2])
      }
    }
  }
}


function sum (a, b, c) {
  return a + b + c
}

const curried = curry(sum)
console.log(curried(1)(2)(3)) // 参数数量为 sum 函数传参数量
console.log(curried(1, 2)(3))


function addCurry () {
  // 收集所有参数
  const arr = [...arguments]

  return function fn () {
    if (arguments.length === 0) {
      return arr.reduce((a, b) => a + b)
    } else {
      // 收集所有参数
      arr.push(...arguments)
      return fn
    }
  }
}

console.log(addCurry(1)(2, 3)(4)())