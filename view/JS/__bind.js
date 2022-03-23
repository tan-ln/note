/**
 * bind 将一个函数绑定到一个对象上面，并且返回一个新的函数
 *      原始函数不会立即执行，
 *      等到新的函数被执行时，传入的第一个参数，作为 this，并且接受新的参数
 */

Function.prototype.__bind = function (ctx) {
  const _self = this
  const _args = [...arguments].slice(1)

  return function (...args) {
    const newArgs = _args.concat([...args])
    _self.apply(ctx, newArgs)
  }
}

const obj = {
  name: 'tan'
}

const show = function (age, money) {
  console.log(this.name + ' , age: ' + age + ', money: ' + money)
}

show.__bind(obj, 1)(200)
// tan , age: 1, money: 200
