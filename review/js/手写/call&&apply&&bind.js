function _call () {
  const target = [...arguments].slice(0, 1)
  const args = [...arguments].slice(1)
  target.fn = this
  const result = target.fn(...args)
  delete target.fn
  return result
}

function _apply () {
  const target = [...arguments].slice(0, 1)
  const args = arguments[1]
  target.fn = this
  const result = target.fn(...args)
  delete target.fn
  return result
}

function _bind () {
  const ctx = arguments[0]
  const _args = [...arguments].slice(1)
  const _self = this

  return function (...args) {
    const fullArgs = _args.concat(args)
    return _self.apply(ctx, fullArgs)
  }
}

const obj = {
  name: 'ababab',
  age: 100,
}

const Person = function (name, age, logo) {
  this.name = name
  this.age = age
  this.logo = logo

  return {
    name: this.name + '__: ' + this.logo,
    age: this.age,
  }
}

Object.prototype._call = _call
const r1 = Person._call(obj, 'Trump', 72)
Object.prototype._apply = _apply
const r2 = Person._apply(obj, ['Trump', 72])
Object.prototype._bind = _bind
const r3 = Person._bind(obj, 'Trump', 72)('MAGA!')

console.log('🚀 ~ r1:', r1)
console.log('🚀 ~ r2:', r2)
console.log('🚀 ~ r3:', r3)
