/**
 *  call 能让一个对象使用另一个对象上的方法
 */

const person = {
  show: function (age) {
    console.log(this.name + ', age: ' + age)
  }
}

const obj = {
  name: 'tan'
}

person.show.call(obj, 200)

Function.prototype._call = function (ctx) {
  // ctx 为 undefined || null
  ctx = ctx || Window
  // 调用的方法 like show
  ctx.fn = this
  const _args = [...arguments].slice(1)
  const res = ctx.fn(..._args)
  delete ctx.fn
  return res
}

person.show._call(obj, 500)       // tan, age: 500

