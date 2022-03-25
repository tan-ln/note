// const obj = {
//   name: 'tan'
// }

// console.log(obj instanceof Object)          // true

/**
 * 如上：
 *       instanceof 的作用是在某个对象的原型链上查找是否存在一个构造函数的 prototype 属性
 * 
 *       instanceof 只能测试对象
 * 
 *      instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype查找失败，返回 false
 */

const _instanceof = function (obj, _constructor) {
  while (obj) {
    if (obj.__proto__ === _constructor.prototype) {
      return true
    }
    obj = obj.prototype
  }
  return false
}

const arr = [1, 2, 3]

console.log(_instanceof(arr, Object))          // false
console.log(_instanceof(arr, Array))           // true