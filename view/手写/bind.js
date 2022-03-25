/**
 *  bind 将一个函数绑定到一个对象上，但不会立即调用，而是返回一个新的函数
 *       新函数被调用时，可以再次传参
 */

Function.prototype._bind = function () {
  const _self = this
  const _this = [...arguments].slice(0, 1)
  const _args = [...arguments].slice(1)
  return function (...args) {
    let temp = _args.concat([...args])
    return _self.apply(_this, temp)
  }
}

function fn(a, b, c) {
  return a + b + c;
}

const _fn = fn._bind(null, 10)
console.log(_fn(20, 30))