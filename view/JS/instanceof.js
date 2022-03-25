/**
 *  instanceof 的作用是在某个对象的原型链上查找是否存在一个构造函数的 prototype 属性
 * 
 *  instanceof 只能测试对象
 */

let a = 10
let b = new Number(10)
console.log(a instanceof Number)                  // false    检测的一定要是对象才行
console.log(b instanceof Number)                  // true

console.log(a.__proto__ === Number.prototype)     // true

const arr = [1, 2, 3]
console.log(arr instanceof Object)                  // true
