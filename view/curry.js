const curry = function () {
  // arguments 只是类数组，没有 数组的方法
  const _args = [...arguments]

  const adder = function (...args) {
    _args.push(...args)
    return adder
  }

  adder.toString = function () {
    return _args.reduce((a, b) => a + b)
  }
  return adder
}

console.log('' + curry(1, 2)(3, 4))
