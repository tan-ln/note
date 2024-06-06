// instanceof用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上。

function _instanceof (obj, _constructor) {
  if (typeof obj !== 'object' || obj === null) {
    throw TypeError('object required')
  }

  while (obj) {
    if (obj.__proto__ === _constructor.prototype) {
      return true
    }
    obj = obj.prototype
  }
  
  return false
}

const arr = [1, 2, 3]

console.log(_instanceof(arr, Object))

