/**
 *  apply 能让一个对象使用另一个对象上的方法
 *        与 call 的区别在于传参
 */

 const person = {
  show: function (age, weapon) {
    console.log(this.name + ', age: ' + age + ', weapon: ' + weapon)
  }
}

const obj = {
  name: 'tan'
}

person.show.apply(obj, [200])

Function.prototype._apply = function (ctx) {
  // ctx 为 undefined || null
  ctx = ctx || Window
  // 调用的方法 like show
  ctx.fn = this
  const _args = arguments[1] || []
  const res = ctx.fn(..._args)
  // 防止 ctx 属性越来越多
  delete ctx.fn
  return res
}

person.show._apply(obj, [500, 'AK'])       // tan, age: 500, weapon: AK
