function _new (constructor) {
  if (Object.prototype.toString.call(constructor) !== '[object Function]') {
    throw TypeError('required Function')
  }
  const obj = new Object()
  obj.__proto__ = Object.create(constructor.prototype)
  const args = [...arguments].slice(1)
  const returnVal = constructor.apply(obj, [...args])
  return returnVal && typeof returnVal === 'object'
    ? returnVal
    : obj
}

const Person = function (name, age) {
  this.name = name
  this.age = age

  return {
    name: this.name + '__',
    age: this.age,
  }
}

const obj = _new(Person, 'Mike', 100)

console.log(obj)