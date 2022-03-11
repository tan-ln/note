const _new = function (constructor, ...args) {
  const obj = {}
  obj.__proto__ = constructor.prototype
  constructor.apply(obj, args)
  // const res = constructor.apply(obj, args)
  // 如果该函数没有返回对象，则返回 this
  // return Object.prototype.toString.call(res) === '[object Object]' ? res : obj
  return obj
}

// 构造函数
const Foo = function (name) {
  this.name = name
}

const ins = _new(Foo, 'Trump')
console.log(ins)                    // Foo { name: 'Trump' }

const ins2 = new Foo('Byden')
console.log(ins2)                   // Foo { name: 'Byden' }
